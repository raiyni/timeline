import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import livereload from 'rollup-plugin-livereload'
import resolve from '@rollup/plugin-node-resolve';
import serve from 'rollup-plugin-serve'
import sizes from 'rollup-plugin-sizes'
import injectProcessEnv from 'rollup-plugin-inject-process-env'
import polyfill from 'rollup-plugin-polyfill'
import getRepoInfo from 'git-repo-info'
import pkg from "./package.json";
import * as fs from 'fs'
import { terser } from "rollup-plugin-terser"

const production = process.env.NODE_ENV == 'production'
const isIe = process.env.BABEL_ENV == 'ie11'

const extensions = [
  '.js', '.jsx', '.ts', '.tsx',
]

const name = 'Timeline'
const git = getRepoInfo()

const polyfills = fs.readdirSync('./src/polyfills').map( file => {
  return fs.readFileSync("./src/polyfills/" + file, "utf8");
}).join("\n")

const plugins = [
  // Allows node_modules resolution
  resolve({ extensions }),

  // Allow bundling cjs modules. Rollup doesn't understand cjs
  commonjs(),
]

if (process.env.BABEL_ENV == 'ie11') {
  plugins.push(polyfill([
    'resize-observer-polyfill',
    'core-js/features/array/flat',
    'core-js/features/array/find',
    'core-js/features/array/from'
  ]))
}

const targets =  [
  "Chrome 90",
  "Edge 90",
  "Firefox 90"
]

if (isIe) {
  targets.push('IE 11')
}


plugins.push(
  injectProcessEnv({
    VERSION: pkg.version,
    SHA: git.abbreviatedSha,
    COMMIT_DATE: git.committerDate,
    TAG: git.tag
  }),

  // Compile TypeScript/JavaScript files
  babel({
    extensions,
    babelHelpers: 'bundled',
    include: ['src/**/*'],
    exclude: ['node_modules/**/*'],
    targets: targets
  }),
  sizes()
)

if (!production) {
  plugins.push(serve())
  plugins.push(livereload())
}

const output = [{
  file: `dist/timeline${isIe ? '.ie' : '' }.js`,
  sourcemap: true,
  format: 'iife',
  banner: isIe ? polyfills : '',
  name,

  // https://rollupjs.org/guide/en/#outputglobals
  globals: {},
}]

if (production) {
  output.push({
    file: `dist/timeline${isIe ? '.ie' : '' }.min.js`,
    sourcemap: true,
    format: 'iife',
    banner: isIe ? polyfills : '',
    name,

    // https://rollupjs.org/guide/en/#outputglobals
    globals: {},
    plugins: [
      terser()
    ]
  })
}

export default {
  input: './src/index.tsx',
  treeshake: true,

  // Specify here external modules which you don't want to include in your bundle (for instance: 'lodash', 'moment' etc.)
  // https://rollupjs.org/guide/en/#external
  external: production ? ["preact/debug"] : [],

  plugins: plugins,

  output: output
};
