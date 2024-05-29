import {Meta, StoryObj} from '@storybook/web-components'
import {html}           from 'lit'
import {Primitive}      from '../../../src/components/primitive/primitive'
import '../../../src/components/primitive/primitive'
import '../../../node_modules/@shoelace-style/shoelace/dist/shoelace.js'

const meta = {
  title: 'Toolkit/Primitive Elements/Error Element'
} satisfies Meta<typeof Primitive>

export default meta
type Story = StoryObj;


export const ErrorElement: Story = {
  render: () => html`
    <fhir-error text="Some Error"></fhir-value>
  `
}
