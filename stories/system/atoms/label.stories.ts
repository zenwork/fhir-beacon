import {Meta, StoryObj} from '@storybook/web-components'
import {html}           from 'lit'
import {Primitive}      from '../../../src/data/primitive/Primitive'
import '../../../src/data/primitive/Primitive'
import '../../../node_modules/@shoelace-style/shoelace/dist/shoelace.js'

const meta = {
  title: 'System/Atoms/Primitive/Label'
} satisfies Meta<typeof Primitive>

export default meta
type Story = StoryObj;

export const Label: Story = {
  render: () => html`
    <fhir-wrapper >
      <fhir-primitive label="Doctor" value="Alice Nixon" link="/practitioner/1234"></fhir-primitive >
      <fhir-primitive label="Doctor" delimiter=" - " value="Jenny Nixon"></fhir-primitive >
      <fhir-primitive label="link" value="1234" type="url" ?showError=${true}></fhir-primitive >
    </fhir-wrapper >
  `
}