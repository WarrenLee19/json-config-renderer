import axios from 'axios';
import { addPendingRequest, removePendingRequest } from './cancelRequest';
import { requestCacheInterceptor, responseCacheInterceptor } from './cacheRequest';

const axiosInstance = axios.create({
  timeout: 80000,
  baseURL: '/'
});

//统一请求拦截
axiosInstance.interceptors.request.use(
  (config: any) => {
    removePendingRequest(config); // 检查是否存在重复请求，若存在则取消已发的请求
    addPendingRequest(config); // 把当前请求信息添加到pendingRequest对象中
    requestCacheInterceptor(config); // 请求缓存
    return config;
  },
  error => Promise.reject(error)
);

//统一响应拦截
axiosInstance.interceptors.response.use(
  res => {
    //如果要根据请求返回的结果进行一些操作就在response中设置
    removePendingRequest(res.config); // 响应正常时候就从pendingRequest对象中移除请求
    responseCacheInterceptor(res);
    return res;
  },
  error => {
    // 从pending 列表中移除请求
    removePendingRequest(error.config || {});
    return Promise.reject(error);
  }
);

export default axiosInstance;