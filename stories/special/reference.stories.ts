import {StoryObj} from '@storybook/web-components'
import '../../src/special/Reference'


const meta = {
  title: 'Special/Reference',
  component: 'fhir-reference',
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

export const ValueAndReference: Story = {
  args: {
    data: {
      reference: 'http://someserver/some-path',
      type: 'Patient',
      display: 'Jack Smith'
    },
    mode: 'display',
    showError: false,
  }
}

export const Reference: Story = {
  args: {
    data: {
      reference: 'http://fhir.hl7.org/svc/StructureDefinition/c8973a22-2b5b-4e76-9c66-00639c99e61b'
    },
    mode: 'display',
    showError: false,
  }
}

export const Identifier: Story = {
  args: {
    data: {
      identifier:
        {
          system: 'http://hl7.org/fhir/sid/us-ssn',
          value: '000111111'
        }
    },
    mode: 'display',
    showError: false,
  }
}
