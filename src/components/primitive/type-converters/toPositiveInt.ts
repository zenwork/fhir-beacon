import {PositiveInt, UnsignedInt} from '../primitive.data'
import {toPrimitive}              from './type-converters'

export const toPositiveInt: toPrimitive<unknown, UnsignedInt> = (value: unknown): PositiveInt => {

  if (typeof value !== 'number' || value < 1 || value > 2147483647) {
    throw new Error('Input must be a non-negative integer within the range 1 to 2,147,483,647')
  }
  return value as UnsignedInt
}
