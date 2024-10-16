import {Meta, StoryObj}                   from '@storybook/web-components'
import {html}                             from 'lit'
import {renderTemplateInShell, ShellArgs} from '../../../../stories/storybook-utils'
import {data, data2}                      from './codeableReference.story.data'


const title = 'components/Datatypes/Complex Type/Codeable Reference'

const meta: Meta<ShellArgs> = {
  title,
  component: 'fhir-shell',
  ...renderTemplateInShell((args) => html`
      <fhir-codeable-reference .data=${args.data} summary headless></fhir-codeable-reference>`)

}

export default meta
type Story = StoryObj<ShellArgs>;

export const Headache: Story = {
  args: {
    data,
    showerror: true
  }
}

export const HeadacheVerbose: Story = {
  args: {
    data: data2,
    showerror: true
  }
}

export const Structure: Story = {
  args: {
    data: data,
    mode: 'structure',
    verbose: true,
    showerror: true
  }
}
