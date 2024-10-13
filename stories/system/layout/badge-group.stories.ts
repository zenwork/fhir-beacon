import {StoryObj} from '@storybook/web-components'
import {html}     from 'lit'

const meta = {
  title: 'Toolkit/Layout/Badge Group'
}

export default meta
type Story = StoryObj;

export const BadgeGroup1: Story = {
  render: () => html`
      <fhir-badge-group badge-resource='Human Name' badge-summary badge-constraint></fhir-badge-group>
  `
}

export const BadgeGroup2: Story = {
  render: () => html`
      <fhir-badge-group badge-resource='Human Name'></fhir-badge-group>
  `
}

export const BadgeGroup3: Story = {
  render: () => html`
      <fhir-badge-group badge-summary></fhir-badge-group>
  `
}

export const BadgeGroup4: Story = {
  render: () => html`
      <fhir-badge-group badge-constraint></fhir-badge-group>
  `
}
