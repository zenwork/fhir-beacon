import {StoryObj} from '@storybook/web-components'
import {html}     from 'lit'

const meta = {
  title: 'Toolkit/Layout/Wrappers'
}

export default meta
type Story = StoryObj;

export const WrapperEmpty: Story = {
  render: () => html`
      <fhir-wrapper>
          <fhir-primitive label="title" value="Dr."></fhir-primitive>
          <fhir-primitive label="first name" value="Jack"></fhir-primitive>
          <fhir-primitive label="last name" value="Smith"></fhir-primitive>
          <fhir-wrapper>
              <fhir-primitive label="title" value="Dr."></fhir-primitive>
              <fhir-primitive label="first name" value="Jack"></fhir-primitive>
              <fhir-primitive label="last name" value="Smith"></fhir-primitive>
          </fhir-wrapper>
      </fhir-wrapper>
  `
}

export const WrapperWithLabel: Story = {
  render: () => html`
      <fhir-wrapper label="name">
          <fhir-primitive label="title" value="Dr."></fhir-primitive>
          <fhir-primitive label="first name" value="Jack"></fhir-primitive>
          <fhir-primitive label="last name" value="Smith"></fhir-primitive>
      </fhir-wrapper>
  `
}
export const WrapperStructure: Story = {
  render: () => html`
      <fhir-wrapper key="name"
                    label="name"
                    variant="details"
                    badge-resource='Human Name'
                    badge-summary
                    badge-constraint
      >
          <fhir-primitive label="title" value="Dr."></fhir-primitive>
          <fhir-primitive label="first name" value="Jack"></fhir-primitive>
          <fhir-primitive label="last name" value="Smith"></fhir-primitive>
      </fhir-wrapper>
  `
}

export const WrapperNoLabel: Story = {
  render: () => html`
      <fhir-primitive label="gender" value="male"></fhir-primitive>
      <fhir-wrapper>
          <fhir-primitive label="title" value="Dr."></fhir-primitive>
          <fhir-primitive label="first name" value="Jack"></fhir-primitive>
          <fhir-primitive label="last name" value="Smith"></fhir-primitive>
      </fhir-wrapper>
  `
}

export const Wrapper: Story = {
  render: () => html`
      <fhir-primitive label="gender" value="male"></fhir-primitive>
      <fhir-wrapper label="Name">
          <fhir-primitive label="title" value="Dr."></fhir-primitive>
          <fhir-primitive label="first name" value="Jack"></fhir-primitive>
          <fhir-primitive label="last name" value="Smith"></fhir-primitive>
      </fhir-wrapper>
  `
}

export const WrapperType: Story = {
  render: () => html`
      <fhir-primitive label="gender" value="male"></fhir-primitive>
      <fhir-wrapper label="Human Name">
          <fhir-primitive label="title" value="Dr."></fhir-primitive>
          <fhir-primitive label="first name" value="Jack"></fhir-primitive>
          <fhir-primitive label="last name" value="Smith"></fhir-primitive>
      </fhir-wrapper>
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
      <fhir-wrapper label="Contact" badge-resource="Practitioner" variant="details">
          <fhir-primitive label="gender" value="male"></fhir-primitive>
          <fhir-wrapper label="Name" badge-resource="Human Name" variant="details">
              <fhir-primitive label="title" value="Dr."></fhir-primitive>
              <fhir-primitive label="first name" value="Jack"></fhir-primitive>
              <fhir-primitive label="last name" value="Smith"></fhir-primitive>
          </fhir-wrapper>
      </fhir-wrapper>
  `
}
