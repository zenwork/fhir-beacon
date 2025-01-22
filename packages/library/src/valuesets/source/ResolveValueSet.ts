import {isBlank}                                                              from '../../utilities'
import {ResolvedSet, ResolvedValue, ValueSetData, ValueSetIncludeExcludeData} from '../ValueSet.data'
import {fetchWithRetry}                                                       from './Fetch'



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

  if (segment.length <= 0) return Promise.resolve([])

  const promises: Promise<ResolvedValue[]>[] = []
  const urlsToResolve: { uri: string, resolved: boolean }[] = []

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
        if (isBlank(url)) console.error('url is blank')
        urlsToResolve.push({ uri: url, resolved: false })
        fetchWithRetry(url, {
          headers: {
            'Accept': 'application/fhir+json;q=1.0, '
                      + 'application/json+fhir;q=0.9, '
                      + 'application/json+fhir;q=0.9, '
                      + '*/*;q=0.5'
          }, redirect: 'follow'
        })
          // biome-ignore lint/suspicious/noExplicitAny: <explanation>
          .then((json: any) => {
            if (debug) console.log('resolved [' + json.concept.length + '] from remote code system: ' + ' ' + url)
            json.concept
                .forEach((c: Record<string, unknown>) =>
                           concepts.push({
                                           code: c.code as string,
                                           display: c.display as string ?? 'n/a',
                                           definition: c.definition as string ?? 'n/a'
                                         }))
            urlsToResolve.forEach(u => { if (u.uri === url) u.resolved = true })
                  resolve(concepts)
                }
          )
          .catch((r) => reject(r))


      } else if (inc.valueSet) {

        const promises: Promise<ResolvedValue[]>[] = []

        inc.valueSet.forEach(vs => {
          if (vs.match(/^http/) !== null) {
            const url: string = `${vs}`.replace(/http:/, 'https:')
            if (debug) console.log('resolving [' + url + '] value set')
            urlsToResolve.push({ uri: url, resolved: false })
            promises.push(fetchWithRetry(url, { headers: { 'Accept': 'application/json' }, redirect: 'follow' })
                            // biome-ignore lint/suspicious/noExplicitAny: <explanation>
                            .then((json: any) => resolveIncludesOrExclude(json.compose[variant] ?? [], variant, debug))
                            .then(r => {
                              urlsToResolve.forEach(u => { if (u.uri === url) u.resolved = true })
                              return r.flat()
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


  const maxTime: number = 30_000
  const timeout = (millis: number) => {
    return new Promise<ResolvedValue[][]>((_, rej) => {
      const urls: string = JSON.stringify(urlsToResolve)
      return setTimeout(() => rej(`Failed to resolve value set in ${maxTime / 1000}s for ${urls}`), millis)
    })
  }

  if (promises.length > 0) {
    return Promise
      .race([Promise.all(promises), timeout(maxTime)])
      .catch((err) => {throw err})
  } else {
    return Promise.resolve([])
  }


}
