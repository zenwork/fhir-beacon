import {BackboneElementData}                                            from '../../../internal/resource/backbone.data'
import {
  DomainResourceData
}                                                                       from '../../../internal/resource/domain-resource.data'
import {
  CodeableConceptData
}                                                                       from '../../complex/codeable-concept/codeable-concept.data'
import {CodingData}                                                     from '../../complex/coding/coding.data'
import {IdentifierData}                                                 from '../../complex/identifier/identifier.data'
import {PeriodData}                                                     from '../../complex/period/period.data'
import {
  ContactDetailData
}                                                                       from '../../metadata/contact-details/contact-detail.data'
import {
  UsageContextData
}                                                                       from '../../metadata/usage-context/usage-context.data'
import {Canonical, Code, DateTime, FhirDate, FhirString, Markdown, URI} from '../../primitive/primitive.data'
import {ReferenceData}                                                  from '../../special/reference/reference.data'

type QualifiedValueBackboneElementData = BackboneElementData & {
  context?: CodeableConceptData
  appliesTo?: CodeableConceptData[]
  gender?: Code
  age?: Range
  gestationalAge?: Range
  condition?: FhirString
  rangeCategory?: Code
  range?: Range
  validCodedValueSet?: Canonical // TODO: should be constrained to a ValueSet if that's possible
  normalCodedValueSet?: Canonical
  abnormalCodedValueSet?: Canonical
  criticalCodedValueSet?: Canonical
}

type ComponentBackboneElementData = BackboneElementData & {
  code: CodeableConceptData
  permittedDataType?: CodeableConceptData[]
  permittedUnit?: CodingData[]
  qualifiedValue?: QualifiedValueBackboneElementData[]
}

type VersionAlgorithmCoding = CodingData
type VersionAlgorithmString = FhirString

export type ObservationDefinitionData = DomainResourceData & {
  url?: URI,
  identifier?: IdentifierData,
  version?: FhirString,
  versionAlgorithm?: VersionAlgorithmString | VersionAlgorithmCoding,
  name?: FhirString,
  title?: FhirString,
  status: Code,
  experimental?: boolean
  date?: DateTime
  publisher?: FhirString
  contact?: ContactDetailData[]
  description?: Markdown
  useContext?: UsageContextData[]
  jurisdiction?: CodeableConceptData[] //deprecated
  purpose?: Markdown
  copyright?: Markdown
  copyrightLabel?: FhirString
  approvalDate?: FhirDate
  lastReviewDate?: FhirDate
  effectivePeriod?: PeriodData
  derivedFromCanonical?: ObservationDefinitionData[]
  derivedFromUri?: URI[]
  subject?: CodeableConceptData[]
  performerType?: CodeableConceptData
  category?: CodeableConceptData[]
  code: CodeableConceptData
  permittedDataType?: Code[] //TODO: bindings: https://www.hl7.org/fhir/valueset-permitted-data-type.html
  multipleResultsAllowed?: boolean
  bodySite?: CodeableConceptData
  method?: CodeableConceptData
  specimen?: ReferenceData[] //TODO: should be constrained to SpecimenDefinition
  device?: ReferenceData[] //TODO: should be coinstrained to DeviceDefinition|Device
  preferredReportName?: FhirString
  permittedUnit?: CodingData[]
  qualifiedValue?: QualifiedValueBackboneElementData[]
  hasMember?: ReferenceData[]
  component?: ComponentBackboneElementData[]
}
