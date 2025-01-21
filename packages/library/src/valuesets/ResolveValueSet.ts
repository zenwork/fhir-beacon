import {isBlank}                                                              from '../utilities'
import {ResolvedSet, ResolvedValue, ValueSetData, ValueSetIncludeExcludeData} from './ValueSet.data'



export async function resolveValueSet(vs: ValueSetData, debug: boolean = false): Promise<ResolvedSet> {

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
                       Promise.resolve(resolveIncludesOrExclude(vs.compose?.include ?? [], 'include', debug))
                              .then(r => {
                                return r.flat()
                              }),
                       Promise.resolve(resolveIncludesOrExclude(vs.compose?.exclude ?? [], 'exclude', debug))
                              .then(r => r.flat())

                     ])
                .then((r: ResolvedValue[][]) => {
                  return ({
                    origin: vs,
                    id: vs.id ?? 'unknown',
                    type: vs.resourceType ?? 'unknown',
                    name: vs.name ?? 'unknown',
                    status: vs.status,
                    version: vs.version ?? 'unknown',
                    compose: {
                      include: { concept: r[0] },
                      exclude: { concept: r[1] }
                    }
                  } as ResolvedSet)
                })


}

function resolveIncludesOrExclude(segment: ValueSetIncludeExcludeData[],
                                  variant: 'include' | 'exclude' = 'include',
                                  debug: boolean): Promise<ResolvedValue[][]> {
  const promises: Promise<ResolvedValue[]>[] = []

  for (let idx = 0; idx < segment.length; idx++) {

    promises.push(new Promise<ResolvedValue[]>((resolve, reject) => {
      const concepts: ResolvedValue[] = []
      const inc = segment[idx]
      if (isBlank(inc.system) && isBlank(inc.valueSet)) {
        throw new Error(`ValueSet include system or concept is required for code generation [${idx}] (vsd-1 -> http://hl7.org/fhir/valueset-definitions.html#ValueSet.compose.include)'}`)
      }

      if ((inc.concept && inc.concept.length > 0) && isBlank(inc.system)) {
        throw new Error(`include concept list requires a system [${idx}] (vsd-2 -> http://hl7.org/fhir/valueset-definitions.html#ValueSet.compose.include)`)
      }

      if ((inc.concept && inc.concept.length > 0) && (inc.filter && inc.filter.length > 0)) {
        throw new Error(`include can only have concept list OR a filter list [${idx}] (vsd-3 -> http://hl7.org/fhir/valueset-definitions.html#ValueSet.compose.include)`)

      }

      if (inc.concept) {
        if (debug) console.log('resolved [' + inc.concept.length + '] from self')
        inc.concept.forEach(c => concepts.push({ code: c.code, display: c.display ?? 'n/a', definition: 'n/a' }))
        resolve(concepts)

      } else if (inc.system && inc.system.match(/^http/) !== null) {
        const url: string = `${inc.system}`.replace(/http:/, 'https:')
        fetchWithRetry(url,
                       {
                         headers: { 'Accept': 'application/json' },
                         redirect: 'follow'
                       })
          .then(r => {
            if (!r.ok) {
              throw new Error(`Request failed with status ${r.status}: ${r.statusText}`)
            }
            return r.text()
          })
          .then(text => {
            if (!text) {
              throw new Error('Received empty response body')
            }
            return JSON.parse(text)
          })
          .then(json => {
            if (debug) console.log('resolved [' + json.concept.length + '] from remote code system: ' + ' ' + url)
                  json.concept.forEach((c: Record<string, unknown>) =>
                                         concepts.push({
                                                         code: c.code as string,
                                                         display: c.display as string ?? 'n/a',
                                                         definition: c.definition as string
                                                                     ?? 'n/a'
                                                       }))
                  resolve(concepts)
                }
          )
          .catch((r) => {
            // console.log('failed to resolve code system: ' + ' ' + url)
            reject(new Error(`Failed to coding system set [${url}][${r}]`))
          })


      } else if (inc.valueSet) {
        const promises: Promise<ResolvedValue[]>[] = []
        inc.valueSet.forEach(vs => {
          if (vs.match(/^http/) !== null) {
            const url: string = `${vs}`.replace(/http:/, 'https:')
            if (debug) console.log('resolving [' + url + '] value set')
            promises.push(fetchWithRetry(
                            url,
                            {
                              headers: { 'Accept': 'application/json' },
                              redirect: 'follow'
                            }
                          )
                            .then((r) => {
                              if (!r.ok) {
                                throw new Error(`Request failed with status ${r.status}: ${r.statusText}`)
                              }
                              return r.text()
                            })
                            .then(text => {
                              if (!text) {
                                throw new Error('Received empty response body')
                              }
                              return JSON.parse(text)
                            })
                            .then(json => resolveIncludesOrExclude(json.compose[variant] ?? [], variant, debug))
                            .then(r => r.flat())
                            .catch((r) => {
                              // console.log('failed to resolve code system: ' + ' ' + url)
                              reject(new Error(`Failed to resolve value set [${vs}][${r}]`))
                              return []
                            })
            )
          }

        })

        Promise.all(promises)
               .then(r => r.flat())
               .then(r => {
                 concepts.push(...r)
                 resolve(concepts)
               })


      }
    }))
  }

  const timeout = (millis: number) => {
    return new Promise<ResolvedValue[][]>((_, rej) => setTimeout(() => rej('Resolving values took too long'), millis))
  }

  return Promise.race([
                        Promise.all(promises),
                        timeout(60_000)
                      ])
                .catch((err) => { throw new Error(`Failed to resolve value set [${err}]`) })


}


// @ts-ignore
async function fetchWithRetry(url: string, options = {}, retries = 5, retryDelay = 1000): Promise<Response> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      // Attempt to fetch the resource
      const response = await fetch(url, options)

      // If the response is successful, return it
      if (response.ok) {
        return response
      }

      // Handle non-success statuses (like 4xx or 5xx)
      throw new Error(`Fetch failed with status: ${response.status}`)
    } catch (error) {
      // If it's the last attempt, throw the error
      if (attempt === retries) {
        throw error
      }

      // Optionally log or handle the retry attempt
      // console.warn(`Retry attempt ${attempt} failed for ${url}. Retrying in ${retryDelay}ms...`)

      // Wait for the retry delay
      await new Promise(res => setTimeout(res, retryDelay))
    }
  }
}
