import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
import remarkGfm from 'remark-gfm'

/** @type { import('@storybook/web-components-vite').StorybookConfig } */
const config = {
    stories:[
        '../src/**/*.mdx',
        '../stories/**/*.mdx',
        '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
        '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'
    ],

    staticDirs:['../assets'],

    addons:[
        getAbsolutePath("@storybook/addon-links"),
        getAbsolutePath("@chromatic-com/storybook"),
        getAbsolutePath("@whitespace/storybook-addon-html"),
        {
            name:getAbsolutePath("@storybook/addon-docs"),
            options:{
                mdxPluginOptions:{
                    mdxCompileOptions:{
                        remarkPlugins:[remarkGfm]
                    }
                }
            }
        }
    ],

    framework:{
        name:getAbsolutePath("@storybook/web-components-vite"),
        options:{}
    },

}
export default config

function getAbsolutePath(value) {
    return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}
