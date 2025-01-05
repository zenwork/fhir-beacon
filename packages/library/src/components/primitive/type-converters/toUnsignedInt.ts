import {UnsignedInt} from '../primitive.data'
import {toPrimitive} from './type-converters'

export const toUnsignedInt: toPrimitive<unknown, UnsignedInt> = (value: unknown): UnsignedInt => {

  if (typeof value !== 'number' || value < 0 || value > 2147483647) {
    throw new Error('Input must be a non-negative integer within the range 0 to 2,147,483,647')
  }

  const regex = /^(0|([1-9][0-9]*))$/

  if (!regex.test(String(value))) {
    throw new Error('Invalid integer')
  }

  return value as UnsignedInt
}
