import {Meta, StoryObj} from '@storybook/web-components'
import {html}           from 'lit'
import {Primitive}      from '../../../src/data/primitive/Primitive'
import '../../../src/data/primitive/Primitive'
import '../../../node_modules/@shoelace-style/shoelace/dist/shoelace.js'

const meta = {
  title: 'System/Atoms/Primitive/Error'
} satisfies Meta<typeof Primitive>

export default meta
type Story = StoryObj;


export const Error: Story = {
  render: () => html`
    <fhir-error text="Some Error"></fhir-value>
  `
}
