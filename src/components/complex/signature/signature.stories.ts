import {Meta, StoryObj}         from '@storybook/web-components'
import {html}                   from 'lit'
import '../../../../index'
import {ShellArgs, wrapInShell} from '../../../../stories/wrapInShell'
import {data}                   from './story.data'

const path = 'Components/Datatypes/Complex Type/Signature'
const elementName = 'fhir-shell'
const subcomponents = { signature: 'fhir-signature' }

const render = wrapInShell((args) => html`
  <fhir-signature .data=${args.data} summary></fhir-signature >`)

const meta: Meta<ShellArgs> = {
  title: path,
  component: elementName,
  subcomponents,
  argTypes: {
    mode: { options: ['display', 'display_summary', 'structure', 'structure_summary', 'debug'], control: { type: 'inline-radio' } },
    verbose: {options: [true, false], control: {type: 'inline-radio'}},
    showerror: {options: [true, false], control: {type: 'inline-radio'}},
    open: {options: [true, false], control: {type: 'inline-radio'}}
  }
}

export default meta
type Story = StoryObj<ShellArgs>;

export const Display: Story = {
  args: {
    data,
    mode: 'display',
    showerror: false,
    verbose: false,
    open: true
  },
  render
}

export const Structure: Story = {
  args: {
    data,
    mode: 'structure',
    showerror: true,
    verbose: true,
    open: true
  },
  render
}
