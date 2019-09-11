/**
 * server
 * @authors Your Name (you@example.org)
 * @date    2019-08-20 09:49:10
 * @version $Id$
 */

let http = require('http');
let fs = require('fs');
let url = require('url');
http.createServer(function(req, res) {
  /*没记错的话应该是处理跨域*/
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  res.setHeader('X-Powered-By', '3.2.1');
  if (req.method == 'OPTIONS') return res.end();
  let { pathname, query } = url.parse(req.url, true); //加true使得query是个对象而不是字符串
  res.setHeader('Content-Type', 'application/json;charset=utf8');
  var fileUrl;
  if (pathname === '/user') { //用户列表
    fileUrl = './mock/userList.json';
    if (req.method == 'GET') {
      read(fileUrl, function(data) {
        console.log(query.class + '、' + query.courseType);
        if (query.class && query.courseType) {
          var obj = { classTeacher: data.classTeacher, user: data.user };
          obj.classTeacher = obj.classTeacher.filter(function(value, index) {
            return value.class == query.class && value.courseType == query.courseType;
          })
          obj.user = obj.user.filter(function(value, index) {
            return value.class == query.class && value.courseType == query.courseType;
          })
          res.end(JSON.stringify(obj));
        } else {
          res.end(JSON.stringify(data));
        }
      })
    }
  } else if (pathname === '/course') {
    fileUrl = './mock/courseList.json';
    switch (req.method) {
      case 'GET':
        read(fileUrl, function(data) {
          console.log(data);
          res.end(JSON.stringify(data))
        });
        break;
      case 'POST':
        var str = '';
        req.on('data', function(chunk) {
          str += chunk;
        })
        res.end('end', () => {
          var courseData = JSON.parse(str);
          read(fileUrl, function(data) {
            data.push(courseData)
            write(fileUrl, data, function() {
              res.end(JSON.stringify())
            })
          })
        })
    }
    return;
  } else if (pathname === '/class') {
    fileUrl = './mock/classList.json';
    switch (req.method) {
      case 'GET':
        read(fileUrl, function(data) {
          res.end(JSON.stringify(data));
        })
        break;
      case 'POST':
        var str = '';
        req.on('data', function(chunk) {
          str += chunk;
        });

        req.on('end', () => {
          var classData = JSON.parse(str);
          classData.studentTotal = null;
          classData.courseTeacher = [];
          read(fileUrl, function(data) {
            var level = ''; //班级
            if (classData.class == '高一') {
              level = 'first';
            } else if (classData.class == '高二') {
              level = 'second';
            } else if (classData.class == '高三') {
              level = 'third';
            }
            data[level].push(classData);
            write(fileUrl, data, function() {
              res.end(JSON.stringify())
            })
          })
        })
        break;
    }
    return;
  } else if (pathname === '/notice') {
    fileUrl = './mock/noticeList.json';
    switch (req.method) {
      case 'GET': //获取列表、详情
        read(fileUrl, data => {
          var resData;
          if (query.id) {
            resData = data.find(val => { return val.id == query.id });
          } else {
            //插入的时候都是在末尾插入的，方便编辑id，所以获取的时候用到的了数组的reverse
            resData = data.filter(val => { return val.isShow == true }).reverse();
          }
          res.end(JSON.stringify(resData));
        })
        break;
      case 'POST': //提交和更新
        var str = '';
        req.on('data', function(chunk) {
          str += chunk;
        });
        req.on('end', function() {
          var noticeData = JSON.parse(str);
          read(fileUrl, data => {
            if (noticeData.id && noticeData.id > 0) {
              data.forEach((val,ind,data) => {
                val.id == noticeData.id ? data[ind] = noticeData : '';
              })
            } else {
              noticeData.id = data.length > 0 ? data[data.length - 1].id + 1 : 1;
              noticeData.isShow = true;
              noticeData.userSum = null;
              noticeData.noLookSum = null;
              data.push(noticeData);
            }
            write(fileUrl, data, function() {
              res.end(JSON.stringify())
            })
          })
        })
        break;
      case 'DELETE': //删除数据
        var id = query.id;
        read(fileUrl, data => {
          data.forEach((item, index) => {
            item.id == id ? item.isShow = false : '';
          })
          write(fileUrl, data, function() {
            res.end(JSON.stringify(data.filter(val => { return val.isShow == true }).reverse()))
          })
        })
        break;
    }
    return;
  }
}).listen('3000');


function read(url, callback) {
  fs.readFile(url, 'utf8', function(err, data) {
    if (err || data.length == 0) {
      callback([]);
    } else {
      callback(JSON.parse(data));
    }
  });
}

function write(url, data, callback) {
  fs.writeFile(url, JSON.stringify(data), function(classData) {
    callback();
  });
}
