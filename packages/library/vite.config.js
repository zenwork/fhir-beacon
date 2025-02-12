import {defineConfig} from 'vite'

export default defineConfig(({mode}) => ({
    build:{
        sourcemap:true,
        lib:{
            name:'fhir-beacon',
            entry:[
                './src/codes',
                './src/internal',
                './src/utilities',
                './src/fhirtypes',
                './src/shell',
                './src/styles',
                './src/components',
                './src/utilities',
                './index.ts'
            ],
            fileName:'fhir-beacon',
            manifest:true,
            formats:['es']
        },
        minify:true,
        terserOptions:{
            compress:{
                drop_console:true,      // Remove all console.* calls (e.g., console.log)
                drop_debugger:true,     // Remove all `debugger` statements
                ecma:2020,              // Optimize code output based on your target ECMAScript version
                passes:3,               // Perform multiple passes for better minification
                keep_fargs:false,       // Drop unused function arguments where safe
                pure_funcs:['console.info', 'console.debug'], // Remove specific functions (optional)
                booleans_as_integers:true // Compress boolean expressions to 0 or 1 when possible
            },
            mangle:{
                properties:false        // Set to `true` to obfuscate property names (optional but more aggressive)
            },
            format:{
                comments:false,         // Remove all comments
                beautify:false          // Do not prettify output; enable for debugging if needed
            },
            toplevel:true,            // Enable top-level scope mangling and minification
            keep_classnames:true,    // Remove class names (set to `true` if needed for debugging)
            keep_fnames:true         // Remove function names for smaller output (use true for better debugging)
        }
        ,
        emptyOutDir:true
    },
    define:{
        'process.env.NODE_ENV':JSON.stringify(mode)
    }
}))
