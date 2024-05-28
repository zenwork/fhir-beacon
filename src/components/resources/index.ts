import './backbone.data'
import './substance/substance'
import './substance/substance-ingredient.data'
import './substance/substance-ingredient.type-guard'
import './substance/substance-ingredient.backbone'
import './medication/medication'
import './medication/medication-ingredient.data'


import {BaseData}                                                        from '../../internal/base/BaseData'
import {CodeableConceptData}                                             from '../complex/codeable-concept/codeable-concept.data'
import {CodingData}                                                      from '../complex/coding/coding.data'
import {IdentifierData}                                                  from '../complex/identifier/identifier.data'
import {QuantityData, SimpleQuantityData}                                from '../complex/quantity/quantity.data'
import {Canonical, Code, DateTime, Id, Instant, Language, Markdown, URI} from '../primitive/primitive.data'
import {NarrativeData}                                                   from '../special/narrative/narrative.data'
import {ReferenceData}                                                   from '../special/reference/reference.data'
import {MedicationIngredientData}                                        from './medication/medication-ingredient.data'
import {SubstanceIngredientData, SubstanceIngredientReferenceData}       from './substance/substance-ingredient.data'

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
  resourceType: string //not in model but seems to always be there
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

export type RatioData = BaseData & {
  numerator?: QuantityData
  denominator?: SimpleQuantityData
}

type MedicationBatchData = BaseData & {
  lotNumber?: string
  expirationDate?: DateTime
}

export type MedicationData = DomainResourceData & {
  identifier: IdentifierData[]
  code?: CodeableConceptData
  status?: Code
  marketingAuthorisationHolder?: ReferenceData
  doseForm?: CodeableConceptData
  totalVolume?: QuantityData
  ingredient?: MedicationIngredientData[]
  batch?: MedicationBatchData
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
  ingredient: (SubstanceIngredientData | SubstanceIngredientReferenceData)[]

}
