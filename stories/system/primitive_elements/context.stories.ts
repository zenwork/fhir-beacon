import {Meta, StoryObj} from '@storybook/web-components'
import {html}           from 'lit'

const meta = {
  title: 'Toolkit/Primitive Elements/Context Element'
} satisfies Meta

export default meta
type Story = StoryObj;

export const ContextElement: Story = {
  render: () => html`
    <fhir-wrapper >
      <fhir-context text="some context"></fhir-value>
    </fhir-wrapper >
  `

}
