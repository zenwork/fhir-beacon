import {Definition} from 'profiling/definition'
import {Prop}       from 'profiling/profiling.types'



export function property(key: string,
                         type: string | Definition,
                         cardinality: string = '1..1',
                         bindings: string[] = [],
                         constraints: (() => { key: string, error: string })[] = [],
                         mustSupport: boolean | undefined = undefined,
                         isModifier: boolean | undefined = undefined,
                         isSummary: boolean | undefined = undefined) {
  return { key, type, cardinality, bindings, constraints, mustSupport, isModifier, isSummary } as Prop
}
