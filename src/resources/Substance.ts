import {html, TemplateResult} from 'lit'
import {customElement}        from 'lit/decorators.js'
import {map}                  from 'lit/directives/map.js'
import {BaseElementMode}      from '../BaseElement'
import {PrimitiveType}        from '../data/primitive/converters'
import {DomainResource}       from './DomainResource'
import {SubstanceData}        from './structures'
import '../data/'
import '../util/StructureWrapper'
import '../data/complex/CodeableConcept'

@customElement('fhir-substance')
export class Substance extends DomainResource<SubstanceData> {

  constructor() {super('Substance')}

  protected renderStructure(data: SubstanceData): TemplateResult {

    return html`
      <fhir-primitive label="id" value=${data.id} ?showError=${this.showError} .verbose=${this.verbose}></fhir-primitive>
      <fhir-identifier
          .label="identifier"
          .data=${data.identifier}
          .mode=${BaseElementMode.structure}
          ?showError=${this.showError}
          ?open=${this.open}
          ?verbose=${this.verbose}
      ></fhir-identifier>
      <fhir-primitive label="instance" value=${data.instance} ?showError=${this.showError} .verbose=${this.verbose}></fhir-primitive>
      <fhir-primitive label="status" value=${data.status} .type=${PrimitiveType.code} ?showError=${this.showError} .verbose=${this.verbose}></fhir-primitive>
      <fhir-stucture-wrapper label="categories" ?open=${this.open}>
        ${map(data.category, (c) => {
          console.log('category', c)
          html`
            <fhir-codeable-concept
                label="category"
                .data=${c}
                .mode=${BaseElementMode.structure}
                ?showError=${this.showError}
                ?open=${this.open}
                ?verbose=${this.verbose}
            ></fhir-codeable-concept>
          `
        })}
      </fhir-stucture-wrapper>
      <fhir-primitive
          label="code"
          value="not implemented yet"
          type=${PrimitiveType.forced_error}
          ?showError=${this.showError}
          .verbose=${this.verbose}
      ></fhir-primitive>
      <fhir-primitive label="description" .value=${data.description} ?showError=${this.showError} .verbose=${this.verbose}></fhir-primitive>
      <fhir-primitive label="expiry" value=${data.expiry} ?showError=${this.showError} .verbose=${this.verbose}></fhir-primitive>
      <fhir-quantity
          label="quantity"
          .data=${data.quantity}
          ?showError=${this.showError}
          ?open=${this.open}
          .mode=${BaseElementMode.structure}
          .verbose=${this.verbose}
      ></fhir-quantity>
      <fhir-primitive
          label="ingredients"
          value="not implemented yet"
          type=${PrimitiveType.forced_error}
          ?showError=${this.showError}
          .verbose=${this.verbose}
      ></fhir-primitive>

    `
  }


  protected convertData(data: SubstanceData): SubstanceData {
    console.log(data)
    return super.convertData(data)
  }
}
