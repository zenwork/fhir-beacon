import {Id}          from '../primitive.data'
import {toPrimitive} from './type-converters'

const canonicalRegex = /^\S+$/

export const toCanonical: toPrimitive<string, Id> = (canonical: string): Id => {
  const match = canonicalRegex.test(canonical)
  if (match) {
    return canonical as Id
  }
  throw new TypeError(`canonical must match [ ${canonicalRegex.toString()} ]`)
}
