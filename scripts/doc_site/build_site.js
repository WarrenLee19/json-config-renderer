const getWebpackCommonConfig = require('./getWebpackCommonConfig');
const path = require("path");
const fs = require("fs");
const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const sourceData = require('./utils/source-data');
const markdownTransformer = path.join(__dirname, 'build', 'transformers', 'markdown');
const generateFilesPath = require('./utils/generate-files-path');
const mkdirp = require('mkdirp');
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
const outputPath = `${__dirname}/tmp`;

// clean temp

if(fs.existsSync(outputPath)) {
    del.sync([`${outputPath}/**`]);
}

mkdirp(outputPath);

function prepareReact() {
    // copy entry file
    const entryFileContent = fs.readFileSync(`${__dirname}/entry.index.js`);
    const entryContent = entryFileContent.toString().replace(/{{ themePath }}/g, config.theme);


    //copy routes file
    const routesFileContent = fs.readFileSync(`${__dirname}/routes.index.js`);
    const themeConfig = require(`${themeConfigPath}/index.js`);
    const routes = themeConfig.routes;

    let routesContent = routesFileContent.toString();
    routesContent = routesContent.replace(/{{ themePath }}/g, config.theme);
    routesContent = routesFileContent.toString().replace(/{{ themeRoutes }}/g, JSON.stringify(routes));

    //copy data file
    /*

     const dataFileContent = fs.readFileSync(`${__dirname}/data.js`);*/
    fs.writeFileSync(`${outputPath}/entry.index.js`, entryContent);
    fs.writeFileSync(`${outputPath}/routes.index.js`, routesContent);
}

function prepareMd() {
    // 编译md
    const transformers = [
        {
            test: /\.md$/,
            use: markdownTransformer
        }
    ];
    const markdown = sourceData.generate(config.source, transformers);

    const routesFileContent = fs.readFileSync(`${__dirname}/routes.index.js`);
    const themeConfig = require(`${themeConfigPath}/index.js`);
    const routes = themeConfig.routes;

    let filesNeedCreated = generateFilesPath(routes, markdown).map(config.filePathMapper);

    require('./loaders/common/boss').jobDone();

    filesNeedCreated.forEach((file) => {
        const output = path.join(config.output || './tmp', file);
        console.log('Creating: ', output);
        mkdirp.sync(path.dirname(output));
        fs.writeFileSync(output, '');
        console.log('Created: ', output);
    });
}


function start() {
    // 启动webpack
    const webpackConfig = getWebpackCommonConfig(config);
    const devServerOptions = { ...webpackConfig.devServer, open: true };
    const compiler = webpack(webpackConfig);
    const server = new WebpackDevServer(compiler, devServerOptions);
    server.startCallback(() => {
        console.log("Starting server on http://localhost:8080");
    });

}

prepareReact();
prepareMd();
