import {html, TemplateResult}                           from 'lit'
import {customElement}                                  from 'lit/decorators.js'
import {BaseElementProvider}                            from '../../../internal/base/base-element-provider'
import {renderResourceComponent}                        from '../../../internal/resource/renderResourceComponent'
import {renderBackboneCollection, renderSingleBackbone} from '../../../shell/layout/renderBackboneCollection'
import {PrimitiveType}                                  from '../../primitive/type-converters'
import {BundleData}                                     from './bundle.data'
import '../../../index'

@customElement('fhir-bundle')
export class Bundle extends BaseElementProvider<BundleData> {
  constructor() {super('Bundle')}


  protected renderDisplay(data: BundleData): TemplateResult | TemplateResult[] {
    return html`not implemented`
  }

  protected renderStructure(data: BundleData): TemplateResult | TemplateResult[] {
    return html`
      <fhir-identifier label="identifier" .data=${data.identifier}></fhir-identifier >
      <fhir-primitive label="type" .value=${data.type} .type=${PrimitiveType.code}></fhir-primitive >
      <fhir-primitive label="timestamp" .value=${data.timestamp} .type=${PrimitiveType.instant}></fhir-primitive >
      <fhir-primitive label="total" .value=${data.total} .type=${PrimitiveType.unsigned_int}></fhir-primitive >
      ${renderBackboneCollection('links', 'link', data.link,
          (item) => html`
            <fhir-primitive label="relation" .value=${item.relation} .type=${PrimitiveType.code}></fhir-primitive >
            <fhir-primitive label="url" .value=${item.url} .type=${PrimitiveType.uri}></fhir-primitive >
          `,
          this.verbose)}
      ${renderBackboneCollection('entries', 'entry', data.entry,
          (entry) => {
            return html`
              ${renderBackboneCollection('links', null, entry.link, (item, idx) => html`
                <fhir-primitive label="link" .value=${item} .type=${PrimitiveType.link}></fhir-primitive >
              `, this.verbose)}
              <fhir-primitive label="fullURL" .value=${entry.fullUrl} .type=${PrimitiveType.uri}></fhir-primitive >
              ${renderResourceComponent(entry.resource, this.display.value)}
              ${renderSingleBackbone('search', null, this.display.value.verbose,
                  html`
                    <fhir-primitive label="mode" .value=${entry.search?.mode} .type=${PrimitiveType.code}></fhir-primitive >
                    <fhir-primitive label="score" .value=${entry.search?.score} .type=${PrimitiveType.code}></fhir-primitive >
                  `)}
            `
          },
          this.verbose
      )}


    `
  }


}
