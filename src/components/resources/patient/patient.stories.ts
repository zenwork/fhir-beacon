import {StoryObj} from '@storybook/web-components'
import {data}     from './patient.story.data'

const path = 'Components/Resources/Patient/Patient'
const elementName = 'fhir-patient'

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
