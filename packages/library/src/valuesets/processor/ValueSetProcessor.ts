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
      this.#source.load()
      this.#ready = this.#source.isLoaded()
    }
  }

  process(id: string, debug?: boolean): Promise<Choices> {

    return this.#ready
               .then(() =>
                       this.#source
                           .resolve(id, debug)
                           .then((resolved: ResolvedSet) => {

                             if (isResolutionError(resolved.origin)) {
                               return {
                                 id: resolved.id,
                                 name: resolved.name,
                                 type: resolved.type,
                                 choices: [],
                                 valid: false,
                                 origin: resolved.origin
                               }
                             }

                             const reducedSet: ResolvedValue[] = removeValues(resolved.compose.include.concept,
                                                                              resolved.compose.exclude.concept)

                             const choices: Choice[] =
                               reducedSet.map(c => ({
                                 value: c.code,
                                 display: c.display
                               }))

                             return {
                               id: resolved.id,
                               name: resolved.name,
                               type: resolved.type,
                               valid: true,
                               choices
                             } as Choices
                           }))
  }

  // public async processAll(debug: boolean = false): Promise<Choices[]> {
  //
  //   const ids: string[] = await this.#ready.then(() => this.#source.allIds())
  //
  //   return Promise.all(ids.map(id => this.process(id, debug)))
  //
  // }

  public async processAll(debug: boolean = false): Promise<Choices[]> {
    const ids: string[] = await this.#ready.then(() => this.#source.allIds())

    const results: Choices[] = []
    for (const id of ids) {
      try {
        const result = await this.process(id, debug) // Blocking call, one at a time
        results.push(result)
      } catch (e) {
        throw new Error(`Failed to process valueset: ${id}`)
      }
    }

    return results
  }


  public all(): Promise<Choices[]> {
    return Promise.resolve([])

  }
}

/**
 * Processes a list of IDs in batches, awaiting the completion of each batch before starting the next one.
 *
 * @param ids - The list of string IDs to process.
 * @param batchSize - The number of IDs to process in a single batch.
 * @param processor - The function to process an individual ID. It should return a Promise.
 * @returns A Promise that resolves to an array of all the processed results.
 */

// biome-ignore lint/correctness/noUnusedVariables: <explanation>
async function processInBatches<T>(
  ids: string[],
  batchSize: number,
  processor: (id: string) => Promise<T>
): Promise<T[]> {
  const results: T[] = []

  for (let i = 0; i < ids.length; i += batchSize) {
    // Take the next batch of IDs
    const batch = ids.slice(i, i + batchSize)

    // Process all IDs in the batch concurrently
    const batchResults = await Promise.all(batch.map(processor))

    // Append the batch results to the overall results
    results.push(...batchResults)
  }

  return results
}

/**
 * Utility function to pause execution for a specified number of milliseconds.
 *
 * @param ms - The number of milliseconds to sleep.
 * @returns A Promise that resolves after the given time.
 */
// function sleep(ms: number): Promise<void> {
//   return new Promise((resolve) => setTimeout(resolve, ms))
// }

/**
 * Processes a list of IDs in batches, with a pause between each batch.
 *
 * @param ids - The list of string IDs to process.
 * @param batchSize - The number of IDs to process in a single batch.
 * @param processor - The function to process an individual ID. It should return a Promise.
 * @param pauseDuration - The number of milliseconds to pause between batches.
 * @returns A Promise that resolves to an array of all the processed results.
 */
/*
 async function processInBatchesWithPause<T>(
 ids: string[],
 batchSize: number,
 processor: (id: string) => Promise<T>,
 pauseDuration: number
 ): Promise<T[]> {
 console.log(ids.length, batchSize, pauseDuration)
 const results: T[] = []

 for (let i = 0; i < ids.length; i += batchSize) {

 // Take the next batch of IDs
 const batch = ids.slice(i, i + batchSize)
 console.log('next batch', i, i + batchSize)

 // Process all IDs in the batch concurrently
 const batchResults = await Promise.all(batch.map(processor))

 // Append the batch results to the overall results
 results.push(...batchResults)

 // Pause between batches (only if there are more batches to process)
 if (i + batchSize < ids.length) {
 await sleep(pauseDuration) // Pause for the specified duration
 }
 }

 return results
 }
 */
