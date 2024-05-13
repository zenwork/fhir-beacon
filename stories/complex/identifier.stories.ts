import {StoryObj} from '@storybook/web-components'
import '../../src/data/complex/Identifier'


const meta = {
  title: 'Datatypes/Complex/Identifier',
  component: 'fhir-identifier',
  argTypes: {
    mode: {
      options: ['display', 'structure', 'combined'],
      control: {type: 'radio'},
    },
  },

}

export default meta
type Story = StoryObj;

export const PatientIdentifier: Story = {
  args: {
    data: {
      use: 'official',
      system: 'http://www.acmehosp.com/patients',
      value: '44552',
      period: {
        start: '2003-05-03'
      }
    }
  }
}
