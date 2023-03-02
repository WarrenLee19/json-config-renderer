/**
 * 请求缓存
 *
 * 参数cache：
 * 类型：number
 * 说明：设置缓存时间，在设置的缓存时间内，不会发起同样的请求
 *
 * 操作：
 * 如果该请求有缓存，则取消该请求
 */
import Axios from 'axios';
import { generateReqKey } from './cancelRequest';

const cacheRequest = new Map();

// 获取当前时间戳
function getNowTime() {
  return new Date().getTime();
}
// 请求时开启缓存，若存在则取消请求
export function requestCacheInterceptor(config: any) {
  if (config.cache) {
    const requestKey = generateReqKey(config);
    let data = cacheRequest.get(requestKey);
    if (data && getNowTime() - data.expire < config.cache) {
      // 在缓存时间内
      config.cancelToken = new Axios.CancelToken(cancel => {
        cancel(data);
      });
    }
    if (data && getNowTime() - data.expire >= config.cache) {
      // 超过缓存时间
      cacheRequest.delete(requestKey);
    }
  }
}

export function responseCacheInterceptor(response: any) {
  // 返回的status === 200 时候才会缓存下来
  if (response && response.config.cache && response.status === 200) {
    const requestKey = generateReqKey(response.config);
    let data = {
      expire: getNowTime(),
      data: response
    };
    cacheRequest.set(requestKey, data);
  }
}
