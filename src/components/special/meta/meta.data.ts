// Todo: figure out when where Meta Data goes
import {FhirElementData}             from '../../../internal/base/fhir-data-element.data'
import {CodingData}                  from '../../complex/coding/coding.data'
import {Canonical, Id, Instant, URI} from '../../primitive/primitive.data'

export type MetaData = FhirElementData & {
  versionId?: Id
  lastUpdated?: Instant
  source?: URI
  profile: Canonical[]
  security?: CodingData[],
  tag?: CodingData[]

}
