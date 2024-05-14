import {html, TemplateResult} from 'lit'
import {customElement}        from 'lit/decorators.js'
import {map}                  from 'lit/directives/map.js'
import {BaseElementMode}      from '../BaseElement'
import {PrimitiveType}        from '../data/primitive/converters'
import {DomainResource}       from './DomainResource'
import {MedicationData}       from './structures'
import '../util/StructureWrapper'
import '../data/complex/CodeableConcept'
import '../data/complex/Quantity'
import '../special/Reference'

@customElement('fhir-medication')
export class Medication extends DomainResource<MedicationData> {

  constructor() {super('Medication')}


  protected renderStructure(data: MedicationData): TemplateResult | TemplateResult[] {
    return html`
        <fhir-identifier .data=${data.identifier} .mode=${BaseElementMode.structure}></fhir-identifier>
        <fhir-codeable-concept .data=${data.code} .mode=${BaseElementMode.structure}></fhir-codeable-concept>
        <fhir-primitive .type=${PrimitiveType.code} .label="status" .value=${data.status}></fhir-primitive>
        <fhir-reference .data=${data.marketingAuthorisationHolder} .mode=${BaseElementMode.structure}></fhir-reference>
        <fhir-codeable-concept .data=${data.doseForm} .mode=${BaseElementMode.structure}></fhir-codeable-concept>
        <bkn-quantity .data=${data.totalVolume} .mode=${BaseElementMode.structure}></fhir-quantity>
            <fhir-stucture-wrapper label="Ingredients">
                ${map(data.ingredient, (i) => html`
                    <!-- codeable reference -->
                    <fhir-primitive .type=${PrimitiveType.none} label="is Active" .value=${i.isActive}></fhir-primitive>
                    <!-- ratio -->
                    <fhir-codeable-concept .data=${i.strengthCodeableConcept} .mode=${BaseElementMode.structure}>
                        <bkn-quantity .data=${i.strengthQuantity!} .mode=${BaseElementMode.structure}></fhir-quantity>

                `)}
            </fhir-stucture-wrapper>
            <fhir-strucutre-wrapper label="Batch">
                foo
            </fhir-strucutre-wrapper>

    `
  }
}
