import {html, nothing, TemplateResult} from 'lit'
import {customElement}                 from 'lit/decorators.js'
import {map}                           from 'lit/directives/map.js'
import {DomainResource}                from '../../../internal/resource/DomainResource'
import {wrap}                          from '../../../shell'
import {DisplayConfig}                 from '../../../types'
import {PrimitiveType}                 from '../../primitive/type-converters/type-converters'
import {SubstanceData}                 from './substance.data'

@customElement('fhir-substance')
export class Substance extends DomainResource<SubstanceData> {
  constructor() {
    super('Substance')
  }

  public renderDisplay(config: DisplayConfig, data: SubstanceData): TemplateResult[] {
    return [
      html`
          <fhir-primitive label="description"
                          .value=${data.description}
                          .context="id:${data.id}"
                          summary
          ></fhir-primitive>
          <fhir-identifier .label="identifier" .data=${data.identifier} summary></fhir-identifier>
          <fhir-primitive label="instance or kind"
                          value=${data.instance ? 'instance' : 'kind'}
                          summary
          ></fhir-primitive>
          <fhir-primitive label="status" value=${data.status} .type=${PrimitiveType.code} summary></fhir-primitive>
          ${wrap('',
                 'category',
                 data.category,
                 this.verbose,
                 (c, idx, context) => html`
                     <fhir-codeable-concept .context=${context}
                                            label="substance"
                                            .data=${c}
                                            summary
                     ></fhir-codeable-concept> `)}
          <fhir-codeable-reference key="code" label="code" .data=${data.code} summary></fhir-codeable-reference>
          <fhir-primitive label="expiry" value=${data.expiry} summary></fhir-primitive>
          <fhir-quantity label="quantity" .data=${data.quantity} summary></fhir-quantity>
          ${wrap('',
                 'ingredient',
                 data.ingredient,
                 this.verbose,
                 (ing, idx, ctx) => html`
                     <fhir-substance-ingredient
                             .key=${ctx}
                             .label=${'ingredient' + idx}
                             .data=${ing} summary
                     ></fhir-substance-ingredient> `)}
      `
    ]
  }

  public renderStructure(config: DisplayConfig, data: SubstanceData): TemplateResult[] {
    return [
      html`
          <fhir-identifier .label="identifier" .data=${data.identifier} summary></fhir-identifier>
          <fhir-primitive label="instance" value=${data.instance} summary></fhir-primitive>
          <fhir-primitive label="status" value=${data.status} .type=${PrimitiveType.code} summary></fhir-primitive>
          ${data.category || this.verbose
            ? html`
                      <fhir-wrapper-2 variant="details"
                                      label="categories"
                                      ?headless=${data.category?.length > 1}
                                      ?summaryonly=${this.getDisplayConfig().summaryonly}
                                      summary
                      >
                          ${data.category
                            ? map(data.category, (c) => {
                                      return html`
                                          <fhir-codeable-concept label="category"
                                                                 .data=${c}
                                                                 summary
                                          ></fhir-codeable-concept> `
                                  })
                            : html`
                                      <fhir-empty-list></fhir-empty-list>`}
                      </fhir-wrapper-2>
                  `
            : nothing}
          <fhir-codeable-reference label="code" .data=${data.code} summary></fhir-codeable-reference>
          <fhir-primitive label="description" .value=${data.description} summary></fhir-primitive>
          <fhir-primitive label="expiry" value=${data.expiry} summary></fhir-primitive>
          <fhir-quantity label="quantity" .data=${data.quantity} summary></fhir-quantity>
          ${data.ingredient || this.verbose
            ? html`
                      <fhir-wrapper-2 label="ingredients"
                                      ?open=${this.open}
                                      summary
                                      ?summaryonly=${this.getDisplayConfig().summaryonly}
                      >
                          ${data.ingredient
                            ? map(data.ingredient, (ing) => html`
                                      <fhir-substance-ingredient
                                              label="ingredient" .data=${ing}
                                              summary
                                      ></fhir-substance-ingredient> `)
                            : html`
                                      <fhir-empty-list></fhir-empty-list>`}
                      </fhir-wrapper-2>
                  `
            : nothing}
      `
    ]
  }
}
