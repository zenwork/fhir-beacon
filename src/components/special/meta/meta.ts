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
      <fhir-primitive label="versionId" type=${PrimitiveType.id} .value=${data.versionId}></fhir-primitive >
      <fhir-primitive label="lastUpdated" type=${PrimitiveType.instant} .value=${data.lastUpdated}></fhir-primitive >
      <fhir-primitive label="source" type=${PrimitiveType.uri} .value=${data.source}></fhir-primitive >
      ${data.profile ? html`
        ${data.profile.length > 1 ? html`
          <fhir-wrapper label="profiles" variant="primary">
            ${map(data.profile, p => html`
              <fhir-primitive label="profile" type=${PrimitiveType.canonical} .value=${p}></fhir-primitive >
            `)}
          </fhir-wrapper >
        ` : html`
          ${map(data.profile, p => html`
            <fhir-primitive label="profile" type=${PrimitiveType.canonical} .value=${p}></fhir-primitive >
          `)}
        `}
      ` : nothing}
      ${data.security ? html`
        ${data.security.length > 1 ? html`
          <fhir-wrapper label="security" variant="primary">
            ${map(data.security, s => html`
              <fhir-coding label="security" .data=${s}></fhir-coding >
            `)}
          </fhir-wrapper >
        ` : html`
          ${map(data.security, s => html`
            <fhir-coding label="security" .data=${s}></fhir-coding >
          `)}
        `}
      ` : nothing}
      ${data.tag ? html`
        ${data.tag.length > 1 ? html`
          <fhir-wrapper label="tags" variant="primary">
            ${map(data.tag, t => html`
              <fhir-coding label="tag" .data=${t}></fhir-coding >
            `)}
          </fhir-wrapper >
        ` : html`
          ${map(data.tag, t => html`
            <fhir-coding label="tag" .data=${t}></fhir-coding >
          `)}
        `}

      ` : nothing}
    `
  }


  protected renderStructure(data: MetaData): TemplateResult | TemplateResult[] {
    return html`
      <fhir-primitive label="versionId" type=${PrimitiveType.id} .value=${data.versionId}></fhir-primitive >
      <fhir-primitive label="lastUpdated" type=${PrimitiveType.instant} .value=${data.lastUpdated}></fhir-primitive >
      <fhir-primitive label="source" type=${PrimitiveType.uri} .value=${data.source}></fhir-primitive >
      ${data.profile ? html`
        <fhir-structure-wrapper label="profiles">
          ${map(data.profile, p => html`
            <fhir-primitive label="profile" type=${PrimitiveType.canonical} .value=${p}></fhir-primitive >
          `)}
        </fhir-structure-wrapper >
      ` : nothing}
      ${data.security ? html`
        <fhir-structure-wrapper label="security">
          ${map(data.security, s => html`
            <fhir-coding label="security" .data=${s}></fhir-coding >
          `)}
        </fhir-structure-wrapper >
      ` : nothing}
      ${data.tag ? html`
        <fhir-structure-wrapper label="tags">
          ${map(data.tag, t => html`
            <fhir-coding label="tag" .data=${t}></fhir-coding >
          `)}
        </fhir-structure-wrapper >
      ` : nothing}
    `
  }
}
