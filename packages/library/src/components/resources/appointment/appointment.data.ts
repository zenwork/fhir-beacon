import {BackboneElementData, DomainResourceData} from '../../../internal'
import {
  AnnotationData,
  CodeableConceptData,
  CodeableReferenceData,
  CodingData,
  IdentifierData,
  Period
}                                                from '../../complex'
import {
  Code,
  DateTime,
  FhirDate,
  FhirString,
  Instant,
  PositiveInt
}                                                from '../../primitive'
import {
  ReferenceData
}                                                from '../../special'

export type AppointmentParticipantData = BackboneElementData & {
  type: CodeableConceptData[]
  period?: Period
  actor?: ReferenceData
  required?: boolean
  status: Code
}

export type AppointmentWeeklyTemplateData = BackboneElementData & {
  monday?: boolean
  tuesday?: boolean
  wednesday?: boolean
  thursday?: boolean
  friday?: boolean
  saturday?: boolean
  sunday?: boolean
  weekInterval?: PositiveInt
}

export type AppointmentMonthlyTemplateData = BackboneElementData & {
  dayOfMonth?: PositiveInt
  nthWeekOfMonth?: CodingData
  dayOfWeek?: CodingData
  monthInterval?: PositiveInt
}

export type AppointmentYearlyTemplateData = BackboneElementData & {
  yearInterval: PositiveInt
}

export type AppointmentRecurrenceTemplateData = BackboneElementData & {
  timezone?: CodeableConceptData
  recurrenceType: CodeableConceptData
  lastOccurrenceDate?: FhirDate
  weeklyTemplate?: AppointmentWeeklyTemplateData
  monthlyTemplate?: AppointmentMonthlyTemplateData
  yearlyTemplate?: AppointmentYearlyTemplateData
  excludingDate: FhirDate[]
  excludingRecurrenceId: PositiveInt[]
}

export type AppointmentData = DomainResourceData & {
  identifier: IdentifierData[]
  status: Code
  cancellationReason?: CodeableConceptData
  class: CodeableConceptData[]
  serviceCategory: CodeableConceptData[]
  serviceType: CodeableReferenceData[]
  specialty: CodeableConceptData[]
  appointmentType: CodeableConceptData[]
  reason: CodeableReferenceData[]
  priority?: CodeableConceptData
  description?: FhirString
  replaces: ReferenceData[]
  supportingInformation: ReferenceData[]
  previousAppointment?: ReferenceData
  originationAppointment?: ReferenceData
  start?: Instant
  end?: Instant
  minutesDuration?: PositiveInt
  slot: ReferenceData[]
  account: ReferenceData[]
  created?: DateTime
  cancellationDate?: DateTime
  note?: AnnotationData
  patientInstruction: CodeableReferenceData[]
  basedOn: ReferenceData[]
  subject?: ReferenceData
  participant: AppointmentParticipantData[]
  recurrenceId?: PositiveInt
  occurrenceChanged?: boolean
  recurrenceTemplate: AppointmentRecurrenceTemplateData[]

}
