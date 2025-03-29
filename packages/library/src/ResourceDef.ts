import {ResourceName} from 'ResourceName'



/**
 * Enum class representing FHIR resource types
 * TODO: bind data models to these enums so we get something like `new
 * ResourceDef<AccountData>('Account','AccountData')`
 */
export class ResourceDef {
  static Account = new ResourceDef('Account')
  static ActivityDefinition = new ResourceDef('ActivityDefinition')
  static ActorDefinition = new ResourceDef('ActorDefinition')
  static AdministrableProductDefinition = new ResourceDef('AdministrableProductDefinition')
  static AdverseEvent = new ResourceDef('AdverseEvent')
  static AllergyIntolerance = new ResourceDef('AllergyIntolerance')
  static Appointment = new ResourceDef('Appointment')
  static AppointmentResponse = new ResourceDef('AppointmentResponse')
  static ArtifactAssessment = new ResourceDef('ArtifactAssessment')
  static AuditEvent = new ResourceDef('AuditEvent')
  static Basic = new ResourceDef('Basic')
  static Binary = new ResourceDef('Binary')
  static BiologicallyDerivedProduct = new ResourceDef('BiologicallyDerivedProduct')
  static BiologicallyDerivedProductDispense = new ResourceDef('BiologicallyDerivedProductDispense')
  static BodyStructure = new ResourceDef('BodyStructure')
  static Bundle = new ResourceDef('Bundle')
  static CapabilityStatement = new ResourceDef('CapabilityStatement')
  static CarePlan = new ResourceDef('CarePlan')
  static CareTeam = new ResourceDef('CareTeam')
  static ChargeItem = new ResourceDef('ChargeItem')
  static ChargeItemDefinition = new ResourceDef('ChargeItemDefinition')
  static Citation = new ResourceDef('Citation')
  static Claim = new ResourceDef('Claim')
  static ClaimResponse = new ResourceDef('ClaimResponse')
  static ClinicalImpression = new ResourceDef('ClinicalImpression')
  static ClinicalUseDefinition = new ResourceDef('ClinicalUseDefinition')
  static CodeSystem = new ResourceDef('CodeSystem')
  static Communication = new ResourceDef('Communication')
  static CommunicationRequest = new ResourceDef('CommunicationRequest')
  static CompartmentDefinition = new ResourceDef('CompartmentDefinition')
  static Composition = new ResourceDef('Composition')
  static ConceptMap = new ResourceDef('ConceptMap')
  static Condition = new ResourceDef('Condition')
  static ConditionDefinition = new ResourceDef('ConditionDefinition')
  static Consent = new ResourceDef('Consent')
  static Contract = new ResourceDef('Contract')
  static Coverage = new ResourceDef('Coverage')
  static CoverageEligibilityRequest = new ResourceDef('CoverageEligibilityRequest')
  static CoverageEligibilityResponse = new ResourceDef('CoverageEligibilityResponse')
  static DetectedIssue = new ResourceDef('DetectedIssue')
  static Device = new ResourceDef('Device')
  static DeviceAssociation = new ResourceDef('DeviceAssociation')
  static DeviceDefinition = new ResourceDef('DeviceDefinition')
  static DeviceDispense = new ResourceDef('DeviceDispense')
  static DeviceMetric = new ResourceDef('DeviceMetric')
  static DeviceRequest = new ResourceDef('DeviceRequest')
  static DeviceUsage = new ResourceDef('DeviceUsage')
  static DiagnosticReport = new ResourceDef('DiagnosticReport')
  static DocumentReference = new ResourceDef('DocumentReference')
  static Encounter = new ResourceDef('Encounter')
  static EncounterHistory = new ResourceDef('EncounterHistory')
  static Endpoint = new ResourceDef('Endpoint')
  static EnrollmentRequest = new ResourceDef('EnrollmentRequest')
  static EnrollmentResponse = new ResourceDef('EnrollmentResponse')
  static EpisodeOfCare = new ResourceDef('EpisodeOfCare')
  static EventDefinition = new ResourceDef('EventDefinition')
  static Evidence = new ResourceDef('Evidence')
  static EvidenceReport = new ResourceDef('EvidenceReport')
  static EvidenceVariable = new ResourceDef('EvidenceVariable')
  static ExampleScenario = new ResourceDef('ExampleScenario')
  static ExplanationOfBenefit = new ResourceDef('ExplanationOfBenefit')
  static FamilyMemberHistory = new ResourceDef('FamilyMemberHistory')
  static Flag = new ResourceDef('Flag')
  static FormularyItem = new ResourceDef('FormularyItem')
  static GenomicStudy = new ResourceDef('GenomicStudy')
  static Goal = new ResourceDef('Goal')
  static GraphDefinition = new ResourceDef('GraphDefinition')
  static Group = new ResourceDef('Group')
  static GuidanceResponse = new ResourceDef('GuidanceResponse')
  static HealthcareService = new ResourceDef('HealthcareService')
  static ImagingSelection = new ResourceDef('ImagingSelection')
  static ImagingStudy = new ResourceDef('ImagingStudy')
  static Immunization = new ResourceDef('Immunization')
  static ImmunizationEvaluation = new ResourceDef('ImmunizationEvaluation')
  static ImmunizationRecommendation = new ResourceDef('ImmunizationRecommendation')
  static ImplementationGuide = new ResourceDef('ImplementationGuide')
  static Ingredient = new ResourceDef('Ingredient')
  static InsurancePlan = new ResourceDef('InsurancePlan')
  static InventoryItem = new ResourceDef('InventoryItem')
  static InventoryReport = new ResourceDef('InventoryReport')
  static Invoice = new ResourceDef('Invoice')
  static Library = new ResourceDef('Library')
  static Linkage = new ResourceDef('Linkage')
  static List = new ResourceDef('List')
  static Location = new ResourceDef('Location')
  static ManufacturedItemDefinition = new ResourceDef('ManufacturedItemDefinition')
  static Measure = new ResourceDef('Measure')
  static MeasureReport = new ResourceDef('MeasureReport')
  static Media = new ResourceDef('Media')
  static Medication = new ResourceDef('Medication')
  static MedicationAdministration = new ResourceDef('MedicationAdministration')
  static MedicationDispense = new ResourceDef('MedicationDispense')
  static MedicationKnowledge = new ResourceDef('MedicationKnowledge')
  static MedicationRequest = new ResourceDef('MedicationRequest')
  static MedicationStatement = new ResourceDef('MedicationStatement')
  static MedicinalProductDefinition = new ResourceDef('MedicinalProductDefinition')
  static MessageDefinition = new ResourceDef('MessageDefinition')
  static MessageHeader = new ResourceDef('MessageHeader')
  static MolecularSequence = new ResourceDef('MolecularSequence')
  static NamingSystem = new ResourceDef('NamingSystem')
  static NutritionIntake = new ResourceDef('NutritionIntake')
  static NutritionOrder = new ResourceDef('NutritionOrder')
  static NutritionProduct = new ResourceDef('NutritionProduct')
  static Observation = new ResourceDef('Observation')
  static ObservationDefinition = new ResourceDef('ObservationDefinition')
  static OperationDefinition = new ResourceDef('OperationDefinition')
  static OperationOutcome = new ResourceDef('OperationOutcome')
  static Organization = new ResourceDef('Organization')
  static OrganizationAffiliation = new ResourceDef('OrganizationAffiliation')
  static PackagedProductDefinition = new ResourceDef('PackagedProductDefinition')
  static Parameters = new ResourceDef('Parameters')
  static Patient = new ResourceDef('Patient')
  static PaymentNotice = new ResourceDef('PaymentNotice')
  static PaymentReconciliation = new ResourceDef('PaymentReconciliation')
  static Permission = new ResourceDef('Permission')
  static Person = new ResourceDef('Person')
  static PlanDefinition = new ResourceDef('PlanDefinition')
  static Practitioner = new ResourceDef('Practitioner')
  static PractitionerRole = new ResourceDef('PractitionerRole')
  static Procedure = new ResourceDef('Procedure')
  static Provenance = new ResourceDef('Provenance')
  static Questionnaire = new ResourceDef('Questionnaire')
  static QuestionnaireResponse = new ResourceDef('QuestionnaireResponse')
  static RegulatedAuthorization = new ResourceDef('RegulatedAuthorization')
  static RelatedPerson = new ResourceDef('RelatedPerson')
  static RequestOrchestration = new ResourceDef('RequestOrchestration')
  static Requirements = new ResourceDef('Requirements')
  static ResearchStudy = new ResourceDef('ResearchStudy')
  static ResearchSubject = new ResourceDef('ResearchSubject')
  static RiskAssessment = new ResourceDef('RiskAssessment')
  static Schedule = new ResourceDef('Schedule')
  static SearchParameter = new ResourceDef('SearchParameter')
  static ServiceRequest = new ResourceDef('ServiceRequest')
  static Slot = new ResourceDef('Slot')
  static Specimen = new ResourceDef('Specimen')
  static SpecimenDefinition = new ResourceDef('SpecimenDefinition')
  static StructureDefinition = new ResourceDef('StructureDefinition')
  static StructureMap = new ResourceDef('StructureMap')
  static Subscription = new ResourceDef('Subscription')
  static SubscriptionStatus = new ResourceDef('SubscriptionStatus')
  static SubscriptionTopic = new ResourceDef('SubscriptionTopic')
  static Substance = new ResourceDef('Substance')
  static SubstanceDefinition = new ResourceDef('SubstanceDefinition')
  static SubstanceNucleicAcid = new ResourceDef('SubstanceNucleicAcid')
  static SubstancePolymer = new ResourceDef('SubstancePolymer')
  static SubstanceProtein = new ResourceDef('SubstanceProtein')
  static SubstanceReferenceInformation = new ResourceDef('SubstanceReferenceInformation')
  static SubstanceSourceMaterial = new ResourceDef('SubstanceSourceMaterial')
  static SupplyDelivery = new ResourceDef('SupplyDelivery')
  static SupplyRequest = new ResourceDef('SupplyRequest')
  static Task = new ResourceDef('Task')
  static TerminologyCapabilities = new ResourceDef('TerminologyCapabilities')
  static TestPlan = new ResourceDef('TestPlan')
  static TestReport = new ResourceDef('TestReport')
  static TestScript = new ResourceDef('TestScript')
  static Transport = new ResourceDef('Transport')
  static ValueSet = new ResourceDef('ValueSet')
  static VerificationResult = new ResourceDef('VerificationResult')
  static VisionPrescription = new ResourceDef('VisionPrescription')

