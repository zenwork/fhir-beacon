import {FhirExtensionData} from '../../../internal'




export const complexExtension: FhirExtensionData<never> = {
  url: 'http://example.org/fhir/StructureDefinition/patient-clinicalTrial',
  extension: [
    {
      url: 'NCT',
      valueString: 'NCT00000419'
    },
    {
      url: 'period',
      valuePeriod: {
        start: '2004-01-01',
        end: '2012-12-31'
      }
    },
    {
      url: 'reason',
      valueCodeableConcept: {
        text: 'healthy-volunteer'
      }
    }
  ]
}


/*
 export const  fullPatientExample: PatientData = {
 resourceType: "Patient",
 id: "PersonEch011",
 meta: { profile: ["http://fhir.ch/ig/ch-core/StructureDefinition/ch-core-patient"]},
 language: "de-CH",
 text: {
 status: "additional",
 div: "<div xmlns=\"http://www.w3.org/1999/xhtml\" xml:lang=\"de-CH\" lang=\"de-CH\"><div>Example according to eCH-011</div>3.3.2 nameData – Namensangaben<ul><li>Amtlicher Name (zwingend) – officialName, siehe Kapitel 3.3.2.1</li><li>Amtliche Vornamen (zwingend) – firstName, siehe Kapitel 3.3.2.2</li><li>Ledigname (optional) – originalName, siehe Kapitel 3.3.2.3</li><li>Allianzname (optional) – allianceName, siehe Kapitel 3.3.2.4</li><li>Aliasname (optional) – aliasName, siehe Kapitel 3.3.2.5</li><li>Andere amtliche Name (optional) – otherName, siehe Kapitel 3.3.2.6</li><li>Rufname (optional) – callName, siehe Kapitel 3.3.2.7</li><li>entweder<ul><li>Name im ausländischen Pass (optional) - nameOnForeignPassport, siehe Kapitel 3.3.2.8 oder</li><li>Name gemäss Deklaration (optional) – declaredForeignName, siehe Kapitel 3.3.2.9</li></ul></li></ul>3.3.5 maritalData - Zivilstandsangaben<ul><li>Zivilstand in eingetragener Partnerschaft (married), aber freiwillig getrennt lebend</li></ul>3.3.8 contactData – Kontaktangaben<ul><li>Zusätzlich Beispiel für Zustelladresse, falls es nicht die Adresse des Patienten direkt ist, mit Angaben von eCH-0010</li></ul></div>",

 },
 name: [
 {
 use: "official",
 family: "Amtlicher Name",
 _family: {
 extension: [
 {
 url: "http://fhir.ch/ig/ch-core/StructureDefinition/ch-ext-ech-11-name",
 valueCode: "officialName"
 }
 ]
 },
 given: ["Amtliche Vornamen (zwingend)"],
 _given: [
 {
 extension: [
 {
 url: "http://fhir.ch/ig/ch-core/StructureDefinition/ch-ext-ech-11-firstname",
 valueCode: "officialFirstName"
 }
 ]
 }
 ]
 },
 {
 family: "Allianzname",
 _family: {
 extension: [
 {
 url: "http://fhir.ch/ig/ch-core/StructureDefinition/ch-ext-ech-11-name",
 valueCode: "allianceName"
 }
 ]
 }
 },
 {
 use: "maiden",
 family: "Ledigname (optional) – originalName",
 _family: {
 extension: [
 {
 url: "http://fhir.ch/ig/ch-core/StructureDefinition/ch-ext-ech-11-name",
 valueCode: "originalName"
 }
 ]
 }
 },
 {
 family: "Alias name",
 _family: {
 extension: [
 {
 url: "http://fhir.ch/ig/ch-core/StructureDefinition/ch-ext-ech-11-name",
 valueCode: "aliasName"
 }
 ]
 }
 }
 ],
 gender: "female",
 birthDate: "1982-03-20",
 maritalStatus: {
 extension: [
 {
 url: "http://fhir.ch/ig/ch-core/StructureDefinition/ch-ext-ech-11-maritaldata-separation",
 valueCodeableConcept: {
 coding: [
 {
 system: "http://fhir.ch/ig/ch-core/CodeSystem/ech-11-maritaldata-separation",
 code: "1",
 display: "Freiwillig getrennt"
 }
 ]
 }
 }
 ],
 coding: [
 { system: "http://terminology.hl7.org/CodeSystem/v3-MaritalStatus", code: "M"},
 {
 system: "http://fhir.ch/ig/ch-core/CodeSystem/ech-11-maritalstatus",
 code: "6",
 display: "in eingetragener Partnerschaft"
 }
 ]
 },
 contact: [
 {
 relationship: [
 { coding: [{ system: "http://fhir.ch/ig/ch-core/CodeSystem/ech-11", code: "contactData"}]}
 ], name: { family: "Dalkiliç", given: ["Fabio Nicola"]}, address: {
 line: [
 "addressLine1 sollte für personifizierte Adressangaben verwendet werden (z.B. c/o- Adresse).",
 "addressLine2 solle für unpersonifizierte Adressangaben verwendet werden (z.B. Zu- satzangaben zur Lokalisation, z.B. Chalet Edelweiss).",
 "Strassenbezeichnungen in Postadressen. Es kann sich dabei auch um den Namen einer Lokalität, eines Weilers etc. handeln. No. 10 Wohung 5",
 "Postfach"
 ],
 _line: [
 {
 extension: [
 {
 url: "http://fhir.ch/ig/ch-core/StructureDefinition/ch-ext-ech-10-linetype",
 valueCode: "addressLine1"
 }
 ]
 },
 {
 extension: [
 {
 url: "http://fhir.ch/ig/ch-core/StructureDefinition/ch-ext-ech-10-linetype",
 valueCode: "addressLine2"
 }
 ]
 },
 {
 extension: [
 {
 url: "http://fhir.ch/ig/ch-core/StructureDefinition/ch-ext-ech-10-linetype",
 valueCode: "street"
 },
 {
 url: "http://hl7.org/fhir/StructureDefinition/iso21090-ADXP-streetName",
 valueString: "Strassenbezeichnug"
 },
 {
 url: "http://hl7.org/fhir/StructureDefinition/iso21090-ADXP-houseNumber",
 valueString: "10"
 },
 { url: "http://hl7.org/fhir/StructureDefinition/iso21090-ADXP-unitID", valueString: "5"}
 ]
 },
 {
 extension: [
 {
 url: "http://fhir.ch/ig/ch-core/StructureDefinition/ch-ext-ech-10-linetype",
 valueCode: "postOfficeBoxText"
 },
 {
 url: "http://hl7.org/fhir/StructureDefinition/iso21090-ADXP-postBox",
 valueString: "12345678"
 }
 ]
 }
 ],
 city: "Ort",
 postalCode: "PLZ",
 country: "Schweiz",
 _country: {
 extension: [
 {
 url: "http://hl7.org/fhir/StructureDefinition/iso21090-SC-coding",
 valueCoding: { system: "urn:iso:std:iso:3166", code: "CH"}
 }
 ]
 }
 }
 }
 ]
 }
 */
