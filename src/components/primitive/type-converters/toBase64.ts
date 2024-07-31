import {Base64Binary, FhirString} from '../primitive.data'
import {toPrimitive}              from './type-converters'

export const toBase64: toPrimitive<unknown, FhirString> = (value: unknown): Base64Binary => {
  if (typeof value !== 'string') {
    throw new Error('Input must be a base64 encoded string')
  }

  const regex = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/

  if (!regex.test(value)) {
    throw new Error('Invalid base64 encoded string')
  }

  // Assuming you have some implementation based limit to the size they support.
  const MAX_LENGTH = 1048576 // Your own specified limit

  if (value.length > MAX_LENGTH) {
    throw new Error(`Binary size should not exceed ${MAX_LENGTH}`)
  }

  // If all constraints pass, return true
  return value as FhirString
}
