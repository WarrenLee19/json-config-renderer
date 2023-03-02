/**
 * 迭代器tuple转对象
 * @param entries
 */
export function paramsToObject(entries: Iterable<[string, string]>) {
  const result = {};
  for (const [key, value] of entries) { // each 'entry' is a [key, value] tupple
    result[key] = value;
  }
  return result;
}

/**
 *  随机字符串
 * @param num
 */
export function randomString(num: number) {
  num = num || 12;
  let chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
  var str = '';
  for (let i = 0; i < num; i++) {
    str += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return str;
}

//时间戳转时间  过滤特殊字符
export function reg() {
  return new RegExp('^[\\[\\]\\s*【】()（）,，。./、#@!A-Za-z0-9\u4e00-\u9fa5]+$');
}

export function isIE() {
  //是否是IE内核
  return navigator.userAgent.indexOf('Trident') > -1;
}
