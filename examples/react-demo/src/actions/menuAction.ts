//控制台-菜单状态对应的相关行为
import { getMenu } from '../apis/menu' ;

export enum ACTION_TYPE {
  FETCH_MENU_REQUEST = "FETCH_MENU_REQUEST" ,
  FETCH_MENU_SUCCESS = "FETCH_MENU_SUCCESS" ,
  FETCH_MENU_FAILURE = "FETCH_MENU_FAILURE"
}

const fetchMenuRequest = () => {
  return {
    type: ACTION_TYPE.FETCH_MENU_REQUEST
  } ;
}

const fetchMenuSuccess = (payload:any) => {
  return {
    type: ACTION_TYPE.FETCH_MENU_SUCCESS ,
    payload
  } ;
}

const fetchMenuFailure = (payload:any) => {
  return {
    type: ACTION_TYPE.FETCH_MENU_FAILURE ,
    payload
  } ;
}

export const fetchMenu = () => {
  return async(dispatch:Function) => {
    dispatch(fetchMenuRequest()) ;
    try {
      const { menuConfig,status } = await getMenu() ;
      if(status===1){
        dispatch(fetchMenuSuccess(menuConfig)) ;
      }else{
        dispatch(fetchMenuFailure(status)) ;
      }
    }catch(error){
      dispatch(fetchMenuFailure(error)) ;
    }
  }
}
