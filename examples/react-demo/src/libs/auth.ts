//认证模块
import { login } from '../apis/login' ;

type TStorageType = "localStorage"|"sessionStorage" ; //存储信息的方式

interface TAuthInitArg { //调用构造函数Auth时的参数
  storageKey:string ;
  storageType:TStorageType ;
}

interface TToken { //token
  access:string ;
  refresh:string ;
}

enum TLoginResultStatus {
  success=1 ,
  failure=0
}

interface TLoginResult {
  status: TLoginResultStatus ;
  token?: TToken ;
  msg?: string ;
}

export interface TAccountInfo {
  account:string ;
  password:string ;
  token?:TToken ;
}

const defaultStorageType = "localStorage" ; //默认的存储方式
const defaultStorageKey = "belle-account-info" ; //默认的存储键

class Auth {
  //属性声明
  private __storageType__:TStorageType ; //使用何种方式存储
  private __storageKey__:string ; //使用什么键存储
  constructor({
    storageType=defaultStorageType , //默认值
    storageKey=defaultStorageKey 
  }:TAuthInitArg) {
    this.__storageType__ = storageType === "localStorage"?"localStorage":"sessionStorage" ;
    this.__storageKey__ = storageKey ;
  }
  get isLogined ():boolean {
    //获取登录状态
    if(this.accountInfo&&this.accountInfo.token){
      return true ;
    }else{
      return false ;
    }
  }
  get accountInfo ():TAccountInfo {
    //获取账户信息(包括token)
    let accountInfoStr:string|null = window[this.__storageType__].getItem(this.__storageKey__) ;
    accountInfoStr = accountInfoStr||"{}" ; //剔除null的可能性
    return JSON.parse(
      accountInfoStr
    ) ;
  }
  //更新账户信息
  __updateAccountInfo__ = (accountInfo:TAccountInfo) => {
    console.log(accountInfo)
    //更新浏览器存储信息
    // window[this.__storageType__].setItem(this.__storageKey__ , JSON.stringify(accountInfo)) ;
    window[this.__storageType__].setItem(this.__storageKey__ , JSON.stringify({
      "token":{
        "access":"eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTYzMTc3Njc2MH0.Y-KO0QgWFDZW1zqJsk1xpvgU0EK63fe8ZkayzXwDmn2i61CtEpD8sTFHpRKJxmKUqqYwDPNd-qXWiulT8k8jrQ",
        "refresh":"no_refresh"
      }
    })) ;
  }
  //登录
  login = async(condition:TAccountInfo):Promise<TLoginResult> => {
    //获取登录结果
    const result:TLoginResult = await login(condition) ;
    if(result.status===1){
      //登录成功
      const { token } = result ;
      this.__updateAccountInfo__({...condition,token}) ;
      return result ;
    }else{
      //登录异常
      return result ;
    }
  }
  //登出
  logout = () => {
    window[this.__storageType__].removeItem(this.__storageKey__) ;
  }
}

//实例化auth对象
const theAuth = new Auth({
  storageType:defaultStorageType ,
  storageKey:defaultStorageKey
}) ;

export {
  theAuth
} ;
