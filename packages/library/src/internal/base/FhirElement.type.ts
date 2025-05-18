import {URI} from '../../components/primitive/primitive.data'



/**
 * Represents a data structure that holds the information of a FHIR element.
 * @type {Object} FhirElementData
 * @property {string | null} id - The ID of the FHIR element. Optional and can be null.
 * @property {Array} extension - An array to store any extensions related to the FHIR element.
 */
export type FhirElementData = {
  id?: string | null,
  extension?: any[],
}

/**
 * Represents an extension in FHIR (Fast Healthcare Interoperability Resources).
 *
 * An extension extends the functionality of a resource or datatype by adding additional data elements.
 *
 * @type {Object} Extension
 * @extends {FhirElementData}
 * @property {URI} url - The URL that identifies the extension.
 * @property {*} value - The value of the extension. The format of the value depends on the specific extension.
 *
 * @see {@link http://hl7.org/fhir/R5/extensibility.html#Extension|FHIR R5 Extensibility}
 * @see {@link http://hl7.org/fhir/R5/datatypes.html#open|FHIR R5 DataTypes}
 */
export type Extension = FhirElementData & {
  url: URI
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  value: any //should be like what I did in Ingredient. see: http://hl7.org/fhir/R5/extensibility.html#Extension and
             // http://hl7.org/fhir/R5/datatypes.html#open
}
