import FhirTypesCodeSystem  from './CodeSystem-fhir-types.json'
import ComparatorCodeSystem from './CodeSystem-quantity-comparator.json'
import AgeValueSet          from './ValueSet-age-units.json'
import DistanceValueSet     from './ValueSet-distance-units.json'
import DurationValueSet     from './ValueSet-duration-units.json'

export {ComparatorCodeSystem as Comparators}
export {FhirTypesCodeSystem}


//TODO: PERFORMANCE: should be done at build time
export type FhirType = { code: string, kind: string, abstract: boolean, definition: string }
export type ValueSet = { lvl?: number, source?: string, code?: string, display?: string, definition?: string, comment?: string }

export const FhirTypes: FhirType[] = extract(FhirTypesCodeSystem.concept, [])
export const FhirDistances: ValueSet[] = extractValueSet(DistanceValueSet)
export const FhirAges: ValueSet[] = extractValueSet(AgeValueSet)
export const FhirDuration: ValueSet[] = extractValueSet(DurationValueSet)

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

function extractValueSet(vs: any) {
  const extract: ValueSet[] = []
  let include = vs.compose.include[0]
  let concept = include.concept
  extract.push(...concept.map((c: any) => ({ source: include.system, ...c })))
  return extract
}
