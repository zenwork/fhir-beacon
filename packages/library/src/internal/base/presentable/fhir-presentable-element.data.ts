import {html, TemplateResult} from 'lit'
import {Decorateable}         from '../../../profiling'
import {DisplayConfig}        from '../../../shell/types'
import {Decorated}            from '../Decorate.types'
import {FhirElementData}      from '../FhirElement.type'

import {Validations} from '../Validations.type'



export type GenKey = 'header' | 'body' | 'footer'

export type TemplateGenerator<T extends Decorateable> = (config: DisplayConfig,
                                                            data: Decorated<T>,
                                                            errors: Validations) => TemplateResult[]

export type GeneratorGroup<T extends Decorateable> = { [key in GenKey]: TemplateGenerator<T>[] }

export type Generators<T extends Decorateable> = {
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
