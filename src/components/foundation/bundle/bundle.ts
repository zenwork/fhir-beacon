import {html, nothing, TemplateResult}                  from 'lit'
import {customElement}                                  from 'lit/decorators.js'
import {BaseElementContextProvider} from '../../../internal/base/base-element-context-provider'
import {renderResourceComponent}                        from '../../../internal/resource/renderResourceComponent'
import {hasSome, isDefined}                             from '../../../shell/layout/directives'
import {renderBackboneCollection, renderSingleBackbone} from '../../../shell/layout/renderBackboneCollection'
import {PrimitiveType}                                  from '../../primitive/type-converters'
import {BundleData}                                     from './bundle.data'
import '../../../index'

@customElement('fhir-bundle')
export class Bundle extends BaseElementContextProvider<BundleData> {
  constructor() {super('Bundle')}


  protected renderDisplay(data: BundleData): TemplateResult | TemplateResult[] {
    return html`
        <fhir-identifier label="identifier" .data=${data.identifier}></fhir-identifier>
        <fhir-primitive label="type" .value=${data.type} .type=${PrimitiveType.code}></fhir-primitive>
        <fhir-primitive label="total" .value=${data.total} .type=${PrimitiveType.unsigned_int}></fhir-primitive>
        ${hasSome(data.link, this.display?.value?.verbose) ? renderBackboneCollection('links', 'link', data.link,
                (item) => html`
                    <fhir-primitive label="relation" .value=${item.relation} .type=${PrimitiveType.code}></fhir-primitive>
                    <fhir-primitive label="url" .value=${item.url} .type=${PrimitiveType.uri}></fhir-primitive>
                `,
                this.verbose) : nothing}
        ${hasSome(data.entry, this.display?.value?.verbose) ? renderBackboneCollection('entries', 'entry', data.entry,
                (entry) => {
                    let displayConfig = this.display?.value
                    let verbose = displayConfig.verbose
                    let noIndex = null
                    return html`
                        ${hasSome(entry.link, verbose) ? renderBackboneCollection('links', noIndex, entry.link, (item, idx) => html`
                            <fhir-primitive label="link" .value=${item} .type=${PrimitiveType.link}></fhir-primitive>
                        `, this.verbose) : nothing}
                        ${renderResourceComponent(entry.resource, displayConfig)}
                    `
                },
                this.verbose
        ) : nothing}
        <fhir-signature label="signature" .data=${data.signature}></fhir-signature>
        ${renderResourceComponent(data.issues, this.display?.value)}


    `

  }

  protected renderStructure(data: BundleData): TemplateResult | TemplateResult[] {
    return html`
        <fhir-identifier label="identifier" .data=${data.identifier}></fhir-identifier>
        <fhir-primitive label="type" .value=${data.type} .type=${PrimitiveType.code}></fhir-primitive>
        <fhir-primitive label="timestamp" .value=${data.timestamp} .type=${PrimitiveType.instant}></fhir-primitive>
        <fhir-primitive label="total" .value=${data.total} .type=${PrimitiveType.unsigned_int}></fhir-primitive>
        ${hasSome(data.link, this.display?.value?.verbose) ? renderBackboneCollection('links', 'link', data.link,
                (item) => html`
                    <fhir-primitive label="relation" .value=${item.relation} .type=${PrimitiveType.code}></fhir-primitive>
                    <fhir-primitive label="url" .value=${item.url} .type=${PrimitiveType.uri}></fhir-primitive>
                `,
                this.verbose) : nothing}
        ${hasSome(data.entry, this.display?.value?.verbose) ? renderBackboneCollection('entries', 'entry', data.entry,
                (entry) => {
                    let displayConfig = this.display?.value
                    let verbose = displayConfig.verbose
                    let noIndex = null
                    return html`
                        ${hasSome(entry.link, verbose) ? renderBackboneCollection('links', noIndex, entry.link, (item, idx) => html`
                            <fhir-primitive label="link" .value=${item} .type=${PrimitiveType.link}></fhir-primitive>
                        `, this.verbose) : nothing}
                        <fhir-primitive label="fullURL" .value=${entry.fullUrl} .type=${PrimitiveType.uri}></fhir-primitive>
                        ${renderResourceComponent(entry.resource, displayConfig)}
                        ${isDefined(entry.search) ? renderSingleBackbone('search', noIndex, verbose,
                                html`
                                    <fhir-primitive label="mode" .value=${entry.search?.mode} .type=${PrimitiveType.code}></fhir-primitive>
                                    <fhir-primitive label="score" .value=${entry.search?.score}
                                                    .type=${PrimitiveType.code}></fhir-primitive>
                                `) : nothing}
                        ${isDefined(entry.request) ? renderSingleBackbone('request', noIndex, verbose,
                                html`
                                    <fhir-primitive label="method" .value=${entry.request?.method}
                                                    .type=${PrimitiveType.code}></fhir-primitive>
                                    <fhir-primitive label="url" .value=${entry.request?.url} .type=${PrimitiveType.uri}></fhir-primitive>
                                    <fhir-primitive label="ifNoneMatch" .value=${entry.request?.ifNoneMatch}
                                                    .type=${PrimitiveType.fhir_string}></fhir-primitive>
                                    <fhir-primitive label="ifModifiedSince" .value=${entry.request?.ifModifiedSince}
                                                    .type=${PrimitiveType.instant}></fhir-primitive>
                                    <fhir-primitive label="ifMatch" .value=${entry.request?.ifMatch}
                                                    .type=${PrimitiveType.fhir_string}></fhir-primitive>
                                    <fhir-primitive label="ifNoneExist" .value=${entry.request?.ifNoneExist}
                                                    .type=${PrimitiveType.fhir_string}></fhir-primitive>
                                `) : nothing}
                        ${isDefined(entry.response) ? renderSingleBackbone('response', noIndex, verbose, html`
                            <fhir-primitive label="status" .value=${entry.response?.status}
                                            .type=${PrimitiveType.fhir_string}></fhir-primitive>
                            <fhir-primitive label="location" .value=${entry.response?.location} .type=${PrimitiveType.uri}></fhir-primitive>
                            <fhir-primitive label="etag" .value=${entry.response?.etag} .type=${PrimitiveType.fhir_string}></fhir-primitive>
                            <fhir-primitive label="lastModified" .value=${entry.response?.lastModified}
                                            .type=${PrimitiveType.instant}></fhir-primitive>
                            ${renderResourceComponent(entry.response?.outcome, displayConfig)}
                        `) : nothing}
                    `
                },
                this.verbose
        ) : nothing}
        <fhir-signature label="signature" .data=${data.signature}></fhir-signature>
        ${renderResourceComponent(data.issues, this.display?.value)}


    `
  }


}
