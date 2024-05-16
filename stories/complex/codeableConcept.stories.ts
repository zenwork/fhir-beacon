import {StoryObj} from '@storybook/web-components'
import '../../src/data/complex/CodeableConcept'


const meta = {
  title: 'Datatypes/Complex/Codeable Concept',
  component: 'fhir-codeable-concept',
  argTypes: {
    mode: {
      options: ['display', 'structure', 'combined'],
      control: {type: 'radio'},
    },
    verbose: {
      options: [true, false],
      control: {type: 'radio'},
    },
  }

}

export default meta
type Story = StoryObj;

export const SimpleHeadacheCode: Story = {
  args: {
    data: {
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
    }
  }
}
