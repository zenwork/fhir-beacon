import {URI} from '../../components/primitive/primitive.data'

export type BaseElementData = {
  id?: string | null,
  extension?: [],
}

export enum BaseElementMode {
  display = 'display',
  structure = 'structure',
  structure_trace = 'structure_trace',
  combined = 'combined',
  narrative = 'narrative'
}

export type Extension = BaseElementData & {
  url: URI
  value: any //should be like what I did in Ingredient. see: http://hl7.org/fhir/R5/extensibility.html#Extension and
             // http://hl7.org/fhir/R5/datatypes.html#open
}
