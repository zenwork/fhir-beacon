import {URI}         from '../primitive.data'
import {toUrl}       from './toUrl'
import {toPrimitive} from './type-converters'

export const toUri: toPrimitive<string, URI> = (uri: string): URI => {
  return toUrl(uri).toString() as URI
}
