import {OpenType, OpenTypeName} from '../../OpenType'
import {Uri}                    from '../../PrimitiveTypes'




export type ValuePrefixKey = `value${OpenTypeName}`;

export type ExtensionUnderscore<V = unknown> = {
  [K in `_${string}`]?:
  { id?: string | null, extension: FhirExtensionData<OpenType>[] }
  | ({ id?: string | null, extension: FhirExtensionData<OpenType>[] } | null)[]
}

// TODO: requires refactoring of all data object to split into private base and exportable type
/**
 * must be used with this approach:
 * ```
 * type MyData = {
 *   family: string;
 *   given: string[];
 * };
 *
 * type MyDataWithMeta = MyData & ConstrainedExtensionUnderscore<MyData>;
 * ```
 */
export type ConstrainedExtensionUnderscore<T> = {
  [K in keyof T & string as `_${K}`]?: FhirExtensionData<OpenType>[]
}

/**
 * Represents a data structure that holds the information of a FHIR element.
 * @type {Object} FhirElementData
 * @property {string | null} id - The ID of the FHIR element. Optional and can be null.
 * @property {Array} extension - An array to store any extensions related to the FHIR element.
 */
export type FhirElementData = {
  id?: string | null,
  extension?: FhirExtensionData<OpenType>[]
} & ExtensionUnderscore

/**
 * Represents an extension in FHIR.
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
export type FhirExtensionData<T extends OpenType> =
  FhirElementData
  & { url: Uri }
  & { [K in ValuePrefixKey]?: T }
