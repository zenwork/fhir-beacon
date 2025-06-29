import {DomainResourceData} from 'internal'



/**
 * @description A financial tool for tracking value accrued for a particular purpose.  In the healthcare field, used to
 *   track charges for a patient, cost centers, etc.
 * - code: Account
 */
export type AccountData = DomainResourceData & {}

/**
 * @description This resource allows for the definition of some activity to be performed, independent of a particular
 *   patient, practitioner, or other performance context.
 * - code: ActivityDefinition
 */
export type ActivityDefinitionData = DomainResourceData & {}

/**
 * @description The ActorDefinition resource is used to describe an actor - a human or an application that plays a role
 *   in data exchange, and that may have obligations associated with the role the actor plays.
 * - code: ActorDefinition
 */
export type ActorDefinitionData = DomainResourceData & {}

/**
 * @description A medicinal product in the final form which is suitable for administering to a patient (after any
 *   mixing of multiple components, dissolution etc. has been performed).
 * - code: AdministrableProductDefinition
 */
export type AdministrableProductDefinitionData = DomainResourceData & {}

/**
 * @description An event (i.e. any change to current patient status) that may be related to unintended effects on a
 *   patient or research participant. The unintended effects may require additional monitoring, treatment,
 *   hospitalization, or may result in death. The AdverseEvent resource also extends to potential or avoided events
 *   that could have had such effects. There are two major domains where the AdverseEvent resource is expected to be
 *   used. One is in clinical care reported adverse events and the other is in reporting adverse events in clinical
 *   research trial management.  Adverse events can be reported by healthcare providers, patients, caregivers or by
 *   medical products manufacturers.  Given the differences between these two concepts, we recommend consulting the
 *   domain specific implementation guides when implementing the AdverseEvent Resource. The implementation guides
 *   include specific extensions, value sets and constraints.
 * - code: AdverseEvent
 */
export type AdverseEventData = DomainResourceData & {}

/**
 * @description Risk of harmful or undesirable, physiological response which is unique to an individual and associated
 *   with exposure to a substance.
 * - code: AllergyIntolerance
 */
export type AllergyIntoleranceData = DomainResourceData & {}

/**
 * @description A booking of a healthcare event among patient(s), practitioner(s), related person(s) and/or device(s)
 *   for a specific date/time. This may result in one or more Encounter(s).
 * - code: Appointment
 */
export type AppointmentData = DomainResourceData & {}

/**
 * @description A reply to an appointment request for a patient and/or practitioner(s), such as a confirmation or
 *   rejection.
 * - code: AppointmentResponse
 */
export type AppointmentResponseData = DomainResourceData & {}

/**
 * @description This Resource provides one or more comments, classifiers or ratings about a Resource and supports
 *   attribution and rights management metadata for the added content.
 * - code: ArtifactAssessment
 */
export type ArtifactAssessmentData = DomainResourceData & {}

/**
 * @description A record of an event relevant for purposes such as operations, privacy, security, maintenance, and
 *   performance analysis.
 * - code: AuditEvent
 */
export type AuditEventData = DomainResourceData & {}

/**
 * @description Basic is used for handling concepts not yet defined in FHIR, narrative-only resources that don't map to
 *   an existing resource, and custom resources not appropriate for inclusion in the FHIR specification.
 * - code: Basic
 */
export type BasicData = DomainResourceData & {}

/**
 * @description A resource that represents the data of a single raw artifact as digital content accessible in its
 *   native format.  A Binary resource can contain any content, whether text, image, pdf, zip archive, etc.
 * - code: Binary
 */
export type BinaryData = DomainResourceData & {}

/**
 * @description A biological material originating from a biological entity intended to be transplanted or infused into
 *   another (possibly the same) biological entity.
 * - code: BiologicallyDerivedProduct
 */
export type BiologicallyDerivedProductData = DomainResourceData & {}

/**
 * @description A record of dispensation of a biologically derived product.
 * - code: BiologicallyDerivedProductDispense
 */
export type BiologicallyDerivedProductDispenseData = DomainResourceData & {}

/**
 * @description Record details about an anatomical structure.  This resource may be used when a coded concept does not
 *   provide the necessary detail needed for the use case.
 * - code: BodyStructure
 */
export type BodyStructureData = DomainResourceData & {}

/**
 * @description A container for a collection of resources.
 * - code: Bundle
 */
export type BundleData = DomainResourceData & {}

/**
 * @description A Capability Statement documents a set of capabilities (behaviors) of a FHIR Server or Client for a
 *   particular version of FHIR that may be used as a statement of actual server functionality or a statement of
 *   required or desired server implementation.
 * - code: CapabilityStatement
 */
export type CapabilityStatementData = DomainResourceData & {}

/**
 * @description Describes the intention of how one or more practitioners intend to deliver care for a particular
 *   patient, group or community for a period of time, possibly limited to care for a specific condition or set of
 *   conditions.
 * - code: CarePlan
 */
export type CarePlanData = DomainResourceData & {}

/**
 * @description The Care Team includes all the people and organizations who plan to participate in the coordination and
 *   delivery of care.
 * - code: CareTeam
 */
export type CareTeamData = DomainResourceData & {}

