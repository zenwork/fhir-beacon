import {Code, FhirString, Id, URI}    from '../components'
import {CodeSystemFhirTypes}          from './CodeSystem-fhir-types'




export {CodeSystemFhirTypes}
/**
 * @deprecated
 */
export const FhirTypes: FhirType[] = extract(CodeSystemFhirTypes.concept, [])


//TODO: PERFORMANCE: should be done at build time
export type FhirType = { code: string, kind: string, abstract: boolean, definition: string }
export type Value = { url: string, system?: string, code: Code, display: FhirString, definition?: string }
export type ValueSet = {
  id: Id
  url: URI
  concepts: Value[]
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
function extract(concepts: any[], types: FhirType[]) {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const extracted = concepts.map((c: any) => {

    let kind = ''
    let abstract = false
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    c.property?.forEach((p: any) => {
      if (p.code === 'kind') kind = p.valueCode
      if (p.code === 'abstract-type') abstract = true
    })
    const code = c.code
    const definition = c.definition


    const mapped = { code, kind, abstract, definition }
    if (c.concept) extract(c.concept, types)
    return mapped
  })
  types.push(...extracted)
  return types
}
