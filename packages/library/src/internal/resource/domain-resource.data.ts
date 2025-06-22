import {Id, Language, URI}                      from '../../components/primitive/primitive.data'
import {MetaData}                               from '../../components/special/meta/meta.data'
import {NarrativeData}                          from '../../components/special/narrative/narrative.data'
import {OpenType}                               from '../../OpenType'
import {ExtensionUnderscore, FhirExtensionData} from '../base'




export type ResourceData = {
  id?: Id,
  resourceType: string //not in model but seems to always be there
  meta?: MetaData,
  implicitRules?: URI
  language?: Language
} & ExtensionUnderscore

export type DomainResourceData = ResourceData & {
  text?: NarrativeData
  contained: ResourceData[]
  extension: FhirExtensionData<OpenType>[]
  modifierExtension: FhirExtensionData<OpenType>[]
}
