import {Meta, StoryObj} from '@storybook/web-components'
import {html}           from 'lit'
import {ShellArgs}      from '../../../../stories/wrapInShell'
import {data}           from './address.story.data'


const path = 'Components/Datatypes/Complex Type/Address'

const meta: Meta<ShellArgs> = {
  title: path,
  component: 'fhir-shell',
  subcomponents: { 'fhir-address': 'fhir-address' },
  argTypes: {
    mode: { options: ['display', 'display_summary', 'structure', 'structure_summary', 'debug'], control: { type: 'inline-radio' } },
    verbose: { options: [false, true], control: { type: 'boolean' } },
    showerror: { options: [false, true], control: { type: 'boolean' } },
    open: { options: [false, true], control: { type: 'boolean' } }
  },
  render: ({
             data,
             mode: mode = 'display',
             verbose: verbose,
             showerror: showerror,
             open: open,
             summary: summary
           }: ShellArgs) =>
    html`
        <fhir-shell .mode=${mode} ?verbose=${verbose} ?showerror=${showerror} ?open=${open}>
        <fhir-address .data=${data} ?summary=${summary}}></fhir-address >
      </fhir-shell >
    `
}

export default meta
type Story = StoryObj<ShellArgs>;


export const Display: Story = {
  args: {
    data
  }
}

export const Structure: Story = {
  args: {
    data,
    mode: 'structure',
    showerror: true,
    verbose: true,
    open: true
  }
}
