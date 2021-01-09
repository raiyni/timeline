import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import css from 'rollup-plugin-import-css'
import livereload from 'rollup-plugin-livereload'
import pkg from './package.json'
import resolve from '@rollup/plugin-node-resolve'
import sass from 'rollup-plugin-sass'
import serve from 'rollup-plugin-serve'
import sizes from 'rollup-plugin-sizes'
import { terser } from 'rollup-plugin-terser'

const extensions = ['.js', '.jsx', '.ts', '.tsx']

const name = 'Timeline'

export default (args) => {
  const watch = args.watch || false

  const plugins = [
    css(),

    sass({
      output: pkg.css
    }),
    // Allows node_modules resolution
    resolve({ extensions }),

    // Allow bundling cjs modules. Rollup doesn't understand cjs
    commonjs(),

    sizes(),

    // Compile TypeScript/JavaScript files
    babel({
      extensions,
      include: ['src/**/*'],
      babelHelpers: 'bundled'
    })
  ]

  const output = [
    {
      file: 'dist/timeline.js',
      format: 'iife',
      name,
      strict: false,
      sourcemap: true,

      // https://rollupjs.org/guide/en#output-globals-g-globals
      globals: {
        d3: 'd3'
      }
    }
  ]

  if (watch) {
    plugins.push(
      serve({
        contentBase: ['examples', 'dist']
      })
    )
    plugins.push(livereload())
  }

  if (!watch) {
    output.push({
      file: 'dist/timeline.min.js',
      format: 'iife',
      name,
      strict: false,
      sourcemap: true,

      // https://rollupjs.org/guide/en#output-globals-g-globals
      globals: {
        d3: 'd3'
      },
      plugins: [
        terser()
      ]
    })
  }

  return {
    input: './src/index.ts',

    // Specify here external modules which you don't want to include in your bundle (for instance: 'lodash', 'moment' etc.)
    // https://rollupjs.org/guide/en#external-e-external
    external: ['d3'],

    plugins: plugins,

    output: output
  }
}
