import {Code}        from '../primitive.data'
import {toPrimitive} from './index'

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
