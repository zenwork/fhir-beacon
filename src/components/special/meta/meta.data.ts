// Todo: figure out when where Meta Data goes
import {BaseElementData}             from '../../../internal/base/base-element.data'
import {CodingData}                  from '../../complex/coding/coding.data'
import {Canonical, Id, Instant, URI} from '../../primitive/primitive.data'

export type MetaData = BaseElementData & {
  versionId?: Id
  lastUpdated?: Instant
  source?: URI
  profile: Canonical[]
  security?: CodingData[],
  tag?: CodingData[]

}
