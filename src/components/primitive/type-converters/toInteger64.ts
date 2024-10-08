import {Integer64}   from '../primitive.data'
import {toPrimitive} from './type-converters'

export const toInteger64: toPrimitive<unknown, Integer64> = (value: unknown): Integer64 => {

  if (typeof value === 'string') {
    let bigint: bigint | null = null

    try {
      bigint = BigInt(value)
      // eslint-disable-next-line
    } catch (_) {
      // do nothing
    }
    if (!bigint || bigint < BigInt('-9223372036854775808') || bigint > BigInt('9223372036854775808')) {
      throw new Error(
        `Input must be a non-negative integer within the range -9223372036854775808 to 9223372036854775808: ${value}`)
    }
    return bigint as Integer64
  }

  throw new Error(`Input must be a string representation of an integer: ${String(value)}`)


}
