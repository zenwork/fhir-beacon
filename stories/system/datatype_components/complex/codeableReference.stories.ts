import {Meta, StoryObj} from '@storybook/web-components'
import '../../../../src/data/complex/CodeableReference'
import '../../../../src/shell/Shell'
import {html}           from 'lit'

type CustomArgs = { data: {}, mode?: string, verbose?: boolean, showerror?: boolean, open?: boolean };


let title = 'system/Datatype Components/Complex Type/Codeable Reference'

let data = {
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
    }
  },
  render: ({data, mode: mode = 'display', verbose: verbose = false, showerror: showerror = false, open: open = false}: CustomArgs) =>
    html`
      <fhir-shell .mode=${mode} .verbose=${verbose} .showerror=${showerror} .open=${open}>
        <fhir-codeable-reference .data=${data}></fhir-codeable-reference >
      </fhir-shell >
    `

}

export default meta
type Story = StoryObj<CustomArgs>;

export const Headache: Story = {
  args: {
    data,
    mode: 'display',
    verbose: false,
    'showerror': true,
    open: true
  }
}

export const HeadacheVerbose: Story = {
  args: {
    data,
    mode: 'display',
    verbose: true,
    'showerror': true,
    open: true
  }
}

export const Structure: Story = {
  args: {
    data: data,
    mode: 'structure',
    verbose: true,
    'showerror': true,
    open: true
  }
}
