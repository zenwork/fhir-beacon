import {Meta, StoryObj}                   from '@storybook/web-components'
import './money'
import {html}                             from 'lit'
import {renderTemplateInShell, ShellArgs} from '../../../../stories/storybook-utils'
import {data}                             from './money.story.data'


const meta: Meta<ShellArgs> = {
  title: 'Components/Datatypes/Complex Type/Money',
  subcomponents: { period: 'fhir-money' },
  ...renderTemplateInShell((args: ShellArgs) => html`
      <fhir-money .data="${args.data}" summary ?headless=${args.headless}></fhir-money>
  `)
} as Meta<ShellArgs>

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
