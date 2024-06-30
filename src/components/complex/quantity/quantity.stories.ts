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
    mode: { options: ['display', 'display_summary', 'structure', 'structure_summary', 'debug'], control: { type: 'inline-radio' } },
    verbose: { options: [false, true], control: { type: 'boolean' } },
    showerror: { options: [false, true], control: { type: 'boolean' } },
    open: { options: [false, true], control: { type: 'boolean' } }
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

export const AmountOfPrescribedMedicine2: Story = {
  args: {
    data: {
      value: '3',
      unit: 'capsules',
      system: 'http://snomed.info/sct',
      code: '385049006'
    },
    mode: 'display',
    showerror: false
  },
  render
}

export const Money: Story = {
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

export const Simple: Story = {
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

export const Distance: Story = {
  args: {
    data: {
      value: '100',
      unit: 'kilometers',
      system: 'http://unitsofmeasure.org',
      code: 'km'
    },
    mode: 'structure',
    showerror: true,
    open: true
  },
  render
}
export const Age: Story = {
  args: {
    data: {
      value: '18',
      unit: 'months',
      system: 'http://unitsofmeasure.org',
      code: 'mo'
    },
    mode: 'structure',
    showerror: true,
    open: true
  },
  render
}

export const Duration: Story = {
  args: {
    data: {
      value: '0',
      unit: 'milliseconds',
      system: 'http://unitsofmeasure.org',
      code: 'ms'
    },
    mode: 'structure',
    showerror: true,
    open: true
  },
  render
}

export const Count: Story = {
  args: {
    data: {
      value: '1',
      code: '1'
    },
    mode: 'structure',
    showerror: true,
    open: true
  },
  render
}
