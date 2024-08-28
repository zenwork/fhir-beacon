import {html, TemplateResult}              from 'lit'
import {DisplayConfig}                     from '../../../types'
import {FhirElementData, ValidationErrors} from '../data'

import {Decorated} from '../Decorated'

export type GenKey = 'header' | 'body' | 'footer'

export type TemplateGenerator<T extends FhirElementData> = (config: DisplayConfig,
                                                            data: Decorated<T>,
                                                            errors: ValidationErrors) => TemplateResult[]
export type GeneratorGroup<T extends FhirElementData> = { [key in GenKey]: TemplateGenerator<T>[] }

export type Generators<T extends FhirElementData> = {
  structure: GeneratorGroup<T>,
  display: GeneratorGroup<T>,
  override: GeneratorGroup<T>,
  debug: GeneratorGroup<T>,
  error: GeneratorGroup<T>,
}

export const EmptyResult = [html``] as TemplateResult<any>[]

export function NullGeneratorGroup() {
  return {
    header: [],
    body: [],
    footer: []
  }
}

export function NullGenerators<T extends FhirElementData>(): Generators<T> {
  return {
    structure: NullGeneratorGroup(),
    display: NullGeneratorGroup(),
    override: NullGeneratorGroup(),
    debug: NullGeneratorGroup(),
    error: NullGeneratorGroup()
  }
}
