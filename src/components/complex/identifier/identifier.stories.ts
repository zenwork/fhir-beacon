import {StoryObj}               from '@storybook/web-components'
import {html}                   from 'lit'
import {ShellArgs, wrapInShell} from '../../../../stories/wrapInShell'
import {data, data1, data2}     from './identifier.story.data'


const render = wrapInShell((args) => html`
  <fhir-identifier .data=${args.data} ?summary=${args.summary}></fhir-identifier >`)

const meta = {
  title: 'Components/Datatypes/Complex Type/Identifier',
  component: 'fhir-shell',
  subcomponents: ['fhir-identifier'],
  argTypes: {
    mode: { options: ['display', 'display_summary', 'structure', 'structure_summary', 'debug'], control: { type: 'inline-radio' } },
    verbose: { options: [false, true], control: { type: 'boolean' } },
    showerror: { options: [false, true], control: { type: 'boolean' } },
    open: { options: [false, true], control: { type: 'boolean' } }
  }

}

export default meta
type Story = StoryObj<ShellArgs>;

export const PatientIdentifier: Story = {
  args: {
    data: data,
    mode: 'display',
    showerror: false,
    verbose: false,
    open: true
  },
  render
}
export const HospitalPatientIdentifier: Story = {
  args: {
    data: data1,
    mode: 'structure',
    showerror: false,
    verbose: false,
    open: true
  },
  render
}

export const Example3: Story = {
  args: {
    data: data2,
    mode: 'display',
    showerror: false,
    verbose: false,
    open: true
  },
  render
}
