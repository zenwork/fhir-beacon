import {StoryObj} from '@storybook/web-components'
import '../../../../src/index'
import {data}     from './patient.story.data'

let path = 'Components/Resources/Patient/Patient'
let elementName = 'fhir-patient'

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
type Story = StoryObj;

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
