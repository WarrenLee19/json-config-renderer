import { DeptData } from '../mock/apiMockData';
interface TpageInfo {
    size: number;
    total: number;
    current: number;
    page?: number;
}
export interface TResult {
    status:0|1 ; //0代表失败1代表成功
    msg?:string ;
    pageInfo?: TpageInfo;
    data?:any;
}


// const API_URL = '/hostresources';
//获取列表信息
const getPage = async(filterCondition:any):Promise<TResult> => {
    return {
        status:1 , //获取成功
        pageInfo:{size: 10, total: 25, current: 1, page: 3},
        data:DeptData||[]
    }
    // try{
    //     const response: any = await axiosWithToken({
    //         method: 'POST',
    //         url: API_URL+"/page",
    //         headers:{} ,
    //         data: {
    //             ...filterCondition
    //         }
    //     }) ;
    //     if(response.status == 200){
    //         return {
    //             status:1 , //获取成功
    //             pageInfo:response.data?.pageInfo||{},
    //             data:response.data?.data||[]
    //         }
    //     }
    //     return {
    //         status:0, //代表获取失败
    //         msg:response.data?.message
    //     }
    // }catch(error: any){
    //     return {
    //         status:0, //代表获取失败
    //         msg:error.response.data?.message
    //     }
    // }
} ;

const getById = async(id:string):Promise<TResult> => {
     const info = DeptData && DeptData.find((item:any)=>{
        return id == item.id
    })
    return {status:1,data:info};
    // try {
    //     const response = await axiosWithToken({
    //         method: 'get',
    //         url: API_URL + `/${id}`,
    //     })
    //     if(response.status === 200 && response.data.status === 0) {
    //         return {
    //             status: 1,
    //             data:response.data?.data||{}
    //         }
    //     }
    //     return {
    //         status: 0,
    //         msg:response.data?.message
    //     }
    // }catch(err: any) {
    //     return {
    //         status: 0,
    //         msg: err.response.data?.message
    //     }
    // }
}

export { getPage , getById }