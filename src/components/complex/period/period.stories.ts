import {Meta, StoryObj}                   from '@storybook/web-components'
import {html}                             from 'lit'
import {renderTemplateInShell, ShellArgs} from '../../../../stories/storybook-utils'
import {coverage, end, start}             from './period.story.data'

const meta: Meta<ShellArgs> = {
  title: 'Components/Datatypes/Complex Type/Period',
  subcomponents: { period: 'fhir-period' },
  ...renderTemplateInShell((args: ShellArgs) => html`
      <fhir-period .data="${args.data}" summary ?headless=${args.headless}></fhir-period>
  `)
} as Meta<ShellArgs>


export default meta
type Story = StoryObj<ShellArgs>;

export const Display: Story = {
  args: {
    data: coverage,
    headless: true
  }
}

export const Start: Story = {
  args: {
    data: start,
    headless: true
  }
}

export const End: Story = {
  args: {
    data: end,
    headless: true
  }
}


export const Structure: Story = {
  args: {
    data: coverage,
    mode: 'structure',
    showerror: true,
    verbose: true
  }
}
