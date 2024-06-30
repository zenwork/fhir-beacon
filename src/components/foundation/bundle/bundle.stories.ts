import {StoryObj} from '@storybook/web-components'
import './bundle'
import {data}     from './bundle.story.data'


let path = 'Components/Foundation/Bundle'
let elementName = 'fhir-bundle'

const meta = {
  title: path,
  component: elementName,
  argTypes: {
    mode: { options: ['display', 'display_summary', 'structure', 'structure_summary', 'debug'], control: { type: 'inline-radio' } },
    verbose: { options: [false, true], control: { type: 'boolean' } },
    showerror: { options: [false, true], control: { type: 'boolean' } },
    open: { options: [false, true], control: { type: 'boolean' } }
  }
}

export default meta
type Story = StoryObj;

export const Display: Story = {
  args: {
    data: data,
    mode: 'display',
    showerror: false,
    verbose: false,
    open: true
  }
}

export const Structure: Story = {
  args: {
    data: data,
    mode: 'structure',
    showerror: true,
    verbose: true,
    open: true
  }
}
