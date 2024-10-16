import {Meta, StoryObj} from '@storybook/web-components'
import {html}           from 'lit'

const meta = {
  title: 'Toolkit/Primitive Elements/Error Element'
} satisfies Meta

export default meta
type Story = StoryObj;


export const ErrorElement: Story = {
  render: () => html`
    <fhir-error text="Some Error"></fhir-value>
  `
}
