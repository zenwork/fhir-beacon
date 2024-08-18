import {Id, Language, URI}          from '../../components/primitive/primitive.data'
import {MetaData}                   from '../../components/special/meta/meta.data'
import {NarrativeData}              from '../../components/special/narrative/narrative.data'
import {Extension, FhirElementData} from '../base/fhir-data-element.data'

export type ResourceData = FhirElementData & {
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
