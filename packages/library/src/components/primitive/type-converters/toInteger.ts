import {Integer}     from '../primitive.data'
import {toPrimitive} from './type-converters'



export const toInteger: toPrimitive<unknown, Integer> = (value: unknown): Integer => {


  if (!Number.isInteger(value)) {
    throw new Error('Input must be a non-negative integer within the range 1 to 2,147,483,647')
  }

  let testValue: number = value as number
  if (typeof value === 'string') {
    testValue = Number.parseInt(value)
  }


  if (testValue < -2_147_483_648 || testValue > 2_147_483_647) {
    throw new Error('Input must be a non-negative integer within the range 1 to 2,147,483,647')
  }


  return value as Integer
}
