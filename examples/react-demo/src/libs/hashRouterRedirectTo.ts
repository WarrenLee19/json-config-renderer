/*
  用于hashRouter的路由跳转

  使用示例：
    hashRouterRedirectTo("/login")
*/
const hashRouterRedirectTo = (redirectPath:string) => {
  const result = `${window.location.href.split("#")[0]}#/${redirectPath.replace(/(^\/*)/g, "")}` ;
  window.location.href = result ;
}

export default hashRouterRedirectTo ;