import {DateTime}    from '../primitive.data'
import {toPrimitive} from './index'

const regex = /^([0-9]([0-9]([0-9][1-9]|[1-9]0)|[1-9]00)|[1-9]000)(-(0[1-9]|1[0-2])(-(0[1-9]|[1-2][0-9]|3[0-1])(T([01][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)(\.[0-9]{1,9})?)?)?(Z|([+\-])((0[0-9]|1[0-3]):[0-5][0-9]|14:00)?)?)?$/

/**
 * Converts a string to a DateTime value.
 *
 * @param {string} value - The string value to convert.
 * @returns {DateTime} - The converted DateTime value.
 * @throws {TypeError} - If the value is not a valid date time.
 */
export const toDatetime: toPrimitive<string, DateTime> = (value: string) => {

  if (!regex.test(value)) {
    throw new TypeError(`is not a valid date time`)
  }

  return value as DateTime

}
