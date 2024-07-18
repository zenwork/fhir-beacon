import {Meta, StoryObj} from '@storybook/web-components'
import {html}           from 'lit'
import {wrapInShell}    from '../../../../stories/wrapInShell'

type CustomArgs = { data: object, mode?: string, verbose?: boolean, showerror?: boolean, open?: boolean };


const title = 'components/Datatypes/Complex Type/Codeable Reference'
const render = wrapInShell((args) => html`
  <fhir-codeable-reference .data=${args.data} summary></fhir-codeable-reference >`)
const data = {
  concept: {
    coding: [
      {
        system: 'http://hl7.org/fhir/sid/icd-10',
        code: 'R51'
      }, {
        system: 'http://snomed.info/sct',
        code: '25064002',
        display: 'Headache',
        userSelected: 'true'
      }
    ],
    text: 'general headache'
  },
  reference: {
    reference: '/Observation/id1234',
    type: 'Observation',
    display: 'Patient reported Headache'
  }
}
const meta: Meta<CustomArgs> = {
  title,
  component: 'fhir-shell',
  argTypes: {
    mode: { options: ['display', 'display_summary', 'structure', 'structure_summary', 'debug'], control: { type: 'inline-radio' } },
    verbose: { options: [false, true], control: { type: 'boolean' } },
    showerror: { options: [false, true], control: { type: 'boolean' } },
    open: { options: [false, true], control: { type: 'boolean' } }
  },
  render

}

export default meta
type Story = StoryObj<CustomArgs>;

export const Headache: Story = {
  args: {
    data,
    mode: 'display',
    verbose: false,
    showerror: true,
    open: true
  },
  render
}

export const HeadacheVerbose: Story = {
  args: {
    data,
    mode: 'display',
    verbose: true,
    showerror: true,
    open: true
  },
  render
}

export const Structure: Story = {
  args: {
    data: data,
    mode: 'structure',
    verbose: true,
    showerror: true,
    open: true
  },
  render
}
