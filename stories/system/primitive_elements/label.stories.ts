import {Meta, StoryObj} from '@storybook/web-components'
import {html}           from 'lit'
import '../../../src/components/primitive/primitive'
import '../../../node_modules/@shoelace-style/shoelace/dist/shoelace.js'

const meta = {
  title: 'Toolkit/Primitive Elements/Label Element'
} satisfies Meta

export default meta
type Story = StoryObj;

export const LabelElement: Story = {
  render: () => html`
    <fhir-wrapper >
      <fhir-primitive label="Doctor" value="Alice Nixon" link="/practitioner/1234"></fhir-primitive >
      <fhir-primitive label="Doctor" delimiter=" - " value="Jenny Nixon"></fhir-primitive >
      <fhir-primitive label="link" value="1234" type="url" ?showerror=${true}></fhir-primitive >
    </fhir-wrapper >
  `
}
