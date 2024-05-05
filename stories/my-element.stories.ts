
import {Meta, StoryObj} from '@storybook/web-components'
import {html}           from 'lit'
import './my-element'
import {MyElement}      from './my-element'


const meta = {
  component: "my-element",
} satisfies Meta<typeof MyElement>;

export default meta;
type Story = StoryObj;

export const Primary: Story = {
  render: () => html`<my-element></my-element>`,
};
