import {DateTime} from '../structures'
import {toPrimitive}       from './index'

const regex = /^([0-9]([0-9]([0-9][1-9]|[1-9]0)|[1-9]00)|[1-9]000)(-(0[1-9]|1[0-2])(-(0[1-9]|[1-2][0-9]|3[0-1])(T([01][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)(\.[0-9]{1,9})?)?)?(Z|([+\-])((0[0-9]|1[0-3]):[0-5][0-9]|14:00)?)?)?$/
/**
 * Converts a string representation of a decimal number to the Decimal type.
 *
 * @param decimal - The string representation of the decimal number to convert.
 * @throws TypeError If the decimal does not meet the specified criteria.
 * @returns Decimal The converted decimal value.
 */
export const toDatetime: toPrimitive<string, DateTime> = (value: string) => {

  console.log(value)
  if (!regex.test(value)) {
    throw new TypeError(`is not a valid date time`)
  }

  return value as DateTime

}
