//控制台-菜单状态对应的相关行为
// import { getMenu } from '../apis/menu' ;

export enum ACTION_TYPE {
  FETCH_PAGE_SUCCESS = "FETCH_PAGE_SUCCESS" ,
}

const fetchPage = (data: any) => {
  return {
    type: ACTION_TYPE.FETCH_PAGE_SUCCESS ,
    payload: data
  } ;
}
export { fetchPage };
