import {Meta, StoryObj}                   from '@storybook/web-components'
import {html}                             from 'lit'
import {renderTemplateInShell, ShellArgs} from '../../../../stories/storybook-utils'
import {data}                             from './address.story.data'


const path = 'Components/Datatypes/Complex Type/Address'

const meta: Meta<ShellArgs> = {
  title: path,
  component: 'fhir-shell',
  subcomponents: { 'fhir-address': 'fhir-address' },
  ...renderTemplateInShell((args: ShellArgs) => html`
      <fhir-address .data=${args.data} summary></fhir-address >
  `)
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
    open: true,
    input: false
  }
}
