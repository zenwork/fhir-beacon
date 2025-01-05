import {DomainResourceData}                                         from '../../../internal'
import {CodeableConceptData, CodeableReferenceData, IdentifierData} from '../../complex'
import {Code, FhirString, Instant}                                  from '../../primitive'
import {ReferenceData}                                              from '../../special'

export type SlotData = DomainResourceData & {
  identifier: IdentifierData[]
  serviceCategory: CodeableConceptData[]
  serviceType: CodeableReferenceData[]
  specialty: CodeableConceptData[]
  appointmentType: CodeableConceptData[]
  schedule: ReferenceData
  status: Code
  start: Instant
  end: Instant
  overbooked?: boolean
  comment?: FhirString


}
