import {StoryObj} from '@storybook/web-components'
import './bundle'
import {data}     from './bundle.story.data'


let path = 'Components/Foundation/Bundle'
let elementName = 'fhir-bundle'

const meta = {
  title: path,
  component: elementName,
  argTypes: {
    mode: {options: ['display', 'structure', 'summary', 'combined', 'debug'], control: {type: 'inline-radio'}},
    verbose: {options: [true, false], control: {type: 'inline-radio'}},
    showerror: {options: [true, false], control: {type: 'inline-radio'}},
    open: {options: [true, false], control: {type: 'inline-radio'}}
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
