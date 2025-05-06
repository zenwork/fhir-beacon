import {FhirElementData} from 'internal/base/FhirElement.type'
import {Uri}             from 'PrimitiveTypes'



/**
 * @description Address Type: An address expressed using postal conventions (as opposed to GPS or other location
 *   definition formats).  This data type may be used to convey addresses for use in delivering mail as well as for
 *   visiting locations which might not be valid for mail delivery.  There are a variety of postal address formats
 *   defined around the world.
 The ISO21090-codedString may be used to provide a coded representation of the contents of strings in an Address.
 * - code: Address
 */
export type AddressData = FhirElementData & {}

/**
 * @description Age Type: A duration of time during which an organism (or a process) has existed.
 * - code: Age
 */
export type AgeData = FhirElementData & {}

/**
 * @description Annotation Type: A  text note which also  contains information about who made the statement and when.
 * - code: Annotation
 */
export type AnnotationData = FhirElementData & {}

/**
 * @description Attachment Type: For referring to data content defined in other formats.
 * - code: Attachment
 */
export type AttachmentData = FhirElementData & {}

/**
 * @description Availability Type: Availability data for an {item}.
 * - code: Availability
 */
export type AvailabilityData = FhirElementData & {}

/**
 * @description CodeableConcept Type: A concept that may be defined by a formal reference to a terminology or ontology
 *   or may be provided by text.
 * - code: CodeableConcept
 */
export type CodeableConceptData = FhirElementData & {}

/**
 * @description CodeableReference Type: A reference to a resource (by instance), or instead, a reference to a concept
 *   defined in a terminology or ontology (by class).
 * - code: CodeableReference
 */
export type CodeableReferenceData = FhirElementData & {}

/**
 * @description Coding Type: A reference to a code defined by a terminology system.
 * - code: Coding
 */
export type CodingData = FhirElementData & {}

/**
 * @description ContactDetail Type: Specifies contact information for a person or organization.
 * - code: ContactDetail
 */
export type ContactDetailData = FhirElementData & {}

/**
 * @description ContactPoint Type: Details for all kinds of technology mediated contact points for a person or
 *   organization, including telephone, email, etc.
 * - code: ContactPoint
 */
export type ContactPointData = FhirElementData & {}

/**
 * @description Contributor Type: A contributor to the content of a knowledge asset, including authors, editors,
 *   reviewers, and endorsers.
 * - code: Contributor
 */
export type ContributorData = FhirElementData & {}

/**
 * @description Count Type: A measured amount (or an amount that can potentially be measured). Note that measured
 *   amounts include amounts that are not precisely quantified, including amounts involving arbitrary units and
 *   floating currencies.
 * - code: Count
 */
export type CountData = FhirElementData & {}

/**
 * @description DataRequirement Type: Describes a required data item for evaluation in terms of the type of data, and
 *   optional code or date-based filters of the data.
 * - code: DataRequirement
 */
export type DataRequirementData = FhirElementData & {}

/**
 * @description Distance Type: A length - a value with a unit that is a physical distance.
 * - code: Distance
 */
export type DistanceData = FhirElementData & {}

/**
 * @description Dosage Type: Indicates how the medication is/was taken or should be taken by the patient.
 * - code: Dosage
 */
export type DosageData = FhirElementData & {}

/**
 * @description Duration Type: A length of time.
 * - code: Duration
 */
export type DurationData = FhirElementData & {}

/**
 * @description ElementDefinition Type: Captures constraints on each element within the resource, profile, or extension.
 * - code: ElementDefinition
 */
export type ElementDefinitionData = FhirElementData & {}

/**
 * @description Expression Type: A expression that is evaluated in a specified context and returns a value. The context
 *   of use of the expression must specify the context in which the expression is evaluated, and how the result of the
 *   expression is used.
 * - code: Expression
 */
export type ExpressionData = FhirElementData & {}

/**
 * @description ExtendedContactDetail Type: Specifies contact information for a specific purpose over a period of time,
 *   might be handled/monitored by a specific named person or organization.
 * - code: ExtendedContactDetail
 */
export type ExtendedContactDetailData = FhirElementData & {}

/**
 * @description Extension Type: Optional Extension Element - found in all resources.
 * - code: Extension
 */
export type ExtensionData = FhirElementData & {
  url: Uri
}

/**
 * @description HumanName Type: A name, normally of a human, that can be used for other living entities (e.g. animals
 *   but not organizations) that have been assigned names by a human and may need the use of name parts or the need for
 *   usage information.
 * - code: HumanName
 */
export type HumanNameData = FhirElementData & {}

/**
 * @description Identifier Type: An identifier - identifies some entity uniquely and unambiguously. Typically this is
 *   used for business identifiers.
 * - code: Identifier
 */
