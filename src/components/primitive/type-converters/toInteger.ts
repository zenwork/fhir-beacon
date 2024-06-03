import {Integer}     from '../primitive.data'
import {toPrimitive} from './index'

export const toInteger: toPrimitive<unknown, Integer> = (value: unknown): Integer => {

  if (typeof value !== 'number' || value < -2_147_483_648 || value > 2_147_483_647) {
    throw new Error('Input must be a non-negative integer within the range 1 to 2,147,483,647')
  }
  return value as Integer
}
