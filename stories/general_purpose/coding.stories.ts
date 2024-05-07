import {Meta, StoryObj}     from '@storybook/web-components'
import '../../src/Coding'
import '../../src/Debug'
import {Coding} from '../../src/Coding'


const meta = {
  title: 'Datatypes/General-Purpose/Coding',
  component: 'bkn-coding',

} satisfies Meta<typeof Coding>

export default meta
type Story = StoryObj;

export const Simple: Story = {
  args:{
    data:{
      system: 'http://hl7.org/fhir/sid/icd-10',
      code: 'G44.1',
      display: 'Vascular headache, not elsewhere classified'
    }
  }
  }

export const NothingToDisplay: Story = {
  args:{
    data:{
      system: 'http://hl7.org/fhir/sid/icd-10',
      code: 'G44.1'
    }
  }
}

export const ShowDebug: Story = {
  args:{
    data:{
      id: '123-456',
      extension: [],
      version: '1.0',
      system: 'http://hl7.org/fhir/sid/icd-10',
      code: 'G44.1',
      display: 'Vascular headache, not elsewhere classified'
    },
    debug:true
  }
}
