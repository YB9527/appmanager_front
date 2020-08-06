import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import  Login from '@/components/user/Login'
import  AppManager from '@/components/app/AppManager'
import  Nav from '@/components/Nav'
import  CrashManager from '@/components/crash/CrashManager'

Vue.use(Router);
const routes =[
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path:'/main',
    name:'main',
    component:Nav,
    children:[
      {
        path:'appmanager',
        name:'AppManager',
        component:AppManager
      },
      {
        path:'crashmanager',
        name:'CrashManager',
        component:CrashManager
      },
    ]
  },
  {
    path: '*',
    name: 'AppManager',
    component: AppManager
  },
];
const router = new Router({
  routes
});
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};

export default router

