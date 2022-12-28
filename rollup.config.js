import pluginTypescript from '@rollup/plugin-typescript'
import pluginNodeResolve from '@rollup/plugin-node-resolve'
import { terser as pluginTerser, terser } from 'rollup-plugin-terser'
import pluginCommonjs from '@rollup/plugin-commonjs'
import { readFile } from 'fs/promises'

const pkg = JSON.parse(await readFile(new URL('./package.json', import.meta.url)))

export default {
    input: 'src/index.ts',
    output: [
        {
            name: 'index.js',
            file: pkg.browser,
            format: 'iife',
            sourcemap: 'inline',
        },
        {
            name: 'index.js',
            file: pkg.browser.replace('.js', '.min.js'),
            format: 'iife',
            plugins: [terser()],
        },
    ],
    plugins: [
        pluginTypescript({
            exclude: ['**/*.test.ts', 'node_modules'],
        }),
        pluginCommonjs({
            extensions: ['.js', '.ts'],
        }),
        pluginNodeResolve({
            browser: true,
        }),
    ],
}
