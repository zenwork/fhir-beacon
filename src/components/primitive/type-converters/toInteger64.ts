import {Integer64}   from '../primitive.data'
import {toPrimitive} from './type-converters'

export const toInteger64: toPrimitive<unknown, Integer64> = (value: unknown): Integer64 => {

  if (typeof value === 'string') {
    const bigint = BigInt(value)
    if (bigint < BigInt('-9223372036854775808') || bigint > BigInt('9223372036854775808')) {
      throw new Error('Input must be a non-negative integer within the range -9223372036854775808 to 9223372036854775808')
    }
    return bigint as Integer64
  }
  throw new Error('Input must be a string representation of an integer')
}
