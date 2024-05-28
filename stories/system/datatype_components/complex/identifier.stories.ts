import {StoryObj} from '@storybook/web-components'
import '../../../../src/data/complex/Identifier'


const meta = {
  title: 'System/Datatype Components/Complex Type/Identifier',
  component: 'fhir-identifier',
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
export const HospitalPatientIdentifier: Story = {
  args: {
    data: {
      use: 'official',
      system: 'urn:oid:2.16.840.1.113883.16.4.3.2.5',
      value: '123'
    }
  }
}
