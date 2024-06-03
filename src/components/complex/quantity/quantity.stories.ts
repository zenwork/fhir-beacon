import {StoryObj}               from '@storybook/web-components'
import './quantity'
import '../../../utilities/debug/debug'
import '../../primitive/primitive'
import {html}                   from 'lit'
import {ShellArgs, wrapInShell} from '../../../../stories/wrapInShell'
import '../../../../index'


const render = wrapInShell((args) => html`
    <fhir-quantity .data=${args.data}></fhir-quantity>`)

const meta = {
  title: 'Components/Datatypes/Complex Type/Quantity',
  component: 'fhir-quantity',
  argTypes: {
    mode: {
      options: ['display', 'structure', 'combined'],
      control: {type: 'radio'},
    },
    verbose: {
      options: [true, false],
      control: {type: 'radio'},
    },
    showerror: {
      options: [true, false],
      control: {type: 'radio'},
    },
  }

}

export default meta
type Story = StoryObj<ShellArgs>;

export const DisplayableTime: Story = {
  args: {
    data: {
      value: '25',
      unit: 'sec',
      system: 'http://unitsofmeasure.org',
      code: 's'
    },
    mode: 'display',
    showerror: false
  },
  render
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
    showerror: false
  },
  render
}

export const MoneyQuantity: Story = {
  args: {
    data: {
      value: '100',
      unit: 'US$',
      system: 'urn:iso:std:iso:4217',
      code: 'USD'
    },
    mode: 'display',
    showerror: false
  },
  render
}

export const SimpleQuantity: Story = {
  args: {
    data: {
      value: '1'
    },
    mode: 'display',
    showerror: false
  },
  render
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
    showerror: true,
    open: true
  },
  render
}