  readonly value: ResourceName | `${ResourceName}${string}`
  readonly profileName: string
  readonly dataset: `${ResourceName | `${ResourceName}${string}`}Data`

  /**
   * Creates a new FHIR resource enum instance
   * @param {ResourceName | `${ResourceName}${string}`} value - The FHIR resource name or a string starting
   *   with a valid resource name
   * @param {string} [profile] - Optional profile name to create a profiled resource reference (e.g. 'Patient/bp')
   */
  constructor(value: ResourceName | `${ResourceName}${string}`, profile?: string) {
    this.value = value
    this.dataset = `${value}Data`
    this.profileName = profile ?? ''
  }

  /**
   * Get all available FHIR resource names
   * @returns {ResourceDef[]} Array of all resource names
   */
  static values(): ResourceDef[] {
    return Object.values(this).filter(value => value instanceof ResourceDef)
  }
  /**
   * Get all available FHIR resource names as strings
   * @returns {string[]} Array of all resource names as strings
   */
  static valueStrings(): string[] {
    return this.values().map(v => v.toString())
  }
  /**
   * Check if a string is a valid FHIR resource name
   * @param {string} value - The string to check
   * @returns {boolean} True if the value is a valid resource name
   */
  static isValid(value: unknown) {
    return this.valueStrings().includes(String(value))
  }
  /**
   * Get an enum by its string value
   * @param {string} value - The string value to look up
   * @returns {ResourceDef|undefined} The enum value or undefined if not found
   */
  static fromString(value: string) {
    return this.values().find(v => v.toString() === value)
  }
  /**
   * Get resource names by category (resources that start with the same prefix)
   * @param {string} prefix - The prefix to filter by
   * @returns {ResourceDef[]} Array of resource enum values starting with the given prefix
   */
  static getByPrefix(prefix: string) {
    return this.values().filter(resource =>
                                  resource.toString().startsWith(prefix)
    )
  }

