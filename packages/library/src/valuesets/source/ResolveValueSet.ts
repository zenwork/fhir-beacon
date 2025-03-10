import {URI}               from '../../components'
import {isBlank}           from '../../utilities'
import {
  CodeSystemData,
  isCodeSystem,
  isValueSet,
  ResolvedSet,
  ResolvedValue,
  ValueSetConceptData,
  ValueSetData,
  ValueSetIncludeExcludeData
}                          from '../ValueSet.data'
import {fetchIt}           from './Fetch'
import {FetchError}        from './FetchError'
import {resolveCodeSystem} from './ResolveCodeSystem'



export async function resolveValueSet(vs: ValueSetData,
                                      skipUrl: (url: string) => boolean,
                                      debug: boolean = false): Promise<ResolvedSet[]> {

  if (isBlank(vs.name)) {
    throw new Error('ValueSet name is required for code generation'
                    + ' (cnl-0 -> http://hl7.org/fhir/valueset-definitions.html#ValueSet')
  }

  if (vs.url?.match(/[|#]/) !== null) {
    throw new Error('ValueSet url must not contain "|" or "#" characters'
                    + ' (cnl-1 -> http://hl7.org/fhir/valueset-definitions.html#ValueSet.url')
  }

  if (vs.status?.match(/draft | active | retired | unknown/) !== null) {
    throw new Error('ValueSet status must be one of "draft | active | retired | unknown" for code generation'
                    + ' (http://hl7.org/fhir/valueset-definitions.html#ValueSet.status)')
  }


  return Promise.all([
                       Promise.resolve(resolveIncludesOrExclude(vs.id ?? 'n/a',
                                                                vs.compose?.include ?? [],
                                                                'include',
                                                                debug,
                                                                skipUrl))
                              .then(r => r.flat()),
                       Promise.resolve(resolveIncludesOrExclude(vs.id ?? 'n/a',
                                                                vs.compose?.exclude ?? [],
                                                                'exclude',
                                                                debug,
                                                                skipUrl))
                              .then(r => r.flat())

                     ])
                .then((r: ResolvedValue[][]) => {
                  return [
                    {
                      origin: vs,
                      id: vs.id ?? 'unknown',
                      type: vs.resourceType ?? 'unknown',
                      name: vs.name ?? 'unknown',
                      system: vs.url ?? 'unknown',
                      status: vs.status,
                      version: vs.version ?? 'unknown',
                      compose: {
                        include: { concept: r[0] },
                        exclude: { concept: r[1] }
                      }
                    } as ResolvedSet
                  ]
                })
                .catch((err: FetchError | unknown) => {
                  const ferr: FetchError = err as FetchError
                  return [
                    {
                      origin: vs,
                      id: ferr.url ?? 'unknown',
                      type: 'unknown',
                      name: vs.name ?? 'unknown',
                      system: vs.url ?? 'unknown',
                      status: ferr.status,
                      version: vs.version ?? 'unknown',
                      compose: {
                        include: { concept: [] },
                        exclude: { concept: [] }
                      }
                    } as ResolvedSet
                  ]
                })


}

export async function resolveIncludesOrExclude(id: string,
                                               segment: ValueSetIncludeExcludeData[],
                                               variant: 'include' | 'exclude' = 'include',
                                               debug: boolean,
                                               skipUrl: (url: string) => boolean): Promise<ResolvedValue[][]> {

  if (segment.length <= 0) {return Promise.resolve([])}

  const promises: Promise<ResolvedValue[]>[] = []
  const urlsToResolve: { uri: string, resolved: boolean }[] = []

  for (let idx = 0; idx < segment.length; idx++) {
    promises.push(resolve(id, segment[idx], idx, debug, skipUrl, urlsToResolve, variant))
  }

  const maxTime: number = 600_000
  const timeout = (millis: number) => {
    return new Promise<ResolvedValue[][]>((_, rej) => {
      const urls: string = JSON.stringify(urlsToResolve)
      return setTimeout(() => rej(`Failed to resolve value set in ${maxTime / 1000}s for ${urls}`), millis)
    })
  }

  if (promises.length > 0) {
    return await Promise.race([Promise.all(promises), timeout(maxTime)])
  } else {
    return Promise.resolve([])
  }


}

function assertOk(inc: ValueSetIncludeExcludeData, idx: number): void {
  if (isBlank(inc.system) && isBlank(inc.valueSet)) {
    throw new Error(`ValueSet include system or concept is required for code generation [${idx}] (vsd-1 -> http://hl7.org/fhir/valueset-definitions.html#ValueSet.compose.include)'}`)
  }

  if ((inc.concept && inc.concept.length > 0) && isBlank(inc.system)) {
    throw new Error(`include concept list requires a system [${idx}] (vsd-2 -> http://hl7.org/fhir/valueset-definitions.html#ValueSet.compose.include)`)
  }

  if ((inc.concept && inc.concept.length > 0) && (inc.filter && inc.filter.length > 0)) {
    throw new Error(`include can only have concept list OR a filter list [${idx}] (vsd-3 -> http://hl7.org/fhir/valueset-definitions.html#ValueSet.compose.include)`)
  }
}

function resolve(id: string, segment: ValueSetIncludeExcludeData,
                 idx: number,
                 debug: boolean,
                 skipUrl: (url: string) => boolean,
                 urlsToResolve: { uri: string; resolved: boolean }[],
                 variant: 'include' | 'exclude'): Promise<ResolvedValue[]> {

  return new Promise<ResolvedValue[]>((resolve, reject) => {


    assertOk(segment, idx)

    if (segment.concept && segment.concept.length > 0) {
      resolveConcepts(id, segment.concept, debug)
        .then(r => {
          resolve(r)
        })
        .catch((r) => reject(r))

    } else if (segment.system) {
      resolveChildSystem(id, segment.system, urlsToResolve, skipUrl, debug)
        .then(r => {
          resolve(r)
        })
        .catch((r) => {
          reject(r)
        })

    } else if (segment.valueSet && segment.valueSet.length > 0) {
      const resolvedConcepts: ResolvedValue[] = []
      Promise.all(segment.valueSet.map(vs => resolveChildValueSet(id, vs, skipUrl, debug, urlsToResolve)))
             .then((all: ResolvedSet[][]) => all.filter(v => v !== null))
             .then(sets => sets.flat())
             .then((valid: ResolvedSet[]) => valid.map(v => {
               const concept: ResolvedValue[] | null = v.compose[variant].concept
               return concept ?? []
             }))
             .then((conceptsArrays: ResolvedValue[][]) => conceptsArrays.flat())
             .then(r => {
               resolvedConcepts.push(...r)
               resolve(resolvedConcepts)
             })
             .catch((r) => reject(r))
    }
  })
}

function resolveConcepts(id: string, inc: ValueSetConceptData[], debug: boolean): Promise<ResolvedValue[]> {
  if (debug) console.log(`resolved [${inc.length}] from self: ${id}`)
  return Promise.resolve(inc.map(c => ({ code: c.code, display: c.display ?? 'n/a', definition: 'n/a' })))
}


function resolveChildSystem(id: string, system: URI,
                            urlsToResolve: { uri: string; resolved: boolean }[],
                            skipUrl: (url: string) => boolean,
                            debug: boolean): Promise<ResolvedValue[]> {

  if (resolvable(system, skipUrl)) {
    const url: string = convert(`${system}`.replace(/http:/, 'https:'))
    const concepts: ResolvedValue[] = []
    urlsToResolve.push({ uri: url, resolved: false })
    return fetchIt({ url: url, debug })
      .then((json: ValueSetData | CodeSystemData | unknown) => {
              if (isCodeSystem(json)) {
                if (debug) console.log(`resolved [${json.concept.length}] from : ${url} - for : ${id}`)
                concepts.push(...json.concept
                                     .map((c: Record<string, unknown>) =>
                                            ({
                                              code: c.code as string,
                                              display: c.display as string ?? 'n/a',
                                              definition: c.definition as string ?? 'n/a'
                                            })
                                     )
                )
                urlsToResolve.forEach(u => { if (u.uri === url) u.resolved = true })
              }
        return concepts
        // throw Error(`Unknown value set type: ${(json as { resourceType: string }).resourceType}`)
            }
      )
      .then(resolved => {
        urlsToResolve.forEach(u => { if (u.uri === url) u.resolved = true })
        return resolved
      })

  }

  return Promise.resolve([])
}

function resolveChildValueSet(id: string, valueSetUri: URI,
                              skipUrl: (url: string) => boolean,
                              debug: boolean,
                              urlsToResolve: { uri: string; resolved: boolean }[]): Promise<ResolvedSet[]> {

  if (resolvable(valueSetUri, skipUrl)) {

    const httpsUri: string = `${valueSetUri}`.replace(/http:/, 'https:')
    urlsToResolve.push({ uri: httpsUri, resolved: false })

    if (debug) console.log(`resolving [${httpsUri}] value set for: ${id}`)

    return fetchIt({ url: httpsUri, debug })
      .then((json: ValueSetData | CodeSystemData | unknown) => {

              if (isValueSet(json)) {
                return resolveValueSet(json, skipUrl, debug)
              } else if (isCodeSystem(json)) {
                return resolveCodeSystem(json, debug)
              } else {
                throw Error(`Unknown ValueSet type: ${(json as { resourceType: string }).resourceType}`)
              }
            }
      )
      .then(resolved => {
        urlsToResolve.forEach(u => { if (u.uri === httpsUri) u.resolved = true })
        return resolved
      })
  }

  return Promise.resolve([])
}

function resolvable(vs: string, skipUrl: (url: string) => boolean): boolean {
  return vs.match(/^http/) !== null && !skipUrl(vs)
}

/**
 * https://hl7.org/fhir/action-relationship-type
 * https://hl7.org/fhir/codesystem-action-relationship-type.json
 *
 * https://hl7.org/fhir/action-participant-type
 * https://hl7.org/fhir/codesystem-action-participant-type.json
 */
function convert(uri: string): string {
  if (uri.startsWith('https://hl7.org/fhir/CodeSystem/')) {
    return uri.replace('https://hl7.org/fhir/CodeSystem/', 'https://hl7.org/fhir/codesystem-') + '.json'
  }
  if (uri.startsWith('https://hl7.org/fhir/')) {
    return uri.replace('https://hl7.org/fhir/', 'https://hl7.org/fhir/codesystem-') + '.json'
  }
  return uri
}
