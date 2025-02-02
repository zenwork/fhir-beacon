import {Codes}           from '../../codes/Codes'
import {CodeIds}         from '../../codes/types'
import {CodingData}      from '../../components'
import {Choices}         from '../../valuesets/ValueSet.data'
import {reindex, sort}   from './ArraySortingFunction'
import {Decorated}       from './Decorate.types'
import {FqkMap}          from './DeepKeyMap'
import {FhirElementData} from './FhirElement.type'
import {
  CodeableConceptIdPair,
  CodeIdPair,
  ErrorNodeKey,
  errors,
  FullyQualifiedKey,
  KeyBase,
  KeyErrorPair,
  Validations
}                        from './Validations.type'



export class ValidationsImpl<D extends FhirElementData> implements Validations {
  readonly #data: Decorated<D>
  readonly #codes = new Codes()

  constructor(decorated: Decorated<D>) {this.#data = decorated}

  public mapForAll(): FqkMap {
    return new FqkMap(this.#data[errors].entries())
  }

  public messageFor(key: FullyQualifiedKey | string, delimiter: string = ';'): string | undefined {
    let error: string[] | undefined
    if (typeof key === 'string') {
      error = this.#data[errors].get({ path: [{ node: key }] })
    } else {
      error = this.#data[errors].get(key)
    }
    if (Array.isArray(error) && error.length > 0) return error.join(delimiter)
    return undefined
  }

  // public mapForKey(key: string): DeepKeyMap<FullyQualifiedKey, string[]> {
  //   if (!key) return new DeepKeyMap<FullyQualifiedKey, string[]>()
  //
  //   const keys: FullyQualifiedKey[] = []
  //   for (const fqk of this.#data[errors].keys()) {
  //     if (fqk.key === key) keys.push(fqk)
  //   }
  //   //todo: need deep copy
  //   const entries: [FullyQualifiedKey, string[]][]
  //     = keys.map(fqk => ([fqk, (this.#data[errors].get(fqk) ?? []) as string[]]))
  //
  //   return new DeepKeyMap<FullyQualifiedKey, string[]>(entries)
  // }

  // public mapForPath(path: string[]): DeepKeyMap<FullyQualifiedKey, string[]> {
  //   if (path.length === 0) return new DeepKeyMap<FullyQualifiedKey, string[]>()
  //
  //   const keys: FullyQualifiedKey[] = []
  //   for (const fqk of this.#data[errors].keys()) {
  //     if (path.every((val, index) => fqk.path
  //                                    && fqk.path[index] === val)) {
  //       keys.push(fqk)
  //     }
  //   }
  //   //todo: need deep copy
  //   const entries: [FullyQualifiedKey, string[]][]
  //     = keys.map(fqk => ([fqk, (this.#data[errors].get(fqk) ?? []) as string[]]))
  //
  //   return new DeepKeyMap<FullyQualifiedKey, string[]>(entries)
  // }

  public sliceForFQK(sliceKey: FullyQualifiedKey): FqkMap {
    if (!sliceKey) return new FqkMap()

    const matchingKeys: FullyQualifiedKey[] = []
    const storeKeys: FullyQualifiedKey[] = this.#data[errors].keys()
    for (const storeKey of storeKeys) {
      if (matches(sliceKey, storeKey)) matchingKeys.push(storeKey)
    }

    const entries: [FullyQualifiedKey, string[]][]
      = matchingKeys.map(fqk => {
      return ([slice(fqk), (this.#data[errors].get(fqk) ?? []) as string[]])
    })

    // console.log('\nentries')
    // console.log('key\n', entries.map(e => e[0].path), '\nvalues\n', entries.map(e => e[1]))

    return new FqkMap(reindex(sort(entries)))
  }

  public add({ fqk, message }: KeyErrorPair): void {
    if (!this.#data[errors].has(fqk)) this.#data[errors].set(fqk, [])
    this.#data[errors].get(fqk)!.push(message)
  }

  public rm(key: FullyQualifiedKey): boolean {
    return this.#data[errors].delete(key)
  }

  public rmAll(): boolean {
    this.#data[errors]
      .keys().forEach(key => this.#data[errors].delete(key))
    return true
  }

  public inspectCode({ key, code, id }: { key: KeyBase } & CodeIdPair): boolean {
    const codes = this.code(id)
    if (codes) {
      const valid: boolean = codes.choices.some(choice => code === choice.value)
      if (!valid) {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        const choiceList: any = codes.choices.map(c => c.value).join(', ')
        this.add({
                   fqk: { path: [{ node: key }] },
                   message: `${code} is not a valid ${id} code. Valid codes are: ${choiceList}`
                 })
      }
      return valid
    }
    return false
  }

  public inspectCodeableConcept({ key, concept, bindingId }: { key: KeyBase } & CodeableConceptIdPair): boolean {

    const codes = this.code(bindingId)

    const validateOne = (coding: CodingData, i: number) => {
      const valid: boolean =
        codes.choices.some(choice => {
          return coding.code === choice.value
                 && coding.system === codes.system
        })

      if (!valid) {
        const choices: string = codes.choices.map(c => c.value).join(', ')
        this.add(
          {
            fqk: { path: [{ node: key, index: i }, { node: 'coding' }, { node: 'code' }], key: 'binding' },
            message: `${coding.code} is not a valid ${bindingId} code. Valid codes are: ${choices}`
          }
        )
      }

    }

    if (concept) {
      if (concept instanceof Array) {
        concept.forEach(validateOne)
      } else {
        validateOne(concept.coding as CodingData, 0)
      }
    }

    return false
  }

  public all(): KeyErrorPair[] {
    return this
      .#data[errors]
      .entries()
      .flatMap(([fqk, messages]) => messages.map(message => ({ fqk, message }))
      )
  }

  private allFor(fqks: FullyQualifiedKey[]): KeyErrorPair[] {
    if (!fqks || fqks.length === 0) return []

    const pairs: KeyErrorPair[] = []
    for (const entry of this.#data[errors].entries()) {
      if (fqks.some(fqk => fqk === entry[0])) {
        pairs.push(...entry[1].map(message => {return { fqk: entry[0], message } }))
      }
    }
    return pairs
  }

  private code(id: CodeIds): Choices {
    return this.#codes.get(id)!
  }
}

export function slice(fqk: FullyQualifiedKey): FullyQualifiedKey {
  const copy: FullyQualifiedKey = JSON.parse(JSON.stringify(fqk))
  copy.path = (copy.path && copy.path.length > 0) ? copy.path.slice(1) : copy.path
  return copy
}

export function matches(sliceKey: FullyQualifiedKey, storeKey: FullyQualifiedKey): boolean {
  const pathMatch: boolean = !!sliceKey.path
                             && !!storeKey.path
                             && sliceKey.path.every((p, index) => {

                                                      const storeNode: ErrorNodeKey = storeKey.path[index]

                                                      const nodeMatch: boolean = storeNode.node === p.node
                                                      const indexMatch: boolean = p.index !== undefined && (storeNode.index
                                                                                                            === undefined
                                                                                                            && p.index
                                                                                                            === 0
                                                                                                            || (storeNode.index
                                                                                                                !== undefined
                                                                                                                && storeNode.index
                                                                                                                === p.index))
                                                      const indexDoesntMatter: boolean = p.index === undefined
                                                      //console.log(nodeMatch, '&& (', indexDoesntMatter, '||',
                                                      // indexMatch, ') ----', p, '----', storeNode)
                                                      return nodeMatch && (indexMatch || indexDoesntMatter)
                                                    }
    )

  const keyMatch: boolean = !!sliceKey.key && sliceKey.key === storeKey.key
  const indexMatch: boolean = sliceKey.index !== undefined && sliceKey.index === storeKey.index
  const keyDoesntMatter: boolean = !sliceKey.key
  const indexDoesntMatter: boolean = sliceKey.index === undefined

  let matches: boolean = false
  if (pathMatch && keyMatch && indexMatch) {
    // console.log('   MATCH: pathMatch && keyMatch && indexMatch              ',JSON.stringify(sliceKey),'|||',
    // JSON.stringify(storeKey))
    matches = true
  } else if (pathMatch && keyMatch && indexDoesntMatter) {
    // console.log('   MATCH: pathMatch && keyMatch && indexDoesntMatter       ',JSON.stringify(sliceKey),'|||',
    // JSON.stringify(storeKey))
    matches = true
  } else if (pathMatch && keyDoesntMatter && indexDoesntMatter) {
    // console.log('   MATCH: pathMatch && keyDoesntMatter && indexDoesntMatter',JSON.stringify(sliceKey),'|||',
    // JSON.stringify(storeKey))
    matches = true
  } else {
    // console.log('NO MATCH:
    // ',JSON.stringify(sliceKey),'|||',JSON.stringify(storeKey))
  }
  return matches
}
