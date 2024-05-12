/** @type { import('@storybook/web-components').Preview } */
const preview = {
    parameters:{
        parameters:{
            options:{
                storySort:{
                    order:['Datatypes', ['Primitives', 'Complex'], 'Resources']
                }
            }
        },
        controls:{
            matchers:{
                color:/(background|color)$/i,
                date:/Date$/i
            }
        }
    }
}

export default preview
