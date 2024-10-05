import {Meta, StoryObj}                   from '@storybook/web-components'
import {html}                             from 'lit'
import {renderTemplateInShell, ShellArgs} from '../../../../stories/storybook-utils'

const meta: Meta<ShellArgs> = {
  title: 'Components/Datatypes/Complex Type/Codeable Concept',
  component: 'fhir-shell',
  subcomponents: { codeableConcept: 'fhir-codeable-concept' },
  ...renderTemplateInShell(
    (args: ShellArgs) => html`
        <fhir-codeable-concept .data=${args.data} summary></fhir-codeable-concept >`)

}

export default meta
type Story = StoryObj<ShellArgs>;

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
