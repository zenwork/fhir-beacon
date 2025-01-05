/* eslint-disable @typescript-eslint/no-unused-vars */
import {html, nothing, PropertyValues, TemplateResult} from 'lit'
import {PrimitiveType}                                 from '../../components/primitive/type-converters/type-converters'
import {DisplayConfig}                                 from '../../types'
import {Decorated, meta, NoDataObject}                 from '../base'
import {DomainResourceData, ResourceData}              from './domain-resource.data'
import {renderResourceComponent}                       from './renderResourceComponent'
import {Resource}                                      from './Resource'



class Validations {
}

export abstract class DomainResource<T extends DomainResourceData> extends Resource<T> {

  protected constructor(name: string) {
    super(name)
  }

  public renderNarrative(config: DisplayConfig,
                         data: Decorated<T>,
                         validations: Validations): TemplateResult[] {
    if (data.text) {
      return [
        html`
            <fhir-wrapper label=${this.type} ?summaryonly=${this.summaryonly}>
                <fhir-narrative .data=${data.text}></fhir-narrative >
            </fhir-wrapper>`
      ]
    }

    return [html``]
  }


  protected willUpdate(changes: PropertyValues): void {
    super.willUpdate(changes)
    this.templateGenerators.structure.header.push(this.renderDomainResourceStructure)
    if (this.verbose && (!this.data || this.data === NoDataObject)) {
      this.extendedData[meta].hide = false
    }
  }

  protected renderDomainResourceStructure(config: DisplayConfig, data: Decorated<T>): TemplateResult[] {
    return [
      html`
          <fhir-narrative key="text" .data=${data.text} .open=${false}></fhir-narrative>
      `,
      html`
          ${(this.data.contained && !this.summaryonly) ? html`
              <fhir-wrapper label="contained" variant='details' ?summaryonly=${this.summaryonly}>
                  ${this.renderStructureContained()}
              </fhir-wrapper>
          ` : nothing}
          ${(!this.data.contained && this.verbose && !this.summaryonly) ? html`
              <fhir-wrapper label="contained" variant='details' ?summaryonly=${this.summaryonly}>
                  <fhir-empty-list ></fhir-empty-list >
              </fhir-wrapper>` : nothing}
      `,
      html`
          <fhir-primitive label="extension" value="not implemented" .type=${PrimitiveType.none}></fhir-primitive >
          <fhir-primitive label="modifierExtension"
                          value="not implemented"
                          .type=${PrimitiveType.none}
                          summary
          ></fhir-primitive>
      `
    ]
  }

  protected renderStructureContained(): TemplateResult[] {
    if (this.data?.contained) {
      return this.data.contained.map((c: ResourceData) => {
        return renderResourceComponent(c, this.config(), this.summary)
      })
    }
    return []
  }
}
