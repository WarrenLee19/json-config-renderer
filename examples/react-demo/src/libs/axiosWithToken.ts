/**
 * 带有请求响应拦截的axios
 */
import { message } from 'apusic-ui' ;
import axios from 'axios' ;
import {
  theAuth
} from './auth' ;
import hashRouterRedirectTo from './hashRouterRedirectTo' ;

const axiosWithToken = axios.create({
  timeout: 120000 , //请求过期时间
  baseURL: window.location.pathname.split("/")[1]?`/${window.location.pathname.split("/")[1]}`:"/aasc" // 统一前缀(如版本号)
}) ;

//统一请求拦截
axiosWithToken.interceptors.request.use((config:any) => {
  //获取相应的token
  const token = theAuth.accountInfo.token?.access ;
  config.headers["Authorization"] = `Bearer ${token}` ; //config里就是可以统一配置request请求的参数，headers就可以在这设置 ;
  console.log("统一拦截req:",config) ;
  return config ;
},
  error => Promise.reject(error)
);


//统一响应拦截
axiosWithToken.interceptors.response.use((res) => { //如果要根据请求返回的结果进行一些操作就在response中设置
  console.log("统一拦截res:",res);
  if(res.status===203) { //拦截
    //Non-Authoritative Information
    console.log("Non-Authoritative Information") ;
    //先预留位置,有需要的时候补充
    console.error("认证过期,返回登录页") ;
   /* message.warn({
      key:"tokenExpire" , //使用config对象的方式来调用message,设置key值避免重复显示
      content:"认证过期,返回登录页"
    }) ;*/
    hashRouterRedirectTo("/login") ;
  }
  return res ;
}, error => {
  console.log("统一拦截res(error):",error);
  if (error.response.status === 403) { //token过期了直接就清空本地缓存,跳转到登陆页
    console.error(error.response.data.msg) ;
    hashRouterRedirectTo("/login") ;
  }
  return Promise.reject(error)
});

export default axiosWithToken ;
