import {URI}         from '../primitive.data'
import {toPrimitive} from './index'
import {toUrl}       from './ToUrl'

export const toUri: toPrimitive<string, URI> = (uri: string): URI => {
  return toUrl(uri) as URL
}
