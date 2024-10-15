import {StoryObj} from '@storybook/web-components'
import {argtypes} from '../../../../stories/storybook-utils'
import {data}     from './patient.story.data'

const path = 'Components/Resources/Patient/Patient'
const elementName = 'fhir-patient'

const meta = {
  title: path,
  component: elementName,
  ...argtypes()
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
