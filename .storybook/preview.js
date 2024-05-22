/** @type { import('@storybook/web-components').Preview } */
const preview = {
    parameters:{
            options:{
                storySort:{
                    method:'alphabetical',
                    order:[
                        'Getting Started',
                        'Web Components',
                        'Shoelace',
                        'FHIR Data Types',
                        'FHIR Resources',
                        'System', ['Atoms',
                                   'Datatype Components', ['Primitive Type', 'Complex Type', 'Special Type', '*'],
                                   'Resource Components', 'Backbones', '*'],
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
