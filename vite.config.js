import {defineConfig} from 'vite'

export default defineConfig({
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
                                }
                            })
