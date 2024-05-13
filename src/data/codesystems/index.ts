import FhirTypesCodeSystem  from './CodeSystem-fhir-types.json' assert {type: 'json'}
import ComparatorCodeSystem from './CodeSystem-quantity-comparator.json' assert {type: 'json'}

export {ComparatorCodeSystem as Comparators}
export {FhirTypesCodeSystem}


//TODO: PERFORMANCE: should be done at bild time
export type FhirType = { code: string, kind: string, abstract: boolean, definition: string }

export const FhirTypes: FhirType[] = extract(FhirTypesCodeSystem.concept, [])

function extract(concepts: any[], types: FhirType[]) {
  let extracted = concepts.map((c: any) => {

    let kind = ''
    let abstract = false
    c.property?.forEach((p: any) => {
      if (p.code === 'kind') kind = p.valueCode
      if (p.code === 'abstract-type') abstract = true
    })
    let code = c.code
    let definition = c.definition


    let mapped = {code, kind, abstract, definition}
    if (c.concept) extract(c.concept, types)
    return mapped
  })
  types.push(...extracted)
  return types
}
