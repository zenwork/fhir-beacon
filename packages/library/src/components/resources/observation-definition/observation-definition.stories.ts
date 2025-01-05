import {StoryObj} from '@storybook/web-components'
import {argtypes} from '../../../../stories/storybook-utils'
import {data}     from './observation-definition.story.data'

const meta = {
  title: 'Components/Resources/Observation/ObservationDefinition',
  component: 'fhir-observation-definition',
  ...argtypes()
}

export default meta
type Story = StoryObj

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
