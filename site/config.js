const path = require('path');

module.exports = {
    source: {
        'components': './docs/components',
        'resources': './docs/resources'
    },
    theme: './site/theme',
    htmlTemplate: './site/theme/static/template.html',
    webpackConfig(config) {
        if (process.env.ESBUILD) {
            // use esbuild
           /* config.plugins.push(new ESBuildPlugin());
            config.optimization.minimizer = [
                new ESBuildMinifyPlugin({
                    target: 'es2015',
                }),
                new CssMinimizerPlugin(),
            ];*/
        }
        return config;
    },
    devServerConfig: {},
    filePathMapper(filePath) {
        return filePath;
    }
};
