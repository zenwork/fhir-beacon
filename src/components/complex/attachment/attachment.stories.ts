import {Meta, StoryObj}                   from '@storybook/web-components'
import {html}                             from 'lit'
import {renderTemplateInShell, ShellArgs} from '../../../../stories/storybook-utils'
import {document, image}                  from './attachment.story.data'

const meta: Meta<ShellArgs> = {
  title: 'Components/Datatypes/Complex Type/Attachment',
  subcomponents: { attachment: 'fhir-attachment' },
  ...renderTemplateInShell((args: ShellArgs) => html`
      <fhir-attachment .data="${args.data}" summary></fhir-attachment>
  `)
} as Meta<ShellArgs>


export default meta
type Story = StoryObj<ShellArgs>;

export const Display: Story = {
  args: {
    data: image
  }
}

export const Display2: Story = {
  args: {
    data: document
  }
}

export const Structure: Story = {
  args: {
    data: document,
    mode: 'structure',
    showerror: true,
    verbose: true
  }
}
