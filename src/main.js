// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'


Vue.config.productionTip = false

import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';
Vue.use(ElementUI)

import axios from 'axios'

import Vuex from 'vuex'
import Router from "vue-router";
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
      //host: "http://prsmartoa.com:3334/",
      //host: "http://127.0.0.1:3333/springboot/",
      host: "http://127.0.0.1:3333/",
      //host:"http://prsmartoa.com:10529/springboot/",
      user: null,
      self: '',
    },
    getters: {
      getHost(state) {
        return state.host;
      },
      getUser(state) {
        return state.user;
      },
      getWindowHeight(state) {
        return state.height;
      },
      getWindowWidth(state) {
        return state.width;
      },
    },
    mutations: {
      setSelf(state, self) {
        state.self = self;
      },
      setUser(state, user) {
        state.user = user;
      },
      /**
       *
       * @param arr
       * @param method 要排序的字段
       */

      /**
       *
       * @param arr要排序的数字
       * @param custom {method:"字段名",order:0 从小到大 | 1 从大到小 }
       */
      arrayOrder(state, custom) {
        let arr = custom.arr;
        if(!arr){
          return ;
        }
        let method = custom.method;
        let order = custom.order;
        for (let i = 0; i < arr.length - 1; i++) {
          for (let j = 0; j < arr.length - i - 1; j++) {
            if (order === 0) {
              if (arr[j][method] > arr[j + 1][method]) {
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
              }
            }else{
              if (arr[j][method] < arr[j + 1][method]) {
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
              }
            }
          }
        }



      },

      /**
       * post 多个文件
       * @param state
       * @param custom
       */
      postFiles(state, custom) {
        let headers = {
          'Content-Type': 'multipart/form-data'
        };
        axios.post(custom.url, custom.formData, {headers: headers})
          .then(res => {
            custom.callback(res.data);
          });
      },
      postCustom(state, custom) {
        let url = state.host + custom.url;
        let po = custom.po;
        let callback = custom.callback;
        let myFormDatas = new FormData();
        let mark = 'po';
        if (custom.mark) {
          mark = custom.mark;
        }
        myFormDatas.append(mark, JSON.stringify(po));
        axios({
          url: url,
          method: "POST",
          data: myFormDatas,
        })
          .then(res => {
            callback(res.data);
          })
      },
      postFormDataCustom(state, custom) {
        let url = state.host + custom.url;
        let callback = custom.callback;
        let myFormDatas = custom.formdata;
        axios({
          url: url,
          method: "POST",
          data: myFormDatas,
        })
          .then(res => {
            callback(res.data);
          })
      },
      getCustom(state, custom) {
        let url = state.host + custom.url;
        let callback = custom.callback;
        axios.get(url)
          .then(res => {
            callback(res.data);
          });
      },
      confirm(state, callbackpo) {
        state.self.$confirm(callbackpo.message, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          callbackpo.callback(true);
        }).catch(() => {
          callbackpo.callback(false);
        });
      },
      showMessageBox(state, messagecustom) {
        ElementUI.Message({
          showClose: true,
          message: messagecustom.message,
          type: messagecustom.type.toLowerCase(),
          duration: messagecustom.duration?messagecustom.duration:2000,
        });
      },
      notify(state, custom) {
        ElementUI.Notification({
          title: custom.title,
          message: custom.message,
          type: custom.type.toLowerCase(),
          duration: 2000,
        });
      },
    }
  })
;

Vue.filter('dateFormat', (value) => {
  if (!value) {
    return value;
  }
  let date = new Date(value);
  return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
});


export default store

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
