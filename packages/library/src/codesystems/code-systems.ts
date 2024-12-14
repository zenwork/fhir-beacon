import {Code, FhirString, Id, URI}    from '../components'
import {CodeSystemAddressTypes}       from './CodeSystem-address-type'
import {CodeSystemAddressUse}         from './CodeSystem-address-use'
import {CodeSystemFhirTypes}          from './CodeSystem-fhir-types'
import {CodeSystemIdentifierUse}      from './CodeSystem-identifier-use'
import {CodeSystemQuantityComparator} from './CodeSystem-quantity-comparator'
import {ValueSetAgeUnits}             from './ValueSet-age-units'
import {ValueSetDistanceUnits}        from './ValueSet-distance-units'
import {ValueSetDurationUnits}        from './ValueSet-duration-units'
import {ValueSetIdentifierType}       from './ValueSet-identifier-type'
import {ValueSetUcumCommon}           from './ValueSet-ucum-common'

export {CodeSystemQuantityComparator as Comparators}
export {CodeSystemFhirTypes}


//TODO: PERFORMANCE: should be done at build time
export type FhirType = { code: string, kind: string, abstract: boolean, definition: string }

export const FhirTypes: FhirType[] = extract(CodeSystemFhirTypes.concept, [])
export const FhirAddressTypes: FhirType[] = extract(CodeSystemAddressTypes.concept, [])
export const FhirAddressUse: FhirType[] = extract(CodeSystemAddressUse.concept, [])
export const FhirIdentifierUse: FhirType[] = extract(CodeSystemIdentifierUse.concept, [])

export const FhirDistances = extractValueSet(ValueSetDistanceUnits)
export const FhirAges = extractValueSet(ValueSetAgeUnits)
export const FhirDuration = extractValueSet(ValueSetDurationUnits)
export const FhirIdentifierType = extractValueSet(ValueSetIdentifierType)
export const FhirUcumUnits = extractValueSet(ValueSetUcumCommon)
const valueSets: ValueSet[] = [FhirUcumUnits, FhirIdentifierType, FhirAges, FhirDuration, FhirDistances]

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

export type Value = { url: string, system?: string, code: Code, display: FhirString }
export type ValueSet = {
  id: Id
  url: URI
  concepts: Value[]
}

function extractValueSet(vs: any): ValueSet {
  const include = vs.compose.include[0]
  return {
    id: vs.id,
    url: vs.url,
    concepts: include.concept.map((c: any) => ({
      url: vs.url,
      system: include.system,
      code: c.code,
      display: c.display || c.code
    }))
  }
}

export function useSystem(url?: Id): ValueSet | null {

  return url
         ? valueSets.find(vs => vs.url === url) ?? null
         : null
}

export function systems(): Value[] {
  const sets = valueSets.map(vs => ({ url: vs.url, code: vs.url as Code, display: vs.id }))
  const systems = [
    {
      url: 'http://unitsofmeasure.org',
      code: 'http://unitsofmeasure.org',
      display: 'http://unitsofmeasure.org'
    }
  ]

  return [...sets, ...systems]
}
