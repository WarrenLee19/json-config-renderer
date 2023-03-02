//左侧菜单
import React from 'react' ;
import { Menu } from 'apusic-ui' ;

const { SubMenu } = Menu ;

interface TProps {
  readonly menuConfig:any[]|null ;
  activedKey:string;
  redirectTo:(path:string,key?: string|undefined)=>void;
}

const LeftMenu = (props:TProps) => {
  const {
    activedKey ,
    menuConfig ,
    redirectTo ,
  } = props ;

  function handleSelect(item: any){
    const path = `/platform/${item.key}` ;
    redirectTo(path,item.key) ;
  }

  const getMenus = (list: any) =>{
    return list.map((item: any)=>{
      if(item.children){
        return(
            // @ts-ignore
          <SubMenu
              key={item.path}
              icon={item.icon ? React.createElement(item.icon):null}
              title={<span style={{paddingLeft:'10px',fontSize:14}} >{item.title}</span>}
          >
            {getMenus(item.children)}
          </SubMenu>
        )
      }else{
        return (
            <Menu.Item key={item.path} icon={item.icon ? React.createElement(item.icon):null} onClick={handleSelect}>
                {<span style={{fontSize:14}}>{item.title}</span>}
            </Menu.Item>
        );
      }
    })
  }

  if(menuConfig===null){
    return (
      <>loading...</>
    );
  } else
  return (
      <Menu
          defaultSelectedKeys={[activedKey]}
          defaultOpenKeys={["lowcode-manage"]}
          mode="inline"
          // theme="dark"
          // inlineCollapsed={collapsed}
          // defaultOpenKeys={
          //   menuConfig.map(({key})=>key)
          // }
      >
        { menuConfig && menuConfig.length>0 && getMenus(menuConfig) }
      </Menu>
  )

}

export default LeftMenu ;
