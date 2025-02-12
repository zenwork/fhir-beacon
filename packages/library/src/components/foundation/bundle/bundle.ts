import {html, nothing, TemplateResult}                           from 'lit'
import {customElement}                                           from 'lit/decorators.js'
import {FhirType, FhirTypes}                                     from '../../../fhirtypes'
import {BaseElement, Decorated, DomainResourceData, Validations} from '../../../internal'
import {
  renderResourceComponent
}                                                                from '../../../internal/resource/renderResourceComponent'
import {wrap}                                                    from '../../../shell'
import {hasSome, isDefined}                                      from '../../../shell/layout/directives'
import {renderBackboneCollection, renderSingleBackbone}          from '../../../shell/layout/renderBackboneCollection'
import {DisplayConfig}                                           from '../../../shell/types'
import {PrimitiveType}                                           from '../../primitive/type-converters/type-converters'
import {BundleData}                                              from './bundle.data'



@customElement('fhir-bundle')
export class Bundle extends BaseElement<BundleData> {

  constructor() {
    super('Bundle')
  }


  public renderDisplay(_config: DisplayConfig, data: Decorated<BundleData>): TemplateResult[] {
    return [
      html`
          <fhir-identifier label="identifier" .data=${data.identifier}></fhir-identifier >
          <fhir-primitive label="type" .value=${data.type} .type=${PrimitiveType.code}></fhir-primitive >
          <fhir-primitive label="total" .value=${data.total} .type=${PrimitiveType.unsigned_int}></fhir-primitive >
          ${hasSome(data.link, this.verbose) ? renderBackboneCollection(
                  'links', 'link', data.link,
                  (item) => html`
          <fhir-primitive label="relation" .value=${item.relation} .type=${PrimitiveType.code}></fhir-primitive >
          <fhir-primitive label="url" .value=${item.url} .type=${PrimitiveType.uri}></fhir-primitive >
        `,
                  this.verbose
          ) : nothing}
          ${hasSome(data.entry, this.verbose) ? renderBackboneCollection(
                  'entries', 'entry', data.entry,
                  (entry) => {
                      const verbose = this.verbose
                      const noIndex = null
                      return html`
              ${hasSome(entry.link, verbose) ? renderBackboneCollection(
                      'links', noIndex, entry.link, (item) => html`
              <fhir-primitive label="link" .value=${item} .type=${PrimitiveType.link}></fhir-primitive >
                      `, this.verbose
              ) : nothing}
            ${renderResourceComponent(entry.resource, this.getDisplayConfig())}
          `
                  },
                  this.verbose
          ) : nothing}
          <fhir-signature label="signature" .data=${data.signature}></fhir-signature >
          ${renderResourceComponent(data.issues, this.getDisplayConfig())}
      `
    ]

  }

