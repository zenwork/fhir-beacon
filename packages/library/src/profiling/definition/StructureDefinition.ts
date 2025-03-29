import {ResourceDef}                         from 'ResourceDef'
import {CodeIds}                             from '../../codes'
import {DefConstraintAssertion, PropertyDef} from '../definition/types'
import {alternatingColor}                    from '../util/AlternatingLogger'



export class StructureDefinition<T> {

  type: ResourceDef
  props = new Map<string, PropertyDef<T>>()
  constraints: DefConstraintAssertion<T>[] = []

  constructor(name: ResourceDef) {
    this.type = name
  }

  set(kv: PropertyDef<T>) {
    if (kv.subdefs) console.log(kv.type)
    this.props.set((kv.choice || '') + kv.key, kv)
  }

  get(key: string): PropertyDef<T> | null {
    return this.props.get(key) || null
  }

  clone(): StructureDefinition<T> {
    const def = new StructureDefinition<T>(this.type)
    this.props.forEach((v, k) => def.set({ ...v, key: k }))
    return def
  }

  toString(indent: string = '\t'): string {
    return this.propToString(Array.from(this.props.values()), indent)
  }
  toJSON(): object {
    const props: Record<string, PropertyDef<T>> = {}

    // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
    this.props.forEach((v, k) => props[k] = toSerializable(v))

    return {
      name: this.type,
      props: props
    }
  }
  private propToString(iterable: PropertyDef<T>[], indent: string): string {
    return `${iterable
      .map((v: PropertyDef<T>) => {
        let marker = ''
        if (v.choice) marker = `[x] ${v.choice}`
        const k: string = (indent + marker + v.key).padEnd(40, ' ')
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


        if (v.subdefs) {
          const subs: string = this.propToString(Array.from(v.subdefs.values()), indent + '\t')
          const desc: string = `${k}${s}${c}${v.type}(BACKBONE)${b}`
          return alternatingColor(`${desc}\n${subs}`)
                     }

                     let t: string
                     if (v.typeNarrowing.length > 0) {
                       t = `${v.type}(${v.typeNarrowing.join('|')})`
                     } else {
                       t = `${v.type}`
                     }

        // @ts-ignore
        return alternatingColor(`${k}${s}${c}${t}${b}`)
                   }).join('\n')}`
  }


}

export class Context<T> {
  constructor(public name: ResourceDef, public def: StructureDefinition<T>) {}
}


/**
 * Recursively converts Maps and other non-serializable objects to JSON-serializable objects
 * Especially useful for PropertyDef objects that have Maps in their subdefs property
 */

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
function toSerializable(obj: any): any {
  // Handle null/undefined
  if (obj == null) return obj

  // Handle Map instances - convert to plain object
  if (obj instanceof Map) {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const plainObj: Record<string, any> = {}
    obj.forEach((value, key) => {
      plainObj[key] = toSerializable(value)
    })
    return plainObj
  }

  // Handle arrays - recursively convert each element
  if (Array.isArray(obj)) {
    return obj.map(item => toSerializable(item))
  }

  // Handle plain objects - recursively convert each property
  if (typeof obj === 'object') {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const result: Record<string, any> = {}
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        result[key] = toSerializable(obj[key])
      }
    }
    return result
  }

  // Return primitive values as is
  return obj
}
