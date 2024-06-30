import {URI} from '../../components/primitive/primitive.data'

export type BaseElementData = {
  id?: string | null,
  extension?: [],
}

export enum DisplayMode {
  combined = 'combined',
  debug = 'debug',
  display = 'display',
  display_summary = 'display_summary',
  narrative = 'narrative',
  override = 'override',
  structure = 'structure',
  structure_summary = 'structure_summary',
}

export type Extension = BaseElementData & {
  url: URI
  value: any //should be like what I did in Ingredient. see: http://hl7.org/fhir/R5/extensibility.html#Extension and
             // http://hl7.org/fhir/R5/datatypes.html#open
}
