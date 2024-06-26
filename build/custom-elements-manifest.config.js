import {customElementJetBrainsPlugin} from 'custom-element-jet-brains-integration'

const options = {

    outdir:'.',
    webTypesFileName:'./build/web-types.json'
}

export default {
    globs:['src/**/*.ts'],
    outdir:'build',
    dev:true,
    watch:false,
    dependencies:true,
    litelement:true,
    plugins:[
        customElementJetBrainsPlugin(options)
    ]
}