/**
 * @description The resource ChargeItem describes the provision of healthcare provider products for a certain patient,
 *   therefore referring not only to the product, but containing in addition details of the provision, like date, time,
 *   amounts and participating organizations and persons. Main Usage of the ChargeItem is to enable the billing process
 *   and internal cost allocation.
 * - code: ChargeItem
 */
export type ChargeItemData = DomainResourceData & {}

/**
 * @description The ChargeItemDefinition resource provides the properties that apply to the (billing) codes necessary
 *   to calculate costs and prices. The properties may differ largely depending on type and realm, therefore this
 *   resource gives only a rough structure and requires profiling for each type of billing code system.
 * - code: ChargeItemDefinition
 */
export type ChargeItemDefinitionData = DomainResourceData & {}

/**
 * @description The Citation Resource enables reference to any knowledge artifact for purposes of identification and
 *   attribution. The Citation Resource supports existing reference structures and developing publication practices
 *   such as versioning, expressing complex contributorship roles, and referencing computable resources.
 * - code: Citation
 */
export type CitationData = DomainResourceData & {}

/**
 * @description A provider issued list of professional services and products which have been provided, or are to be
 *   provided, to a patient which is sent to an insurer for reimbursement.
 * - code: Claim
 */
export type ClaimData = DomainResourceData & {}

/**
 * @description This resource provides the adjudication details from the processing of a Claim resource.
 * - code: ClaimResponse
 */
export type ClaimResponseData = DomainResourceData & {}

/**
 * @description A record of a clinical assessment performed to determine what problem(s) may affect the patient and
 *   before planning the treatments or management strategies that are best to manage a patient's condition. Assessments
 *   are often 1:1 with a clinical consultation / encounter,  but this varies greatly depending on the clinical
 *   workflow. This resource is called "ClinicalImpression" rather than "ClinicalAssessment" to avoid confusion with
 *   the recording of assessment tools such as Apgar score.
 * - code: ClinicalImpression
 */
export type ClinicalImpressionData = DomainResourceData & {}

/**
 * @description A single issue - either an indication, contraindication, interaction or an undesirable effect for a
 *   medicinal product, medication, device or procedure.
 * - code: ClinicalUseDefinition
 */
export type ClinicalUseDefinitionData = DomainResourceData & {}

/**
 * @description The CodeSystem resource is used to declare the existence of and describe a code system or code system
 *   supplement and its key properties, and optionally define a part or all of its content.
 * - code: CodeSystem
 */
export type CodeSystemData = DomainResourceData & {}

/**
 * @description A clinical or business level record of information being transmitted or shared; e.g. an alert that was
 *   sent to a responsible provider, a public health agency communication to a provider/reporter in response to a case
 *   report for a reportable condition.
 * - code: Communication
 */
export type CommunicationData = DomainResourceData & {}

/**
 * @description A request to convey information; e.g. the CDS system proposes that an alert be sent to a responsible
 *   provider, the CDS system proposes that the public health agency be notified about a reportable condition.
 * - code: CommunicationRequest
 */
export type CommunicationRequestData = DomainResourceData & {}

/**
 * @description A compartment definition that defines how resources are accessed on a server.
 * - code: CompartmentDefinition
 */
export type CompartmentDefinitionData = DomainResourceData & {}

/**
 * @description A set of healthcare-related information that is assembled together into a single logical package that
 *   provides a single coherent statement of meaning, establishes its own context and that has clinical attestation
 *   with regard to who is making the statement. A Composition defines the structure and narrative content necessary
 *   for a document. However, a Composition alone does not constitute a document. Rather, the Composition must be the
 *   first entry in a Bundle where Bundle.type=document, and any other resources referenced from Composition must be
 *   included as subsequent entries in the Bundle (for example Patient, Practitioner, Encounter, etc.).
 * - code: Composition
 */
export type CompositionData = DomainResourceData & {}

/**
 * @description A statement of relationships from one set of concepts to one or more other concepts - either concepts
 *   in code systems, or data element/data element concepts, or classes in class models.
 * - code: ConceptMap
 */
export type ConceptMapData = DomainResourceData & {}

/**
 * @description A clinical condition, problem, diagnosis, or other event, situation, issue, or clinical concept that
 *   has risen to a level of concern.
 * - code: Condition
 */
export type ConditionData = DomainResourceData & {}

/**
 * @description A definition of a condition and information relevant to managing it.
 * - code: ConditionDefinition
 */
export type ConditionDefinitionData = DomainResourceData & {}

/**
 * @description A record of a healthcare consumer’s  choices  or choices made on their behalf by a third party, which
 *   permits or denies identified recipient(s) or recipient role(s) to perform one or more actions within a given
 *   policy context, for specific purposes and periods of time.
 * - code: Consent
 */
export type ConsentData = DomainResourceData & {}

/**
 * @description Legally enforceable, formally recorded unilateral or bilateral directive i.e., a policy or agreement.
 * - code: Contract
 */
export type ContractData = DomainResourceData & {}

/**
 * @description Financial instrument which may be used to reimburse or pay for health care products and services.
 *   Includes both insurance and self-payment.
 * - code: Coverage
 */
export type CoverageData = DomainResourceData & {}

/**
 * @description The CoverageEligibilityRequest provides patient and insurance coverage information to an insurer for
 *   them to respond, in the form of an CoverageEligibilityResponse, with information regarding whether the stated
 *   coverage is valid and in-force and optionally to provide the insurance details of the policy.
 * - code: CoverageEligibilityRequest
 */
