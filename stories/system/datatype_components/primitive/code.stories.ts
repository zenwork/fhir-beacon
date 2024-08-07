import {Meta, StoryObj} from '@storybook/web-components'
import {html}           from 'lit'

const meta = {
  title: 'Components/Datatypes/Primitive Type/Code',
  component: 'fhir-primitive',
} satisfies Meta

export default meta
type Story = StoryObj;

export const Valid: Story = {
  render: () => html`
      <fhir-primitive type="code" value="G.44"></fhir-primitive>`,
}

export const Invalid: Story = {
  render: () => html`
      <fhir-primitive type="code" value="G.44 d d"></fhir-primitive>`,
}

export const InvalidWithError: Story = {
  render: () => html`
    <fhir-primitive .showerror=${true} type="code" value="G.44 d d"></fhir-primitive >`,
}
