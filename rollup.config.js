import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import livereload from 'rollup-plugin-livereload'
import resolve from '@rollup/plugin-node-resolve';
import serve from 'rollup-plugin-serve'
import sizes from 'rollup-plugin-sizes'
import injectProcessEnv from 'rollup-plugin-inject-process-env'
import getRepoInfo from 'git-repo-info'
import pkg from "./package.json";

const production = !!process.env.production

const extensions = [
  '.js', '.jsx', '.ts', '.tsx',
];

const name = 'Timeline';

const git = getRepoInfo();

const plugins = [
  // Allows node_modules resolution
  resolve({ extensions }),

  // Allow bundling cjs modules. Rollup doesn't understand cjs
  commonjs(),

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
    exclude: ['node_modules/**/*']
  }),
  sizes()
]

if (!production) {
  plugins.push(serve({
      contentBase: ['examples/live', 'examples']
    }))
  plugins.push(livereload())
}

export default {
  input: './src/index.tsx',
  treeshake: true,

  // Specify here external modules which you don't want to include in your bundle (for instance: 'lodash', 'moment' etc.)
  // https://rollupjs.org/guide/en/#external
  external: [],

  plugins: plugins,

  output: [{
    file: 'examples/timeline.js',
    sourcemap: true,
    format: 'iife',
    name,

    // https://rollupjs.org/guide/en/#outputglobals
    globals: {},
  }]
};