export type CoverageEligibilityRequestData = DomainResourceData & {}

/**
 * @description This resource provides eligibility and plan details from the processing of an
 *   CoverageEligibilityRequest resource.
 * - code: CoverageEligibilityResponse
 */
export type CoverageEligibilityResponseData = DomainResourceData & {}

/**
 * @description Indicates an actual or potential clinical issue with or between one or more active or proposed clinical
 *   actions for a patient; e.g. Drug-drug interaction, Ineffective treatment frequency, Procedure-condition conflict,
 *   gaps in care, etc.
 * - code: DetectedIssue
 */
export type DetectedIssueData = DomainResourceData & {}

/**
 * @description This resource describes the properties (regulated, has real time clock, etc.), adminstrative
 *   (manufacturer name, model number, serial number, firmware, etc.), and type (knee replacement, blood pressure cuff,
 *   MRI, etc.) of a physical unit (these values do not change much within a given module, for example the serail
 *   number, manufacturer name, and model number). An actual unit may consist of several modules in a distinct
 *   hierarchy and these are represented by multiple Device resources and bound through the 'parent' element.
 * - code: Device
 */
export type DeviceData = DomainResourceData & {}

/**
 * @description A record of association of a device.
 * - code: DeviceAssociation
 */
export type DeviceAssociationData = DomainResourceData & {}

/**
 * @description This is a specialized resource that defines the characteristics and capabilities of a device.
 * - code: DeviceDefinition
 */
export type DeviceDefinitionData = DomainResourceData & {}

/**
 * @description Indicates that a device is to be or has been dispensed for a named person/patient.  This includes a
 *   description of the product (supply) provided and the instructions for using the device.
 * - code: DeviceDispense
 */
export type DeviceDispenseData = DomainResourceData & {}

/**
 * @description Describes a measurement, calculation or setting capability of a device.  The DeviceMetric resource is
 *   derived from the ISO/IEEE 11073-10201 Domain Information Model standard, but is more widely applicable.
 * - code: DeviceMetric
 */
export type DeviceMetricData = DomainResourceData & {}

/**
 * @description Represents a request a device to be provided to a specific patient. The device may be an implantable
 *   device to be subsequently implanted, or an external assistive device, such as a walker, to be delivered and
 *   subsequently be used.
 * - code: DeviceRequest
 */
export type DeviceRequestData = DomainResourceData & {}

/**
 * @description A record of a device being used by a patient where the record is the result of a report from the
 *   patient or a clinician.
 * - code: DeviceUsage
 */
export type DeviceUsageData = DomainResourceData & {}

/**
 * @description The findings and interpretation of diagnostic tests performed on patients, groups of patients,
 *   products, substances, devices, and locations, and/or specimens derived from these. The report includes clinical
 *   context such as requesting provider information, and some mix of atomic results, images, textual and coded
 *   interpretations, and formatted representation of diagnostic reports. The report also includes non-clinical context
 *   such as batch analysis and stability reporting of products and substances.
 * - code: DiagnosticReport
 */
export type DiagnosticReportData = DomainResourceData & {}

/**
 * @description A reference to a document of any kind for any purpose. While the term “document” implies a more narrow
 *   focus, for this resource this “document” encompasses *any* serialized object with a mime-type, it includes formal
 *   patient-centric documents (CDA), clinical notes, scanned paper, non-patient specific documents like policy text,
 *   as well as a photo, video, or audio recording acquired or used in healthcare.  The DocumentReference resource
 *   provides metadata about the document so that the document can be discovered and managed.  The actual content may
 *   be inline base64 encoded data or provided by direct reference.
 * - code: DocumentReference
 */
export type DocumentReferenceData = DomainResourceData & {}

/**
 * @description An interaction between healthcare provider(s), and/or patient(s) for the purpose of providing
 *   healthcare service(s) or assessing the health status of patient(s).
 * - code: Encounter
 */
export type EncounterData = DomainResourceData & {}

/**
 * @description A record of significant events/milestones key data throughout the history of an Encounter
 * - code: EncounterHistory
 */
export type EncounterHistoryData = DomainResourceData & {}

/**
 * @description The technical details of an endpoint that can be used for electronic services, such as for web services
 *   providing XDS.b, a REST endpoint for another FHIR server, or a s/Mime email address. This may include any security
 *   context information.
 * - code: Endpoint
 */
export type EndpointData = DomainResourceData & {}

/**
 * @description This resource provides the insurance enrollment details to the insurer regarding a specified coverage.
 * - code: EnrollmentRequest
 */
export type EnrollmentRequestData = DomainResourceData & {}

/**
 * @description This resource provides enrollment and plan details from the processing of an EnrollmentRequest resource.
 * - code: EnrollmentResponse
 */
export type EnrollmentResponseData = DomainResourceData & {}

/**
 * @description An association between a patient and an organization / healthcare provider(s) during which time
 *   encounters may occur. The managing organization assumes a level of responsibility for the patient during this
 *   time.
 * - code: EpisodeOfCare
 */
export type EpisodeOfCareData = DomainResourceData & {}

/**
 * @description The EventDefinition resource provides a reusable description of when a particular event can occur.
 * - code: EventDefinition
 */
export type EventDefinitionData = DomainResourceData & {}

