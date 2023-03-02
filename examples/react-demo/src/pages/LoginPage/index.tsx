import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Col, Row } from 'apusic-ui';
import bgImg from './form/images/login-background.png';
import logoImg from './form/images/login-logo.png';
import LoginForm from './form';
import './login.css';
import { useRequest } from 'cloud-flow';

interface TProps {

}

//登录页
const LoginPage = (props: TProps): JSX.Element => {
  const navigate = useNavigate();
  const { axiosInstance } = useRequest();

  async function handleLogin(values: any) {
    // const res = await axiosInstance({
    //   url: '/login',
    //   params: {
    //     username: 'apusic',
    //     password: 'password'
    //   }
    // });
    // console.log(res);
    navigate("/platform/overview") ;
  }

  return (
    <div className="login-page">
      <div className="login-title">
        <img src={logoImg} alt="login-logo" height="30px" />
        <div className="login-title-text">
          Belle React Cli Demo
        </div>
      </div>
      <div className="login-box">
        <Row>
          <Col span={12}>
            <img src={bgImg} alt="login bg" style={{ height: 300 }} />
          </Col>
          <Col span={12}>
            <div className="user-info-box user-info-box-usually">
              <h2 className="user-info-title">用户登录</h2>
              <LoginForm />
              <div>
                <Button type="primary" htmlType="submit" size="large" onClick={handleLogin}>
                  登录
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <div className="copy-right">© 2000-2035 Belle React App 版权所有</div>
    </div>
  );
};

export default LoginPage;
