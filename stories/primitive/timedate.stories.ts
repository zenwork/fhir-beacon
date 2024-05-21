import {Meta, StoryObj} from '@storybook/web-components'
import {html}           from 'lit'
import '../../src/data/primitive/Primitive'
import {PrimitiveType}  from '../../src/data/primitive/converters'
import {Primitive}      from '../../src/data/primitive/Primitive'

const meta = {
  title: 'Datatypes/Primitives/TimeDate',
  component: 'fhir-primitive',
} satisfies Meta<typeof Primitive>

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
      <fhir-primitive label="DateTime" type=${PrimitiveType.datetime} value="2013-06-08 10:57:34+01:00" showError=${true}></fhir-primitive>
      <fhir-primitive label="DateTime" type=${PrimitiveType.datetime} value="2013-06-081057340100" showError=${true}></fhir-primitive>
      <fhir-primitive label="DateTime" type=${PrimitiveType.datetime} value="2013-31" showError=${true}></fhir-primitive>
      <fhir-primitive label="DateTime" type=${PrimitiveType.datetime} value="abc" showError=${true}></fhir-primitive>
  `,
}
