import {Code, URI}                                           from '../../data/converters'
import {Canonical, CodingData, Id, Instant, Language, XHTML} from '../../data/structures'

export type BaseData = {
  id?: string | null,
  extension?: [],
}
export type Meta = {
  versionId?: Id
  lastUpdated?: Instant
  source?: URI
  profile: Canonical[]
  security?: CodingData,
  tag?: CodingData

}
export type ResourceData = BaseData & {
  id?: Id,
  meta?: Meta,
  implicitRules?: URI
  language?: Language
}

export type Narrative = {
  status: Code
  div: XHTML
}

export type Extension = BaseData & {
  url: URI
  value: any //should be a piped list of all allowed types. see: http://hl7.org/fhir/R5/extensibility.html#Extension and
             // http://hl7.org/fhir/R5/datatypes.html#open
}

export type DomainResourceData = ResourceData & {
  text?: Narrative
  contained: ResourceData[]
  extension: Extension[]
  modifierExtension: Extension[]
}
export type Medication = DomainResourceData & {}
