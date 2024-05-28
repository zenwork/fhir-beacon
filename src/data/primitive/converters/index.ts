import './ToCode'
import './ToDatetime'
import './ToDecimal'
import './ToError'
import './ToReference'
import './ToType'
import './ToUri'
import './ToUrl'

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
  string_reference = 'string_reference'
}
