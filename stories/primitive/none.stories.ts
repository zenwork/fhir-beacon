import {Meta, StoryObj} from '@storybook/web-components'
import {html}           from 'lit'
import '../../src/data/primitive/Primitve'
import {Primitive}      from '../../src/data/primitive/Primitve'

const meta = {
  title: 'Datatypes/Primitives/None',
  tags: ['autodocs'],
  component: 'bkn-primitive',
} satisfies Meta<typeof Primitive>

export default meta
type Story = StoryObj;

export const Implied: Story = {
  render: () => html`
      <bkn-primitive  value="some simple value"></bkn-primitive>`,
}

export const WithType: Story = {
  render: () => html`
      <bkn-primitive type="none" value="some value with a type attribute"></bkn-primitive>`,
}