/**
 * @description The Evidence Resource provides a machine-interpretable expression of an evidence concept including the
 *   evidence variables (e.g., population, exposures/interventions, comparators, outcomes, measured variables,
 *   confounding variables), the statistics, and the certainty of this evidence.
 * - code: Evidence
 */
export type EvidenceData = DomainResourceData & {}

/**
 * @description The EvidenceReport Resource is a specialized container for a collection of resources and codeable
 *   concepts, adapted to support compositions of Evidence, EvidenceVariable, and Citation resources and related
 *   concepts.
 * - code: EvidenceReport
 */
export type EvidenceReportData = DomainResourceData & {}

/**
 * @description The EvidenceVariable resource describes an element that knowledge (Evidence) is about.
 * - code: EvidenceVariable
 */
export type EvidenceVariableData = DomainResourceData & {}

/**
 * @description A walkthrough of a workflow showing the interaction between systems and the instances shared, possibly
 *   including the evolution of instances over time.
 * - code: ExampleScenario
 */
export type ExampleScenarioData = DomainResourceData & {}

/**
 * @description This resource provides: the claim details; adjudication details from the processing of a Claim; and
 *   optionally account balance information, for informing the subscriber of the benefits provided.
 * - code: ExplanationOfBenefit
 */
export type ExplanationOfBenefitData = DomainResourceData & {}

/**
 * @description Significant health conditions for a person related to the patient relevant in the context of care for
 *   the patient.
 * - code: FamilyMemberHistory
 */
export type FamilyMemberHistoryData = DomainResourceData & {}

/**
 * @description Prospective warnings of potential issues when providing care to the patient.
 * - code: Flag
 */
export type FlagData = DomainResourceData & {}

/**
 * @description This resource describes a product or service that is available through a program and includes the
 *   conditions and constraints of availability.  All of the information in this resource is specific to the inclusion
 *   of the item in the formulary and is not inherent to the item itself.
 * - code: FormularyItem
 */
export type FormularyItemData = DomainResourceData & {}

/**
 * @description A set of analyses performed to analyze and generate genomic data.
 * - code: GenomicStudy
 */
export type GenomicStudyData = DomainResourceData & {}

/**
 * @description Describes the intended objective(s) for a patient, group or organization care, for example, weight
 *   loss, restoring an activity of daily living, obtaining herd immunity via immunization, meeting a process
 *   improvement objective, etc.
 * - code: Goal
 */
export type GoalData = DomainResourceData & {}

/**
 * @description A formal computable definition of a graph of resources - that is, a coherent set of resources that form
 *   a graph by following references. The Graph Definition resource defines a set and makes rules about the set.
 * - code: GraphDefinition
 */
export type GraphDefinitionData = DomainResourceData & {}

/**
 * @description Represents a defined collection of entities that may be discussed or acted upon collectively but which
 *   are not expected to act collectively, and are not formally or legally recognized; i.e. a collection of entities
 *   that isn't an Organization.
 * - code: Group
 */
export type GroupData = DomainResourceData & {}

/**
 * @description A guidance response is the formal response to a guidance request, including any output parameters
 *   returned by the evaluation, as well as the description of any proposed actions to be taken.
 * - code: GuidanceResponse
 */
export type GuidanceResponseData = DomainResourceData & {}

/**
 * @description The details of a healthcare service available at a location or in a catalog.  In the case where there
 *   is a hierarchy of services (for example, Lab -> Pathology -> Wound Cultures), this can be represented using a set
 *   of linked HealthcareServices.
 * - code: HealthcareService
 */
export type HealthcareServiceData = DomainResourceData & {}

/**
 * @description A selection of DICOM SOP instances and/or frames within a single Study and Series. This might include
 *   additional specifics such as an image region, an Observation UID or a Segmentation Number, allowing linkage to an
 *   Observation Resource or transferring this information along with the ImagingStudy Resource.
 * - code: ImagingSelection
 */
export type ImagingSelectionData = DomainResourceData & {}

/**
 * @description Representation of the content produced in a DICOM imaging study. A study comprises a set of series,
 *   each of which includes a set of Service-Object Pair Instances (SOP Instances - images or other data) acquired or
 *   produced in a common context.  A series is of only one modality (e.g. X-ray, CT, MR, ultrasound), but a study may
 *   have multiple series of different modalities.
 * - code: ImagingStudy
 */
export type ImagingStudyData = DomainResourceData & {}

/**
 * @description Describes the event of a patient being administered a vaccine or a record of an immunization as
 *   reported by a patient, a clinician or another party.
 * - code: Immunization
 */
export type ImmunizationData = DomainResourceData & {}

/**
 * @description Describes a comparison of an immunization event against published recommendations to determine if the
 *   administration is "valid" in relation to those  recommendations.
 * - code: ImmunizationEvaluation
 */
export type ImmunizationEvaluationData = DomainResourceData & {}

/**
 * @description A patient's point-in-time set of recommendations (i.e. forecasting) according to a published schedule
 *   with optional supporting justification.
 * - code: ImmunizationRecommendation
 */
export type ImmunizationRecommendationData = DomainResourceData & {}

/**
 * @description A set of rules of how a particular interoperability or standards problem is solved - typically through
 *   the use of FHIR resources. This resource is used to gather all the parts of an implementation guide into a logical
 *   whole and to publish a computable definition of all the parts.
 * - code: ImplementationGuide
 */
