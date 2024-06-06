import {StoryObj} from '@storybook/web-components'
import './contact-point'
import '../../../../index'

let path = 'Components/Datatypes/Complex Type/Contact Point'
let elementName = 'fhir-contact-point'
let data = {
  extension: [
    {
      url: 'http://hl7.org/fhir/StructureDefinition/iso21090-TEL-address',
      valueUri: 'tel:+15556755745'
    }
  ],
  system: 'phone',
  value: '(555) 675 5745',
  use: 'home',
  period: {
    start: '2022-07-01',
    end: '2024-07-01'
  }
}

const meta = {
  title: path,
  component: elementName,
  argTypes: {
    mode: { options: ['display', 'display_summary', 'structure', 'structure_summary', 'debug'], control: { type: 'inline-radio' } },
    verbose: { options: [false, true], control: { type: 'boolean' } },
    showerror: { options: [false, true], control: { type: 'boolean' } },
    open: { options: [false, true], control: { type: 'boolean' } }
  }
}

export default meta
type Story = StoryObj;

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
    verbose: true,
    open: true
  }
}
