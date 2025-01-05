import {StoryObj}                         from '@storybook/web-components'
import {html}                             from 'lit'
import {renderTemplateInShell, ShellArgs} from '../../../../stories/storybook-utils'
import {data, data1, data2}               from './identifier.story.data'

const meta = {
  title: 'Components/Datatypes/Complex Type/Identifier',
  component: 'fhir-shell',
  subcomponents: ['fhir-identifier'],
  ...renderTemplateInShell((args: ShellArgs) => html`
      <fhir-identifier .data=${args.data} summary ?headless=${args.headless}></fhir-identifier>`)
}

export default meta
type Story = StoryObj<ShellArgs>;

export const PatientIdentifier: Story = {
  args: {
    data: data,
    mode: 'display',
    showerror: false,
    verbose: false,
    open: true,
    headless: true
  }
}
export const HospitalPatientIdentifier: Story = {
  args: {
    data: data1,
    mode: 'structure',
    showerror: false,
    verbose: false,
    open: true
  }
}

export const Example3: Story = {
  args: {
    data: data2,
    mode: 'display',
    showerror: false,
    verbose: false,
    open: true
  }
}
