import {FhirResourceName} from 'FhirResourceName'



/**
 * Enum class representing FHIR resource types
 * TODO: bind data models to these enums so we get something like `new
 * FhirResourceEnum<AccountData>('Account','AccountData')`
 */
export class FhirResourceEnum {
  static Account = new FhirResourceEnum('Account')
  static ActivityDefinition = new FhirResourceEnum('ActivityDefinition')
  static ActorDefinition = new FhirResourceEnum('ActorDefinition')
  static AdministrableProductDefinition = new FhirResourceEnum('AdministrableProductDefinition')
  static AdverseEvent = new FhirResourceEnum('AdverseEvent')
  static AllergyIntolerance = new FhirResourceEnum('AllergyIntolerance')
  static Appointment = new FhirResourceEnum('Appointment')
  static AppointmentResponse = new FhirResourceEnum('AppointmentResponse')
  static ArtifactAssessment = new FhirResourceEnum('ArtifactAssessment')
  static AuditEvent = new FhirResourceEnum('AuditEvent')
  static Basic = new FhirResourceEnum('Basic')
  static Binary = new FhirResourceEnum('Binary')
  static BiologicallyDerivedProduct = new FhirResourceEnum('BiologicallyDerivedProduct')
  static BiologicallyDerivedProductDispense = new FhirResourceEnum('BiologicallyDerivedProductDispense')
  static BodyStructure = new FhirResourceEnum('BodyStructure')
  static Bundle = new FhirResourceEnum('Bundle')
  static CapabilityStatement = new FhirResourceEnum('CapabilityStatement')
  static CarePlan = new FhirResourceEnum('CarePlan')
  static CareTeam = new FhirResourceEnum('CareTeam')
  static ChargeItem = new FhirResourceEnum('ChargeItem')
  static ChargeItemDefinition = new FhirResourceEnum('ChargeItemDefinition')
  static Citation = new FhirResourceEnum('Citation')
  static Claim = new FhirResourceEnum('Claim')
  static ClaimResponse = new FhirResourceEnum('ClaimResponse')
  static ClinicalImpression = new FhirResourceEnum('ClinicalImpression')
  static ClinicalUseDefinition = new FhirResourceEnum('ClinicalUseDefinition')
  static CodeSystem = new FhirResourceEnum('CodeSystem')
  static Communication = new FhirResourceEnum('Communication')
  static CommunicationRequest = new FhirResourceEnum('CommunicationRequest')
  static CompartmentDefinition = new FhirResourceEnum('CompartmentDefinition')
  static Composition = new FhirResourceEnum('Composition')
  static ConceptMap = new FhirResourceEnum('ConceptMap')
  static Condition = new FhirResourceEnum('Condition')
  static ConditionDefinition = new FhirResourceEnum('ConditionDefinition')
  static Consent = new FhirResourceEnum('Consent')
  static Contract = new FhirResourceEnum('Contract')
  static Coverage = new FhirResourceEnum('Coverage')
  static CoverageEligibilityRequest = new FhirResourceEnum('CoverageEligibilityRequest')
  static CoverageEligibilityResponse = new FhirResourceEnum('CoverageEligibilityResponse')
  static DetectedIssue = new FhirResourceEnum('DetectedIssue')
  static Device = new FhirResourceEnum('Device')
  static DeviceAssociation = new FhirResourceEnum('DeviceAssociation')
  static DeviceDefinition = new FhirResourceEnum('DeviceDefinition')
  static DeviceDispense = new FhirResourceEnum('DeviceDispense')
  static DeviceMetric = new FhirResourceEnum('DeviceMetric')
  static DeviceRequest = new FhirResourceEnum('DeviceRequest')
  static DeviceUsage = new FhirResourceEnum('DeviceUsage')
  static DiagnosticReport = new FhirResourceEnum('DiagnosticReport')
  static DocumentReference = new FhirResourceEnum('DocumentReference')
  static Encounter = new FhirResourceEnum('Encounter')
  static EncounterHistory = new FhirResourceEnum('EncounterHistory')
  static Endpoint = new FhirResourceEnum('Endpoint')
  static EnrollmentRequest = new FhirResourceEnum('EnrollmentRequest')
  static EnrollmentResponse = new FhirResourceEnum('EnrollmentResponse')
  static EpisodeOfCare = new FhirResourceEnum('EpisodeOfCare')
  static EventDefinition = new FhirResourceEnum('EventDefinition')
  static Evidence = new FhirResourceEnum('Evidence')
  static EvidenceReport = new FhirResourceEnum('EvidenceReport')
  static EvidenceVariable = new FhirResourceEnum('EvidenceVariable')
  static ExampleScenario = new FhirResourceEnum('ExampleScenario')
  static ExplanationOfBenefit = new FhirResourceEnum('ExplanationOfBenefit')
  static FamilyMemberHistory = new FhirResourceEnum('FamilyMemberHistory')
  static Flag = new FhirResourceEnum('Flag')
  static FormularyItem = new FhirResourceEnum('FormularyItem')
  static GenomicStudy = new FhirResourceEnum('GenomicStudy')
  static Goal = new FhirResourceEnum('Goal')
  static GraphDefinition = new FhirResourceEnum('GraphDefinition')
  static Group = new FhirResourceEnum('Group')
  static GuidanceResponse = new FhirResourceEnum('GuidanceResponse')
  static HealthcareService = new FhirResourceEnum('HealthcareService')
  static ImagingSelection = new FhirResourceEnum('ImagingSelection')
  static ImagingStudy = new FhirResourceEnum('ImagingStudy')
  static Immunization = new FhirResourceEnum('Immunization')
  static ImmunizationEvaluation = new FhirResourceEnum('ImmunizationEvaluation')
  static ImmunizationRecommendation = new FhirResourceEnum('ImmunizationRecommendation')
  static ImplementationGuide = new FhirResourceEnum('ImplementationGuide')
  static Ingredient = new FhirResourceEnum('Ingredient')
  static InsurancePlan = new FhirResourceEnum('InsurancePlan')
  static InventoryItem = new FhirResourceEnum('InventoryItem')
  static InventoryReport = new FhirResourceEnum('InventoryReport')
  static Invoice = new FhirResourceEnum('Invoice')
  static Library = new FhirResourceEnum('Library')
  static Linkage = new FhirResourceEnum('Linkage')
  static List = new FhirResourceEnum('List')
  static Location = new FhirResourceEnum('Location')
  static ManufacturedItemDefinition = new FhirResourceEnum('ManufacturedItemDefinition')
  static Measure = new FhirResourceEnum('Measure')
  static MeasureReport = new FhirResourceEnum('MeasureReport')
  static Medication = new FhirResourceEnum('Medication')
  static MedicationAdministration = new FhirResourceEnum('MedicationAdministration')
  static MedicationDispense = new FhirResourceEnum('MedicationDispense')
  static MedicationKnowledge = new FhirResourceEnum('MedicationKnowledge')
  static MedicationRequest = new FhirResourceEnum('MedicationRequest')
  static MedicationStatement = new FhirResourceEnum('MedicationStatement')
  static MedicinalProductDefinition = new FhirResourceEnum('MedicinalProductDefinition')
  static MessageDefinition = new FhirResourceEnum('MessageDefinition')
  static MessageHeader = new FhirResourceEnum('MessageHeader')
  static MolecularSequence = new FhirResourceEnum('MolecularSequence')
  static NamingSystem = new FhirResourceEnum('NamingSystem')
  static NutritionIntake = new FhirResourceEnum('NutritionIntake')
  static NutritionOrder = new FhirResourceEnum('NutritionOrder')
  static NutritionProduct = new FhirResourceEnum('NutritionProduct')
  static Observation = new FhirResourceEnum('Observation')
  static ObservationDefinition = new FhirResourceEnum('ObservationDefinition')
  static OperationDefinition = new FhirResourceEnum('OperationDefinition')
  static OperationOutcome = new FhirResourceEnum('OperationOutcome')
  static Organization = new FhirResourceEnum('Organization')
  static OrganizationAffiliation = new FhirResourceEnum('OrganizationAffiliation')
  static PackagedProductDefinition = new FhirResourceEnum('PackagedProductDefinition')
  static Parameters = new FhirResourceEnum('Parameters')
  static Patient = new FhirResourceEnum('Patient')
  static PaymentNotice = new FhirResourceEnum('PaymentNotice')
  static PaymentReconciliation = new FhirResourceEnum('PaymentReconciliation')
  static Permission = new FhirResourceEnum('Permission')
  static Person = new FhirResourceEnum('Person')
  static PlanDefinition = new FhirResourceEnum('PlanDefinition')
  static Practitioner = new FhirResourceEnum('Practitioner')
  static PractitionerRole = new FhirResourceEnum('PractitionerRole')
  static Procedure = new FhirResourceEnum('Procedure')
  static Provenance = new FhirResourceEnum('Provenance')
  static Questionnaire = new FhirResourceEnum('Questionnaire')
  static QuestionnaireResponse = new FhirResourceEnum('QuestionnaireResponse')
  static RegulatedAuthorization = new FhirResourceEnum('RegulatedAuthorization')
  static RelatedPerson = new FhirResourceEnum('RelatedPerson')
  static RequestOrchestration = new FhirResourceEnum('RequestOrchestration')
  static Requirements = new FhirResourceEnum('Requirements')
  static ResearchStudy = new FhirResourceEnum('ResearchStudy')
  static ResearchSubject = new FhirResourceEnum('ResearchSubject')
  static RiskAssessment = new FhirResourceEnum('RiskAssessment')
  static Schedule = new FhirResourceEnum('Schedule')
  static SearchParameter = new FhirResourceEnum('SearchParameter')
  static ServiceRequest = new FhirResourceEnum('ServiceRequest')
  static Slot = new FhirResourceEnum('Slot')
  static Specimen = new FhirResourceEnum('Specimen')
  static SpecimenDefinition = new FhirResourceEnum('SpecimenDefinition')
  static StructureDefinition = new FhirResourceEnum('StructureDefinition')
  static StructureMap = new FhirResourceEnum('StructureMap')
  static Subscription = new FhirResourceEnum('Subscription')
  static SubscriptionStatus = new FhirResourceEnum('SubscriptionStatus')
  static SubscriptionTopic = new FhirResourceEnum('SubscriptionTopic')
  static Substance = new FhirResourceEnum('Substance')
  static SubstanceDefinition = new FhirResourceEnum('SubstanceDefinition')
  static SubstanceNucleicAcid = new FhirResourceEnum('SubstanceNucleicAcid')
  static SubstancePolymer = new FhirResourceEnum('SubstancePolymer')
  static SubstanceProtein = new FhirResourceEnum('SubstanceProtein')
  static SubstanceReferenceInformation = new FhirResourceEnum('SubstanceReferenceInformation')
  static SubstanceSourceMaterial = new FhirResourceEnum('SubstanceSourceMaterial')
  static SupplyDelivery = new FhirResourceEnum('SupplyDelivery')
  static SupplyRequest = new FhirResourceEnum('SupplyRequest')
  static Task = new FhirResourceEnum('Task')
  static TerminologyCapabilities = new FhirResourceEnum('TerminologyCapabilities')
  static TestPlan = new FhirResourceEnum('TestPlan')
  static TestReport = new FhirResourceEnum('TestReport')
  static TestScript = new FhirResourceEnum('TestScript')
  static Transport = new FhirResourceEnum('Transport')
  static ValueSet = new FhirResourceEnum('ValueSet')
  static VerificationResult = new FhirResourceEnum('VerificationResult')
  static VisionPrescription = new FhirResourceEnum('VisionPrescription')

  readonly value: FhirResourceName
  readonly profileName: string

  constructor(value: FhirResourceName, profile?: string) {
    this.value = value
    this.profileName = profile ?? ''
  }
  /**
   * Get all available FHIR resource names
   * @returns {FhirResourceEnum[]} Array of all resource names
   */
  static values(): FhirResourceEnum[] {
    return Object.values(this).filter(value => value instanceof FhirResourceEnum)
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
   * @returns {FhirResourceEnum|undefined} The enum value or undefined if not found
   */
  static fromString(value: string) {
    return this.values().find(v => v.toString() === value)
  }
  /**
   * Get resource names by category (resources that start with the same prefix)
   * @param {string} prefix - The prefix to filter by
   * @returns {FhirResourceEnum[]} Array of resource enum values starting with the given prefix
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
    return new FhirResourceEnum(this.value, name)
  }

}

// Make the enum immutable
Object.freeze(FhirResourceEnum)

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
} = FhirResourceEnum
