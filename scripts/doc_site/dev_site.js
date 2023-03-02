const getWebpackCommonConfig = require('./getWebpackCommonConfig');
const path = require("path");
const fs = require("fs");
const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const del = require('del');

const options = new Map();
let mode = '';

let k = '';
let v = '';
let count = 0;

process.argv.forEach((val, index) => {
    if(val === 'build' || val === 'start') {
        return mode = val === 'build' ? 'production' : 'development';
    }

    if(count % 2 === 0) {
        k = val;
    } else {
        v = val;
        options.set(k, v);
    }

    ++count;
})

if(!options.get('-c')) {
    console.error('请指定配置文件！');
    process.exit(-1);
}

const configFile = path.resolve(options.get('-c'));

// 检查配置文件是否存在
if(!fs.existsSync(configFile)) {
    console.error('配置文件不存在！');
    process.exit(-1);
}

const config = require(configFile);

config.mode = mode;

const themeConfigPath = path.resolve(`${config.theme}`);
const outputPath = `${__dirname}\\tmp`;

const themeConfig = require(`${themeConfigPath}/index.js`);

// clean temp
if(fs.existsSync(outputPath)) {
    del.sync([`${outputPath}/**`]);
} else {
    fs.mkdirSync(outputPath);
}

function prepareReact() {
    // copy entry file
    const entryFileContent = fs.readFileSync(`${__dirname}/entry.index.js`);
    const entryContent = entryFileContent.toString().replace(/{{ themePath }}/g, themeConfigPath.replace(/\\/g, '\\\\'));


    //copy routes file
    const routesFileContent = fs.readFileSync(`${__dirname}/routes.index.jsx`);
    const routes = themeConfig.routes;

    let routesContent = routesFileContent.toString();
    routesContent = routesContent.replace(/{{ themePath }}/g, themeConfigPath.replace(/\\/g, '\\\\'));
    routesContent = routesContent.toString().replace(/{{ themeRoutes }}/g, JSON.stringify(routes));

    //copy data file
    const dataFileContent = fs.readFileSync(`${__dirname}/data.js`);

    fs.writeFileSync(`${outputPath}/entry.index.js`, entryContent);
    fs.writeFileSync(`${outputPath}/routes.index.jsx`, routesContent);
    fs.writeFileSync(`${outputPath}/data.js`, routesContent);
}


function start() {
    // 启动webpack
    const webpackConfig = getWebpackCommonConfig(config, themeConfig);
    const devServerOptions = { ...webpackConfig.devServer };
    const compiler = webpack(webpackConfig);
    const server = new WebpackDevServer(compiler, devServerOptions);
    server.start();
}

prepareReact();
start();
