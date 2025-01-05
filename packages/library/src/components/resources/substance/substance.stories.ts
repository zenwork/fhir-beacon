import {Meta, StoryObj}                   from '@storybook/web-components'
import {html}                             from 'lit'
import {renderTemplateInShell, ShellArgs} from '../../../../stories/storybook-utils'
import {data, data_f204}                  from './substance.story.data'


const title = 'Components/Resources/Medication/Substance'

const meta: Meta<ShellArgs> = {
  title,
  subcomponents: { 'fhir-substance': 'fhir-substance' },
  ...renderTemplateInShell((args: ShellArgs) => html`
    <fhir-substance .data="${args.data}" .mode=${args.mode} .verbose=${args.verbose} .showerror=${args.showerror} .open=${args.open}></fhir-substance >
  `)
} as Meta<ShellArgs>


export default meta
type Story = StoryObj<ShellArgs>;

export const Display_f204: Story = {
  args: {
    data: data_f204,
    mode: 'display',
    showerror: false,
    verbose: false,
    open: true
  }
}

export const Structure_f204: Story = {
  args: {
    data: data_f204,
    mode: 'structure',
    showerror: true,
    verbose: false,
    open: true
  }
}

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
    verbose: false,
    open: true
  }
}


export const Narrative: Story = {
  args: {
    data,
    mode: 'narrative',
    showerror: false,
    verbose: false,
    open: true
  }
}
