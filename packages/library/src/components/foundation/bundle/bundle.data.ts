import {FhirElementData}     from '../../../internal'
import {BackboneElementData} from '../../../internal/resource/backbone.data'
import {ResourceData}        from '../../../internal/resource/domain-resource.data'

import {CodingData}                                                               from '../../complex/coding/coding.data'
import {
  IdentifierData
}                                                                                 from '../../complex/identifier/identifier.data'
import {Base64Binary, Code, Decimal, FhirString, Instant, Link, UnsignedInt, URI} from '../../primitive/primitive.data'
import {
  ReferenceData
}                                                                                 from '../../special/reference/reference.data'


export type BundleLinkBackbone = BackboneElementData & {
  relation: Code
  url: URI
}

export type BundleEntrySearchBackbone = BackboneElementData & {
  mode?: Code
  score?: Decimal
}

export type BundleEntryRequestBackbone = BackboneElementData & {
  method: Code
  url: URI
  ifNoneMatch?: FhirString
  ifModifiedSince?: Instant
  ifMatch?: FhirString
  ifNoneExist?: FhirString
}

export type BundleEntryResponseBackbone = BackboneElementData & {
  status: FhirString
  location?: URI
  etag?: FhirString
  lastModified?: Instant
  outcome?: ResourceData
}

export type BundleEntryBackbone = BackboneElementData & {
  link: Link[]
  fullUrl?: URI
  resource?: ResourceData
  search?: BundleEntrySearchBackbone
  request?: BundleEntryRequestBackbone
  response?: BundleEntryResponseBackbone

}

export type SignatureData = FhirElementData & {
  type: CodingData[]
  when?: Instant
  who?: ReferenceData
  onBehalfOf?: ReferenceData
  targetFormat?: Code
  sigFormat?: Code
  data?: Base64Binary
}

export type BundleData = FhirElementData & {

  identifier?: IdentifierData,
  type: Code,
  timestamp?: Instant,
  total?: UnsignedInt,
  link: BundleLinkBackbone[]
  entry: BundleEntryBackbone[]
  signature?: SignatureData
  issues?: ResourceData
}
