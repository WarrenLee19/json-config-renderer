module.exports = (api, targets) => {
  const isTestEnv = api.env('test');

  return {
    babelrc: false,
    ignore: ['./node_modules'],
    presets: [
      [
        '@babel/preset-env',
        {
          loose: true,
          modules: isTestEnv ? 'commonjs' : false,
          targets: isTestEnv ? { node: 'current' } : targets
        }
      ]
    ],
    plugins: [
      [
        '@babel/plugin-transform-react-jsx',
        {
          runtime: 'automatic'
        }
      ],
      ['@babel/plugin-transform-typescript', { isTSX: true }],
      ['@babel/plugin-proposal-decorators', { 'legacy': true }]
    ]
  };
};
