import {Meta, StoryObj} from '@storybook/web-components'
import {html}           from 'lit'
import {Primitive}      from '../../../src/data/primitive/Primitive'
import '../../../src/data/primitive/Primitive'
import '../../../node_modules/@shoelace-style/shoelace/dist/shoelace.js'

const meta = {
  title: 'System/Atoms/Primitive/Value'
} satisfies Meta<typeof Primitive>

export default meta
type Story = StoryObj;

export const Value: Story = {
  render: () => html`
    <fhir-wrapper >
      <fhir-value text="John Smith"></fhir-value >
      <fhir-value text="John Smith" link="http://foo.com/patient/1234"></fhir-value >
      <fhir-value >Dr. Jill Muller</fhir-value >
    </fhir-wrapper >
  `
}