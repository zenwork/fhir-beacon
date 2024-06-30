import {Meta, StoryObj} from '@storybook/web-components'
import './coding'
import '../../../utilities/debug/debug'
import '../../primitive/primitive'
import '../../../index'
import {html}           from 'lit'

type CustomArgs = { data: {}, mode?: string, verbose?: boolean, showerror?: boolean, open?: boolean };

const meta: Meta<CustomArgs> = {
  title: 'Components/Datatypes/Complex Type/Coding',
  component: 'fhir-shell',
  argTypes: {
    mode: { options: ['display', 'display_summary', 'structure', 'structure_summary', 'debug'], control: { type: 'inline-radio' } },
    verbose: { options: [false, true], control: { type: 'boolean' } },
    showerror: { options: [false, true], control: { type: 'boolean' } },
    open: { options: [false, true], control: { type: 'boolean' } }
  },
  render: ({data, mode: mode = 'display', verbose: verbose = false, showerror: showerror = false, open: open = false}: CustomArgs) => html`
    <fhir-shell .mode=${mode} .verbose=${verbose} .showerror=${showerror} .open=${open}>
      <fhir-coding .data=${data} summary></fhir-coding >
    </fhir-shell >
  `

}

export default meta
type Story = StoryObj<CustomArgs>;

export const DisplayableValue: Story = {
  args:{
    data:{
      system: 'http://hl7.org/fhir/sid/icd-10',
      code: 'G44.1',
      display: 'Vascular headache, not elsewhere classified'
    }
  }
  }

export const NoDisplayableValue: Story = {
  args:{
    data:{
      system: 'http://hl7.org/fhir/sid/icd-10',
      code: 'G44.1'
    }
  }
}

export const ShowStructureWithErrors: Story = {
  args: {
    data: {
      id: '123-456',
      extension: [],
      version: '1.0',
      system: 'hl7.org/fhir/sid/icd-10',
      code: 'not a valid code',
      display: 'Vascular headache, not elsewhere classified'
    },
    mode: 'structure',
    verbose: false,
    showerror: true,
    open: true
  }
}