export type ImplementationGuideData = DomainResourceData & {}

/**
 * @description An ingredient of a manufactured item or pharmaceutical product.
 * - code: Ingredient
 */
export type IngredientData = DomainResourceData & {}

/**
 * @description Details of a Health Insurance product/plan provided by an organization.
 * - code: InsurancePlan
 */
export type InsurancePlanData = DomainResourceData & {}

/**
 * @description functional description of an inventory item used in inventory and supply-related workflows.
 * - code: InventoryItem
 */
export type InventoryItemData = DomainResourceData & {}

/**
 * @description A report of inventory or stock items.
 * - code: InventoryReport
 */
export type InventoryReportData = DomainResourceData & {}

/**
 * @description Invoice containing collected ChargeItems from an Account with calculated individual and total price for
 *   Billing purpose.
 * - code: Invoice
 */
export type InvoiceData = DomainResourceData & {}

/**
 * @description The Library resource is a general-purpose container for knowledge asset definitions. It can be used to
 *   describe and expose existing knowledge assets such as logic libraries and information model descriptions, as well
 *   as to describe a collection of knowledge assets.
 * - code: Library
 */
export type LibraryData = DomainResourceData & {}

/**
 * @description Identifies two or more records (resource instances) that refer to the same real-world "occurrence".
 * - code: Linkage
 */
export type LinkageData = DomainResourceData & {}

/**
 * @description A List is a curated collection of resources, for things such as problem lists, allergy lists, facility
 *   list, organization list, etc.
 * - code: List
 */
export type ListData = DomainResourceData & {}

/**
 * @description Details and position information for a place where services are provided and resources and participants
 *   may be stored, found, contained, or accommodated.
 * - code: Location
 */
export type LocationData = DomainResourceData & {}

/**
 * @description The definition and characteristics of a medicinal manufactured item, such as a tablet or capsule, as
 *   contained in a packaged medicinal product.
 * - code: ManufacturedItemDefinition
 */
export type ManufacturedItemDefinitionData = DomainResourceData & {}

/**
 * @description The Measure resource provides the definition of a quality measure.
 * - code: Measure
 */
export type MeasureData = DomainResourceData & {}

/**
 * @description The MeasureReport resource contains the results of the calculation of a measure; and optionally a
 *   reference to the resources involved in that calculation.
 * - code: MeasureReport
 */
export type MeasureReportData = DomainResourceData & {}

/**
 * @description This resource is primarily used for the identification and definition of a medication, including
 *   ingredients, for the purposes of prescribing, dispensing, and administering a medication as well as for making
 *   statements about medication use.
 * - code: Medication
 */
export type MedicationData = DomainResourceData & {}

/**
 * @description Describes the event of a patient consuming or otherwise being administered a medication.  This may be
 *   as simple as swallowing a tablet or it may be a long running infusion. Related resources tie this event to the
 *   authorizing prescription, and the specific encounter between patient and health care practitioner. This event can
 *   also be used to record waste using a status of not-done and the appropriate statusReason.
 * - code: MedicationAdministration
 */
export type MedicationAdministrationData = DomainResourceData & {}

/**
 * @description Indicates that a medication product is to be or has been dispensed for a named person/patient.  This
 *   includes a description of the medication product (supply) provided and the instructions for administering the
 *   medication.  The medication dispense is the result of a pharmacy system responding to a medication order.
 * - code: MedicationDispense
 */
export type MedicationDispenseData = DomainResourceData & {}

/**
 * @description Information about a medication that is used to support knowledge.
 * - code: MedicationKnowledge
 */
export type MedicationKnowledgeData = DomainResourceData & {}

/**
 * @description An order or request for both supply of the medication and the instructions for administration of the
 *   medication to a patient. The resource is called "MedicationRequest" rather than "MedicationPrescription" or
 *   "MedicationOrder" to generalize the use across inpatient and outpatient settings, including care plans, etc., and
 *   to harmonize with workflow patterns.
 * - code: MedicationRequest
 */
export type MedicationRequestData = DomainResourceData & {}

/**
 * @description A record of a medication that is being consumed by a patient.   A MedicationStatement may indicate that
 *   the patient may be taking the medication now or has taken the medication in the past or will be taking the
 *   medication in the future.  The source of this information can be the patient, significant other (such as a family
 *   member or spouse), or a clinician.  A common scenario where this information is captured is during the history
 *   taking process during a patient visit or stay.   The medication information may come from sources such as the
 *   patient's memory, from a prescription bottle,  or from a list of medications the patient, clinician or other party
 *   maintains.
 The primary difference between a medicationstatement and a medicationadministration is that the medication administration has complete administration information and is based on actual administration information from the person who administered the medication.  A medicationstatement is often, if not always, less specific.  There is no required date/time when the medication was administered, in fact we only know that a source has reported the patient is taking this medication, where details such as time, quantity, or rate or even medication product may be incomplete or missing or less precise.  As stated earlier, the Medication Statement information may come from the patient's memory, from a prescription bottle or from a list of medications the patient, clinician or other party maintains.  Medication administration is more formal and is not missing detailed information.
 * - code: MedicationStatement
 */
export type MedicationStatementData = DomainResourceData & {}

