import {Meta, StoryObj}                   from '@storybook/web-components'
import './appointment'
import {html}                             from 'lit'
import {renderTemplateInShell, ShellArgs} from '../../../../stories/storybook-utils'
import {data, data2}                      from './appointment.story.data'


const meta: Meta<ShellArgs> = {
  title: 'Components/Resources/Appointment/Appointment',
  component: 'fhir-appointment',
  ...renderTemplateInShell((args: ShellArgs) => html`
      <fhir-appointment .data=${args.data}></fhir-appointment>
  `)
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

export const Display2: Story = {
  args: {
    data: data2,
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
