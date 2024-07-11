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
  base64 = 'base64',
  boolean = 'boolean',
  canonical = 'canonical',
  code = 'code',
  date = 'date',
  datetime = 'datetime',
  decimal = 'decimal',
  fhir_string = 'fhir_string',
  forced_error = 'forced_error',
  id = 'id',
  instant = 'instant',
  integer = 'integer',
  integer64 = 'integer64',
  link = 'link',
  markdown = 'markdown',
  none = 'none',
  positiveInt = 'positiveInt',
  string_reference = 'string_reference',
  unsigned_int = 'unsigned_int',
  uri = 'uri',
  uri_type = 'uri_type', //TODO: not 100% this belongs here
  url = 'url',
}