/**
 * @description Detailed definition of a medicinal product, typically for uses other than direct patient care (e.g.
 *   regulatory use, drug catalogs, to support prescribing, adverse events management etc.).
 * - code: MedicinalProductDefinition
 */
export type MedicinalProductDefinitionData = DomainResourceData & {}

/**
 * @description Defines the characteristics of a message that can be shared between systems, including the type of
 *   event that initiates the message, the content to be transmitted and what response(s), if any, are permitted.
 * - code: MessageDefinition
 */
export type MessageDefinitionData = DomainResourceData & {}

/**
 * @description The header for a message exchange that is either requesting or responding to an action.  The
 *   reference(s) that are the subject of the action as well as other information related to the action are typically
 *   transmitted in a bundle in which the MessageHeader resource instance is the first resource in the bundle.
 * - code: MessageHeader
 */
export type MessageHeaderData = DomainResourceData & {}

/**
 * @description Representation of a molecular sequence.
 * - code: MolecularSequence
 */
export type MolecularSequenceData = DomainResourceData & {}

/**
 * @description A curated namespace that issues unique symbols within that namespace for the identification of
 *   concepts, people, devices, etc.  Represents a "System" used within the Identifier and Coding data types.
 * - code: NamingSystem
 */
export type NamingSystemData = DomainResourceData & {}

/**
 * @description A record of food or fluid that is being consumed by a patient.  A NutritionIntake may indicate that the
 *   patient may be consuming the food or fluid now or has consumed the food or fluid in the past.  The source of this
 *   information can be the patient, significant other (such as a family member or spouse), or a clinician.  A common
 *   scenario where this information is captured is during the history taking process during a patient visit or stay or
 *   through an app that tracks food or fluids consumed.   The consumption information may come from sources such as
 *   the patient's memory, from a nutrition label,  or from a clinician documenting observed intake.
 * - code: NutritionIntake
 */
export type NutritionIntakeData = DomainResourceData & {}

/**
 * @description A request to supply a diet, formula feeding (enteral) or oral nutritional supplement to a
 *   patient/resident.
 * - code: NutritionOrder
 */
export type NutritionOrderData = DomainResourceData & {}

/**
 * @description A food or supplement that is consumed by patients.
 * - code: NutritionProduct
 */
export type NutritionProductData = DomainResourceData & {}

/**
 * @description Measurements and simple assertions made about a patient, device or other subject.
 * - code: Observation
 */
export type ObservationData = DomainResourceData & {}

/**
 * @description Set of definitional characteristics for a kind of observation or measurement produced or consumed by an
 *   orderable health care service.
 * - code: ObservationDefinition
 */
export type ObservationDefinitionData = DomainResourceData & {}

/**
 * @description A formal computable definition of an operation (on the RESTful interface) or a named query (using the
 *   search interaction).
 * - code: OperationDefinition
 */
export type OperationDefinitionData = DomainResourceData & {}

/**
 * @description A collection of error, warning, or information messages that result from a system action.
 * - code: OperationOutcome
 */
export type OperationOutcomeData = DomainResourceData & {}

/**
 * @description A formally or informally recognized grouping of people or organizations formed for the purpose of
 *   achieving some form of collective action.  Includes companies, institutions, corporations, departments, community
 *   groups, healthcare practice groups, payer/insurer, etc.
 * - code: Organization
 */
export type OrganizationData = DomainResourceData & {}

/**
 * @description Defines an affiliation/assotiation/relationship between 2 distinct organizations, that is not a part-of
 *   relationship/sub-division relationship.
 * - code: OrganizationAffiliation
 */
export type OrganizationAffiliationData = DomainResourceData & {}

/**
 * @description A medically related item or items, in a container or package.
 * - code: PackagedProductDefinition
 */
export type PackagedProductDefinitionData = DomainResourceData & {}

/**
 * @description This resource is used to pass information into and back from an operation (whether invoked directly
 *   from REST or within a messaging environment).  It is not persisted or allowed to be referenced by other resources
 *   except as described in the definition of the Parameters resource.
 * - code: Parameters
 */
export type ParametersData = DomainResourceData & {}

/**
 * @description Demographics and other administrative information about an individual or animal receiving care or other
 *   health-related services.
 * - code: Patient
 */
export type PatientData = DomainResourceData & {}

/**
 * @description This resource provides the status of the payment for goods and services rendered, and the request and
 *   response resource references.
 * - code: PaymentNotice
 */
export type PaymentNoticeData = DomainResourceData & {}

/**
 * @description This resource provides the details including amount of a payment and allocates the payment items being
 *   paid.
 * - code: PaymentReconciliation
 */
export type PaymentReconciliationData = DomainResourceData & {}

/**
 * @description Permission resource holds access rules for a given data and context.
 * - code: Permission
 */
export type PermissionData = DomainResourceData & {}

/**
 * @description Demographics and administrative information about a person independent of a specific health-related
 *   context.
 * - code: Person
 */
export type PersonData = DomainResourceData & {}

/**
 * @description This resource allows for the definition of various types of plans as a sharable, consumable, and
 *   executable artifact. The resource is general enough to support the description of a broad range of clinical and
 *   non-clinical artifacts such as clinical decision support rules, order sets, protocols, and drug quality
 *   specifications.
 * - code: PlanDefinition
 */
export type PlanDefinitionData = DomainResourceData & {}

