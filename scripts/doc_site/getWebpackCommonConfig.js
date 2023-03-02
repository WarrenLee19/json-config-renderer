const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const os = require('os');
const getBabelCommonConfig = require('./getBabelCommonConfig');
const markdownTransformer = require('./transformers/markdown');

/**
 * 基于主题找到react入口文件然后生成入口地址
 * 默认为主题目录下的index.js
 */
function generateEntry(siteConfig) {
    if(!siteConfig.theme && typeof siteConfig.theme !== 'string') {
        console.error('请输入模板地址!');
        process.exit(-1);
    }

    //TODO:: 暂时先固定入口文件位置
    const templateDirPath = path.resolve(`${__dirname}/tmp/entry.index.js`);
    return templateDirPath;
}

/**
 * 生成webpack配置
 * @param siteConfig
 */
function getWebpackCommonConfig(siteConfig = {}, themeConfig = {}) {
    global.siteConfig = {
        ...siteConfig,
        transformers: [{
            test: /\.(md)/,
            exclude: /node_modules/,
            use: markdownTransformer
        }]
    };
    global.themeConfig = {
        ...themeConfig,
        plugins: []
    };


    const config = {
        mode: siteConfig.mode,
        entry: {
            index: generateEntry(siteConfig),
        },
        output: {
            path: path.resolve(__dirname, './dist'),
            filename: '[name].js',
            clean: true,
            publicPath: '/'
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx|ts|tsx)$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    options: getBabelCommonConfig()
                },
                {
                    test: /\.(scss|css)$/,
                    use: [
                        'style-loader',
                        'css-loader',
                        'sass-loader'
                    ]
                },
                {
                    test: /\.(png|gif|jpeg|jpg)/,
                    exclude: /node_modules/,
                    use: [{
                        loader: 'url-loader'
                    }]
                },
                {
                    test: function(filename) {
                        return filename === path.resolve(__dirname, 'tmp', 'data.js');
                    },
                    use: [{
                        loader: path.resolve(`${__dirname}/loaders/data-loader.js`),
                        options: {
                            siteConfig
                        }
                    }]
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: path.resolve(siteConfig.htmlTemplate),
            })
        ],
        resolve: {
            extensions: ['.js', '.ts', '.jsx', '.tsx']
        },
        devServer: {
            hot: true,
            historyApiFallback: true,
            port: 8001,
            host: '127.0.0.1',
            open: true,
            ...siteConfig.devServerConfig
        },
        devtool: 'eval-source-map',
        stats: {
            children: true,
            errorDetails: true
        }
    }

    if(siteConfig.webpackConfig && typeof siteConfig.webpackConfig === 'function') {
        siteConfig.webpackConfig(config);
    }

    return config;
}

module.exports = getWebpackCommonConfig;

