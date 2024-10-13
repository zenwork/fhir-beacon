import {StoryObj} from '@storybook/web-components'
import {html}     from 'lit'

const meta = {
  title: 'Toolkit/Layout/Wrappers'
}

export default meta
type Story = StoryObj;

export const Wrapper2Empty: Story = {
  render: () => html`
      <fhir-wrapper-2>
          <fhir-primitive label="title" value="Dr."></fhir-primitive>
          <fhir-primitive label="first name" value="Jack"></fhir-primitive>
          <fhir-primitive label="last name" value="Smith"></fhir-primitive>
          <fhir-wrapper-2>
              <fhir-primitive label="title" value="Dr."></fhir-primitive>
              <fhir-primitive label="first name" value="Jack"></fhir-primitive>
              <fhir-primitive label="last name" value="Smith"></fhir-primitive>
          </fhir-wrapper-2>
      </fhir-wrapper-2>
  `
}

export const Wrapper2: Story = {
  render: () => html`
      <fhir-wrapper-2 label="name">
          <fhir-primitive label="title" value="Dr."></fhir-primitive>
          <fhir-primitive label="first name" value="Jack"></fhir-primitive>
          <fhir-primitive label="last name" value="Smith"></fhir-primitive>
      </fhir-wrapper-2>
  `
}
export const Wrapper2Structure: Story = {
  render: () => html`
      <fhir-wrapper-2 key="name" label='name' details badge-resource='Human Name' badge-summary badge-constraint>
          <fhir-primitive label="title" value="Dr."></fhir-primitive>
          <fhir-primitive label="first name" value="Jack"></fhir-primitive>
          <fhir-primitive label="last name" value="Smith"></fhir-primitive>
      </fhir-wrapper-2>
  `
}

export const WrapperNoLabel: Story = {
  render: () => html`
      <fhir-primitive label="gender" value="male"></fhir-primitive>
      <fhir-wrapper-2>
          <fhir-primitive label="title" value="Dr."></fhir-primitive>
          <fhir-primitive label="first name" value="Jack"></fhir-primitive>
          <fhir-primitive label="last name" value="Smith"></fhir-primitive>
      </fhir-wrapper-2>
  `
}

export const Wrapper: Story = {
  render: () => html`
      <fhir-primitive label="gender" value="male"></fhir-primitive>
      <fhir-wrapper-2 label="Name" fhirType="HumanName">
          <fhir-primitive label="title" value="Dr."></fhir-primitive>
          <fhir-primitive label="first name" value="Jack"></fhir-primitive>
          <fhir-primitive label="last name" value="Smith"></fhir-primitive>
      </fhir-wrapper-2>
  `
}

export const WrapperType: Story = {
  render: () => html`
      <fhir-primitive label="gender" value="male"></fhir-primitive>
      <fhir-wrapper-2 label="Human Name">
          <fhir-primitive label="title" value="Dr."></fhir-primitive>
          <fhir-primitive label="first name" value="Jack"></fhir-primitive>
          <fhir-primitive label="last name" value="Smith"></fhir-primitive>
      </fhir-wrapper-2>
  `
}

export const NoWrapper: Story = {
  render: () => html`
      <fhir-primitive label="gender" value="male"></fhir-primitive>
      <div>
          <fhir-primitive label="title" value="Dr."></fhir-primitive>
          <fhir-primitive label="first name" value="Jack"></fhir-primitive>
          <fhir-primitive label="last name" value="Smith"></fhir-primitive>
      </div>
  `
}


export const StructureWrapper: Story = {
  render: () => html`
      <fhir-wrapper-2 label="Contact" badge-resource="Practitioner" variant="details">
          <fhir-primitive label="gender" value="male"></fhir-primitive>
          <fhir-wrapper-2 label="Name" badge-resource="Human Name" variant="details">
              <fhir-primitive label="title" value="Dr."></fhir-primitive>
              <fhir-primitive label="first name" value="Jack"></fhir-primitive>
              <fhir-primitive label="last name" value="Smith"></fhir-primitive>
          </fhir-wrapper-2>
      </fhir-wrapper-2>
  `
}