  toString() {
    return this.value + (this.profileName ? `/${this.profileName}` : '')
  }

  valueOf() {
    return this.value
  }

  profile(name: string) {
    return new ResourceDef(this.value, name)
  }

}

// Make the enum immutable
Object.freeze(ResourceDef)

export const {
  Account,
  ActivityDefinition,
  ActorDefinition,
  AdministrableProductDefinition,
  AdverseEvent,
  AllergyIntolerance,
  Appointment,
  AppointmentResponse,
  ArtifactAssessment,
  AuditEvent,
  Basic,
  Binary,
  BiologicallyDerivedProduct,
  BiologicallyDerivedProductDispense,
  BodyStructure,
  Bundle,
  CapabilityStatement,
  CarePlan,
  CareTeam,
  ChargeItem,
  ChargeItemDefinition,
  Citation,
  Claim,
  ClaimResponse,
  ClinicalImpression,
  ClinicalUseDefinition,
  CodeSystem,
  Communication,
  CommunicationRequest,
  CompartmentDefinition,
  Composition,
  ConceptMap,
  Condition,
  ConditionDefinition,
  Consent,
  Contract,
  Coverage,
  CoverageEligibilityRequest,
  CoverageEligibilityResponse,
  DetectedIssue,
  Device,
  DeviceAssociation,
  DeviceDefinition,
  DeviceDispense,
  DeviceMetric,
  DeviceRequest,
  DeviceUsage,
  DiagnosticReport,
  DocumentReference,
  Encounter,
  EncounterHistory,
  Endpoint,
  EnrollmentRequest,
  EnrollmentResponse,
  EpisodeOfCare,
  EventDefinition,
  Evidence,
  EvidenceReport,
  EvidenceVariable,
  ExampleScenario,
  ExplanationOfBenefit,
  FamilyMemberHistory,
  Flag,
  FormularyItem,
  GenomicStudy,
  Goal,
  GraphDefinition,
  Group,
  GuidanceResponse,
  HealthcareService,
  ImagingSelection,
  ImagingStudy,
  Immunization,
  ImmunizationEvaluation,
  ImmunizationRecommendation,
  ImplementationGuide,
  Ingredient,
  InsurancePlan,
  InventoryItem,
  InventoryReport,
  Invoice,
  Library,
  Linkage,
  List,
  Location,
  ManufacturedItemDefinition,
  Measure,
  MeasureReport,
  Media,
  Medication,
  MedicationAdministration,
  MedicationDispense,
  MedicationKnowledge,
  MedicationRequest,
  MedicationStatement,
  MedicinalProductDefinition,
  MessageDefinition,
  MessageHeader,
  MolecularSequence,
  NamingSystem,
  NutritionIntake,
  NutritionOrder,
  NutritionProduct,
  Observation,
  ObservationDefinition,
  OperationDefinition,
  OperationOutcome,
  Organization,
  OrganizationAffiliation,
  PackagedProductDefinition,
  Parameters,
  Patient,
  PaymentNotice,
  PaymentReconciliation,
  Permission,
  Person,
  PlanDefinition,
  Practitioner,
  PractitionerRole,
  Procedure,
  Provenance,
  Questionnaire,
  QuestionnaireResponse,
  RegulatedAuthorization,
  RelatedPerson,
  RequestOrchestration,
  Requirements,
  ResearchStudy,
  ResearchSubject,
  RiskAssessment,
  Schedule,
  SearchParameter,
  ServiceRequest,
  Slot,
  Specimen,
  SpecimenDefinition,
  StructureDefinition,
  StructureMap,
  Subscription,
  SubscriptionStatus,
  SubscriptionTopic,
  Substance,
  SubstanceDefinition,
  SubstanceNucleicAcid,
  SubstancePolymer,
  SubstanceProtein,
  SubstanceReferenceInformation,
  SubstanceSourceMaterial,
  SupplyDelivery,
  SupplyRequest,
  Task,
  TerminologyCapabilities,
  TestPlan,
  TestReport,
  TestScript,
  Transport,
  ValueSet,
  VerificationResult,
  VisionPrescription
} = ResourceDef
