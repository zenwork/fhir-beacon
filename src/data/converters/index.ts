export type toPrimitive<O, V> = (val: O) => V
export type ValOrErr<O, V> = { type: 'ValOrErr', val: V, err: null } | { type: 'ValOrErr', val: O, err: string }

/**
 * Valid FHIR code
 * @typedef {string} Code
 */
export type Code = string

/**
 * Marker type to distinguish a URL object that has passed the FHIR URI requirements
 */
export type URI = URL

/**
 * Represents a decimal number with maximum of 18 digits.
 */
export type Decimal = number



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
  none = 'none',
  code = 'code',
  url = 'url',
  uri = 'uri',
  decimal = 'decimal'
}
