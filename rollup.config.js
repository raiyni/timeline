import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import css from "rollup-plugin-import-css";
import livereload from 'rollup-plugin-livereload'
import pkg from './package.json'
import resolve from '@rollup/plugin-node-resolve'
import sass from 'rollup-plugin-sass'
import serve from 'rollup-plugin-serve'

const extensions = ['.js', '.jsx', '.ts', '.tsx']

const name = 'Timeline'

export default {
  input: './src/index.ts',

  // Specify here external modules which you don't want to include in your bundle (for instance: 'lodash', 'moment' etc.)
  // https://rollupjs.org/guide/en#external-e-external
  external: ['d3'],

  plugins: [
    css(),

    sass({
      output: pkg.css
    }),
    // Allows node_modules resolution
    resolve({ extensions }),

    // Allow bundling cjs modules. Rollup doesn't understand cjs
    commonjs(),

    // Compile TypeScript/JavaScript files
    babel({
      extensions,
      include: ['src/**/*'],
      babelHelpers: 'bundled'
    }),
    serve({
      contentBase: ['examples', 'dist'],

    }),
    livereload()
  ],

  output: [
    {
      file: pkg.main,
      format: 'iife',
      name,
      strict: false,

      // https://rollupjs.org/guide/en#output-globals-g-globals
      globals: {
        d3: 'd3'
      }
    }
  ]
}
