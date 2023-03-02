import logoImg from './images/login-logo.png' ;

const MockPrefixIcon = ()=>(<img src={logoImg} alt="img" height="20px" width="20px"/>);

const config = {
    type: 'form',
    columnCount: 1,
    body: [
        {
            type: "input-name",
            name: "username",
            rules: [
                {
                    required: true,
                    message: '服务名称不能为空',
                },
                {
                    max: 10,
                    message: '服务名称不能超过10个字符',
                },
            ],
            placeholder: '用户名',
            prefix: <MockPrefixIcon/>
        },
        {
            type: "input-password",
            name: "password",
            rules: [
                {
                    required: true,
                    message: '服务名称不能为空',
                },
                {
                    max: 10,
                    message: '服务名称不能超过10个字符',
                },
            ],
            placeholder: '密码',
            prefix: <MockPrefixIcon/>
        },
    ],
    debug: true
};


export default config;
