import path from 'path';
import babelPlugin from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';
import esbuild from 'rollup-plugin-esbuild';
import scss from 'rollup-plugin-scss';
import postcss from 'rollup-plugin-postcss';

const createBabelConfig = require('./babel.config');

const extensions = ['.ts', '.tsx'];
const { root } = path.parse(process.cwd());

function external(id) {
  return !id.startsWith('.') && !id.startsWith(root);
}

function getBabelOptions(targets) {
  return {
    ...createBabelConfig({ env: (env) => env === 'build' }, targets),
    extensions,
    comments: false,
    babelHelpers: 'bundled'
  };
}

function getEsbuild(target, env = 'development') {
  return esbuild({
    minify: env === 'production',
    target,
    tsconfig: path.resolve('./tsconfig.json')
  });
}

function createDeclarationConfig(input, output) {
  return {
    input,
    output: {
      dir: output
    },
    external,
    plugins: [
      typescript({
        declaration: true,
        emitDeclarationOnly: true,
        outDir: output
      }),
      scss({ output: false })
    ]
  };
}

function createESMConfig(input, output) {
  return {
    input,
    output: [
      { file: `${output}.js`, format: 'esm' },
      { file: `${output}.mjs`, format: 'esm' }
    ],
    external,
    plugins: [
      resolve({ extensions }),
      replace({
        __DEV__: '(import.meta.env&&import.meta.env.MODE)!=="production"',
        // a workround for #829
        'use-sync-external-store/shim/with-selector':
          'use-sync-external-store/shim/with-selector.js',
        preventAssignment: true
      }),
      getEsbuild('es2020')
    ]
  };
}

function createCommonJSConfig(input, output) {
  return {
    input,
    output: { file: `${output}.js`, format: 'cjs', exports: 'named' },
    external,
    plugins: [
      resolve({ extensions }),
      replace({
        __DEV__: 'process.env.NODE_ENV!=="production"',
        preventAssignment: true
      }),
      babelPlugin(getBabelOptions())
    ]
  };
}

function createSCSSConfig() {
  return {
    input: 'src/styles/index.scss',
    output: {
      file: 'dist/style.css',
      format: 'es'
    },
    plugins: [
      postcss({
        modules: false,
        extract: true
      })
    ]
  };
}

export default function() {
  let c = 'index';
  return [
    createSCSSConfig(),
    ...(c === 'index' ? [createDeclarationConfig(`src/${c}.ts`, 'dist')] : []),
    createCommonJSConfig(`src/${c}.ts`, `dist/${c}`),
    createESMConfig(`src/${c}.ts`, `dist/esm/${c}`)
  ];
}
