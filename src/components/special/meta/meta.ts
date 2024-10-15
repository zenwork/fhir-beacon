import {html, nothing, TemplateResult} from 'lit'
import {customElement}                 from 'lit/decorators.js'
import {map}                           from 'lit/directives/map.js'
import {BaseElement}                   from '../../../internal'
import {strap, wrap} from '../../../shell'
import {DisplayConfig}                 from '../../../types'
import {PrimitiveType}                 from '../../primitive/type-converters/type-converters'
import {MetaData}                      from './meta.data'

@customElement('fhir-meta')
export class Meta extends BaseElement<MetaData> {

  constructor() {super('Meta')}

  public renderDisplay(config: DisplayConfig, data: MetaData): TemplateResult[] {
    return [
      html`
          <fhir-primitive label="versionId" type=${PrimitiveType.id} .value=${data.versionId} summary></fhir-primitive>
          <fhir-primitive label="lastUpdated"
                          type=${PrimitiveType.instant}
                          .value=${data.lastUpdated}
                          summary
          ></fhir-primitive>
          <fhir-primitive label="source" type=${PrimitiveType.uri} .value=${data.source} summary></fhir-primitive>

          ${wrap({
                     key: 'profile',
                     pluralBase: 'profile',
                     collection: data.profile,
                     generator: (d, l, k) => html`
                         <fhir-primitive key=${k}
                                         label=${l}
                                         type=${PrimitiveType.canonical}
                                         .value=${d}
                                         summary
                         ></fhir-primitive>`,
                     summary: this.summary,
                     config
                 })}

          ${wrap({
                     key: 'security',
                     pluralBase: 'security',
                     collection: data.security,
                     generator: (d, l, k) => html`
                         <fhir-coding key=${k} label=${l} .data=${d} summary></fhir-coding> `,
                     summary: this.summary,
                     config
                 })}

          ${wrap({
                     key: 'tag',
                     pluralBase: 'tag',
                     collection: data.tag,
                     generator: (d, l, k) => html`
                         <fhir-coding key=${k}
                                      label=${l}
                                      .data=${d}
                                      summary
                                      ?headless=${data.tag.length === 1}
                         ></fhir-coding> `,
                     summary: this.summary,
                     config
                 })}

      `
    ]
  }


  public renderStructure(config: DisplayConfig, data: MetaData): TemplateResult[] {
    return [
      html`
          <fhir-primitive label="versionId" type=${PrimitiveType.id} .value=${data.versionId} summary></fhir-primitive>
          <fhir-primitive label="lastUpdated"
                          type=${PrimitiveType.instant}
                          .value=${data.lastUpdated}
                          summary
          ></fhir-primitive>
          <fhir-primitive label="source" type=${PrimitiveType.uri} .value=${data.source} summary></fhir-primitive>

          ${data.profile ? html`
              <fhir-wrapper label="profiles"
                              variant="details"
                              summary
                              ?summaryonly=${this.getDisplayConfig().summaryonly}
              >
                  ${map(data.profile, p => html`
                      <fhir-primitive label="profile"
                                      type=${PrimitiveType.canonical}
                                      .value=${p}
                                      summary
                      ></fhir-primitive>
                  `)}
              </fhir-wrapper>
          ` : nothing}
          ${data.security ? html`
              <fhir-wrapper label="security"
                              variant="details"
                              summary
                              ?summaryonly=${this.getDisplayConfig().summaryonly}
              >
                  ${map(data.security, s => html`
                      <fhir-coding label="security" .data=${s} summary></fhir-coding>
                  `)}
              </fhir-wrapper>
          ` : nothing}
          ${strap({
                      key: 'tag',
                      pluralBase: 'tag',
                      collection: data.tag,
                      generator: (d, l, k) => html`
                          <fhir-coding key=${k} label=${l} .data=${d} summary></fhir-coding> `,
                      summary: this.summary,
                      config: this.getDisplayConfig()
                  })}

      `
    ]
  }
}
