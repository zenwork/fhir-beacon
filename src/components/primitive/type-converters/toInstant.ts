import {Instant}     from '../primitive.data'
import {toPrimitive} from './index'

const instantRegex = /^([0-9]([0-9]([0-9][1-9]|[1-9]0)|[1-9]00)|[1-9]000)-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])T([01][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)(\.[0-9]{1,9})?(Z|([+-])((0[0-9]|1[0-3]):[0-5][0-9]|14:00))$/

export const toInstant: toPrimitive<string, Instant> = (instant: string): Instant => {
  const match = instantRegex.test(instant)
  if (match) {
    return instant as Instant
  }
  throw new TypeError(`instant must match [ ${instantRegex.toString()} ]`)
}
