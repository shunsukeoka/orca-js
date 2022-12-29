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
            name: 'esm',
            file: pkg.module,
            format: 'es',
            sourcemap: 'inline',
        },
        {
            name: 'esm.min',
            file: pkg.module.replace('.js', '.min.js'),
            format: 'es',
            plugins: [terser()],
        },
        {
            name: 'common',
            file: pkg.main,
            format: 'cjs',
            sourcemap: 'inline',
        },
        {
            name: 'common.min',
            file: pkg.main.replace('.js', '.min.js'),
            format: 'cjs',
            plugins: [terser()],
        },
        {
            name: 'umd',
            file: pkg.unpkg,
            format: 'umd',
            sourcemap: 'inline',
        },
        {
            name: 'umd.min',
            file: pkg.unpkg.replace('.js', '.min.js'),
            format: 'umd',
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
