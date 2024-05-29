import {Meta, StoryObj} from '@storybook/web-components'
import {html}           from 'lit'
import '../../../../src/components/primitive/primitive'
import {Primitive}      from '../../../../src/components/primitive/primitive'

const meta = {
  title: 'Components/Datatypes/Primitive Type/None',
  tags: ['autodocs'],
  component: 'fhir-primitive',
} satisfies Meta<typeof Primitive>

export default meta
type Story = StoryObj;

export const Implied: Story = {
  render: () => html`
      <fhir-primitive value="some simple value"></fhir-primitive>`,
}

export const WithType: Story = {
  render: () => html`
      <fhir-primitive type="none" value="some value with a type attribute"></fhir-primitive>`,
}
