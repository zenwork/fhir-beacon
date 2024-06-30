import {FhirString}  from '../primitive.data'
import {toPrimitive} from './index'

export type Type = string
export const toFhirString: toPrimitive<unknown, FhirString> = (unknown: unknown): FhirString => {

  if (typeof unknown !== 'string') {
    throw new Error('Input must be a string')
  }

  if (unknown.length > 1048576) {
    throw new Error('String length shall not exceed 1,048,576 characters')
  }

  const regex = /[\u0000-\u0008\u000B-\u000C\u000E-\u001F\u007F-\u009F]/g

  if (regex.test(unknown)) {
    throw new Error('String should not contain Unicode character points below 32, except for u0009, u000D and u000A')
  }

  // If all constraints pass return the trimmed string
  return unknown as FhirString
}
