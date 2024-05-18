import {Meta, StoryObj} from '@storybook/web-components'
import {html}           from 'lit'
import {Primitive}      from '../../src/data/primitive/Primitve'
import '../../src/data/primitive/Primitve'
import '../../node_modules/@shoelace-style/shoelace/dist/shoelace.js'

const meta = {
  title: 'Core/Primitives/Primitive'
} satisfies Meta<typeof Primitive>

export default meta
type Story = StoryObj;

export const Primary: Story = {
  render: () => html`
    <fhir-wrapper>
      <fhir-primitive label="Doctor" value="Alice Nixon" link="/practitioner/1234"></fhir-primitive>
      <fhir-primitive label="Doctor" delimiter=" - " value="Jenny Nixon"></fhir-primitive>
      <fhir-primitive label="link" value="1234" type="url" ?showError=${true}></fhir-primitive>
    </fhir-wrapper>
  `
}

export const Label: Story = {
  render: () => html`
    <fhir-wrapper>
      <fhir-label text="patient"></fhir-label>
      <fhir-label>
        <sl-badge variant="primary">practitioner</sl-badge>
      </fhir-label>
    </fhir-wrapper>
  `
}

export const Value: Story = {
  render: () => html`
    <fhir-wrapper>
      <fhir-value text="John Smith"></fhir-value>
      <fhir-value text="John Smith" link="http://foo.com/patient/1234"></fhir-value>
      <fhir-value>Dr. Jill Muller</fhir-value>
    </fhir-wrapper>
  `
}

export const Error: Story = {
  render: () => html`
    <fhir-error text="Some Error"></fhir-value>
  `
}

export const Context: Story = {
  render: () => html`
    <fhir-wrapper>
      <fhir-context text="some context"></fhir-value>
    </fhir-wrapper>
  `

}
