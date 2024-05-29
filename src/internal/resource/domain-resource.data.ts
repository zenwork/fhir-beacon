import {Id, Language, URI}          from '../../components/primitive/primitive.data'
import {MetaData}                   from '../../components/special/meta/meta.data'
import {NarrativeData}              from '../../components/special/narrative/narrative.data'
import {BaseElementData, Extension} from '../base/base-element.data'

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