/**
 * @description A person who is directly or indirectly involved in the provisioning of healthcare or related services.
 * - code: Practitioner
 */
export type PractitionerData = DomainResourceData & {}

/**
 * @description A specific set of Roles/Locations/specialties/services that a practitioner may perform, or has
 *   performed at an organization during a period of time.
 * - code: PractitionerRole
 */
export type PractitionerRoleData = DomainResourceData & {}

/**
 * @description An action that is or was performed on or for a patient, practitioner, device, organization, or
 *   location. For example, this can be a physical intervention on a patient like an operation, or less invasive like
 *   long term services, counseling, or hypnotherapy.  This can be a quality or safety inspection for a location,
 *   organization, or device.  This can be an accreditation procedure on a practitioner for licensing.
 * - code: Procedure
 */
export type ProcedureData = DomainResourceData & {}

/**
 * @description Provenance of a resource is a record that describes entities and processes involved in producing and
 *   delivering or otherwise influencing that resource. Provenance provides a critical foundation for assessing
 *   authenticity, enabling trust, and allowing reproducibility. Provenance assertions are a form of contextual
 *   metadata and can themselves become important records with their own provenance. Provenance statement indicates
 *   clinical significance in terms of confidence in authenticity, reliability, and trustworthiness, integrity, and
 *   stage in lifecycle (e.g. Document Completion - has the artifact been legally authenticated), all of which may
 *   impact security, privacy, and trust policies.
 * - code: Provenance
 */
export type ProvenanceData = DomainResourceData & {}

/**
 * @description A structured set of questions intended to guide the collection of answers from end-users.
 *   Questionnaires provide detailed control over order, presentation, phraseology and grouping to allow coherent,
 *   consistent data collection.
 * - code: Questionnaire
 */
export type QuestionnaireData = DomainResourceData & {}

/**
 * @description A structured set of questions and their answers. The questions are ordered and grouped into coherent
 *   subsets, corresponding to the structure of the grouping of the questionnaire being responded to.
 * - code: QuestionnaireResponse
 */
export type QuestionnaireResponseData = DomainResourceData & {}

/**
 * @description Regulatory approval, clearance or licencing related to a regulated product, treatment, facility or
 *   activity that is cited in a guidance, regulation, rule or legislative act. An example is Market Authorization
 *   relating to a Medicinal Product.
 * - code: RegulatedAuthorization
 */
export type RegulatedAuthorizationData = DomainResourceData & {}

/**
 * @description Information about a person that is involved in a patient's health or the care for a patient, but who is
 *   not the target of healthcare, nor has a formal responsibility in the care process.
 * - code: RelatedPerson
 */
export type RelatedPersonData = DomainResourceData & {}

/**
 * @description A set of related requests that can be used to capture intended activities that have inter-dependencies
 *   such as "give this medication after that one".
 * - code: RequestOrchestration
 */
export type RequestOrchestrationData = DomainResourceData & {}

/**
 * @description The Requirements resource is used to describe an actor - a human or an application that plays a role in
 *   data exchange, and that may have obligations associated with the role the actor plays.
 * - code: Requirements
 */
export type RequirementsData = DomainResourceData & {}

/**
 * @description A scientific study of nature that sometimes includes processes involved in health and disease. For
 *   example, clinical trials are research studies that involve people. These studies may be related to new ways to
 *   screen, prevent, diagnose, and treat disease. They may also study certain outcomes and certain groups of people by
 *   looking at data collected in the past or future.
 * - code: ResearchStudy
 */
export type ResearchStudyData = DomainResourceData & {}

/**
 * @description A ResearchSubject is a participant or object which is the recipient of investigative activities in a
 *   research study.
 * - code: ResearchSubject
 */
export type ResearchSubjectData = DomainResourceData & {}

/**
 * @description An assessment of the likely outcome(s) for a patient or other subject as well as the likelihood of each
 *   outcome.
 * - code: RiskAssessment
 */
export type RiskAssessmentData = DomainResourceData & {}

/**
 * @description A container for slots of time that may be available for booking appointments.
 * - code: Schedule
 */
export type ScheduleData = DomainResourceData & {}

/**
 * @description A search parameter that defines a named search item that can be used to search/filter on a resource.
 * - code: SearchParameter
 */
export type SearchParameterData = DomainResourceData & {}

/**
 * @description A record of a request for service such as diagnostic investigations, treatments, or operations to be
 *   performed.
 * - code: ServiceRequest
 */
export type ServiceRequestData = DomainResourceData & {}

/**
 * @description A slot of time on a schedule that may be available for booking appointments.
 * - code: Slot
 */
export type SlotData = DomainResourceData & {}

/**
 * @description A sample to be used for analysis.
 * - code: Specimen
 */
export type SpecimenData = DomainResourceData & {}

/**
 * @description A kind of specimen with associated set of requirements.
 * - code: SpecimenDefinition
 */
export type SpecimenDefinitionData = DomainResourceData & {}

/**
 * @description A definition of a FHIR structure. This resource is used to describe the underlying resources, data
 *   types defined in FHIR, and also for describing extensions and constraints on resources and data types.
 * - code: StructureDefinition
 */
export type StructureDefinitionData = DomainResourceData & {}

/**
 * @description A Map of relationships between 2 structures that can be used to transform data.
 * - code: StructureMap
 */
export type StructureMapData = DomainResourceData & {}

