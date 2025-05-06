import {StoryObj} from '@storybook/web-components'
import {html}     from 'lit'



const meta = {
  title: 'Toolkit/Layout/Badge Group'
}

export default meta
type Story = StoryObj;

export const All: Story = {
  render: () => html`
      <fhir-badge-group summary constraint required resource='Human Name' profile='Profile Name'></fhir-badge-group>
  `
}

export const Resource: Story = {
  render: () => html`
      <fhir-badge-group resource='Human Name'></fhir-badge-group>
  `
}

export const Summary: Story = {
  render: () => html`
      <fhir-badge-group summary></fhir-badge-group>
  `
}

export const Constraint: Story = {
  render: () => html`
      <fhir-badge-group constraint></fhir-badge-group>
  `
}

export const Required: Story = {
  render: () => html`
      <fhir-badge-group required></fhir-badge-group>
  `
}

export const Profile: Story = {
  render: () => html`
      <fhir-badge-group profile="Profile Name"></fhir-badge-group>
  `
}