export type IdentifierData = FhirElementData & {}

/**
 * @description MarketingStatus Type: The marketing status describes the date when a medicinal product is actually put
 *   on the market or the date as of which it is no longer available.
 * - code: MarketingStatus
 */
export type MarketingStatusData = FhirElementData & {}

/**
 * @description Meta Type: The metadata about a resource. This is content in the resource that is maintained by the
 *   infrastructure. Changes to the content might not always be associated with version changes to the resource.
 * - code: Meta
 */
export type MetaData = FhirElementData & {}

/**
 * @description MonetaryComponent Type: Availability data for an {item}.
 * - code: MonetaryComponent
 */
export type MonetaryComponentData = FhirElementData & {}

/**
 * @description Money Type: An amount of economic utility in some recognized currency.
 * - code: Money
 */
export type MoneyData = FhirElementData & {}

/**
 * @description Narrative Type: A human-readable summary of the resource conveying the essential clinical and business
 *   information for the resource.
 * - code: Narrative
 */
export type NarrativeData = FhirElementData & {}

/**
 * @description ParameterDefinition Type: The parameters to the module. This collection specifies both the input and
 *   output parameters. Input parameters are provided by the caller as part of the $evaluate operation. Output
 *   parameters are included in the GuidanceResponse.
 * - code: ParameterDefinition
 */
export type ParameterDefinitionData = FhirElementData & {}

/**
 * @description Period Type: A time period defined by a start and end date and optionally time.
 * - code: Period
 */
export type PeriodData = FhirElementData & {}

/**
 * @description ProductShelfLife Type: The shelf-life and storage information for a medicinal product item or container
 *   can be described using this class.
 * - code: ProductShelfLife
 */
export type ProductShelfLifeData = FhirElementData & {}

/**
 * @description Quantity Type: A measured amount (or an amount that can potentially be measured). Note that measured
 *   amounts include amounts that are not precisely quantified, including amounts involving arbitrary units and
 *   floating currencies.
 * - code: Quantity
 */
export type QuantityData = FhirElementData & {}

/**
 * @description Range Type: A set of ordered Quantities defined by a low and high limit.
 * - code: Range
 */
export type RangeData = FhirElementData & {}

/**
 * @description Ratio Type: A relationship of two Quantity values - expressed as a numerator and a denominator.
 * - code: Ratio
 */
export type RatioData = FhirElementData & {}

/**
 * @description RatioRange Type: A range of ratios expressed as a low and high numerator and a denominator.
 * - code: RatioRange
 */
export type RatioRangeData = FhirElementData & {}

/**
 * @description Reference Type: A reference from one resource to another.
 * - code: Ref
 */
export type RefData = FhirElementData & {}

/**
 * @description RelatedArtifact Type: Related artifacts such as additional documentation, justification, or
 *   bibliographic references.
 * - code: RelatedArtifact
 */
export type RelatedArtifactData = FhirElementData & {}

/**
 * @description Timing Type: A series of measurements taken by a device, with upper and lower limits. There may be more
 *   than one dimension in the data.
 * - code: SampledData
 */
export type SampledDataData = FhirElementData & {}

/**
 * @description Signature Type: A signature along with supporting context. The signature may be a digital signature
 *   that is cryptographic in nature, or some other signature acceptable to the domain. This other signature may be as
 *   simple as a graphical image representing a hand-written signature, or a signature ceremony Different signature
 *   approaches have different utilities.
 * - code: Signature
 */
export type SignatureData = FhirElementData & {}

/**
 * @description Timing Type: Specifies an event that may occur multiple times. Timing schedules are used to record when
 *   things are planned, expected or requested to occur. The most common usage is in dosage instructions for
 *   medications. They are also used when planning care of various kinds, and may be used for reporting the schedule to
 *   which past regular activities were carried out.
 * - code: Timing
 */
export type TimingData = FhirElementData & {}

/**
 * @description TriggerDefinition Type: A description of a triggering event. Triggering events can be named events,
 *   data events, or periodic, as determined by the type element.
 * - code: TriggerDefinition
 */
export type TriggerDefinitionData = FhirElementData & {}

/**
 * @description UsageContext Type: Specifies clinical/business/etc. metadata that can be used to retrieve, index and/or
 *   categorize an artifact. This metadata can either be specific to the applicable population (e.g., age category,
 *   DRG) or the specific context of care (e.g., venue, care setting, provider of care).
 * - code: UsageContext
 */
export type UsageContextData = FhirElementData & {}

/**
 * @description VirtualServiceDetail Type: Virtual Service Contact Details.
 * - code: VirtualServiceDetail
 */
export type VirtualServiceDetailData = FhirElementData & {}
