// app中的通用头部
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Dropdown, Menu, Modal } from 'apusic-ui';

interface TProps {
  children?: any;
  logo?: any;
}

export const AppHeader = (props: TProps) => {
  const navigate = useNavigate();
  const { children, logo } = props;
  function logout(e: any) {
    //登出
    e.preventDefault();
    Modal.confirm({
      title: '提示',
      content: '确认退出登录?',
      onOk: () => {
        navigate('/login');
      },
      onCancel() {}
    });
  }
  function preventEventDefault(e: any) {
    e.preventDefault();
  }

  return (
    <div className={'app-header'}>
      <div className={'app-header-left'}>
        <span className={'app-header-icon'}>
          <img height="30px" src={logo} alt="logo" />
        </span>
        <Link to={'/'} className={'app-header-title'}>
          JSON转换器
        </Link>
      </div>
      {children}
      <div className={'app-header-right'}>
        <Link to={'/app'}>管控台</Link>
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item>
                <a rel="logout" href="/" onClick={logout}>
                  登出
                </a>
              </Menu.Item>
            </Menu>
          }
        >
          <a href="/" onClick={preventEventDefault}>
            当前用户
          </a>
        </Dropdown>
      </div>
    </div>
  );
};

export default AppHeader;
