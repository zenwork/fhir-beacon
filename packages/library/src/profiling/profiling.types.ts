import {FhirDatatypeName}    from 'FhirDatatypeName'
import {FhirPrimitiveName}   from 'FhirPrimitiveName'
import {FhirResourceEnum}    from 'FhirResourceEnum'
import {FhirResourceName}    from 'FhirResourceName'
import {BindingStrength}     from 'profiling/BindingStrength'
import {CodeIds}             from '../codes'
import {Context, Definition} from './definition'
import {NarrowableNames}     from './prop'



export type  Action = {
  optional: () => Action
  required: () => Action
  hasMany: () => Action
  boundBy: (binding: CodeIds | string[], strength?: BindingStrength) => Action
  constrainedBy: (constraints: (() => { key: string, error: string })[]) => Action
  mustSupport: () => Action
  isModifier: () => Action
  isSummary: () => Action
}

export type InternalAction = Action & {
  setCtx: (ctx: Context) => void,
  run: () => void
}

export type Prop = {
  key: string,
  type: FhirPrimitiveName | FhirDatatypeName | FhirResourceName | Definition,
  typeNarrowing: NarrowableNames[]
  cardinality: string,
  bindings: CodeIds | string[],
  bindingStrength: BindingStrength,
  constraints: (() => { key: string, error: string })[],
  mustSupport: boolean | undefined,
  isModifier: boolean | undefined,
  isSummary: boolean | undefined,
}

export type DefineProps = { name: FhirResourceEnum | string, base?: Definition, props?: Action[] }
