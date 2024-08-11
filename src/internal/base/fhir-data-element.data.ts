import {URI} from '../../components/primitive/primitive.data'

export const NoDataSet:FhirDataElementData = Object.freeze({id:'FHIR::BEACON::NULL::OBJECT'})

//TODO: Should be renamed
export type FhirDataElementData = {
  id?: string | null,
  extension?: [],
}

export type Extension = FhirDataElementData & {
  url: URI
  value: any //should be like what I did in Ingredient. see: http://hl7.org/fhir/R5/extensibility.html#Extension and
             // http://hl7.org/fhir/R5/datatypes.html#open
}

export type ValidationError = { id: string, err: string }
export type ValidationErrors = ValidationError[]
