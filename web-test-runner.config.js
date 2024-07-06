import {defaultReporter} from '@web/test-runner'
import {junitReporter}   from '@web/test-runner-junit-reporter'

const filteredLogs = ['Running in dev mode', 'Lit is in dev mode']

export default /** @type {import('@web/test-runner').TestRunnerConfig} */ ({
    /** Test files to run */
    files:'dist/**/*.test.js',

    /** Resolve bare module imports */
    nodeResolve:{
        exportConditions:['browser', 'development']
    },

    /** Filter out lit dev mode logs */
    filterBrowserLogs(log) {
        for (const arg of log.args) {
            if (typeof arg === 'string' && filteredLogs.some(l => arg.includes(l))) {
                return false
            }
        }
        return true
    },

    /** Compile JS for older browsers. Requires @web/dev-server-esbuild plugin */
    esbuildTarget:'auto',

    /** Amount of browsers to run concurrently */
    concurrentBrowsers:2,

    /** Amount of test files per browser to test concurrently */
    concurrency:1,

    // See documentation for all available options

    reporters:[
        // summaryReporter({flatten:false}),
        // use the default reporter only for reporting test progress
        defaultReporter({reportTestResults:false, reportTestProgress:true}),
        // use another reporter to report test results
        junitReporter({
                          outputPath:'./results/test-results.xml', // default `'./test-results.xml'`
                          reportLogs:true // default `false`
                      })
    ]
})
