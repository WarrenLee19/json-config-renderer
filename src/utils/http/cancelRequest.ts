/**
 * 取消重复请求
 *
 * 如何判断是重复的请求：
 *    若请求的 url路径 + method方法 + data请求体 相同，则认为请求重复
 *
 * 取消重复请求方案：假如用户先后提交了A、B请求，并且请求重复，
 *  1. 取消A请求，只发出B请求 - (会导致A请求已经发出去，被后端处理掉)
 *  2. 取消B请求，只发出A请求
 * 这里采用的是方案2
 */
import Axios from 'axios';
import Qs from 'qs';

const pendingRequest = new Map(); // 用于将正在请求的请求存储在map对象中

// 判断一个字符串是否为JSON字符串
// @ts-ignore
function isJsonStr(str: string): boolean | undefined {
  try {
    var obj = JSON.parse(str);
    if (typeof obj == 'object' && obj) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    console.log('error：' + str + '!!!' + e);
    return false;
  }
}
// 用于根据当前请求的信息，生成请求 Key
export function generateReqKey(config: any) {
  // 响应的时候，response.config 中的data 是一个JSON字符串，所以需要转换一下
  if (config && config.data && isJsonStr(config.data)) {
    config.data = JSON.parse(config.data);
  }
  const { method, url, data } = config; // 请求方式，参数，请求地址，
  return [method, url, Qs.stringify(data)].join('&'); // 拼接
}

// 添加请求: 用于把当前请求信息添加到pendingRequest对象
export function addPendingRequest(config: any) {
  const requestKey = generateReqKey(config);
  if (pendingRequest.has(requestKey)) {
    // 存在相同请求
    config.cancelToken = new Axios.CancelToken(cancel => {
      // cancel 函数的参数会作为 promise 的 error 被捕获
      cancel(`${config.url} 请求已取消`);
    });
  } else {
    config.cancelToken =
      config.cancelToken ||
      new Axios.CancelToken(cancel => {
        pendingRequest.set(requestKey, cancel);
      });
  }
}
// 移除请求: 检查是否存在重复请求，若存在则取消已发的请求
export function removePendingRequest(config: any) {
  const requestKey = generateReqKey(config);
  if (pendingRequest.has(requestKey)) {
    const cancelToken = pendingRequest.get(requestKey);
    cancelToken(requestKey);
    pendingRequest.delete(requestKey);
  }
}
