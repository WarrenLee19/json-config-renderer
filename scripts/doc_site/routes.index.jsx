const chain = require('ramda/src/chain');
const toReactElement = require('jsonml-to-react-element');
const exist = require('exist.js');
const NotFound = require('{{ themePath }}/template/NotFound');
const React = require('react');

function calcPropsPath(dataPath, params) {
    return typeof dataPath === 'function'
        ? dataPath(params)
        : Object.keys(params).reduce(
            (path, param) => path.replace(`:${param}`, params[param]),
            dataPath,
        );
}

function generateUtils(data, props) {
    const plugins = data.plugins.map(pluginTupple => pluginTupple[0](pluginTupple[1], props));
    const converters = chain(plugin => plugin.converters || [], plugins);
    const utils = {
        get: exist.get,
        toReactComponent(jsonml) {
            return toReactElement(jsonml, converters);
        },
    };
    plugins.map(plugin => plugin.utils || {})
        .forEach(u => Object.assign(utils, u));
    return utils;
}

async function defaultCollector(nextProps) {
    return nextProps;
}

module.exports = function getRoutes(data) {
    function templateWrapper(template, dataPath = '') {
        const Template = require(`{{ themePath }}/template${template.replace(/^\.\/template/, '')}`);
        const nextProps = {
            data: data.markdown,
            picked: data.picked,
            utils: generateUtils(data)
        };
        const Comp = Template.default || Template;
        return <Comp {...nextProps}/>;
    }

    const themeRoutes = JSON.parse('{{ themeRoutes }}');
    const routes = Array.isArray(themeRoutes) ? themeRoutes : [themeRoutes];

    function processRoutes(route) {
        if (Array.isArray(route)) {
            return route.map(processRoutes);
        }

        return Object.assign({}, route, {
            onEnter: () => {
                if (typeof document !== 'undefined') {
                    // NProgress.start();
                }
            },
            element: templateWrapper(route.element, route.path),
            children: route.children && route.children.map(processRoutes),
        });
    }

    const processedRoutes = processRoutes(routes);
    const NotFoundModule = require(`{{ themePath }}/template/NotFound`);
    const NotFound = NotFoundModule.default || NotFoundModule;
    processedRoutes.push({
        path: '*',
        element: <NotFound/>,
    });

    return processedRoutes;
};
