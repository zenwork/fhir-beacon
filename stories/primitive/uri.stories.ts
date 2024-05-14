import {Meta, StoryObj} from '@storybook/web-components'
import {html}           from 'lit'
import '../../src/data/primitive/Primitve'
import {Primitive}      from '../../src/data/primitive/Primitve'

const meta = {
  title: 'Datatypes/Primitives/Uri',
  component: 'fhir-primitive',
} satisfies Meta<typeof Primitive>

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
        value="AdministrableProductDefinition" >
</fhir-primitive>
<fhir-primitive 
        label="unfomratted" 
        type="uri_type" 
        value="AdministrableProductDefinition" 
        showOriginal=${true}>
</fhir-primitive>
<fhir-primitive 
        label="error" 
        type="uri_type" 
        value="dataType" 
        showError=${true}>
</fhir-primitive>
    `


}
