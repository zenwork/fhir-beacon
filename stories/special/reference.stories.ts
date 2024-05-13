import {StoryObj} from '@storybook/web-components'
import '../../src/special/Reference'


const meta = {
  title: 'Special/Reference',
  component: 'fhir-reference',
  argTypes: {
    mode: {
      options: ['display', 'structure', 'combined'],
      control: {type: 'radio'},
    },
  },

}

export default meta
type Story = StoryObj;

export const ResourceReference: Story = {
  args: {
    data: {
      type: 'Patient'
    },
    mode: 'display',
    showError: false,
  }
}

export const CanonicalReference: Story = {
  args: {
    data: {},
    mode: 'display',
    showError: false,
  }
}

export const ContainedReference: Story = {
  args: {
    data: {},
    mode: 'display',
    showError: false,
  }
}
