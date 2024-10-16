import {FhirElementData}     from '../../../internal'
import {CodeableConceptData} from '../../complex/codeable-concept/codeable-concept.data'
import {CodingData}          from '../../complex/coding/coding.data'
import {QuantityData}        from '../../complex/quantity/quantity.data'
import {RangeData}           from '../../complex/range/range.data'
import {ReferenceData}       from '../../special/reference/reference.data'

export type UsageContextData = FhirElementData & {
  code: CodingData
  //TODO: only allow ref to PlanDefinition, ResearchStudy, InsurancePLan, HealthcareService, group, Location, or Organisation
  value: CodeableConceptData | QuantityData | RangeData | ReferenceData
}
