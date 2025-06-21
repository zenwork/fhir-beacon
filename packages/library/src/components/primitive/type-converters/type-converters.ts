export type toPrimitive<O, V> = (val: O) => V
export type ValOrErr<O, V> = { type: 'ValOrErr', val: V, err: null } | { type: 'ValOrErr', val: O, err: string }

/**
 * Wrap value with an error message when operation failed. When there is no error the value is also cast to an expected
 * type. When there was an error the original value type is returned.
 * @param fn
 * @param originalVal
 */
export const valueOrError = <O, V>(fn: toPrimitive<O, V>, originalVal: O): ValOrErr<O, V> => {
  try {
    return { type: 'ValOrErr', val: fn(originalVal), err: null }
  } catch (e: Error | any) {
    return { type: 'ValOrErr', val: originalVal, err: e.message }
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
  time = 'time',
  unsigned_int = 'unsigned_int',
  uri = 'uri',
  uri_type = 'uri_type', //TODO: not 100% this belongs here
  url = 'url',
  uuid = 'uuid'
}

export type Type = string

/**
 * Converts the given value to its primitive type.
 *
 * @param {string | null} value - The value to be converted.
 * @return {PrimitiveType} - The converted value as a primitive type.
 */
export function convertToPrimitiveType(value: string | null): PrimitiveType {
  if (!value || !Object.values(PrimitiveType).includes(value as PrimitiveType)) {
    return PrimitiveType.none
  }

  return value as PrimitiveType
}
