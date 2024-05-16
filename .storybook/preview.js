/** @type { import('@storybook/web-components').Preview } */
const preview = {
    parameters:{
        parameters:{
            options:{
                storySort:{
                    method:'alphabetical',
                    order:['Documentation', ['introduction', 'Resource Element', 'Customized Markup', '*'], 'Datatypes',
                        ['Primitives', 'Complex', '*'], 'Resources', 'Special', '*']
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
