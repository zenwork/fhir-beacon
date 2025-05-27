import {CodeIds}                                                from '../../codes'
import {DomainResourceData, FhirElementData, TemplateGenerator} from '../../internal'
import {DisplayMode}                                            from '../../shell'
import {Choice, Choices}                                        from '../../valuesets'
import {Context}                                                from '../definition'
import {DefConstraintAssertion}                                 from '../definition/definition.type'
import {BindingStrength}                                        from '../util'



export type Decorateable = FhirElementData | DomainResourceData

export type Builder<T extends Decorateable> = {
  setCtx: (ctx: Context<T>) => void,
  build: () => void
}


export type  RenderBuilder<T extends Decorateable> = Builder<T> & {

  extendRender: (forMode: DisplayMode, fn: TemplateGenerator<T>) => RenderBuilder<T>,
  overrideRender: (forMode: DisplayMode, fn: TemplateGenerator<T>) => RenderBuilder<T>,

}

export type  PropertyBuilder<T extends Decorateable> = Builder<T> & {
  optional: () => PropertyBuilder<T>
  required: () => PropertyBuilder<T>
  hasMany: () => PropertyBuilder<T>
  boundBy: (binding: CodeIds | Choice[] | Choices, strength?: BindingStrength) => PropertyBuilder<T>
  constrainedBy: (constraints: DefConstraintAssertion<T>[]) => PropertyBuilder<T>
  mustSupport: () => PropertyBuilder<T>
  isModifier: () => PropertyBuilder<T>
  isSummary: () => PropertyBuilder<T>
}
