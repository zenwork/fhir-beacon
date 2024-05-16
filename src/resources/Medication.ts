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
        <fhir-identifier label="identifier" .data=${data.identifier} .mode=${BaseElementMode.structure}
                         .verbose=${this.verbose}></fhir-identifier>
        <fhir-codeable-concept label="code" .data=${data.code} .mode=${BaseElementMode.structure}
                               .verbose=${this.verbose}></fhir-codeable-concept>
        <fhir-primitive label="status" .type=${PrimitiveType.code} .value=${data.status} .verbose=${this.verbose}></fhir-primitive>
        <fhir-reference label="marketing authorization holder" .data=${data.marketingAuthorisationHolder} .mode=${BaseElementMode.structure}
                        .verbose=${this.verbose}></fhir-reference>
        <fhir-codeable-concept label="dose form" .data=${data.doseForm} .mode=${BaseElementMode.structure}
                               .verbose=${this.verbose}></fhir-codeable-concept>
        <fhir-quantity label="total volume" .data=${data.totalVolume} .mode=${BaseElementMode.structure}
                       .verbose=${this.verbose}></fhir-quantity>
        <fhir-stucture-wrapper label="ingredients">
            ${map(data.ingredient, (i) => html`
                <!-- codeable reference -->
                <fhir-primitive .type=${PrimitiveType.none} label="is Active" .value=${i.isActive}
                                .verbose=${this.verbose}></fhir-primitive>
                <!-- ratio -->
                <fhir-codeable-concept .data=${i.strengthCodeableConcept} .mode=${BaseElementMode.structure}
                                       .verbose=${this.verbose}></fhir-codeable-concept>
                <fhir-quantity .data=${i.strengthQuantity!} .mode=${BaseElementMode.structure} .verbose=${this.verbose}></fhir-quantity>

            `)}
        </fhir-stucture-wrapper>
        <fhir-structure-wrapper label="batch">
            the batch
        </fhir-structure-wrapper>
        <fhir-reference label="definition" .data=${data.definition} .mode=${BaseElementMode.structure}
                        .verbose=${this.verbose}></fhir-reference>


    `
  }
}
