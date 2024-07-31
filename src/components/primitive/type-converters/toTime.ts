import {Time}        from '../primitive.data'
import {toPrimitive} from './type-converters'

const regex = /^([01][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)(\.[0-9]{1,9})?$/


/**
 * Converts a string to a DateTime value.
 *
 * @param {string} value - The string value to convert.
 * @returns {DateTime} - The converted DateTime value.
 * @throws {TypeError} - If the value is not a valid date time.
 */
export const toTime: toPrimitive<string, Time> = (value: string): Time => {

  if (!regex.test(value)) {
    throw new TypeError(`is not a valid date`)
  }

  return value as Time

}
