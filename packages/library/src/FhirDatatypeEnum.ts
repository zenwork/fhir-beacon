import {FhirDatatypeName} from 'FhirDatatypeName'



/**
 * Enum class representing FHIR datatypes
 */
export class FhirDatatypeNameEnum {

  static Address = new FhirDatatypeNameEnum('Address')
  static Age = new FhirDatatypeNameEnum('Age')
  static Annotation = new FhirDatatypeNameEnum('Annotation')
  static Attachment = new FhirDatatypeNameEnum('Attachment')
  static Availability = new FhirDatatypeNameEnum('Availability')
  static CodeableConcept = new FhirDatatypeNameEnum('CodeableConcept')
  static CodeableReference = new FhirDatatypeNameEnum('CodeableReference')
  static Coding = new FhirDatatypeNameEnum('Coding')
  static ContactDetail = new FhirDatatypeNameEnum('ContactDetail')
  static ContactPoint = new FhirDatatypeNameEnum('ContactPoint')
  static Contributor = new FhirDatatypeNameEnum('Contributor')
  static Count = new FhirDatatypeNameEnum('Count')
  static DataRequirement = new FhirDatatypeNameEnum('DataRequirement')
  static Distance = new FhirDatatypeNameEnum('Distance')
  static Dosage = new FhirDatatypeNameEnum('Dosage')
  static Duration = new FhirDatatypeNameEnum('Duration')
  static ElementDefinition = new FhirDatatypeNameEnum('ElementDefinition')
  static Expression = new FhirDatatypeNameEnum('Expression')
  static ExtendedContactDetail = new FhirDatatypeNameEnum('ExtendedContactDetail')
  static Extension = new FhirDatatypeNameEnum('Extension')
  static HumanName = new FhirDatatypeNameEnum('HumanName')
  static Identifier = new FhirDatatypeNameEnum('Identifier')
  static MarketingStatus = new FhirDatatypeNameEnum('MarketingStatus')
  static Meta = new FhirDatatypeNameEnum('Meta')
  static MonetaryComponent = new FhirDatatypeNameEnum('MonetaryComponent')
  static Money = new FhirDatatypeNameEnum('Money')
  static Narrative = new FhirDatatypeNameEnum('Narrative')
  static ParameterDefinition = new FhirDatatypeNameEnum('ParameterDefinition')
  static Period = new FhirDatatypeNameEnum('Period')
  static ProductShelfLife = new FhirDatatypeNameEnum('ProductShelfLife')
  static Quantity = new FhirDatatypeNameEnum('Quantity')
  static Range = new FhirDatatypeNameEnum('Range')
  static Ratio = new FhirDatatypeNameEnum('Ratio')
  static RatioRange = new FhirDatatypeNameEnum('RatioRange')
  static Reference = new FhirDatatypeNameEnum('Reference')
  static RelatedArtifact = new FhirDatatypeNameEnum('RelatedArtifact')
  static SampledData = new FhirDatatypeNameEnum('SampledData')
  static Signature = new FhirDatatypeNameEnum('Signature')
  static Timing = new FhirDatatypeNameEnum('Timing')
  static TriggerDefinition = new FhirDatatypeNameEnum('TriggerDefinition')
  static UsageContext = new FhirDatatypeNameEnum('UsageContext')
  static VirtualServiceDetail = new FhirDatatypeNameEnum('VirtualServiceDetail')

  readonly value: FhirDatatypeName

  constructor(value: FhirDatatypeName) {
    this.value = value
  }

  /**
   * Get all available FHIR datatype names
   * @returns {FhirDatatypeNameEnum[]} Array of all datatype names
   */
  static values() {
    return Object.values(this).filter(value => value instanceof FhirDatatypeNameEnum)
  }
  /**
   * Get all available FHIR datatype names as strings
   * @returns {string[]} Array of all datatype names as strings
   */
  static valueStrings() {
    return this.values().map(v => v.toString())
  }
  /**
   * Check if a string is a valid FHIR datatype name
   * @param {string} value - The string to check
   * @returns {boolean} True if the value is a valid datatype name
   */
  static isValid(value) {
    return this.valueStrings().includes(value)
  }
  /**
   * Get an enum by its string value
   * @param {string} value - The string value to look up
   * @returns {FhirDatatypeNameEnum|undefined} The enum value or undefined if not found
   */
  static fromString(value) {
    return this.values().find(v => v.toString() === value)
  }
  toString() {
    return this.value
  }
  valueOf() {
    return this.value
  }
}

// Make the enum immutable
Object.freeze(FhirDatatypeNameEnum)

export const {
  Address,
  Age,
  Annotation,
  Attachment,
  Availability,
  CodeableConcept,
  CodeableReference,
  Coding,
  ContactDetail,
  ContactPoint,
  Contributor,
  Count,
  DataRequirement,
  Distance,
  Dosage,
  Duration,
  ElementDefinition,
  Expression,
  ExtendedContactDetail,
  Extension,
  HumanName,
  Identifier,
  MarketingStatus,
  Meta,
  MonetaryComponent,
  Money,
  Narrative,
  ParameterDefinition,
  Period,
  ProductShelfLife,
  Quantity,
  Range,
  Ratio,
  RatioRange,
  Reference,
  RelatedArtifact,
  SampledData,
  Signature,
  Timing,
  TriggerDefinition,
  UsageContext,
  VirtualServiceDetail
} = FhirDatatypeNameEnum
