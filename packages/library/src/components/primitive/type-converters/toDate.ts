import {DateTime, FhirDate} from '../primitive.data'
import {toPrimitive}        from './type-converters'

const regex = /^([0-9]([0-9]([0-9][1-9]|[1-9]0)|[1-9]00)|[1-9]000)(-(0[1-9]|1[0-2])(-(0[1-9]|[1-2][0-9]|3[0-1]))?)?$/

/**
 * Converts a string to a DateTime value.
 *
 * @param {string} value - The string value to convert.
 * @returns {DateTime} - The converted DateTime value.
 * @throws {TypeError} - If the value is not a valid date time.
 */
export const toDate: toPrimitive<string, DateTime> = (value: string): FhirDate => {

  if (!regex.test(value)) {
    throw new TypeError(`is not a valid date`)
  }

  return value as FhirDate

}
