import {Meta, StoryObj} from '@storybook/web-components'
import {html}           from 'lit'

const meta = {
  title: 'Components/Datatypes/Primitive Type/Uri',
  component: 'fhir-primitive',
} satisfies Meta

export default meta
type Story = StoryObj;

export const OID: Story = {
  render: () => html`
      <fhir-primitive label="OID" type="uri" value="urn:isbn:0451450523"></fhir-primitive>`,
}

export const FhirDatatype: Story = {
  render: () =>
    html`
        <fhir-primitive
                label="readable"
                type="uri_type"
                value="AdministrableProductDefinition">
        </fhir-primitive>
        <fhir-primitive
                label="unfomratted"
                type="uri_type"
                value="AdministrableProductDefinition"
                showProvided=${true}
        >
        </fhir-primitive>
        <fhir-primitive
                label="error"
                type="uri_type"
                value="dataType"
          showerror=${true}
        >
        </fhir-primitive>
    `


}
