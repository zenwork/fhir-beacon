import {BaseData}   from '../../BaseData'
import {
  CodeableConceptData, CodingData, IdentifierData, QuantityData, ReferenceData, SimpleQuantityData
}                   from '../../data/complex/strucutures/complex'
import {
  Canonical, Code, DateTime, Id, Instant, Language, URI, XHTML
}                   from '../../data/primitive/structures'
import {Ingredient} from './backbone'

export type MetaData = {
  versionId?: Id
  lastUpdated?: Instant
  source?: URI
  profile: Canonical[]
  security?: CodingData,
  tag?: CodingData

}

export type ResourceData = BaseData & {
  id?: Id,
  meta?: MetaData,
  implicitRules?: URI
  language?: Language
}

export type NarrativeData = BaseData & {
  status: Code
  div: XHTML
}

export type Extension = BaseData & {
  url: URI
  value: any //should be like what I did in Ingredient. see: http://hl7.org/fhir/R5/extensibility.html#Extension and
             // http://hl7.org/fhir/R5/datatypes.html#open
}

export type DomainResourceData = ResourceData & {
  text?: NarrativeData
  contained: ResourceData[]
  extension: Extension[]
  modifierExtension: Extension[]
}


export type CodeableReferenceData = BaseData & {
  concept?: CodeableConceptData
  reference?: ReferenceData
}

export type Ratiodata = BaseData & {
  numerator?: QuantityData
  denominator?: SimpleQuantityData
}

export type MedicationData = DomainResourceData & {
  identifier: IdentifierData[]
  code?: CodeableConceptData
  status?: Code
  marketingAuthorisationHolder?: ReferenceData
  doseForm?: CodeableConceptData
  totalVolume?: QuantityData
  ingredient?: Ingredient[]
  batch?: {
    lotNumber?: string
    expirationDate?: DateTime
  }
}
