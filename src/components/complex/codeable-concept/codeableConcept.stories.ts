import {Meta, StoryObj}         from '@storybook/web-components'
import {html}                   from 'lit'
import {ShellArgs, wrapInShell} from '../../../../stories/wrapInShell'

type CustomArgs = { data: object, mode?: string, verbose?: boolean, showerror?: boolean, open?: boolean };

const meta: Meta<CustomArgs> = {
  title: 'Components/Datatypes/Complex Type/Codeable Concept',
  component: 'fhir-shell',
  argTypes: {
    mode: {
      options: ['display', 'display_summary', 'structure', 'structure_summary', 'debug'],
      control: { type: 'inline-radio' }
    },
    verbose: { options: [false, true], control: { type: 'boolean' } },
    showerror: { options: [false, true], control: { type: 'boolean' } },
    open: { options: [false, true], control: { type: 'boolean' } }
  },
  render: wrapInShell((args: ShellArgs) => html`
      <fhir-codeable-concept .data=${args.data} ?summary=${args.summary}}></fhir-codeable-concept >`)

}

export default meta
type Story = StoryObj<CustomArgs>;

export const SimpleHeadacheCode: Story = {
  args: {
    data: {
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
    }
  }
}

export const Structure: Story = {
  args: {
    data: {
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
    mode: 'structure',
    verbose: true,
    open: true
  }
}
