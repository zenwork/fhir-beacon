import {toPrimitive} from './index'

export const toBoolean: toPrimitive<any, boolean> = (value: any): boolean => {
  if (value === true || value === false || value === 'true' || value === 'false') {
    return !!value
  }

  throw new TypeError(`value should be true or false: ${value}`)
}
