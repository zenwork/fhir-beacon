import {Meta, StoryObj} from '@storybook/web-components'
import {html}           from 'lit'
import {Primitive}      from '../../../src/components/primitive/primitive'
import '../../../src/components/primitive/primitive'
import '../../../node_modules/@shoelace-style/shoelace/dist/shoelace.js'

const meta = {
  title: 'System/Atoms/Primitive/Context'
} satisfies Meta<typeof Primitive>

export default meta
type Story = StoryObj;

export const Context: Story = {
  render: () => html`
    <fhir-wrapper >
      <fhir-context text="some context"></fhir-value>
    </fhir-wrapper >
  `

}
