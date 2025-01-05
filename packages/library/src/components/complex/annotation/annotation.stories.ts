import {Meta, StoryObj}                   from '@storybook/web-components'
import {html}                             from 'lit'
import {renderTemplateInShell, ShellArgs} from '../../../../stories/storybook-utils'
import {data}                             from './annotation.story.data'



const meta: Meta<ShellArgs> = {
  title: 'Components/Datatypes/Complex Type/Annotation',
  subcomponents: { 'fhir-annotation': 'fhir-annotation' },
  ...renderTemplateInShell((args: ShellArgs) => html`
      <fhir-annotation .data="${args.data}" summary></fhir-annotation >
  `)
} as Meta<ShellArgs>


export default meta
type Story = StoryObj<ShellArgs>;

export const Display: Story = {
  args: {
    data
  }
}

export const ValidationErrors: Story = {
  args: {
    data: {
      authorReference: {
        reference: 'Patient/example'
      },
      authorString: 'Jack Smith',
      time: '2022-02-08T10:18:14.034+10:00',
      text: 'I don\'t think that this is true, or what I said, and it should be corrected',
    },
    mode: 'display',
    showerror: true
  },

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
