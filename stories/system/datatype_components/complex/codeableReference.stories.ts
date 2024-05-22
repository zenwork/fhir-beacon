import {StoryObj} from '@storybook/web-components'
import '../../../../src/data/complex/CodeableReference'


let title = 'system/Datatype Components/Complex Type/Codeable Reference'
let component = 'fhir-codeable-reference'
let data = {
  concept: {
    coding: [
      {
        system: 'http://hl7.org/fhir/sid/icd-10',
        code: 'R51'
      }, {
        system: 'http://snomed.info/sct',
        code: '25064002',
        display: 'Headache',
        userSelected: 'true'
      }
    ],
    text: 'general headache'
  },
  reference: {
    reference: '/Observation/id1234',
    type: 'Observation',
    display: 'Patient reported Headache'
  }
}
const meta = {
  title,
  component,
  argTypes: {
    mode: {
      options: ['display', 'structure', 'combined'],
      control: {type: 'radio'}
    },
    verbose: {
      options: [true, false],
      control: {type: 'radio'}
    },
    open: {
      options: [true, false],
      control: {type: 'radio'}
    }
  }

}

export default meta
type Story = StoryObj;

export const Headache: Story = {
  args: {
    data,
    mode: 'display',
    verbose: false,
    'showerror': true,
    open: true
  }
}

export const HeadacheVerbose: Story = {
  args: {
    data,
    mode: 'display',
    verbose: true,
    'showerror': true,
    open: true
  }
}

export const Structure: Story = {
  args: {
    data: data,
    mode: 'structure',
    verbose: true,
    'showerror': true,
    open: true
  }
}
