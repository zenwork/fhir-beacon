import {StoryObj} from '@storybook/web-components'
import '../../src/data/general_purpose/Quantity'
import '../../src/util/Debug'
import '../../src/data/Primitve'


const meta = {
  title: 'Datatypes/General-Purpose/Quantity',
  component: 'bkn-quantity',
  argTypes: {
    mode: {
      options: ['display', 'structure', 'combined'],
      control: {type: 'radio'},
    },
  },

}

export default meta
type Story = StoryObj;

export const DisplayableTime: Story = {
  args: {
    data: {
      value: '25',
      unit: 'sec',
      system: 'http://unitsofmeasure.org',
      code: 's'
    },
    mode: 'display',
    showError: false
  }
}

export const ShowStructWithErrors: Story = {
  args: {
    data: {
      value: 'abc',
      unit: 'sec',
      system: 'http://unitsofmeasure.org',
      code: 's'
    },
    mode: 'structure',
    showError: true
  },
}

export const AmountOfPrescribedMedicine: Story = {
  args: {
    data: {
      value: '40000',
      comparator: '&gt;',
      unit: 'ug/L',
      system: 'http://unitsofmeasure.org',
      code: 'ug'
    },
    mode: 'display',
    showError: false
  },

}