  public renderStructure(_config: DisplayConfig, data: Decorated<BundleData>): TemplateResult[] {
    return [
      html`
          <fhir-identifier label="identifier" .data=${data.identifier}></fhir-identifier >
          <fhir-primitive label="type" .value=${data.type} .type=${PrimitiveType.code}></fhir-primitive >
          <fhir-primitive label="timestamp" .value=${data.timestamp} .type=${PrimitiveType.instant}></fhir-primitive >
          <fhir-primitive label="total" .value=${data.total} .type=${PrimitiveType.unsigned_int}></fhir-primitive >
          ${hasSome(data.link, this.verbose) ? renderBackboneCollection(
                  'links', 'link', data.link,
                  (item) => html`
          <fhir-primitive label="relation" .value=${item.relation} .type=${PrimitiveType.code}></fhir-primitive >
          <fhir-primitive label="url" .value=${item.url} .type=${PrimitiveType.uri}></fhir-primitive >
        `,
                  this.verbose
          ) : nothing}
          ${hasSome(data.entry, this.verbose) ? renderBackboneCollection(
                  'entries', 'entry', data.entry,
                  (entry) => {
                      const displayConfig = this.getDisplayConfig()
                      const verbose = displayConfig.verbose
                      const noIndex = null
                      return html`
              ${hasSome(entry.link, verbose) ? renderBackboneCollection(
                      'links', noIndex, entry.link, (item) => html`
              <fhir-primitive label="link" .value=${item} .type=${PrimitiveType.link}></fhir-primitive >
                      `, this.verbose
              ) : nothing}
            <fhir-primitive label="fullURL" .value=${entry.fullUrl} .type=${PrimitiveType.uri}></fhir-primitive >
            ${renderResourceComponent(entry.resource, displayConfig)}
              ${isDefined(entry.search) ? renderSingleBackbone(
                      'search', noIndex, verbose,
                      html`
                <fhir-primitive label="mode" .value=${entry.search?.mode} .type=${PrimitiveType.code}></fhir-primitive >
                <fhir-primitive
                  label="score" .value=${entry.search?.score}
                  .type=${PrimitiveType.code}
                ></fhir-primitive >
              `
              ) : nothing}
              ${isDefined(entry.request) ? renderSingleBackbone(
                      'request', noIndex, verbose,
                      html`
                <fhir-primitive
                  label="method" .value=${entry.request?.method}
                  .type=${PrimitiveType.code}
                ></fhir-primitive >
                <fhir-primitive label="url" .value=${entry.request?.url} .type=${PrimitiveType.uri}></fhir-primitive >
                <fhir-primitive
                  label="ifNoneMatch" .value=${entry.request?.ifNoneMatch}
                  .type=${PrimitiveType.fhir_string}
                ></fhir-primitive >
                <fhir-primitive
                  label="ifModifiedSince" .value=${entry.request?.ifModifiedSince}
                  .type=${PrimitiveType.instant}
                ></fhir-primitive >
                <fhir-primitive
                  label="ifMatch" .value=${entry.request?.ifMatch}
                  .type=${PrimitiveType.fhir_string}
                ></fhir-primitive >
                <fhir-primitive
                  label="ifNoneExist" .value=${entry.request?.ifNoneExist}
                  .type=${PrimitiveType.fhir_string}
                ></fhir-primitive >
              `
              ) : nothing}
              ${isDefined(entry.response) ? renderSingleBackbone(
                      'response', noIndex, verbose, html`
              <fhir-primitive
                label="status" .value=${entry.response?.status}
                .type=${PrimitiveType.fhir_string}
              ></fhir-primitive >
              <fhir-primitive label="location" .value=${entry.response?.location} .type=${PrimitiveType.uri}></fhir-primitive >
              <fhir-primitive label="etag" .value=${entry.response?.etag} .type=${PrimitiveType.fhir_string}></fhir-primitive >
              <fhir-primitive
                label="lastModified" .value=${entry.response?.lastModified}
                .type=${PrimitiveType.instant}
              ></fhir-primitive >
              ${renderResourceComponent(entry.response?.outcome, displayConfig)}
                      `
              ) : nothing}
          `
                  },
                  this.verbose
          ) : nothing}
          <fhir-signature label="signature" .data=${data.signature}></fhir-signature >
          ${renderResourceComponent(data.issues, this.config())}

      `
    ]
  }


  public renderNarrative(config: DisplayConfig,
                         data: Decorated<BundleData>,
                         _validations: Validations): TemplateResult[] {
    if (data.entry && data.entry.length > 0) {
      return [
        html`
            <fhir-wrapper label=${this.getLabel()} ?headless=${this.headless}>
                ${wrap({
                           key: 'entry',
                           collection: data.entry,
                           generator: (d, l) => {
                               if (isDomainResource(d.resource)) {
                                   return html`
                                       <fhir-label text="${l}: ${d.resource.resourceType}"></fhir-label>
                                       <fhir-narrative
                                               .data=${d.resource.text}
                                               .mode=${config.mode}
                                       ></fhir-narrative>

                                   `
                               } else return html``
                           },
                           config
                       })
                }
            </fhir-wrapper>
        `
      ]
    }

    return [html``]
  }
}

export function isDomainResource(val: unknown): val is DomainResourceData {
  if (typeof val !== 'object' || val === null || !('resourceType' in val)) {
    return false
  }
  const type: FhirType | undefined = FhirTypes.find(t => t.code === (val as { resourceType: string }).resourceType)
  const isResource: boolean = type?.kind === 'resource'
  const hasTextProp: boolean = typeof val === 'object' && true && 'text' in val && !!(val as { text: unknown }).text

  return isResource || hasTextProp
}
