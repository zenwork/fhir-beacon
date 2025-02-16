import {choose}                from 'lit-html/directives/choose.js'
import {FhirDataContext}       from '../../internal/contexts/FhirContextData'
import {isBlank}               from '../../utilities'
import {Choice}                from '../../valuesets/ValueSet.data'
import {PrimitiveInvalidEvent} from './primitiveInvalidEvent'
import {PrimitiveValidEvent}   from './primitiveValidEvent'
import {
  PrimitiveType,
  toBase64,
  toBoolean,
  toCanonical,
  toCode,
  toDate,
  toDatetime,
  toDecimal,
  toFhirString,
  toId,
  toInstant,
  toInteger,
  toInteger64,
  toLink,
  toMarkdown,
  toPositiveInt,
  toTime,
  toType,
  toUnsignedInt,
  toUri,
  toUrl,
  valueOrError
}                              from './type-converters'



export type PrimitiveValueHost = {
  key?: string,
  value?: unknown,
  valuePath?: string,
  type: PrimitiveType,
  choices?: Choice[],
  error: boolean,
  presentableValue: unknown,
  presentableError: string,
  presentableTypeError: string,
  contextData?: FhirDataContext,
  dispatchEvent: (event: Event) => void,
  showerror?: boolean,
  required: boolean,
  errormessage?: string,
}

type changedProperties = {
  valueChanged?: boolean,
  valuePathChanged?: boolean,
  typeChanged?: boolean,
  requiredChanged?: boolean,
  errormessageChanged?: boolean,
}

export class PrimitiveValidator {
  readonly #host: PrimitiveValueHost

  constructor(host: PrimitiveValueHost) {
    this.#host = host
  }

  validate({
             valueChanged = false,
             typeChanged = false,
             valuePathChanged = false,
             errormessageChanged = false,
             requiredChanged = false
           }: changedProperties): void {

    const value: string | undefined = this.value() as string | undefined

    // override value with valuePath
    if (valuePathChanged && this.#host.contextData) {
      if (!isBlank(value) && valuePathChanged) {
        console.warn('primitive: valuePath is overriding value attribute. Do not set both')
      }

      try {
        this.#host.value = this.#host.contextData.getAt(this.#host.valuePath!)
      } catch {
        console.log(`unable to retrieve value-path: ${this.#host.valuePath}`)
        this.#host.value = `unable to retrieve value-path: ${this.#host.valuePath}`
        this.#host.type = PrimitiveType.forced_error
      }
    }

    const watchedHaveChanged = valueChanged || typeChanged || requiredChanged
    if (watchedHaveChanged) {

      if (!isBlank(value) && this.#host.type) {
        this.#host.presentableValue = ''
        this.#host.presentableError = ''
        this.#host.presentableTypeError = ''
        choose(this.#host.type, [
          [PrimitiveType.base64, () => this.validOrError(toBase64, value)],
          [PrimitiveType.boolean, () => this.validOrError(toBoolean, value)],
          [PrimitiveType.code, () => this.validOrError(toCode, value!)],
          [PrimitiveType.canonical, () => this.validOrError(toCanonical, value!)],
          [PrimitiveType.date, () => this.validOrError(toDate, value!)],
          [PrimitiveType.datetime, () => this.validOrError(toDatetime, value!)],
          [PrimitiveType.decimal, () => this.validOrError(toDecimal, value!)],
          [PrimitiveType.fhir_string, () => this.validOrError(toFhirString, value)],
          // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
          [PrimitiveType.forced_error, () => (this.#host.presentableValue = value) && (this.#host.error = true)],
          [PrimitiveType.id, () => this.validOrError(toId, value!)],
          [PrimitiveType.instant, () => this.validOrError(toInstant, value!)],
          [PrimitiveType.integer, () => this.validOrError(toInteger, value)],
          [PrimitiveType.integer64, () => this.validOrError(toInteger64, value)],
          [PrimitiveType.link, () => this.validOrError(toLink, value)],
          [PrimitiveType.markdown, () => this.validOrError(toMarkdown, value!)],
          // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
          [PrimitiveType.none, () => (this.#host.presentableValue = value) && (this.#host.error = false)],
          [PrimitiveType.positiveInt, () => this.validOrError(toPositiveInt, value)],
          [PrimitiveType.string_reference, () => this.validOrError(toType, value!)],
          [PrimitiveType.unsigned_int, () => this.validOrError(toUnsignedInt, value)],
          [PrimitiveType.time, () => this.validOrError(toTime, value!)],
          [PrimitiveType.uri, () => this.validOrError(toUri, value!)],
          [PrimitiveType.uri_type, () => this.validOrError(toType, value!)],
          [PrimitiveType.url, () => this.validOrError(toUrl, value!)]
        ])
      }
    }


    if (isBlank(value) && this.#host.required) {
      this.#host.error = true
      this.#host.presentableError = 'This property is required'
      const event = new PrimitiveInvalidEvent({ path: [{ node: this.#host.key || 'unknown' }] },
                                              value,
                                              this.#host.type,
                                              'This property is required')
      this.#host.dispatchEvent(event)
    }


    if (errormessageChanged) {

      if (!isBlank(this.#host.errormessage)) {
        this.#host.presentableError = this.#host.errormessage ?? 'unknown error'
        this.#host.error = true
        const event = new PrimitiveInvalidEvent({ path: [{ node: this.#host.key || 'unknown' }] },
                                                value,
                                                this.#host.type,
                                                this.#host.presentableError)
        this.#host.dispatchEvent(event)
      }
    }


  }

  private value(): unknown {
    return this.#host.value
  }
  /**
   *
   * @param fn
   * @param original
   */
  private validOrError = <O, V>(fn: (original: O) => V, original: O) => {
    const parsedValue = valueOrError(fn, original)

    let validEvent: PrimitiveValidEvent | undefined = undefined
    if (!isBlank(parsedValue.val)) {
      this.#host.presentableValue = parsedValue.val
      this.#host.error = false
      validEvent = new PrimitiveValidEvent(this.#host.key!, original, this.#host.type)
    }

    let invalidEvent: PrimitiveInvalidEvent | undefined = undefined
    if (parsedValue.err) {
      this.#host.presentableTypeError = parsedValue.err
      this.#host.error = true
      invalidEvent = new PrimitiveInvalidEvent({ path: [{ node: this.#host.key! }] },
                                               original,
                                               this.#host.type,
                                               parsedValue.err || this.#host.presentableError)
    }

    if (invalidEvent !== undefined) {
      this.#host.dispatchEvent(invalidEvent)
    } else if (validEvent !== undefined) {
      this.#host.dispatchEvent(validEvent)
    }
  }

}
