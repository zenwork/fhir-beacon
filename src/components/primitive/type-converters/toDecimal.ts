import {Decimal}     from '../primitive.data'
import {toPrimitive} from './type-converters'

const regex = /^-?\d+(\.\d+)?([eE][+-]?\d+)?$/

/**
 * Converts a string representation of a decimal number to the Decimal type.
 *
 * @param decimal - The string representation of the decimal number to convert.
 * @throws TypeError If the decimal does not meet the specified criteria.
 * @returns Decimal The converted decimal value.
 */
export const toDecimal: toPrimitive<string, Decimal> = function (decimal: string) {

  if (!regex.test(decimal)) throw new TypeError(`decimal must be a valid number: ${decimal}`)
  if (isNaN(Number.parseFloat(decimal))) throw new TypeError(`decimal must be a valid number: ${decimal}`)

  // Split the number into base and exponent
  const parts = decimal.split(/[eE]/)
  const basePart = parts[0]
  const exponentPart = parts[1] ? parseInt(parts[1], 10) : 0

  // Remove potential leading negative sign and decimal point
  const baseDigits = basePart.replace(/^-|\./g, '')

  // Calculate the total number of digits considering the exponent
  const totalDigits = baseDigits.length + (exponentPart !== 0 ? Math.abs(exponentPart) : 0)

  if (totalDigits <= 18) {
    return Number.parseFloat(decimal) as Decimal
  }

  throw new TypeError(`decimal must be a valid number: ${decimal}`)

}

export function isDecimal(arg: unknown): arg is Decimal {
  return typeof arg === 'number' && Number.isFinite(arg) && regex.test(arg.toString())
}
