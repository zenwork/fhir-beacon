import {FhirElementData}                                            from '../../../internal'
import {BackboneElementData}                                        from '../../../internal/resource/backbone.data'
import {
  DomainResourceData
}                                                                   from '../../../internal/resource/domain-resource.data'
import {AttachmentData}                                             from '../../complex'
import {
  CodeableConceptData
}                                                                   from '../../complex/codeable-concept/codeable-concept.data'
import {IdentifierData}                                             from '../../complex/identifier/identifier.data'
import {PeriodData}                                                 from '../../complex/period/period.data'
import {Code, DateTime, FhirDate, FhirString, Integer, PositiveInt} from '../../primitive/primitive.data'
import {ReferenceData}                                              from '../../special/reference/reference.data'



export type HumanNameData = FhirElementData & {
  use?: Code
  text?: FhirString
  family?: FhirString
  given: FhirString[]
  prefix: FhirString[]
  suffix: FhirString[]
  period?: PeriodData
}

export type ContactPointData = FhirElementData & {
  system?: Code
  value?: FhirString
  use?: Code
  rank?: PositiveInt
  period?: PeriodData

}

export type DeceasedBoolean = boolean
export type DeceasedDateTime = DateTime

export type AddressData = FhirElementData & {
  use?: Code
  type?: Code
  text?: FhirString
  line: FhirString[]
  city?: FhirString
  district?: FhirString
  state?: FhirString
  postalCode?: FhirString
  country?: FhirString
  period?: PeriodData
}


export type PatientContactData = BackboneElementData & {
  relationship: CodeableConceptData[]
  name?: HumanNameData
  telecom: ContactPointData[]
  address?: AddressData
  gender?: Code
  organization?: ReferenceData
  period?: PeriodData
}

export type PatientCommunicationData = BackboneElementData & {
  language?: CodeableConceptData
  preferred?: boolean
}

export type PatientLinkData = BackboneElementData & {
  other: ReferenceData
  type: Code
}

export type PatientData = DomainResourceData & {
  identifier?: IdentifierData[]
  active?: boolean
  name: HumanNameData[]
  telecom: ContactPointData[]
  gender?: Code
  birthDate?: FhirDate
  deceasedBoolean?: DeceasedBoolean
  deceasedDateTime?: DeceasedDateTime
  address: AddressData[]
  maritalStatus?: CodeableConceptData
  multipleBirthBoolean?: boolean
  multipleBirthInteger?: Integer
  photo?: AttachmentData
  contact: PatientContactData[]
  communication: PatientCommunicationData[]
  generalPractitioner: ReferenceData[]
  managingOrganization?: ReferenceData
  link: PatientLinkData[]

}
