import {StoryObj}                         from '@storybook/web-components'
import {html}                             from 'lit'
import {renderTemplateInShell, ShellArgs} from '../../../../stories/storybook-utils'
import {data, data3}                      from './human-name.story.data'


const path = 'Components/Datatypes/Complex Type/Human Name'
const elementName = 'fhir-human-name'

const meta = {
  title: path,
  component: elementName,
  ...renderTemplateInShell((args: ShellArgs) => html`
      <fhir-human-name .data=${args.data} summary ?headless=${args.headless}></fhir-human-name>`)
}

export default meta
type Story = StoryObj<ShellArgs>;


export const Display: Story = {
  args: {
    data,
    headless: true
  }
}

export const Display2: Story = {
  args: {
    data: data3,
    headless: true
  }
}

export const Structure: Story = {
  args: {
    data,
    mode: 'structure',
    showerror: true,
    verbose: true
  }
}