/**
 * @description The subscription resource describes a particular client's request to be notified about a
 *   SubscriptionTopic.
 * - code: Subscription
 */
export type SubscriptionData = DomainResourceData & {}

/**
 * @description The SubscriptionStatus resource describes the state of a Subscription during notifications. It is not
 *   persisted.
 * - code: SubscriptionStatus
 */
export type SubscriptionStatusData = DomainResourceData & {}

/**
 * @description Describes a stream of resource state changes identified by trigger criteria and annotated with labels
 *   useful to filter projections from this topic.
 * - code: SubscriptionTopic
 */
export type SubscriptionTopicData = DomainResourceData & {}

/**
 * @description A homogeneous material with a definite composition.
 * - code: Substance
 */
export type SubstanceData = DomainResourceData & {}

/**
 * @description The detailed description of a substance, typically at a level beyond what is used for prescribing.
 * - code: SubstanceDefinition
 */
export type SubstanceDefinitionData = DomainResourceData & {}

/**
 * @description Nucleic acids are defined by three distinct elements: the base, sugar and linkage. Individual
 *   substance/moiety IDs will be created for each of these elements. The nucleotide sequence will be always entered in
 *   the 5’-3’ direction.
 * - code: SubstanceNucleicAcid
 */
export type SubstanceNucleicAcidData = DomainResourceData & {}

/**
 * @description Properties of a substance specific to it being a polymer.
 * - code: SubstancePolymer
 */
export type SubstancePolymerData = DomainResourceData & {}

/**
 * @description A SubstanceProtein is defined as a single unit of a linear amino acid sequence, or a combination of
 *   subunits that are either covalently linked or have a defined invariant stoichiometric relationship. This includes
 *   all synthetic, recombinant and purified SubstanceProteins of defined sequence, whether the use is therapeutic or
 *   prophylactic. This set of elements will be used to describe albumins, coagulation factors, cytokines, growth
 *   factors, peptide/SubstanceProtein hormones, enzymes, toxins, toxoids, recombinant vaccines, and immunomodulators.
 * - code: SubstanceProtein
 */
export type SubstanceProteinData = DomainResourceData & {}

/**
 * @description Todo.
 * - code: SubstanceReferenceInformation
 */
export type SubstanceReferenceInformationData = DomainResourceData & {}

/**
 * @description Source material shall capture information on the taxonomic and anatomical origins as well as the
 *   fraction of a material that can result in or can be modified to form a substance. This set of data elements shall
 *   be used to define polymer substances isolated from biological matrices. Taxonomic and anatomical origins shall be
 *   described using a controlled vocabulary as required. This information is captured for naturally derived polymers (
 *   . starch) and structurally diverse substances. For Organisms belonging to the Kingdom Plantae the Substance level
 *   defines the fresh material of a single species or infraspecies, the Herbal Drug and the Herbal preparation. For
 *   Herbal preparations, the fraction information will be captured at the Substance information level and additional
 *   information for herbal extracts will be captured at the Specified Substance Group 1 information level. See for
 *   further explanation the Substance Class: Structurally Diverse and the herbal annex.
 * - code: SubstanceSourceMaterial
 */
export type SubstanceSourceMaterialData = DomainResourceData & {}

/**
 * @description Record of delivery of what is supplied.
 * - code: SupplyDelivery
 */
export type SupplyDeliveryData = DomainResourceData & {}

/**
 * @description A record of a non-patient specific request for a medication, substance, device, certain types of
 *   biologically derived product, and nutrition product used in the healthcare setting.
 * - code: SupplyRequest
 */
export type SupplyRequestData = DomainResourceData & {}

/**
 * @description A task to be performed.
 * - code: Task
 */
export type TaskData = DomainResourceData & {}

/**
 * @description A TerminologyCapabilities resource documents a set of capabilities (behaviors) of a FHIR Terminology
 *   Server that may be used as a statement of actual server functionality or a statement of required or desired server
 *   implementation.
 * - code: TerminologyCapabilities
 */
export type TerminologyCapabilitiesData = DomainResourceData & {}

/**
 * @description A plan for executing testing on an artifact or specifications
 * - code: TestPlan
 */
export type TestPlanData = DomainResourceData & {}

/**
 * @description A summary of information based on the results of executing a TestScript.
 * - code: TestReport
 */
export type TestReportData = DomainResourceData & {}

/**
 * @description A structured set of tests against a FHIR server or client implementation to determine compliance
 *   against the FHIR specification.
 * - code: TestScript
 */
export type TestScriptData = DomainResourceData & {}

/**
 * @description Record of transport.
 * - code: Transport
 */
export type TransportData = DomainResourceData & {}

/**
 * @description A ValueSet resource instance specifies a set of codes drawn from one or more code systems, intended for
 *   use in a particular context. Value sets link between [[[CodeSystem]]] definitions and their use in [coded
 *   elements](terminologies.html).
 * - code: ValueSet
 */
export type ValueSetData = DomainResourceData & {}

/**
 * @description Describes validation requirements, source(s), status and dates for one or more elements.
 * - code: VerificationResult
 */
export type VerificationResultData = DomainResourceData & {}

/**
 * @description An authorization for the provision of glasses and/or contact lenses to a patient.
 * - code: VisionPrescription
 */
export type VisionPrescriptionData = DomainResourceData & {}
