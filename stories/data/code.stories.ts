import {Meta, StoryObj} from '@storybook/web-components'
import {html}           from 'lit'
import '../../src/data/primitive/Primitve'
import {Primitive}      from '../../src/data/primitive/Primitve'

const meta = {
  title: 'Datatypes/Primitives/Code',
  component: 'bkn-primitive',
} satisfies Meta<typeof Primitive>

export default meta
type Story = StoryObj;

export const Valid: Story = {
  render: () => html`
      <bkn-primitive type="code" value="G.44"></bkn-primitive>`,
}

export const Invalid: Story = {
  render: () => html`
      <bkn-primitive type="code" value="G.44 d d"></bkn-primitive>`,
}

export const InvalidWithError: Story = {
  render: () => html`
      <bkn-primitive showError="true" type="code" value="G.44 d d"></bkn-primitive>`,
}
