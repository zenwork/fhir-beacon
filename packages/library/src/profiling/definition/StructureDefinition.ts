import {ResourceDef}                            from 'ResourceDef'
import {CodeIds}                                from '../../codes'
import {DefConstraintAssertion, SetPropertyDef} from '../definition/types'
import {alternatingColor}                       from '../util/AlternatingLogger'



/**
 * StructureDefinition class serves as a blueprint for defining a resource structure.
 * It provides functionality to set, retrieve, and manipulate properties and constraints
 * for a given resource definition. The class also supports creating deep clones,
 * serializing, and converting structure definitions into a JSON or string representation.
 *
 * @template T - The data type associated with the resource structure.
 */
export class StructureDefinition<T> {

  type: ResourceDef
  props = new Map<string, SetPropertyDef<T>>()
  constraints: DefConstraintAssertion<T>[] = []

  constructor(name: ResourceDef) {
    this.type = name
  }

  set(prop: SetPropertyDef<T>) {
    const key = flattenKey(prop.key, prop.choice)
    this.props.set(key, prop)
  }

  get(key: string | string[], choicePrefix?: string): SetPropertyDef<T> | null {
    return this.props.get(flattenKey(key, choicePrefix)) || null
  }

  clone(): StructureDefinition<T> {
    const def = new StructureDefinition<T>(this.type)
    this.props.forEach((v, k) => def.set({ ...v, key: k }))
    return def
  }

  toString(indent: string = '    '): string {
    return this.propToString(Array.from(this.props.values()), indent)
  }

  toJSON(): object {
    const props: Record<string, SetPropertyDef<T>> = {}

    // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
    this.props.forEach((v, k) => props[k] = toSerializable(v))

    return {
      name: this.type,
      props: props
    }
  }

  private propToString(iterable: SetPropertyDef<T>[], indent: string): string {
    return `${iterable
      .map((v: SetPropertyDef<T>) => {

        // choice marker
        let marker = ''
        if (v.choice) marker = `[x] ${v.choice}`

        // key
        const k: string = (indent + marker + (Array.isArray(v.key) ? v.key.join('.') : v.key)).padEnd(50, ' ')
        // summary
        const s: string = v.isSummary ? '∑' : '  '
        // cardinality
        const c: string = v.cardinality.padEnd(15, ' ')

        // invarients (constraints)
        let i: string = v.constraints.length > 0 ? 'C' : ''
        // @ts-ignore
        i = i + (v.constraints.some(c => c._constraintType === 'profile-constraint') ? 'π' : '')
        // @ts-ignore
        i = i + (v.constraints.some(c => c._constraintType === 'prop-constraint') ? 'ἱ' : '')
        i = i + ' '
        //bindings
        let b: any = ''
        if (Array.isArray(v.bindings) && v.bindings.length > 0) {
          b = ` (bind: ${v.bindings.join(',')})`
        } else if (v.bindings && !Array.isArray(v.bindings)) {
          const code: CodeIds = v.bindings as CodeIds
          b = ` (bind: ${code} ${v.bindingStrength})`
        }

        // backbone properties
        if (v.subdefs) {
          const desc: string = alternatingColor(`${k}${(i + s).padStart(8, ' ') + ' '}${c}${v.type}(BACKBONE)${b}`)
          const subs: string = this.propToString(Array.from(v.subdefs.values()), indent + '    ')
          return `${desc}\n${subs}`
        }

        let t: string
        if (v.typeNarrowing.length > 0) {
          t = `${v.type}(${v.typeNarrowing.join('|')})`
        } else {
          t = `${v.type}`
        }

        // @ts-ignore
        return alternatingColor(`${k}${(i + s).padStart(8, ' ') + ' '}${c}${t}${b}`)
      }).join('\n')}`
  }


}

export function flattenKey<T>(key: string | string[], choicePrefix?: string): string {
  const keyParts = Array.isArray(key) ? key.join('.') : key
  const flattened: string = (choicePrefix ?? '') + keyParts
  return flattened
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
