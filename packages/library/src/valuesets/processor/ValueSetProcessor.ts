import {
  Choice,
  Choices,
  isLoadableStore,
  isResolutionError,
  LoadableStore,
  ResolvedSet,
  ResolvedValue,
  ValueSetSource
} from '../ValueSet.data'



/**
 * Removes values from the source array that are included in the valuesToRemove array.
 *
 * @param included - The array to filter.
 * @param excluded - The array of values to remove from the source array.
 * @returns A new array with the values removed.
 */
export function removeValues(included: ResolvedValue[], excluded: ResolvedValue[]): ResolvedValue[] {
  const reducedSet: ResolvedValue[] = included.filter((item) => !excluded.includes(item))
  return reducedSet
}

export class ValueSetProcessor {

  #source: ValueSetSource | LoadableStore
  #ready: Promise<boolean> = Promise.resolve(true)


  constructor(source: ValueSetSource | LoadableStore) {
    this.#source = source
    if (isLoadableStore(this.#source)) {
      this.#ready = this.#source.isLoaded()
    }
  }

  process(id: string, debug?: boolean): Promise<Choices[]> {

    return this.#ready
               .then(() =>
                       this.#source
                           .resolve(id, debug)
                           .then((resolvedSets: ResolvedSet[]) => {
                             return resolvedSets.map(set => {

                               if (isResolutionError(set.origin)) {
                                 return {
                                   id: set.id,
                                   name: set.name,
                                   type: set.type,
                                   system: set.system,
                                   choices: [],
                                   valid: false,
                                   origin: set.origin
                                 }
                               }

                               const reducedSet: ResolvedValue[] = removeValues(set.compose.include.concept,
                                                                                set.compose.exclude.concept)

                               const choices: Choice[] =
                                 reducedSet.map(c => ({
                                   value: c.code,
                                   display: c.display
                                 }))

                               return {
                                 id: set.id,
                                 name: set.name,
                                 type: set.type,
                                 system: set.system,
                                 valid: true,
                                 choices
                               } as Choices

                             })
                           }))
  }


  public async processAll(debug: boolean = false): Promise<Choices[]> {
    const ids: string[] = await this.#ready.then(() => this.#source.allIds())

    const results: Choices[] = []
    let promises: Promise<Choices[]>[] = []
    for (const id of ids) {
      try {
        // console.log(`starting processing: ${id}`)
        promises.push(this.process(id, debug))
        if (promises.length >= 16) {
          // console.log(`waiting on processing`)
          const r = (await Promise.all(promises)).flat()
          results.push(...r)
          promises = []
          // console.log(`next batch:`)
        }

      } catch (e) {
        throw new Error(`Failed to process valueset: ${id} - ` + e)
      }
    }
    const r: Choices[] = (await Promise.all(promises)).flat()
    results.push(...r)

    //console.log('returning results')
    return results
  }


  public all(): Promise<Choices[]> {
    return Promise.resolve([])

  }
}
