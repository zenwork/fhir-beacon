import {Meta, StoryObj}                   from '@storybook/web-components'
import {html}                             from 'lit'
import {renderTemplateInShell, ShellArgs} from '../../../../stories/storybook-utils'

import {data} from './story.data'

const path = 'Components/Datatypes/Complex Type/Signature'
const elementName = 'fhir-shell'
const subcomponents = { signature: 'fhir-signature' }

const meta: Meta<ShellArgs> = {
  title: path,
  component: elementName,
  subcomponents,
  ...renderTemplateInShell((args) => html`
      <fhir-signature .data=${args.data} summary></fhir-signature >`)
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
