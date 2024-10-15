import {defineConfig} from 'vite'

export default defineConfig(({mode}) => ({
    build:{
        sourcemap:true,
        lib:{
            name:'fhir-beacon',
            entry:[
                './src/internal',
                './src/utilities',
                './src/codesystems',
                './src/shell',
                './src/styles',
                './src/components'
            ],
            fileName:'fhir-beacon.js',
            manifest:true
        },
        watch:{},
        terserOptions:{},
        emptyOutDir:true
    },
    define:{
        'process.env.NODE_ENV':JSON.stringify(mode)
    }
}))
