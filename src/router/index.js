import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/page/login'
import home from '@/components/common/home'
import createUser from '@/components/page/createUser'
import userList from '@/components/page/userList'
import createClass from '@/components/page/createClass'
import classList from '@/components/page/classList'
import createStudent from '@/components/page/createStudent'
import studentList from '@/components/page/studentList'
import createCourse from '@/components/page/createCourse'
import courseList from '@/components/page/courseList'
import createNotice from '@/components/page/createNotice'
import noticeList from '@/components/page/noticeList'
import changePwd from '@/components/page/changePwd'
import $ from 'jquery'

Vue.use(Router)

export default new Router({
  routes: [{
    path:'/',
    redirect:'/login'
    }, {
      path: '/login',
      component: login
    },
    {
      path: '/index',
      component: home,
      children: [{
          path: '/createUser',
          component: createUser
        },
        {
          path: '/userList',
          component: userList
        },
        {
          path: '/createClass',
          component: createClass
        },
        {
          path: '/classList',
          component: classList
        },
        {
          path: '/createStudent',
          component: createStudent
        },
        {
          path: '/studentList',
          component: studentList
        },
        {
          path: '/createCourse',
          component: createCourse
        },
        {
          path: '/courseList',
          component: courseList
        },
        {
          path: '/createNotice',
          component: createNotice
        },
        {
          path: '/noticeList',
          component: noticeList
        },
        {
          path: '/changePwd',
          component: changePwd
        }
      ]
    }
  ]
})
