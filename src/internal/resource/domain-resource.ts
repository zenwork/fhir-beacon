/* eslint-disable @typescript-eslint/no-unused-vars */
import {html, nothing, PropertyValues, TemplateResult} from 'lit'
import {PrimitiveType}                                 from '../../components/primitive/type-converters/type-converters'
import {DisplayConfig}                                 from '../../types'
import {Decorated, NoDataSet, ValidationErrors}        from '../base'
import {DomainResourceData, ResourceData}              from './domain-resource.data'
import {renderResourceComponent}                       from './renderResourceComponent'
import {Resource}                                      from './resource'


export abstract class DomainResource<T extends DomainResourceData> extends Resource<T> {

  protected constructor(name: string) {
    super(name)
  }

  public renderNarrative(config: DisplayConfig,
                         data: Decorated<T>,
                         errors: ValidationErrors): TemplateResult[] {
    if (data.text) {
      return [
        html`
            <fhir-wrapper .label=${this.type}>
                <fhir-narrative .data=${data.text}></fhir-narrative >
            </fhir-wrapper >`
      ]
    }

    return [html``]
  }


  protected willUpdate(changes: PropertyValues): void {
    super.willUpdate(changes)
    this.templateGenerators.structure.header.push(this.renderDomainResourceStructure)
    if (this.verbose && (!this.data || this.data === NoDataSet)) {
      this.errors.push({ id: 'DISPLAY_NOTHING', err: 'no data provided' })
    }
  }

  protected renderDomainResourceStructure(config: DisplayConfig, data: Decorated<T>): TemplateResult[] {
    return [
      html`
          <fhir-narrative key="text" .data=${data.text} ?forceclose=${true}></fhir-narrative >
      `,
      html`
          ${(this.data.contained && !this.summaryMode()) ? html`
              <fhir-structure-wrapper label="contained" ?forceclose=${true}>
                  ${this.renderStructureContained()}
              </fhir-structure-wrapper >
          ` : nothing}
          ${(!this.data.contained && this.verbose && !this.summaryMode()) ? html`
              <fhir-structure-wrapper label="contained" ?forceclose=${true}>
                  <fhir-empty-list ></fhir-empty-list >
              </fhir-structure-wrapper >` : nothing}
      `,
      html`
          <fhir-primitive label="extension" value="not implemented" .type=${PrimitiveType.none}></fhir-primitive >
          <fhir-primitive label="modifierExtension" value="not implemented" .type=${PrimitiveType.none}></fhir-primitive >
      `
    ]
  }

  protected renderStructureContained(): TemplateResult[] {
    if (this.data?.contained) {
      return this.data.contained.map((c: ResourceData) => {
        return renderResourceComponent(c, this.getDisplayConfig())
      })
    }
    return []
  }
}
