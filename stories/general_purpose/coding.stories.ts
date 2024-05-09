import {StoryObj} from '@storybook/web-components'
import '../../src/data/general_purpose/Coding'
import '../../src/util/Debug'
import '../../src/data/Primitve'


const meta = {
  title: 'Datatypes/General-Purpose/Coding',
  component: 'bkn-coding',
  argTypes: {
    mode: {
      options: ['display', 'structure', 'combined'],
      control: {type: 'radio'},
    },
  },

}

export default meta
type Story = StoryObj;

export const DisplayableValue: Story = {
  args:{
    data:{
      system: 'http://hl7.org/fhir/sid/icd-10',
      code: 'G44.1',
      display: 'Vascular headache, not elsewhere classified'
    }
  }
  }

export const NoDisplayableValue: Story = {
  args:{
    data:{
      system: 'http://hl7.org/fhir/sid/icd-10',
      code: 'G44.1'
    }
  }
}

export const ShowStructure: Story = {
  args:{
    data:{
      id: '123-456',
      extension: [],
      version: '1.0',
      system: 'http://hl7.org/fhir/sid/icd-10',
      code: 'G44.1',
      display: 'Vascular headache, not elsewhere classified'
    },
    mode: 'structure',
    showError: true
  }

}

export const ShowStructureWithErrors: Story = {
  args: {
    data: {
      id: '123-456',
      extension: [],
      version: '1.0',
      system: 'hl7.org/fhir/sid/icd-10',
      code: 'not a valid code',
      display: 'Vascular headache, not elsewhere classified'
    },
    mode: 'combined',
    showError: true
  }
}
