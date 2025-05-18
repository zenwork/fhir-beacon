import {CodeIds}          from '../../codes'
import {DatatypeDef}      from '../../DatatypeDef'
import {Validations}      from '../../internal/index'
import {ResourceDef}      from '../../ResourceDef'
import {alternatingColor} from '../util/AlternatingLogger'
import {
  Def,
  DefConstraintAssertion,
  Defs,
  ExtensionDef,
  isExtensionDef,
  isPrimitiveExtensionDef,
  isPropertyDef,
  isPropertySliceDef,
  PropertyDef,
  PropertySliceDef
}                         from './definition.type'



/**
 * StructureDefinition class serves as a blueprint for defining a resource structure.
 * It provides functionality to set, retrieve, and manipulate properties and constraints
 * for a given resource definition. The class also supports creating deep clones,
 * serializing, and converting structure definitions into a JSON or string representation.
 *
 * @template T - The data type associated with the resource structure.
 */
export class StructureDefinition<T> {

  type: ResourceDef | DatatypeDef
  props = new Map<string, Defs<T>>()
  constraints: DefConstraintAssertion<T>[] = []

  constructor(name: ResourceDef | DatatypeDef) {
    this.type = name
  }

  set(prop: Defs<T>, key?: string) {
    const k = key ?? flattenKey(prop.key, prop.choice)
    this.props.set(k, prop)
  }

  get(key: string | string[], choicePrefix?: string): Defs<T> | null {
    return this.props.get(flattenKey(key, choicePrefix)) || null
  }

  getSlice(key: string | string[], choicePrefix?: string): PropertySliceDef<T> | null {
    const value = this.get(key, choicePrefix) || null
    if (value && isPropertySliceDef(value)) {
      return value
    } else {
      return null
    }
  }

  getProperty(key: string | string[], choicePrefix?: string): PropertyDef<T> | null {
    const value = this.get(key, choicePrefix) || null
    if (value && isPropertyDef(value)) {
      return value
    } else {
      return null
    }
  }

  getExtension(key: string | string[], choicePrefix?: string): ExtensionDef | null {
    const value = this.get(key, choicePrefix) || null
    if (value && isExtensionDef(value)) {
      return value
    } else {
      return null
    }
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
    const props: Record<string, Defs<T>> = {}

    // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
    this.props.forEach((v, k) => props[k] = toSerializable(v))

    return {
      name: { ...this.type },
      props: props
    }
  }

  validate(data: T, validations: Validations, fetched: boolean): void {

    this.props.forEach((def: Defs<T>, key: string) => {

      if (isPropertyDef(def)) {
        def.constraints.forEach((constraint: DefConstraintAssertion<T>) => {
          // @ts-ignore
          const value: any = constraint._fixedValue
          const result: { success: false; message?: string } | { success: true } = constraint(data, value)
          if (!result.success) {
            const message: string = (result.message ?? `Constraint ${constraint.name} failed for ${key}`) + ` (${this.type.profileName})`
            validations.add({ fqk: { path: [{ node: key }] }, message })
          }
        })
      }

      if (isPrimitiveExtensionDef(def)) {
        const refKey: string = def.key.toString().substring(1)
        // @ts-ignore
        if (Object.keys(data).some(k => k === refKey)) {
          // @ts-ignore
          // console.log('found match for ', def.key, Object.keys(data).find(k => k === refKey))

          if (def.subdefs) {
            def.subdefs.forEach((subdef: Def, subkey: string) => {
              const d = subdef as ExtensionDef

              // @ts-ignore
              data[def.key].extension
                           .filter((ext: { url: string }) => ext.url === d.url)
                           .forEach((e: any) => {
                             // console.log(e)
                             // console.log('\n')
                             // console.log(subdef)

                             validations.add({
                                               fqk: {
                                                 path: [
                                                   { node: 'extension' },
                                                   { node: 'https://fhir.ch/ig/ch-core/5.0.0/StructureDefinition-ch-ext-ech-46-phonecategory.html' },
                                                   { node: 'valueCodeableConcept' },
                                                   { node: 'coding' },
                                                   { node: 'code' }
                                                 ]
                                               }, message: 'wrong binding value'
                                             })
                           })
            })
          }
        }

      }


    })
  }

  private propToString(iterable: Defs<T>[], indent: string): string {
    return `${iterable
      .map((v: Defs<T>) => {
        if (isPropertyDef(v)) {

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

          return alternatingColor(`${k}${(i + s).padStart(8, ' ') + ' '}${c}${t}${b}`)
        } else if (isPropertySliceDef(v)) {
          return alternatingColor(`slice`)
        } else if (isExtensionDef(v)) {
          return alternatingColor(`extension`)
        } else {
          throw new Error(`Unknown property type:\n${JSON.stringify(v)}`)
        }

      }).join('\n')}`
  }


}

export function flattenKey<T>(key: string | string[], choicePrefix?: string): string {
  const keyParts = Array.isArray(key) ? key.join('.') : key
  const flattened: string = (choicePrefix ?? '') + keyParts
  return flattened
}

export class Context<T> {
  constructor(public name: ResourceDef | DatatypeDef, public def: StructureDefinition<T>) {}
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
