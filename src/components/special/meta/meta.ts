import {html, nothing, TemplateResult} from 'lit'
import {customElement}                 from 'lit/decorators.js'
import {map}                           from 'lit/directives/map.js'
import {BaseElementConsumer}           from '../../../internal/base/base-element-consumer'
import '../../complex/coding/coding'
import {PrimitiveType}                 from '../../primitive/type-converters'
import {MetaData}                      from './meta.data'

@customElement('fhir-meta')
export class Meta extends BaseElementConsumer<MetaData> {

  constructor() {super('Meta')}

  protected renderDisplay(data: MetaData): TemplateResult | TemplateResult[] {
    return html`
      <fhir-primitive label="versionId" type=${PrimitiveType.id} .value=${data.versionId} summary></fhir-primitive >
      <fhir-primitive label="lastUpdated" type=${PrimitiveType.instant} .value=${data.lastUpdated} summary></fhir-primitive >
      <fhir-primitive label="source" type=${PrimitiveType.uri} .value=${data.source} summary></fhir-primitive >
      ${data.profile ? html`
        <fhir-wrapper label="profiles" variant="primary" ?hide=${data.profile.length <= 1}>
          ${map(data.profile, p => html`
            <fhir-primitive label="profile" type=${PrimitiveType.canonical} .value=${p} summary></fhir-primitive >
          `)}
        </fhir-wrapper >
      ` : nothing}
      ${data.security ? html`
        <fhir-wrapper label="security" variant="primary" ?hide=${data.security.length <= 1}>
          ${map(data.security, s => html`
            <fhir-coding label="security" .data=${s} summary></fhir-coding >
          `)}
        </fhir-wrapper >
      ` : nothing}
      ${data.tag ? html`
        <fhir-wrapper label="tags" variant="primary" ?hide=${data.tag.length <= 1}=>
          ${map(data.tag, t => html`
            <fhir-coding label="tag" .data=${t} summary></fhir-coding >
          `)}
        </fhir-wrapper >
      ` : nothing}
    `
  }


  protected renderStructure(data: MetaData): TemplateResult | TemplateResult[] {
    return html`
      <fhir-primitive label="versionId" type=${PrimitiveType.id} .value=${data.versionId} summary></fhir-primitive >
      <fhir-primitive label="lastUpdated" type=${PrimitiveType.instant} .value=${data.lastUpdated} summary></fhir-primitive >
      <fhir-primitive label="source" type=${PrimitiveType.uri} .value=${data.source} summary></fhir-primitive >
      ${data.profile ? html`
        <fhir-structure-wrapper label="profiles" summary>
          ${map(data.profile, p => html`
            <fhir-primitive label="profile" type=${PrimitiveType.canonical} .value=${p} summary></fhir-primitive >
          `)}
        </fhir-structure-wrapper >
      ` : nothing}
      ${data.security ? html`
        <fhir-structure-wrapper label="security" summary>
          ${map(data.security, s => html`
            <fhir-coding label="security" .data=${s} summary></fhir-coding >
          `)}
        </fhir-structure-wrapper >
      ` : nothing}
      ${data.tag ? html`
        <fhir-structure-wrapper label="tags" summary>
          ${map(data.tag, t => html`
            <fhir-coding label="tag" .data=${t} summary></fhir-coding >
          `)}
        </fhir-structure-wrapper >
      ` : nothing}
    `
  }
}
