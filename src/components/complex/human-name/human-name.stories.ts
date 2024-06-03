import {StoryObj}               from '@storybook/web-components'
import './human-name'
import {html}                   from 'lit'
import {ShellArgs, wrapInShell} from '../../../../stories/wrapInShell'
import {data, data3}            from './human-name.story.data'


let path = 'Components/Datatypes/Complex Type/Human Name'
let elementName = 'fhir-human-name'

let render = wrapInShell(({ data }) => html`
  <fhir-human-name .data=${data}></fhir-human-name >`)

const meta = {
  title: path,
  component: elementName,
  argTypes: {
    mode: { options: ['display', 'summary', 'structure', 'debug'], control: { type: 'inline-radio' } },
    verbose: { options: [true, false], control: { type: 'boolean' } },
    showerror: { options: [true, false], control: { type: 'boolean' } },
    open: { options: [true, false], control: { type: 'boolean' } }
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

export const Display2: Story = {
  args: {
    data: data3,
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
