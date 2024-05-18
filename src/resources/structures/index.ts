import {BaseData}                                                                          from '../../BaseData'
import {CodeableConceptData, CodingData, IdentifierData, QuantityData, SimpleQuantityData} from '../../data/complex/strucutures/complex'
import {Canonical, Code, DateTime, Id, Instant, Language, Markdown, URI}                   from '../../data/primitive/structures'
import {NarrativeData, ReferenceData}                                                      from '../../special/structures'
import {MedicationIngredientData, SubstanceIngredientData}                                 from './backbone'

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


// see: https://www.hl7.org/fhir/R5/references.html#CodeableReference
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
  ingredient?: MedicationIngredientData[]
  batch?: {
    lotNumber?: string
    expirationDate?: DateTime
  }
  definition?: ReferenceData
}

export type SubstanceData = DomainResourceData & {
  identifier?: IdentifierData[]
  instance: boolean
  status?: Code
  category: CodeableConceptData[]
  code: CodeableReferenceData
  description?: Markdown
  expiry?: DateTime
  quantity?: SimpleQuantityData
  ingredient: SubstanceIngredientData[]

}
