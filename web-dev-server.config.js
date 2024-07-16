import {esbuildPlugin}          from '@web/dev-server-esbuild'
import {fromRollup}             from '@web/dev-server-rollup'
import {importAssertionsPlugin} from 'rollup-plugin-import-assert'

const impAss = fromRollup(importAssertionsPlugin)
// const il = fromRollup(inline)

export default {
    open:true,
    nodeResolve:true,
    'esbuild-target':'auto',
    appIndex:'./demo/index.html',
    rootDir:'.',
    plugins:[
        esbuildPlugin({ts:true, json:true}),
        impAss()

    ]
}
