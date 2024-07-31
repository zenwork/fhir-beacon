import {Meta, StoryObj} from '@storybook/web-components'
import {html}           from 'lit'
import {PrimitiveType}  from '../../../../src/components/primitive/type-converters/type-converters'

const meta = {
  title: 'Components/Datatypes/Primitive Type/TimeDate',
  component: 'fhir-primitive',
} satisfies Meta

export default meta
type Story = StoryObj;

export const Valid: Story = {
  render: () => html`
      <fhir-primitive label="DateTime" type=${PrimitiveType.datetime} value="2013-06-08T10:57:34+01:00"></fhir-primitive>`,
}

export const Valid1: Story = {
  render: () => html`
      <fhir-primitive label="DateTime" type=${PrimitiveType.datetime} value="1951-06"></fhir-primitive>`,
}

export const Valid2: Story = {
  render: () => html`
      <fhir-primitive label="DateTime" type=${PrimitiveType.datetime} value="2013-06-08T10:57:00"></fhir-primitive>`,
}

export const Errors: Story = {
  render: () => html`
    <fhir-primitive label="DateTime" type=${PrimitiveType.datetime} value="10:57:34" ?showerror=${false}></fhir-primitive>
    <fhir-primitive label="DateTime" type=${PrimitiveType.datetime} value="2013-06-08 10:57:34+01:00" showerror=${true}></fhir-primitive >
    <fhir-primitive label="DateTime" type=${PrimitiveType.datetime} value="2013-06-081057340100" showerror=${true}></fhir-primitive >
    <fhir-primitive label="DateTime" type=${PrimitiveType.datetime} value="2013-31" showerror=${true}></fhir-primitive >
    <fhir-primitive label="DateTime" type=${PrimitiveType.datetime} value="abc" showerror=${true}></fhir-primitive >
  `,
}
