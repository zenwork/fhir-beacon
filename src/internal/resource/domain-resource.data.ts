import {CodingData}                            from '../../components/complex/coding/coding.data'
import {Canonical, Id, Instant, Language, URI} from '../../components/primitive/primitive.data'
import {NarrativeData}                         from '../../components/special/narrative/narrative.data'
import {BaseElementData, Extension}            from '../base/base-element.data'

// Todo: figure out when where Meta Data goes
export type MetaData = {
  versionId?: Id
  lastUpdated?: Instant
  source?: URI
  profile: Canonical[]
  security?: CodingData,
  tag?: CodingData

}

export type ResourceData = BaseElementData & {
  id?: Id,
  resourceType: string //not in model but seems to always be there
  meta?: MetaData,
  implicitRules?: URI
  language?: Language
}

export type DomainResourceData = ResourceData & {
  text?: NarrativeData
  contained: ResourceData[]
  extension: Extension[]
  modifierExtension: Extension[]
}
