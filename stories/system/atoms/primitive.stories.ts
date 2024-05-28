import {Meta, StoryObj} from '@storybook/web-components'
import {html}           from 'lit'


const meta: Meta = {
  title: 'System/Atoms/Primitive'

}

export default meta
type Story = StoryObj;

export const Simple: Story = {
  render: () => html`
    <fhir-primitive
        label="quantity" type='decimal'
        value="100"
        showerror
    ><span slot="after">ml</span ></fhir-primitive >
  `
}

export const Static: Story = {
  render: () => html`
    <fhir-primitive-wrapper >
      <fhir-label text="quantity"></fhir-label >
      <fhir-value text="100,0"><span slot="after">ml</span ></fhir-value >
      <fhir-error text="oopsy!"></fhir-error >
    </fhir-primitive-wrapper >
  `

}

export const Dynamic: Story = {
  render: () => html`
    <fhir-primitive
        label="quantity" type='decimal'
        value="100,0" context="25064002"
        showerror
    ></fhir-primitive >
  `

}
