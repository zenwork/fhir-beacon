import {BackboneElementData, FhirElementData}                    from '../../../internal'
import {Code, DateTime, Decimal, PositiveInt, Time, UnsignedInt} from '../../primitive'
import {CodeableConceptData}                                     from '../codeable-concept'
import {PeriodData}                                              from '../period'
import {QuantityData}                                            from '../quantity'
import {RangeData}                                               from '../range'



export type TimingRepeatData = BackboneElementData & {
  //TODO: should be constrained to a duration: https://www.hl7.org/fhir/dataexport types.html#Duration
  boundsDuration?: QuantityData
  boundsRange?: RangeData
  boundsPeriod?: PeriodData
  count?: PositiveInt
  countMax?: PositiveInt
  duration?: Decimal
  durationMax?: Decimal
  durationUnit?: Code
  frequency?: PositiveInt
  frequencyMax?: PositiveInt
  period?: Decimal
  periodMax?: Decimal
  periodUnit?: Code
  dayOfWeek?: Code[]
  timeOfDay?: Time[]
  when?: Code[]
  offset?: UnsignedInt
}

export type TimingData = FhirElementData & {
  event?: DateTime[]
  repeat?: TimingRepeatData
  code?: CodeableConceptData
}
