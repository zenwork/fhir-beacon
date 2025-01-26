import {Codes}                           from '../../codes/Codes'
import {CodeIds}                         from '../../codes/types'
import {CodeableConceptData, CodingData} from '../../components'
import {Code, URI}                       from '../../components/primitive/primitive.data'
import {Choices}                         from '../../valuesets/ValueSet.data'
import {DomainResourceData, ResourceData} from '../resource/domain-resource.data'



type ErrorKeys = '_root' | string
export const errors = Symbol('errors')
export const meta = Symbol('metadata')

export type ErrorItems = {
  [key: string]: string
}

export type Errors = Record<ErrorKeys, ErrorItems | string>

export type MetaDecoration = { hide: boolean }
export type Decoration = {
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
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
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

type ErrorKey = { parent?: string[], key: string }

type Error = { err: string }

type CodeIdPair = { code: Code | undefined, id: CodeIds }

type CodeableConceptIdPair = {
  value: CodeableConceptData | CodeableConceptData[] | undefined,
  id: CodeIds
}

export interface Validations {
  errFor(key: string): string | undefined
  addErr(err: ErrorKey & Error): void
  remErr(key: string): void
  validateCode(props: ErrorKey & CodeIdPair): boolean
  validateCodeableConcept(props: ErrorKey & CodeableConceptIdPair): void
}

/**
 * Represents a decorated data object that extends from `FhirElementData`.
 * The `DecoratedData` type adds additional properties to the base `T` object using index signature.
 * The additional properties can be of any type.
 *
 * @typeparam T - The base data object that extends `FhirElementData`.
 */
export type Decorated<T extends FhirElementData | DomainResourceData> = T & Decoration

export class ValidationsImpl<D extends FhirElementData> implements Validations {
  readonly #data: Decorated<D>
  #codes = new Codes()
  constructor(decorated: Decorated<D>) {this.#data = decorated}

  public errFor(key: string): string | undefined {
    const error: unknown = this.#data[errors][key]
    if (typeof error === 'string') return error
    return undefined
  }

  public addErr(props: { parent?: string[], key: string, err: string }): void {
    if (!props.parent) {
      this.#data[errors][props.key] = props.err
    } else {

      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      let root: any = this.#data[errors]
      props.parent.forEach(p => {
        root[p] = { '_root': '' }
        root = root[p]
      })
    }

  }

  public remErr(key: string): void {
    delete this.#data[errors][key]
  }

  public validateCode({ key, code, id }: { key: string, code: Code, id: CodeIds }): boolean {
    const codes = this.code(id)
    if (codes) {
      const valid: boolean = codes.choices.some(choice => code === choice.value)
      if (!valid) {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        const choiceList: any = codes.choices.map(c => c.value).join(', ')
        this.addErr(
          {
            key: key,
            err: `${code} is not a valid ${id} code. Valid codes are: ${choiceList}`
          })
      }
      return valid
    }
    return false
  }

  public validateCodeableConcept({ key, value, id }: {
    key: string,
    value: CodeableConceptData | CodeableConceptData[] | undefined,
    id: CodeIds
  }): boolean {
    const codes = this.code(id)

    const validateOne = (coding: CodingData, i: number) => {
      const valid: boolean =
        codes.choices.some(choice => {
          return coding.code === choice.value
                 && coding.system === codes.system
        })

      if (!valid) {
        const choices: string = codes.choices.map(c => c.value).join(', ')
        this.addErr(
          {
            key: `${key}::${i}`,
            err: `${coding.code} is not a valid ${id} code. Valid codes are: ${choices}`
          }
        )
      }

    }

    if (value) {
      if (value instanceof Array) {
        value.forEach(validateOne)
      } else {
        validateOne(value.coding as CodingData, 0)
      }
    }

    return false
  }

  private code(id: CodeIds): Choices {
    return this.#codes.get(id)!
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
export const NoDataObject: FhirElementData | ResourceData = Object.freeze({ id: 'FHIR::BEACON::NO::DATA' })

export function decorate<T extends FhirElementData>(data?: T): Decorated<T> {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const d: any = data !== NoDataObject ? data : {}
  return {
    ...d,
    [errors]: {},
    //TODO: hide is not the right metadata... it's the likely wanted behaviour
    [meta]: { hide: data === NoDataObject }
  } as Decorated<T>
}
