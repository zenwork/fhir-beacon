import {Decimal}     from '../primitive.data'
import {toPrimitive} from './index'

const decimalRegex = /^-?(0|[1-9][0-9]{0,17})(\.[0-9]{1,17})?([eE][+-]?[0-9]{1,9}})?$/
/**
 * Converts a string representation of a decimal number to the Decimal type.
 *
 * @param decimal - The string representation of the decimal number to convert.
 * @throws TypeError If the decimal does not meet the specified criteria.
 * @returns Decimal The converted decimal value.
 */
export const toDecimal: toPrimitive<string, Decimal> = (decimal: string) => {

  const number = parseFloat(decimal)
  if (!Number.isFinite(number)) {
    throw new TypeError(`decimal must be a valid number`)
  }

  if (!decimalRegex.test(decimal)) {
    throw new TypeError(`decimal must have a maximum of 18 digits and zero or one decimals`)
  }

  return number as Decimal

}

export function isDecimal(arg: unknown): arg is Decimal {
  return typeof arg === 'number' && Number.isFinite(arg) && decimalRegex.test(arg.toString())
}
