import '../../../../src/index'
import {StoryObj}   from '@storybook/web-components'
import {createMeta} from '../../../../stories/storybook-utils'
import {data}       from './observation.story.data'

const path = 'Components/Resources/Observation/Observation'
const elementName = 'fhir-observation'

const meta = {
  title: path,
  component: elementName,
  ...createMeta()
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
