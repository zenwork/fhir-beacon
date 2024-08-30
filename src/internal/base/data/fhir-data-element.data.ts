import {URI} from '../../../components/primitive/primitive.data'


/**
 * The NoDataSet variable is a constant value of type FhirElementData.
 * It represents a null value for FHIR objects in the context of the Beacon system.
 *
 * The NoDataSet value is created by freezing an object with a single property 'id',
 * which is set to the string value 'FHIR::BEACON::NULL::OBJECT'.
 *
 * The NoDataSet value is immutable and cannot be modified once created.
 * It can be used to indicate the absence or unavailability of valid FHIR data. It is meant to be used as a default
 * value to differentiate between default emptiness and user-set emptiness.
 *
 * @type {FhirElementData}
 * @const
 */
export const NoDataSet: FhirElementData = Object.freeze({ id: 'FHIR::BEACON::NO::DATA' })

/**
 * Represents a data structure that holds the information of a FHIR element.
 * @type {Object} FhirElementData
 * @property {string | null} id - The ID of the FHIR element. Optional and can be null.
 * @property {Array} extension - An array to store any extensions related to the FHIR element.
 */
export type FhirElementData = {
  id?: string | null,
  extension?: [],
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
  value: any //should be like what I did in Ingredient. see: http://hl7.org/fhir/R5/extensibility.html#Extension and
             // http://hl7.org/fhir/R5/datatypes.html#open
}

/**
 * Represents a validation error.
 *
 * @type {Object} ValidationError
 * @property {string} id - The identifier of the validation error.
 * @property {string} err - The error message associated with the validation error.
 */
export type ValidationError = { id: string, err: string }

/**
 * Array of errors
 * @see {ValidationError}
 */
export type ValidationErrors = ValidationError[]
