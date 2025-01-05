import {toPrimitive} from './type-converters'

const TRUE_VALUES = [true, 'true']
const FALSE_VALUES = [false, 'false']

const isTrueValue = (value: any): boolean => TRUE_VALUES.includes(value)
const isFalseValue = (value: any): boolean => FALSE_VALUES.includes(value)

export const toBoolean: toPrimitive<any, boolean> = (value: any): boolean => {
  if (isTrueValue(value)) {
    return true
  }
  if (isFalseValue(value)) {
    return false
  }
  throw new TypeError(`value should be true or false: ${value}`)
}
