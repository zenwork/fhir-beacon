/** @type { import('@storybook/web-components-vite').StorybookConfig } */
const config = {
    stories:[
        '../src/**/*.mdx',
        '../stories/**/*.mdx',
        '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
        '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'
    ],
    addons:[
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@chromatic-com/storybook',
        '@whitespace/storybook-addon-html'
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
        return config
    }
}
export default config
