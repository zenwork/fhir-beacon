import {BundleData, BundleEntryBackbone}                   from '../../components'
import {FhirElementData}                                   from '../../internal'
import {isCodeSystem, isResource, isValueSet, ResolvedSet} from '../ValueSet.data'
import {FetchError}                                        from './FetchError'
import {empty}                                             from './FSSource'
import {resolveCodeSystem}                                 from './ResolveCodeSystem'
import {resolveValueSet}                                   from './ResolveValueSet'



export async function resolveBundle(bundle: BundleData,
                                    skipUrl: (url: string) => boolean,
                                    debug: boolean = false): Promise<ResolvedSet[]> {

  function doIt(entry: BundleEntryBackbone, debug: boolean): Promise<ResolvedSet[]> {

    const resource: FhirElementData = entry.resource!
    try {

      if (isValueSet(resource)) return resolveValueSet(resource, skipUrl, debug)
      if (isCodeSystem(resource)) return resolveCodeSystem(resource, debug)
      if (isResource(resource)) {
        return Promise.resolve([
                                 empty(resource.id ?? 'n/a',
                                       resource.id ?? 'n/a',
                                       `error: unsupported resource type`,
                                       resource.resourceType as 'CodeSystem' | 'ValueSet' | 'unknown')
                               ])
      }

      throw new FetchError(`processing bundle entry is not possible`,
                           resource.id ?? 'n/a',
                           0,
                           'OK',
                           JSON.stringify(resource).replace(/"/g,
                                                            '\''))
    } catch (error) {
      return Promise.resolve([
                               empty(resource.id ?? 'n/a',
                                     bundle.id ?? 'n/a',
                                     `Failed to read and resolve ValueSet for entry [${resource.id}]. Details: ${error}`,
                                     'unknown',
                                     error as FetchError | undefined)
                             ])
    }


  }

  return blockingThrottle<BundleEntryBackbone, ResolvedSet[]>(
    {
      inputs: bundle.entry,
      call: doIt,
      catchFn: (error: FetchError | unknown, results) => {
        if (error instanceof FetchError) {
          results.push([
                         empty(bundle.id ?? 'n/a',
                               error.url ?? 'n/a',
                               `Failed to read and resolve for entry [${error.url}]. Details: ${error}`,
                               'unknown',
                               error as FetchError | undefined)
                       ])
        } else {
          results.push([
                         empty(bundle.id ?? 'n/a',
                               'n/a',
                               `Failed to read and resolve for entry [unknown]. Details: ${error}`,
                               'unknown',
                               error as FetchError | undefined)
                       ])
        }
      },
      debug
    })
    .then(sets => {
      const flattenedSet: ResolvedSet[] = sets.flat()
      console.log(`resolved ${flattenedSet.length} from bundle`)
      return flattenedSet
    })
}


async function blockingThrottle<I, O>({
                                        inputs,
                                        call,
                                        postBatch = (o) => o as O,
                                        catchFn = (e, _results) => { throw e },
                                        debug = false,
                                        concurrent = 12
                                      }: {
  inputs: I[],
  call: (input: I, debug: boolean) => Promise<O>,
  postBatch?: (output: unknown, debug: boolean) => O,
  catchFn?: (e: FetchError | unknown, results: O[]) => void,
  debug?: boolean,
  concurrent?: number
}): Promise<O[]> {

  const results: O[] = []
  let batch: Promise<O>[] = []

  for (const input of inputs) {
    try {
      batch.push(call(input, debug))

      if (batch.length >= concurrent) {

        const r: O[] = (await Promise.all(batch)).map((each: unknown) => postBatch(each, debug))
        results.push(...r)
        batch = []
      }

    } catch (e) {
      catchFn(e, results)

    }
  }

  const r: O[] = (await Promise.all(batch))
  results.push(...r)

  return results
}
