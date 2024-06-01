import './toCode'
import './toDatetime'
import './toDecimal'
import './toError'
import './toReference'
import './toType'
import './toUri'
import './toUrl'
import './toId'

export type toPrimitive<O, V> = (val: O) => V
export type ValOrErr<O, V> = { type: 'ValOrErr', val: V, err: null } | { type: 'ValOrErr', val: O, err: string }

/**
 * Wrap value with an error message when operation failed. When there is no error the value is also cast to an expected type. When there
 * was an error the original value type is returned.
 * @param fn
 * @param originalVal
 */
export const valueOrError = <O, V>(fn: toPrimitive<O, V>, originalVal: O): ValOrErr<O, V> => {
  try {
    return {type: 'ValOrErr', val: fn(originalVal), err: null}
  } catch (e: any) {
    return {type: 'ValOrErr', val: originalVal, err: e.toString()}
  }
}

export enum PrimitiveType {
  forced_error = 'forced_error',
  none = 'none',
  code = 'code',
  url = 'url',
  uri = 'uri',
  decimal = 'decimal',
  datetime = 'datetime',
  uri_type = 'uri_type', //TODO: not 100% this belongs here
  string_reference = 'string_reference',
  id = 'id',
  instant = 'instant',
  canonical = 'canonical',
  fhir_string = 'fhir_string',
  base64 = 'base64',
  unsigned_int = 'unsigned_int',
  link = 'link'
}
