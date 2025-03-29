import {DatatypeName} from 'DatatypeName'



/**
 * Enum class representing FHIR datatypes
 */
export class DatatypeDef {

  static Address = new DatatypeDef('Address')
  static Age = new DatatypeDef('Age')
  static Annotation = new DatatypeDef('Annotation')
  static Attachment = new DatatypeDef('Attachment')
  static Availability = new DatatypeDef('Availability')
  static CodeableConcept = new DatatypeDef('CodeableConcept')
  static CodeableReference = new DatatypeDef('CodeableReference')
  static Coding = new DatatypeDef('Coding')
  static ContactDetail = new DatatypeDef('ContactDetail')
  static ContactPoint = new DatatypeDef('ContactPoint')
  static Contributor = new DatatypeDef('Contributor')
  static Count = new DatatypeDef('Count')
  static DataRequirement = new DatatypeDef('DataRequirement')
  static Distance = new DatatypeDef('Distance')
  static Dosage = new DatatypeDef('Dosage')
  static Duration = new DatatypeDef('Duration')
  static ElementDefinition = new DatatypeDef('ElementDefinition')
  static Expression = new DatatypeDef('Expression')
  static ExtendedContactDetail = new DatatypeDef('ExtendedContactDetail')
  static Extension = new DatatypeDef('Extension')
  static HumanName = new DatatypeDef('HumanName')
  static Identifier = new DatatypeDef('Identifier')
  static MarketingStatus = new DatatypeDef('MarketingStatus')
  static Meta = new DatatypeDef('Meta')
  static MonetaryComponent = new DatatypeDef('MonetaryComponent')
  static Money = new DatatypeDef('Money')
  static Narrative = new DatatypeDef('Narrative')
  static ParameterDefinition = new DatatypeDef('ParameterDefinition')
  static Period = new DatatypeDef('Period')
  static ProductShelfLife = new DatatypeDef('ProductShelfLife')
  static Quantity = new DatatypeDef('Quantity')
  static Range = new DatatypeDef('Range')
  static Ratio = new DatatypeDef('Ratio')
  static RatioRange = new DatatypeDef('RatioRange')
  static Reference = new DatatypeDef('Reference')
  static RelatedArtifact = new DatatypeDef('RelatedArtifact')
  static SampledData = new DatatypeDef('SampledData')
  static SimpleQuantity = new DatatypeDef('SimpledQuantity')
  static Signature = new DatatypeDef('Signature')
  static Timing = new DatatypeDef('Timing')
  static TriggerDefinition = new DatatypeDef('TriggerDefinition')
  static UsageContext = new DatatypeDef('UsageContext')
  static VirtualServiceDetail = new DatatypeDef('VirtualServiceDetail')

  readonly value: DatatypeName | `${DatatypeName}${string}`
  readonly dataset: `${DatatypeName | `${DatatypeName}${string}`}Data`

  constructor(value: DatatypeName | `${DatatypeName}${string}`) {
    this.value = value
    this.dataset = `${value}Data`
  }

  /**
   * Get all available FHIR datatype names
   * @returns {DatatypeDef[]} Array of all datatype names
   */
  static values(): DatatypeDef[] {
    return Object.values(this).filter(value => value instanceof DatatypeDef)
  }

  /**
   * Get all available FHIR datatype names as strings
   * @returns {string[]} Array of all datatype names as strings
   */
  static valueStrings(): string[] {
    return this.values().map(v => v.toString())
  }

  /**
   * Check if a string is a valid FHIR datatype name
   * @param {string} value - The string to check
   * @returns {boolean} True if the value is a valid datatype name
   */
  static isValid(value: unknown): boolean {
    return this.valueStrings().includes(String(value))
  }
  /**
   * Get an enum by its string value
   * @param {string} value - The string value to look up
   * @returns {DatatypeDef|undefined} The enum value or undefined if not found
   */
  static fromString(value: string): DatatypeDef | undefined {
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
Object.freeze(DatatypeDef)

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
  SimpleQuantity,
  Signature,
  Timing,
  TriggerDefinition,
  UsageContext,
  VirtualServiceDetail
} = DatatypeDef
