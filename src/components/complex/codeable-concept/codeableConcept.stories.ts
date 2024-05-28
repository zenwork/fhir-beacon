import {Meta, StoryObj} from '@storybook/web-components'
import './codeable-concept'
import '../../../shell/Shell'
import {html}           from 'lit'

type CustomArgs = { data: {}, mode?: string, verbose?: boolean, showerror?: boolean, open?: boolean };

const meta: Meta<CustomArgs> = {
  title: 'System/Datatype Components/Complex Type/Codeable Concept',
  component: 'fhir-shell',
  argTypes: {
    mode: {
      options: ['display', 'structure', 'combined'],
      control: {type: 'inline-radio'}
    },
    verbose: {
      options: [true, false],
      control: {type: 'inline-radio'}
    },
    open: {
      options: [true, false],
      control: {type: 'inline-radio'}
    },
    showerror: {
      options: [true, false],
      control: {type: 'inline-radio'}
    },
  },
  render: ({data, mode: mode = 'display', verbose: verbose = false, showerror: showerror = false, open: open = false}: CustomArgs) =>
    html`
      <fhir-shell .mode=${mode} .verbose=${verbose} .showerror=${showerror} .open=${open}>
        <fhir-codeable-concept .data=${data}></fhir-codeable-concept >
      </fhir-shell >
    `

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
