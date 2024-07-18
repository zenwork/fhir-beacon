import '../index'

/** @type { import('@storybook/web-components').Preview } */
const preview = {
    parameters:{
        layout:'centered',
        options:{
            storySort:{
                method:'alphabetical',
                order:[
                    'Getting Started', ['Home', 'Installation', 'Usage', 'Customization'],
                    'Components', ['Datatypes', ['Primitive Type', 'Complex Type', 'Special Type', '*'], 'Resources', '*'],
                    'Toolkit', ['Primitive Elements', ['Primitive Element', '*'], '*'],
                    'Use Cases', ['Static HTML', 'Frameworks', 'Modelling & Tracing', '*'],
                    '*'
                ]
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

export default preview
