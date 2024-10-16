import {Id}          from '../primitive.data'
import {toPrimitive} from './type-converters'

const idRegex = /^[A-Za-z0-9\-.]{1,64}$/

export const toId: toPrimitive<string, Id> = (id: string): Id => {
  const match = idRegex.test(id)
  if (match) {
    return id as Id
  }
  throw new TypeError(`id must match [ ${idRegex.toString()} ]`)
}
