import {StoryObj} from '@storybook/web-components'
import {html}     from 'lit'

const meta = {
  title: 'Toolkit/Layout/Wrappers'
}

export default meta
type Story = StoryObj;

export const WrapperNoLabel: Story = {
  render: () => html`
    <fhir-primitive label="gender" value="male"></fhir-primitive >
    <fhir-wrapper >
      <fhir-primitive label="title" value="Dr."></fhir-primitive >
      <fhir-primitive label="first name" value="Jack"></fhir-primitive >
      <fhir-primitive label="last name" value="Smith"></fhir-primitive >
    </fhir-wrapper >
  `
}

export const Wrapper: Story = {
  render: () => html`
    <fhir-primitive label="gender" value="male"></fhir-primitive >
    <fhir-wrapper label="Name" fhirType="HumanName" variant="primary">
      <fhir-primitive label="title" value="Dr."></fhir-primitive >
      <fhir-primitive label="first name" value="Jack"></fhir-primitive >
      <fhir-primitive label="last name" value="Smith"></fhir-primitive >
    </fhir-wrapper >
  `
}

export const WrapperType: Story = {
  render: () => html`
    <fhir-primitive label="gender" value="male"></fhir-primitive >
    <fhir-wrapper fhirType="HumanName">
      <fhir-primitive label="title" value="Dr."></fhir-primitive >
      <fhir-primitive label="first name" value="Jack"></fhir-primitive >
      <fhir-primitive label="last name" value="Smith"></fhir-primitive >
    </fhir-wrapper >
  `
}

export const NoWrapper: Story = {
  render: () => html`
    <fhir-primitive label="gender" value="male"></fhir-primitive >
    <div >
      <fhir-primitive label="title" value="Dr."></fhir-primitive >
      <fhir-primitive label="first name" value="Jack"></fhir-primitive >
      <fhir-primitive label="last name" value="Smith"></fhir-primitive >
    </div >
  `
}


export const StructureWrapper: Story = {
  render: () => html`
    <fhir-structure-wrapper label="Contact" fhirType="Practitioner">
      <fhir-primitive label="gender" value="male"></fhir-primitive >
      <fhir-structure-wrapper label="Name" fhirType="HumanName" variant="primary">
        <fhir-primitive label="title" value="Dr."></fhir-primitive >
        <fhir-primitive label="first name" value="Jack"></fhir-primitive >
        <fhir-primitive label="last name" value="Smith"></fhir-primitive >
      </fhir-structure-wrapper >
    </fhir-structure-wrapper >
  `
}
