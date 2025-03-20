import {Prop} from 'profiling/profiling.types'



export class Definition {

  name: string
  refines: string | null
  props = new Map<string, Prop>()

  constructor(name: string = 'unknown', refines?: string) {
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
                     const k: string = (indent + '-' + v.key).padEnd(30, ' ')
                     const s: string = v.isSummary ? 'S ' : '  '
                     const c: string = v.cardinality.padEnd(15, ' ')
                     const b: any = v.bindings.length > 0 ? ` (${v.bindings.join(',')})` : ''
                     if (v.type instanceof Definition) {
                       const t: Definition = v.type
                       return `${k}${s}${c}BACKBONE${b}\n` + v.type.toString(indent + '    ')
                     }

                     const t: string = v.type
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
  constructor(public name: string, public refines: string = '', public def: Definition) {}
}
