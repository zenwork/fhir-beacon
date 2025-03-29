import {FhirResourceEnum}                    from 'FhirResourceEnum'
import {DefConstraintAssertion, DefProperty} from 'profiling/definition/types'
import {CodeIds}                             from '../../codes'



export class Definition<T> {

  name: FhirResourceEnum
  props = new Map<string, DefProperty<T>>()
  constraints: DefConstraintAssertion<T>[] = []

  constructor(name: FhirResourceEnum ) {
    this.name = name
  }

  set(kv: DefProperty<T>) {
    this.props.set(kv.key, kv)
  }

  get(key: string): DefProperty<T> | null {
    return this.props.get(key) || null
  }

  clone(): Definition<T> {
    const def = new Definition<T>(this.name)
    this.props.forEach((v, k) => def.set({ ...v, key: k }))
    return def
  }

  toString(indent: string = '\t'): string {
    return `${Array.from(this.props.values())
                   .map(v => {
                     const k: string = (indent + '' + v.key).padEnd(30, ' ')
                     const s: string = v.isSummary ? '∑ ' : '  '
                     const c: string = v.cardinality.padEnd(15, ' ')
                     // biome-ignore lint/suspicious/noExplicitAny: <explanation>
                     let b: any = ''
                     if (Array.isArray(v.bindings) && v.bindings.length > 0) {
                       b = ` (bind: ${v.bindings.join(',')})`
                     } else if (v.bindings && !Array.isArray(v.bindings)) {
                       const code: CodeIds = v.bindings as CodeIds
                       b = ` (bind: ${code} ${v.bindingStrength})`
                     }
                     if (v.type instanceof Definition) {
                       return `${k}${s}${c}BACKBONE${b}\n` + v.type.toString(indent + '    ')
                     }
                     let t: string
                     if (v.typeNarrowing.length > 0) {
                       t = `${v.type}(${v.typeNarrowing.join('|')})`
                     } else {
                       t = `${v.type}`
                     }
                     return `${k}${s}${c}${t}${b}`
                   }).join('\n')}`
  }

  toJSON(): object {
    const props: Record<string, DefProperty<T>> = {}
    // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
    this.props.forEach((v, k) => props[k] = v)

    return {
      name: this.name,
      props: props
    }
  }


}

export class Context<T> {
  constructor(public name: FhirResourceEnum, public def: Definition<T>) {}
}
