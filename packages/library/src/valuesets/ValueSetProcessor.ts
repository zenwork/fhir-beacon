import {
  isLoadableStore,
  isResolutionError,
  LoadableStore,
  ResolvedValue,
  ResolvedValueSet,
  ValueAsChoice,
  ValueSetChoices,
  ValueSetSource
} from './ValueSet.data'



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
      this.#source.load()
      this.#ready = this.#source.isLoaded()
    }
  }

  process(id: string): Promise<ValueSetChoices> {
    return this.#ready
               .then(() =>
                       this.#source
                           .resolve(id)
                           .then((resolved: ResolvedValueSet) => {

                             if (isResolutionError(resolved.origin)) {
                               return {
                                 id: resolved.origin.source,
                                 name: resolved.origin.error,
                                 choices: [],
                                 valid: false
                               }
                             }

                             const reducedSet: ResolvedValue[] = removeValues(resolved.compose.include.concept,
                                                                              resolved.compose.exclude.concept)

                             const choices: ValueAsChoice[] =
                               reducedSet.map(c => ({
                                 value: c.code,
                                 display: c.display
                               }))

                             return {
                               id: resolved.id,
                               name: resolved.name,
                               valid: true,
                               choices
                             } as ValueSetChoices
                           }))
  }

  public processAll(debug: boolean = false): Promise<ValueSetChoices[]> {
    return this.#ready
               .then(() => this.#source.cacheAll(debug))
               .then(() => this.#source.allIds())
               .then((ids: string[]) => Promise.all(ids.map(id => this.process(id))))

  }

  public all(): Promise<ValueSetChoices[]> {
    return Promise.resolve([])

  }
}
