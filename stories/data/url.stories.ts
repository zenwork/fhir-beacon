import {Meta, StoryObj} from '@storybook/web-components'
import {html}           from 'lit'
import '../../src/data/Primitve'
import {Primitive}      from '../../src/data/Primitve'

const meta = {
  title: 'Datatypes/Primitives/Url',
  component: 'bkn-primitive',
} satisfies Meta<typeof Primitive>

export default meta
type Story = StoryObj;

export const Valid: Story = {
  render: () => html`
      <bkn-primitive type="url" value="http://hl7.org/fhir/sid/icd-10"></bkn-primitive>`,
}

export const Invalid: Story = {
  render: () => html`
      <bkn-primitive type="url" value="hl7.org/fhir/sid/icd-10"></bkn-primitive>`,
}

export const InvalidWithError: Story = {
  render: () => html`
      <bkn-primitive showError="true" type="url" value="//not a url"></bkn-primitive>`,
}

export const InvalidRelativeUrlWithError: Story = {
  render: () => html`
      <bkn-primitive showError="true" type="url" value="a/b/c"></bkn-primitive>`,
}
