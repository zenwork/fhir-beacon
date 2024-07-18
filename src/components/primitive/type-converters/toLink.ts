import {Link}        from '../primitive.data'
import {toPrimitive} from './type-converters'

export const toLink: toPrimitive<unknown, Link> = (value: unknown): Link => {
  const regex = /^(http|https):\/\/[^ "]+$/
  if (!regex.test(String(value))) {
    throw new Error('Invalid web link')
  }
  // If constraints pass, return true
  return value as Link
}
