import {StoryObj} from '@storybook/web-components'
import {argtypes} from '../../../../stories/storybook-utils'
import {data}     from './bundle.story.data'


const path = 'Components/Foundation/Bundle'
const elementName = 'fhir-bundle'

const meta = {
  title: path,
  component: elementName,
  ...argtypes()
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
