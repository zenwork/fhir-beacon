import {Meta, StoryObj}                   from '@storybook/web-components'
import './account'
import {html}                             from 'lit'
import {renderTemplateInShell, ShellArgs} from '../../../../stories/storybook-utils'
import {data, data2}                      from './account.story.data'


const meta: Meta<ShellArgs> = {
  title: 'Components/Resources/Account/Account',
  component: 'fhir-account',
  ...renderTemplateInShell((args: ShellArgs) => html`
      <fhir-account .data=${args.data}></fhir-account>
  `)
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

export const Display2: Story = {
  args: {
    data: data2,
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
