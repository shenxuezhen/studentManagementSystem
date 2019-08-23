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
  if (pathname === '/user') {
    fileUrl='./mock/userList.json';
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
    fileUrl='./mock/courseList.json';
    switch (req.method) {
      case 'GET':
        read(fileUrl, function(data) {
          res.end(JSON.stringify(data))
        });
        break;
      case 'POST':
        var str = '';
        req.on('data', function(chunk) {
          str += chunk;
        })
        res.end('end',()=>{
            var courseData=JSON.parse(str);
            read(fileUrl,function(data){
                data[courseData.courseType].push({'label':courseData.label})
                write(fileUrl,data,function(){
                    res.end(JSON.stringify())
                })
            })
        })
    }
    return;
  } else if (pathname === '/class') {
    fileUrl='./mock/classList.json';
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
    fileUrl='./mock/noticeList.json';
    switch (req.method) {
      case 'GET':
        read(fileUrl,data => {
          res.end(JSON.stringify(data));
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
