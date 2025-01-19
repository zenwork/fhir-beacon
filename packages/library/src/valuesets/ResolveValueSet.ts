import {isBlank}                                                                   from '../utilities'
import {ResolvedValue, ResolvedValueSet, ValueSetData, ValueSetIncludeExcludeData} from './ValueSet.data'



export async function resolveValueSet(vs: ValueSetData): Promise<ResolvedValueSet> {

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
                       Promise.resolve(resolveIncludesOrExclude(vs.compose?.include ?? []))
                              .then(r => {
                                return r.flat()
                              }),
                       Promise.resolve(resolveIncludesOrExclude(vs.compose?.exclude ?? [], 'exclude'))
                              .then(r => r.flat())

                     ])
                .then((r: ResolvedValue[][]) => {
                  return ({
                    origin: vs,
                    id: vs.id ?? 'unknown',
                    name: vs.name ?? 'unknown',
                    status: vs.status,
                    version: vs.version ?? 'unknown',
                    compose: {
                      include: { concept: r[0] },
                      exclude: { concept: r[1] }
                    }
                  } as ResolvedValueSet)
                })


}

function resolveIncludesOrExclude(segment: ValueSetIncludeExcludeData[],
                                  variant: 'include' | 'exclude' = 'include'): Promise<ResolvedValue[][]> {
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
        console.log('resolved [' + inc.concept.length + '] from self')
        inc.concept.forEach(c => concepts.push({ code: c.code, display: c.display ?? 'n/a', definition: 'n/a' }))
        resolve(concepts)

      } else if (inc.system) {
        const url: string = `${inc.system}`
        fetch(url, { headers: { 'Accept': 'application/json' } })
          .then(r => r.json())
          .then(json => {
                  console.log('resolved [' + json.concept.length + '] from remote code system: ' + ' ' + url)
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
            console.log('failed to resolve code system: ' + ' ' + url)
            reject(new Error(`Failed to coding system set [${url}][${r}]`))
          })


      } else if (inc.valueSet) {
        const promises: Promise<ResolvedValue[]>[] = []
        inc.valueSet.forEach(vs => {
          const url: string = `${vs}`
          console.log('resolving [' + url + '] value set')
          promises.push(fetch(url, { headers: { 'Accept': 'application/json' } })
                          .then(r => r.json())
                          .then(json => resolveIncludesOrExclude(json.compose[variant] ?? []))
                          .then(r => r.flat())
                          .catch((r) => {
                            console.log('failed to resolve code system: ' + ' ' + url)
                            reject(new Error(`Failed to resolve value set [${vs}][${r}]`))
                            return []
                          })
          )

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
                        timeout(30_000)
                      ])
                .catch((err) => { throw new Error(`Failed to resolve value set [${err}]`) })


}
