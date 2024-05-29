import {Meta, StoryObj} from '@storybook/web-components'
import {html}           from 'lit'
import '../../../../src/components/primitive/primitive'
import {Primitive}      from '../../../../src/components/primitive/primitive'

const meta = {
  title: 'Components/Datatypes/Primitive Type/Url',
  component: 'fhir-primitive',
} satisfies Meta<typeof Primitive>

export default meta
type Story = StoryObj;

export const Valid: Story = {
  render: () => html`
      <fhir-primitive type="url" value="http://hl7.org/fhir/sid/icd-10"></fhir-primitive>`,
}

export const Invalid: Story = {
  render: () => html`
      <fhir-primitive type="url" value="hl7.org/fhir/sid/icd-10"></fhir-primitive>`,
}

export const InvalidWithError: Story = {
  render: () => html`
      <fhir-primitive .showError=${true} type="url" value="//not a url"></fhir-primitive>`,
}

export const InvalidRelativeUrlWithError: Story = {
  render: () => html`
      <fhir-primitive .showError=${true} type="url" value="a/b/c"></fhir-primitive>`,
}
