import {customElementJetBrainsPlugin} from 'custom-element-jet-brains-integration'
import { cemInheritancePlugin } from "@wc-toolkit/cem-inheritance"

const options = {

    outdir:'.',
    webTypesFileName:'./build/web-types.json'
}

export default {
    globs:['src/components/primitive/primitive.ts'],
    exclude:['node_modules/**/*','**/*.spec.ts','**/*.test.ts','**/*.stories.ts'],
    outdir:'build',
    dev:false,
    watch:false,
    dependencies:true,
    litelement:true,
    plugins:[
        customElementJetBrainsPlugin(options),
        cemInheritancePlugin({})
    ]
}
