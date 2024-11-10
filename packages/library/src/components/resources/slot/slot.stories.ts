import {Meta, StoryObj}      from '@storybook/web-components'
import './slot'
import {argtypes, ShellArgs} from '../../../../stories/storybook-utils'
import {data}                from './slot.story.data'


const meta: Meta<ShellArgs> = {
  title: 'Components/Resources/Slot/Slot',
  component: 'fhir-slot',
  ...argtypes()
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
  }
}

export const Structure: Story = {
  args: {
    data,
    mode: 'structure',
    showerror: true,
    verbose: true,
    open: true,
    headless: true
  }
}
