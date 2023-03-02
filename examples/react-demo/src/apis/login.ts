//登录
// import axios from 'axios' ;
import { TAccountInfo } from '../libs/auth' ;

export interface TResult {
  status:0|1 ; //0代表失败1代表成功
  token?:{
    access:string ;
    refresh:string ;
  } ;
  msg?:string ; //提示信息
}

// const API_URL = "/the/path/of/login/api" ;

const login = async(condition:TAccountInfo):Promise<TResult> => {
  // const {
  //   account ,
  //   password
  // } = condition ;
  console.log(condition)
  /* mocky response START*/
  return {
    status:1 ,
    token:{
      access:"mocky.access.token" ,
      refresh:"mocky.refresh.token"
    }
  }
  /* mocky response END */
  // try {
  //   const response = await axios({
  //     method:"post" ,
  //     url:API_URL ,
  //     data: {
  //       account ,
  //       password
  //     }
  //   }) ;
  //   if(response.status===200){
  //     const {
  //       access ,
  //       refresh
  //     } = response.data ;
  //     return {
  //       status:1 , //代表登录成功
  //       token:{access,refresh}
  //     } ;
  //   }
  //   return {
  //     status:0 //代表登录失败
  //   } ;
  // } catch (error:any) {
  //   return {
  //     status: 0 , //登录失败
  //     msg:error.response.data?.message
  //   } ;
  // }
}

export { login };
