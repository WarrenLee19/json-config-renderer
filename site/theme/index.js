const React = require("react");
const homeTmpl = './template/Home/index';
const contentTmpl = './template/Content/index';
const resourcesTmpl = './template/Resources/index';
const markdownTmpl = './template/Markdown/index';
const aboutTmpl = './template/About/index';

// 基于react-router-v6
module.exports = {
    routes: {
        path: '/',
        element: './template/Layout/index',
        children: [
            {
                index: true,
                element: homeTmpl,
            },
            {
                path: '/docs/components',
                element: contentTmpl,
                children: [
                    {
                        index: true,
                        element: markdownTmpl,
                    },
                    {
                        path: '/docs/components/:component',
                        element: markdownTmpl,
                    },
                ]
            },
            {
                path: '/docs/resources',
                element: resourcesTmpl,
            },
            {
                path: '/about',
                element: aboutTmpl,
            },
        ],
    },
    pick: {
        components(markdownData) {
            const { filename } = markdownData.meta;
            if (!/component/.test(filename)) {
                return null;
            }
            return {
                meta: markdownData.meta,
            };
        },
        changelog(markdownData) {
            if (/resource/.test(markdownData.meta.filename)) {
                return {
                    meta: markdownData.meta,
                };
            }
            return null;
        },
    }
};
