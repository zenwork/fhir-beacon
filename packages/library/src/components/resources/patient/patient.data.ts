import {BackboneElementData}               from '../../../internal/resource/backbone.data'
import {DomainResourceData}                from '../../../internal/resource/domain-resource.data'
import {AttachmentData}                    from '../../complex'
import {AddressData}                       from '../../complex/address/address.data'
import {CodeableConceptData}               from '../../complex/codeable-concept/codeable-concept.data'
import {ContactPointData}                  from '../../complex/contact-point/contact-point.data'
import {HumanNameData}                     from '../../complex/human-name/human-name.data'
import {IdentifierData}                    from '../../complex/identifier/identifier.data'
import {PeriodData}                        from '../../complex/period/period.data'
import {Code, DateTime, FhirDate, Integer} from '../../primitive/primitive.data'
import {ReferenceData}                     from '../../special/reference/reference.data'



export type DeceasedBoolean = boolean
export type DeceasedDateTime = DateTime


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
