import {Context, Definition} from './definition'



export type  Action = {
  optional: () => Action
  required: () => Action
  hasMany: () => Action
  boundBy: (...binding: string[]) => Action
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
  type: string | Definition,
  cardinality: string,
  bindings: string[],
  constraints: (() => { key: string, error: string })[],
  mustSupport: boolean | undefined,
  isModifier: boolean | undefined,
  isSummary: boolean | undefined,
}

export type DefineProps = { name: string, base?: Definition, props?: Action[] }
