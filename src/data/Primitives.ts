/**
 * Valid FHIR code
 * @typedef {string} Code
 */
export type Code = string

/**
 * Regular expression pattern for matching a FHIR code.
 *
 * It is defined using the `RegExp` constructor with the following pattern:
 *
 *   /^(\S+\s)?\S+$/
 *
 * The pattern consists of the following components:
 *
 *   ^           - Matches the start of the input.
 *   (\S+\s)?    - An optional group that matches one or more non-whitespace characters followed by a whitespace character.
 *                 This is used to match an optional leading indentation.
 *   \S+         - Matches one or more non-whitespace characters.
 *   $           - Matches the end of the input.
 *
 * Codes can only contain one space but not in the leading or trailing position.
 *
 */
const codeRegex = /^(\S+\s)?\S+$/

/**
 * Converts and validates a string to a FHIR code.
 *
 * @template T - The type of the code.
 * @param {string} code - The string to convert.
 * @throws {TypeError} - If the code does not match the specified pattern.
 * @returns {T} - The converted code.
 */
export const toCode: toPrimitive<string, Code> = (code: string): Code => {
  let match = codeRegex.test(code)
  if (match) {
    return code as Code
  }
  throw new TypeError(`code must match [ ${codeRegex.toString()} ]`)
}

/**
 * Converts and validates a string to a URL object.
 *
 * @param {string} url - The string representing the URL.
 * @throws {TypeError} If the URL is not a valid URL.
 * @returns {URL} The URL object.
 */
export const toUrl: toPrimitive<string, URL> = (url: string): URL => {

  // test absolute url
  if (URL.canParse(url)) {
    return new URL(url)
  }

  const absoluteUrlRegex = new RegExp('^(?:[a-z]+:)?//', 'i')
  if (!absoluteUrlRegex.test(url)) {
    throw new TypeError(`URL can not be relative`)
  }

  throw new TypeError(`URL must be a valid URL`)
}

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
  none = 'none',
  code = 'code',
  url = 'url'
}
