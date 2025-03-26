import {FhirResourceEnum} from 'FhirResourceEnum'
import {Prop}             from 'profiling/profiling.types'
import {CodeIds}          from '../codes'



export class Definition {

  name: FhirResourceEnum | string
  refines: FhirResourceEnum | string | null
  props = new Map<string, Prop>()

  constructor(name: FhirResourceEnum | string = 'unknown', refines?: FhirResourceEnum | string) {
    this.name = name
    this.refines = refines ?? name
  }

  set(kv: Prop) {
    this.props.set(kv.key, kv)
  }

  get(key: string): Prop | null {
    return this.props.get(key) || null
  }

  clone(): Definition {
    const def = new Definition(String(this.name), String(this.refines))
    this.props.forEach((v, k) => def.set({ ...v, key: k }))
    return def
  }

  toString(indent: string = '\t') {
    return `${Array.from(this.props.values())
                   .map(v => {
                     const k: string = (indent + '' + v.key).padEnd(30, ' ')
                     const s: string = v.isSummary ? '∑ ' : '  '
                     const c: string = v.cardinality.padEnd(15, ' ')
                     let b: any = ''
                     if (Array.isArray(v.bindings) && v.bindings.length > 0) {
                       b = ` (bind: ${v.bindings.join(',')})`
                     } else if (v.bindings && !Array.isArray(v.bindings)) {
                       const code: CodeIds = v.bindings as CodeIds
                       b = ` (bind: ${code} ${v.bindingStrength})`
                     }
                     if (v.type instanceof Definition) {
                       const t: Definition = v.type
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

  toJSON() {
    let props = {}
    this.props.forEach((v, k) => props[k] = v)

    return {
      name: this.name,
      refines: this.refines,
      props: props
    }
  }


}

export class Context {
  constructor(public name: FhirResourceEnum | string,
              public refines: FhirResourceEnum | string = '',
              public def: Definition) {}
}
