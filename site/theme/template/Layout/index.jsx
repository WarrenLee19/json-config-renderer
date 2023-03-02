import React, {createContext, useState} from 'react';
import { Layout, Menu } from 'apusic-ui';
import 'apusic-ui/dist/bellejs.min.css';
const { Header, Content, Footer } = Layout;
import { Outlet, useNavigate } from "react-router-dom";
import './index.scss';

const layoutContent = createContext({
   data: {

   }
});

export default function Home(props) {
    const navigate = useNavigate();
    const [selectedKeys, setSelectKeys] = useState('/');

    function handleVisit(menuMeta) {
        navigate(`${menuMeta.key}`);
        setSelectKeys(menuMeta.key);
    }

    return (
        <Layout className="layout">
            <Header>
                <div className="logo" onClick={() => {
                    navigate('/');
                }}>react-json-renderer</div>
                <div className="header-menu">
                    <Menu theme="dark" mode="horizontal" selectedKeys={[selectedKeys]} onClick={handleVisit}>
                        <Menu.Item key="/">首页</Menu.Item>
                        <Menu.Item key="/design">设计</Menu.Item>
                        <Menu.Item key="/docs/components/Overview">文档</Menu.Item>
                        <Menu.Item key="/about">关于</Menu.Item>
                    </Menu>
                </div>
            </Header>
            <Content>
                <div className="site-layout-content">
                    {props.children ? props.children : <Outlet/>}
                </div>
            </Content>
        </Layout>
    );
}
