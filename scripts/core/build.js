const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const appDir = process.cwd();

module.exports = {
    mode: 'production',
    entry: {
        index: path.resolve(appDir, './src/index.ts'),
    },
    output: {
        filename: '[name].js',
        path: path.resolve(appDir, './dist'),
        library: {
            type: 'module'
        },
        clean: true
    },
    experiments: {
        outputModule: true,
    },
    module: {
        rules: [
            {
                test: /.(js|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.(png|svg|gif|jpe?g)$/,
                //设置资源目录
                type: 'asset',
                generator: {
                    filename: "img/[name].[hash:4][ext]",
                },
                parser: {
                    dataUrlCondition: {
                        maxSize: 30 * 1024
                    }
                }
            },
            {
                test: /.(scss|css)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            modules: false
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'cloud-flow.css'
        })
    ],
    resolve: {
        extensions: ['.js', '.ts', '.jsx', '.tsx']
    }
};
