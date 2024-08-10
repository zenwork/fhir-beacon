import {PositiveInt, UnsignedInt} from '../primitive.data'
import {toPrimitive}              from './type-converters'

export const toPositiveInt: toPrimitive<unknown, UnsignedInt> = (value: unknown): PositiveInt => {

  if (typeof value === 'number') return isPositiveIntWithinRange(value)
  return isPositiveIntWithinRange(parseFloat(value as any)) as UnsignedInt

}

const isPositiveIntWithinRange = (value: number) => {

  if (Number.isInteger(value) && value > 0 && value < 2147483648) {
    return value
  } else {
    throw new Error('Input must be a non-negative integer within the range 1 to 2,147,483,647')
  }

}
