//和管控台菜单相关的接口
// import axiosWithToken from '../../libs/axiosWithToken' ;
import mockMenuConfig from '../../mock/mockMenuConfig' ;

export interface TResult {
  status:0|1 ; //0代表失败1代表成功
  menuConfig?:any[] ;
  msg?:string ; //提示信息
}

// const API_URL = "/the/path/of/console/menu/api" ;

const getMenu = async():Promise<TResult> => {
  /* mocky response START*/
  return {
    status:1 ,
    menuConfig:mockMenuConfig
  }
  /* mocky response END */
  // try{
  //   const response = await axiosWithToken(API_URL,{
  //     method:"get"
  //   }) ;
  //   if(response.status===200){
  //     return {
  //       status:1 , //获取成功
  //       menuConfig:response.data
  //     }
  //   }
  //   return {
  //     status:0 //代表获取失败
  //   }
  // }catch(error){
  //   return {
  //     status:0 //代表获取失败
  //   }
  // }

} ;

export {
  getMenu,
} ;
