// import Vue from 'vue'
import axios from 'axios'
// import iView from 'iview'
// Vue.use(iView);
// 公共 url
// var oUrl = 'http://123.232.102.29:8899/tjkjj';//服务器
var oUrl = 'http://123.232.102.30:9988/tjkjj';//服务器
var shiroOurl = 'http://123.232.102.30:8888/api-shiro/shiro';//权限
// var oUrl = 'http://123.232.102.29:8889/tjkjj';//服务器
// var shiroOurl = 'http://123.232.102.29:8800/api-shiro/shiro';//权限
// var oUrl = 'http://192.168.2.194:22000/tjkjj';//服务器
// var shiroOurl = 'http://192.168.2.194:9666/api-shiro/shiro';//权限
localStorage.setItem('url',oUrl)
localStorage.setItem('shiroOurl',shiroOurl)
//页面
export function oUrl(){
  return oUrl;
}
//权限
export function shiroOurl(){
  return shiroOurl;
}
//页面
 export  function postAjax(urls,obj) { /*post方法*/
  return postPromise(`${oUrl}${urls}`,obj)
}
export function getAjax(urls,obj) {/*get方法*/
  return getPromise(`${oUrl}${urls}`,obj)
}
//权限
export function postAjaxQ(urls,obj) { /*post方法*/
  return postPromise(`${shiroOurl}${urls}`,obj)
}
export function getAjaxQ(urls,obj) {/*get方法*/
  return getPromise(`${shiroOurl}${urls}`,obj)
}
// 封装 promise
function postPromise(url,obj){

  return new Promise((resolve,reject) => {
   
      axios.post(url,obj).then(
        (response) =>{
          resolve(response)
          // this.$Loading.finish();
        }
      ).catch(
        (err) => {
          reject(console.log(err))
          // this.$Loading.error();
        }
      )
    })
}

function getPromise(url,obj){
  // this.$Loading.start();
  return new Promise((resolve,reject) => {
      axios.get(url,{params:obj}).then(
        (response) =>{
          resolve(response)
          // this.$Loading.finish();
        }
      ).catch(
        (err) => {
          reject(console.log(err))
          // this.$Loading.error();
        }
      )
    })
}

// http request 拦截器请求
// axios.interceptors.request.use(
//   config => {
//     // console.log('jwt_token==========走拦截器------------------' + localStorage.getItem("jwt_token"));
//     // if (localStorage.getItem("jwt_token")) {  // 判断是否存在token，如果存在的话，则每个 http header都加上token
//       // console.log(localStorage.getItem("jwt_token"))
//         // debugger
//       //  let getcok = localStorage.getItem("jwt_token")
//       //  alert(getcok)
//       //  document.cookie ="jwt_token="+getcok+' domain=http://192.168.0.234:7777';
//       //  console.info(document.cookie);
//       //  alert(document.cookie)

//     }else{
//       // console.log("99999999999999================")
//     }
//     return config;
//   },
//   err => {
//     return Promise.reject(err);
//   }
// );


