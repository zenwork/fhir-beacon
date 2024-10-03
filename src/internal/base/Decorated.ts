import {URI} from '../../components/primitive/primitive.data'

type ErrorKeys = '_root' | string
export const errors = Symbol('errors')
export const meta = Symbol('metadata')

export type ErrorItems = {
  [key: string]: string
}

export type Errors = Record<ErrorKeys, ErrorItems | string>

export type MetaDecoration = { hide: boolean }
export type Decoration = {
  [key: string]: any,
  [errors]: Errors
  [meta]: MetaDecoration

}

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
 * @property {string} key - The identifier that corresponds to the associated key in the {@link FhirElementData}.
 * @property {string} err - The error message to display.
 */
export type ValidationError = { key: string, err: string }
/**
 * Array of errors
 * @see {ValidationError}
 */
export type ValidationErrors = { [key: string]: string }

export interface Validations {
  errFor(key: string): string | undefined
  addErr(err: { parent?: string[], key: string, err: string }): void
  remErr(key: string): void

}

/**
 * Represents a decorated data object that extends from `FhirElementData`.
 * The `DecoratedData` type adds additional properties to the base `T` object using index signature.
 * The additional properties can be of any type.
 *
 * @typeparam T - The base data object that extends `FhirElementData`.
 */
export type Decorated<T extends FhirElementData> = T & Decoration

export class ValidationsImpl<D extends FhirElementData> implements Validations {
  private readonly data: Decorated<D>

  constructor(decorated: Decorated<D>) {this.data = decorated}

  public errFor(key: string): string | undefined {
    const error: unknown = this.data[errors][key]
    if (typeof error === 'string') return error
    return undefined
  }

  public addErr(props: { parent?: string[], key: string, err: string }): void {
    if (!props.parent) {
      this.data[errors][props.key] = props.err
    } else {

      let root: any = this.data[errors]
      props.parent.forEach(p => {
        root[p] = { '_root': '' }
        root = root[p]
      })
    }

  }

  public remErr(key: string): void {
    delete this.data[errors][key]
  }
}

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
export const NoDataObject: FhirElementData = Object.freeze({ id: 'FHIR::BEACON::NO::DATA' })

export function decorated<T extends FhirElementData>(data?: T): Decorated<T> {
  const d: any = data !== NoDataObject ? data : {}
  return {
    ...d,
    [errors]: {},
    //TODO: hide is not the right metadata... it's the likely wanted behaviour
    [meta]: { hide: data === NoDataObject }
  } as Decorated<T>
}
