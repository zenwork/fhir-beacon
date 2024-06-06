import {StoryObj}               from '@storybook/web-components'
import './identifier'
import {html}                   from 'lit'
import {ShellArgs, wrapInShell} from '../../../../stories/wrapInShell'
import '../../../../index'

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
    data: {
      use: 'official',
      system: 'http://www.acmehosp.com/patients',
      value: '44552',
      period: {
        start: '2003-05-03'
      }
    },
    mode: 'display',
    showerror: false,
    verbose: false,
    open: true
  },
  render
}
export const HospitalPatientIdentifier: Story = {
  args: {
    data: {
      use: 'official',
      system: 'urn:oid:2.16.840.1.113883.16.4.3.2.5',
      value: '123'
    },
    mode: 'structure',
    showerror: false,
    verbose: false,
    open: true
  },
  render
}

export const Example3: Story = {
  args: {
    data: {
      use: 'official',
      type: { text: 'BSN' },
      system: 'urn:oid:2.16.840.1.113883.2.4.6.3',
      value: '123456789',
      period: {
        start: '2003-05-03',
        end: '2024-12-31'
      }
    },
    mode: 'display',
    showerror: false,
    verbose: false,
    open: true
  },
  render
}
