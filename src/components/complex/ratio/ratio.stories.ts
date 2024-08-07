import {StoryObj}               from '@storybook/web-components'
import {html}                   from 'lit'
import {ShellArgs, wrapInShell} from '../../../../stories/wrapInShell'


const render = wrapInShell((args) => html`
    <fhir-ratio .data=${args.data}></fhir-ratio>`)

const meta = {
  title: 'Components/Datatypes/Complex Type/Ratio',
  component: 'fhir-ratio',
  argTypes: {
    mode: { options: ['display', 'display_summary', 'structure', 'structure_summary', 'debug'], control: { type: 'inline-radio' } },
    verbose: { options: [false, true], control: { type: 'boolean' } },
    showerror: { options: [false, true], control: { type: 'boolean' } },
    open: { options: [false, true], control: { type: 'boolean' } }
  }

}

export default meta
type Story = StoryObj<ShellArgs>;

export const SimpleRatio: Story = {
  args: {
    data: {
      numerator: {
        value: '1'
      },
      denominator: {
        value: '128'
      }
    },
    mode: 'display',
    showerror: false,
    verbose: false,
    open: true
  },
  render
}

export const UnitCost: Story = {
  args: {
    data: {
      numerator: {
        value: '103.50',
        unit: 'US$',
        code: 'USD',
        system: 'urn:iso:std:iso:4217'
      },
      denominator: {
        value: '1',
        unit: 'day',
        code: 'day',
        system: 'http://unitsofmeasure.org'
      }
    },
    mode: 'display',
    showerror: false,
    verbose: false,
    open: true
  },
  render
}
