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
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@chromatic-com/storybook',
        '@whitespace/storybook-addon-html',
        {
            name:'@storybook/addon-docs',
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
        name:'@storybook/web-components-vite',
        options:{}
    },
    docs:{
        autodocs:'tag'
    },
    webpackFinal:async (config) => {
        config.devtool = 'source-map' // This line enables source maps
        // eslint-disable-next-line no-undef
        config.output.publicPath = process.env.BASE_URL || '/'
        return config
    }
}
export default config
