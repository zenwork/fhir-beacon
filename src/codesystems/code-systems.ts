import {CodeSystemAddressTypes}       from './CodeSystem-address-type'
import {CodeSystemAddressUse}         from './CodeSystem-address-use'
import {CodeSystemFhirTypes}          from './CodeSystem-fhir-types'
import {CodeSystemIdentifierUse}      from './CodeSystem-identifier-use'
import {CodeSystemQuantityComparator} from './CodeSystem-quantity-comparator'
import {ValueSetAgeUnits}             from './ValueSet-age-units'
import {ValueSetDistanceUnits}        from './ValueSet-distance-units'
import {ValueSetDurationUnits}        from './ValueSet-duration-units'
import {ValueSetIdentifierType}       from './ValueSet-identifier-type'

export {CodeSystemQuantityComparator as Comparators}
export {CodeSystemFhirTypes}


//TODO: PERFORMANCE: should be done at build time
export type FhirType = { code: string, kind: string, abstract: boolean, definition: string }
export type ValueSet = { lvl?: number, source?: string, code?: string, display?: string, definition?: string, comment?: string }

export const FhirTypes: FhirType[] = extract(CodeSystemFhirTypes.concept, [])
export const FhirAddressTypes: FhirType[] = extract(CodeSystemAddressTypes.concept, [])
export const FhirAddressUse: FhirType[] = extract(CodeSystemAddressUse.concept, [])
export const FhirIdentifierUse: FhirType[] = extract(CodeSystemIdentifierUse.concept, [])

export const FhirDistances: ValueSet[] = extractValueSet(ValueSetDistanceUnits)
export const FhirAges: ValueSet[] = extractValueSet(ValueSetAgeUnits)
export const FhirDuration: ValueSet[] = extractValueSet(ValueSetDurationUnits)
export const FhirIdentifierType: ValueSet[] = extractValueSet(ValueSetIdentifierType)

function extract(concepts: any[], types: FhirType[]) {
  const extracted = concepts.map((c: any) => {

    let kind = ''
    let abstract = false
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

function extractValueSet(vs: any) {
  const extract: ValueSet[] = []
  const include = vs.compose.include[0]
  const concept = include.concept
  extract.push(...concept.map((c: any) => ({ source: include.system, ...c })))
  return extract
}
