import {useEffect, useState} from 'react';
import { AppHeader } from 'cloud-flow';
import {Route, Routes, useLocation, useNavigate, useParams} from 'react-router-dom';
import {Button, Layout, Spin } from 'apusic-ui';
import routerData from "../routeData";
import ErrorPage from "../ErrorPage";
import LeftMenu from './LeftMenu';
import ControlPage from "../ControlPage";
import mockMenu from '../../mock/mockMenuConfig' ;

import './styles.scss';

const { Content, Sider } = Layout;

interface TMatch {
  params: {
    subPagePathName:string
  } ;
}

interface TProps {
  match?: TMatch;
  menuState?: {
    menuConfig:any[] ;
    isFetching:boolean ;
  }; //来自container.reducer
}

//管控页(登录后进入此页)
const HomePage = (props: TProps):JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const [collapsed,setCollapsed] = useState(false);
  const [activedKey,setActivedKey] = useState<any>('');

  useEffect( ()=>{
    console.log('=HomePage=',props,location);
    setActivedKey( params['*']);
  },[])

  function onCollapse () {
    setCollapsed(!collapsed)
  }

  function redirectTo (path:string,key:string|undefined):void {
    setActivedKey(key);
    navigate(path) ;
  }

  return (
      <Layout style={{position:'relative'}}>
        <AppHeader logo={"/logo512.png"}/>
        <Layout style={{height: 'calc(100vh - 50px)',overflow:'auto'}}>
          <Sider
              className={'cf-sider'}
              theme="light"
              collapsible
              collapsed={collapsed}
              onCollapse={onCollapse}
          >
             <div className={'cf-sider-action'}>
               <Button className={'sider-top-btn'} type={"primary"} onClick={() => navigate('/platform/visual')}>可视化</Button>
             </div>
             <LeftMenu
               menuConfig={mockMenu}
               activedKey={activedKey} //activedSubPagePathName
               redirectTo={redirectTo}
             />
          </Sider>
          <Layout>
            <Content style={{ margin: '0 0',background:'#f8f9fa' }}>
              <div style={{ padding: 0,height: '100%' }} >
                  <Routes>
                    {routerData.length>0 && routerData.map((router:any, idx:number)=>{
                      if(router.element) {
                        return <Route key={idx} path={router.path} element={router.element}/>
                      }
                      return null;
                    })}
                    <Route path={'*'} element={<ControlPage pageKey={activedKey}/>}/>
                  </Routes>
              </div>
            </Content>
          </Layout>
        </Layout>
      </Layout>
  ) ;
}

export default HomePage;
