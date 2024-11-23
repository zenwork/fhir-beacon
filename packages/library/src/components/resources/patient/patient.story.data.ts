export const data = {
  resourceType: 'Patient',
  id: 'f201',
  text: {
    status: 'generated',
    div: '\u003cdiv xmlns\u003d"http://www.w3.org/1999/xhtml"\u003e\u003cp style\u003d"border: 1px #661aff solid; background-color: #e6e6ff; padding: 10px;"\u003e\u003cb\u003eRoel(OFFICIAL)\u003c/b\u003e male, DoB: 1960-03-13 ( BSN: 123456789 (use: OFFICIAL))\u003c/p\u003e\u003chr/\u003e\u003ctable class\u003d"grid"\u003e\u003ctr\u003e\u003ctd style\u003d"background-color: #f3f5da" title\u003d"Record is active"\u003eActive:\u003c/td\u003e\u003ctd\u003etrue\u003c/td\u003e\u003ctd style\u003d"background-color: #f3f5da" title\u003d"Known status of Patient"\u003eDeceased:\u003c/td\u003e\u003ctd\u003efalse\u003c/td\u003e\u003c/tr\u003e\u003ctr\u003e\u003ctd style\u003d"background-color: #f3f5da" title\u003d"Known Marital status of Patient"\u003eMarital Status:\u003c/td\u003e\u003ctd\u003e\u003cspan title\u003d"Codes: {http://snomed.info/sct 36629006}, {http://terminology.hl7.org/CodeSystem/v3-MaritalStatus M}"\u003eLegally married\u003c/span\u003e\u003c/td\u003e\u003ctd style\u003d"background-color: #f3f5da" title\u003d"Known multipleBirth status of Patient"\u003eMultiple Birth:\u003c/td\u003e\u003ctd colspan\u003d"3"\u003efalse\u003c/td\u003e\u003c/tr\u003e\u003ctr\u003e\u003ctd style\u003d"background-color: #f3f5da" title\u003d"Other Ids (see the one above)"\u003eOther Id:\u003c/td\u003e\u003ctd colspan\u003d"3"\u003eBSN: 123456789 (use: OFFICIAL)\u003c/td\u003e\u003c/tr\u003e\u003ctr\u003e\u003ctd style\u003d"background-color: #f3f5da" title\u003d"Ways to contact the Patient"\u003eContact Details:\u003c/td\u003e\u003ctd colspan\u003d"3"\u003e\u003cul\u003e\u003cli\u003e\u003ca href\u003d"tel:+31612345678"\u003e+31612345678\u003c/a\u003e\u003c/li\u003e\u003cli\u003e\u003ca href\u003d"tel:+31201234567"\u003e+31201234567\u003c/a\u003e\u003c/li\u003e\u003cli\u003eBos en Lommerplein 280 Amsterdam 1055RW NLD (HOME)\u003c/li\u003e\u003c/ul\u003e\u003c/td\u003e\u003c/tr\u003e\u003ctr\u003e\u003ctd style\u003d"background-color: #f3f5da" title\u003d"Languages spoken"\u003eLanguage:\u003c/td\u003e\u003ctd colspan\u003d"3"\u003e\u003cspan title\u003d"Codes: {urn:ietf:bcp:47 nl-NL}"\u003eDutch\u003c/span\u003e (preferred)\u003c/td\u003e\u003c/tr\u003e\u003ctr\u003e\u003ctd style\u003d"background-color: #f3f5da" title\u003d"Nominated Contact: Wife"\u003eWife:\u003c/td\u003e\u003ctd colspan\u003d"3"\u003e\u003cul\u003e\u003cli\u003eAriadne Bor-Jansma\u003c/li\u003e\u003cli\u003e\u003ca href\u003d"tel:+31201234567"\u003e+31201234567\u003c/a\u003e\u003c/li\u003e\u003c/ul\u003e\u003c/td\u003e\u003c/tr\u003e\u003ctr\u003e\u003ctd style\u003d"background-color: #f3f5da" title\u003d"Patient Links"\u003eLinks:\u003c/td\u003e\u003ctd colspan\u003d"3"\u003e\u003cul\u003e\u003cli\u003eManaging Organization: \u003ca href\u003d"organization-example-f201-aumc.html"\u003eOrganization/f201: AUMC\u003c/a\u003e \u0026quot;Artis University Medical Center (AUMC)\u0026quot;\u003c/li\u003e\u003c/ul\u003e\u003c/td\u003e\u003c/tr\u003e\u003c/table\u003e\u003c/div\u003e'

  },
  identifier: [
    {
      use: 'official',
      type: { text: 'BSN' },
      system: 'urn:oid:2.16.840.1.113883.2.4.6.3',
      value: '123456789'
    },
    {
      use: 'official',
      type: { text: 'BSN' },
      system: 'urn:oid:2.16.840.1.113883.2.4.6.3',
      value: '123456789'
    }
  ],
  active: true,
  name: [
    {
      use: 'official',
      text: 'Roel',
      family: 'Bor',
      given: ['Roelof Olaf'],
      prefix: ['Drs.'],
      suffix: ['PDEng.']
    }
  ],
  telecom: [
    { system: 'phone', value: '+31612345678', use: 'mobile' },
    { system: 'phone', value: '+31201234567', use: 'home' }
  ],
  gender: 'male',
  birthDate: '1960-03-13',
  deceasedBoolean: false,
  address: [
    {
      use: 'home',
      line: ['Bos en Lommerplein 280'],
      city: 'Amsterdam',
      postalCode: '1055RW',
      country: 'NLD'
    }
  ],
  maritalStatus: {
    coding: [
      { system: 'http://snomed.info/sct', code: '36629006', display: 'Legally married' },
      { system: 'http://terminology.hl7.org/CodeSystem/v3-MaritalStatus', code: 'M' }
    ]
  },
  multipleBirthBoolean: false,
  photo: [{ contentType: 'image/jpeg', url: 'Binary/f006' }],
  contact: [
    {
      relationship: [
        {
          coding: [
            { system: 'http://snomed.info/sct', code: '127850001', display: 'Wife' },
            { system: 'http://terminology.hl7.org/CodeSystem/v2-0131', code: 'N' },
            { system: 'http://terminology.hl7.org/CodeSystem/v3-RoleCode', code: 'WIFE' }
          ]
        }
      ],
      name: { use: 'usual', text: 'Ariadne Bor-Jansma' },
      telecom: [{ system: 'phone', value: '+31201234567', use: 'home' }]
    }
  ],
  communication: [
    {
      language: { coding: [{ system: 'urn:ietf:bcp:47', code: 'nl-NL', display: 'Dutch' }] },
      preferred: true
    }
  ],
  managingOrganization: { reference: 'Organization/f201', display: 'AUMC' },
  meta: {
    tag: [
      {
        system: 'http://terminology.hl7.org/CodeSystem/v3-ActReason',
        code: 'HTEST',
        display: 'test health data'
      }
    ]
  }
}


export const hapiFhirPatient =
  {
    resourceType: 'Patient',
    id: '1414',
    meta: {
      versionId: '2',
      lastUpdated: '2020-09-28T04:12:54.791+00:00',
      source: '#rhkcZluthvbxDoLf'
    },
    text: {
      status: 'generated',
      div: '<div xmlns="http://www.w3.org/1999/xhtml">name:徐<br/>ID:10501006884<br/>Gendar:female<br/>HospID:HHX<br/>Birthdate:1970-01-22</div>'
    },
    identifier: [
      {
        use: 'usual',
        type: {
          coding: [
            {
              system: 'http://terminology.hl7.org/CodeSystem/v2-0203',
              code: 'MR'
            }
          ]
        },
        system: 'urn:oid:1.2.36.146.595.217.0.1',
        value: '10501006884',
        period: {
          start: '2020-09-26'
        },
        assigner: {
          display: 'HHX'
        }
      }
    ],
    active: true,
    name: [
      {
        text: '徐',
        family: '徐'
      }
    ],
    gender: 'female',
    birthDate: '1970-01-22',
    managingOrganization: {
      display: 'HHX'
    }
  }

export const aidboxPatient = {
  resourceType: 'Patient',
  meta: {
    profile: [
      'http://standardhealthrecord.org/fhir/StructureDefinition/shr-entity-Patient'
    ]
  },
  gender: 'male',
  address: [
    {
      city: 'Brockton',
      line: [
        '730 Schoen Center Apt 8'
      ],
      state: 'Massachusetts',
      country: 'US',
      extension: [
        {
          url: 'http://hl7.org/fhir/StructureDefinition/geolocation',
          extension: [
            {
              url: 'latitude',
              valueDecimal: -71.024638
            },
            {
              url: 'longitude',
              valueDecimal: 42.082543
            }
          ]
        }
      ],
      postalCode: '02301'
    }
  ],
  telecom: [
    {
      use: 'home',
      value: '555-696-1511',
      system: 'phone'
    }
  ],
  id: 'd3af67c9-0c02-45f2-bc91-fea45af3ee83',
  name: [
    {
      prefix: [
        'Mr.'
      ],
      use: 'official',
      given: [
        'Abram53'
      ],
      family: 'Hickle134'
    }
  ],
  identifier: [
    {
      value: '803f5907-5427-4930-a093-1a95190de7fd',
      system: 'https://github.com/synthetichealth/synthea'
    },
    {
      value: '803f5907-5427-4930-a093-1a95190de7fd',
      system: 'http://hospital.smarthealthit.org',
      type: {
        text: 'Medical Record Number',
        coding: [
          {
            code: 'MR',
            system: 'http://hl7.org/fhir/v2/0203',
            display: 'Medical Record Number'
          }
        ]
      }
    },
    {
      type: {
        text: 'Social Security Number',
        coding: [
          {
            code: 'SB',
            system: 'http://hl7.org/fhir/identifier-type',
            display: 'Social Security Number'
          }
        ]
      },
      value: '999-81-4006',
      system: 'http://hl7.org/fhir/sid/us-ssn'
    },
    {
      value: 'S99988684',
      system: 'urn:oid:2.16.840.1.113883.4.3.25',
      type: {
        text: 'Driver\'s License',
        coding: [
          {
            display: 'Driver\'s License',
            code: 'DL',
            system: 'http://hl7.org/fhir/v2/0203'
          }
        ]
      }
    },
    {
      type: {
        text: 'Passport Number',
        coding: [
          {
            code: 'PPN',
            system: 'http://hl7.org/fhir/v2/0203',
            display: 'Passport Number'
          }
        ]
      },
      value: 'X17148555X',
      system: 'http://standardhealthrecord.org/fhir/StructureDefinition/passportNumber'
    }
  ],
  maritalStatus: {
    text: 'S',
    coding: [
      {
        code: 'S',
        system: 'http://hl7.org/fhir/v3/MaritalStatus',
        display: 'S'
      }
    ]
  },
  text: {
    div: '<div xmlns="http://www.w3.org/1999/xhtml">Generated by <a href="https://github.com/synthetichealth/synthea">Synthea</a>.Version identifier: v2.0.0-33-g3ab9839e\n .   Person seed: -7948439064728439692  Population seed: 1534165146158</div>',
    status: 'generated'
  },
  birthDate: '1955-06-27',
  multipleBirth: {
    boolean: false
  },
  extension: [
    {
      url: 'http://hl7.org/fhir/us/core/StructureDefinition/us-core-race',
      extension: [
        {
          url: 'ombCategory',
          valueCoding: {
            code: '2106-3',
            system: 'urn:oid:2.16.840.1.113883.6.238',
            display: 'White'
          }
        },
        {
          url: 'text',
          valueString: 'White'
        }
      ]
    },
    {
      url: 'http://hl7.org/fhir/us/core/StructureDefinition/us-core-ethnicity',
      extension: [
        {
          url: 'ombCategory',
          valueCoding: {
            code: '2186-5',
            system: 'urn:oid:2.16.840.1.113883.6.238',
            display: 'Not Hispanic or Latino'
          }
        },
        {
          url: 'text',
          valueString: 'Not Hispanic or Latino'
        }
      ]
    },
    {
      url: 'http://hl7.org/fhir/StructureDefinition/patient-mothersMaidenName',
      valueString: 'Sharolyn456 Harris789'
    },
    {
      url: 'http://hl7.org/fhir/us/core/StructureDefinition/us-core-birthsex',
      valueCode: 'M'
    },
    {
      url: 'http://hl7.org/fhir/StructureDefinition/birthPlace',
      valueAddress: {
        city: 'Boston',
        state: 'Massachusetts',
        country: 'US'
      }
    },
    {
      url: 'http://standardhealthrecord.org/fhir/StructureDefinition/shr-actor-FictionalPerson-extension',
      valueBoolean: true
    },
    {
      url: 'http://standardhealthrecord.org/fhir/StructureDefinition/shr-entity-FathersName-extension',
      valueHumanName: {
        text: 'Samual455 Hickle134'
      }
    },
    {
      url: 'http://standardhealthrecord.org/fhir/StructureDefinition/shr-demographics-SocialSecurityNumber-extension',
      valueString: '999-81-4006'
    },
    {
      valueReference: {
        reference: 'Basic/bad528f4-fa8a-4f5b-a478-1b630be88847'
      },
      url: 'http://standardhealthrecord.org/fhir/StructureDefinition/shr-entity-Person-extension'
    },
    {
      url: 'http://synthetichealth.github.io/synthea/disability-adjusted-life-years',
      valueDecimal: 0
    },
    {
      valueDecimal: 62,
      url: 'http://synthetichealth.github.io/synthea/quality-adjusted-life-years'
    }
  ],
  communication: [
    {
      language: {
        text: 'English',
        coding: [
          {
            code: 'en-US',
            system: 'urn:ietf:bcp:47',
            display: 'English'
          }
        ]
      }
    }
  ]
}

export const synthiaPatient = {
  resourceType: 'Patient',
  id: '230',
  meta: {
    versionId: '1',
    lastUpdated: '2024-11-13T21:54:40.340+00:00',
    source: '#G6HXMgWDzzplqVzu',
    profile: ['http://hl7.org/fhir/us/core/StructureDefinition/us-core-patient']
  },
  text: {
    status: 'generated',
    div: '<div xmlns="http://www.w3.org/1999/xhtml">Generated by <a href="https://github.com/synthetichealth/synthea">Synthea</a>.Version identifier: 2cc0a62\n .   Person seed: 8408368319748256253  Population seed: 1731533659674</div>'
  },
  extension: [
    {
      url: 'http://hl7.org/fhir/us/core/StructureDefinition/us-core-race',
      extension: [
        {
          url: 'ombCategory',
          valueCoding: {
            system: 'urn:oid:2.16.840.1.113883.6.238',
            code: '1002-5',
            display: 'American Indian or Alaska Native'
          }
        },
        {
          url: 'text',
          valueString: 'American Indian or Alaska Native'
        }
      ]
    },
    {
      url: 'http://hl7.org/fhir/us/core/StructureDefinition/us-core-ethnicity',
      extension: [
        {
          url: 'ombCategory',
          valueCoding: {
            system: 'urn:oid:2.16.840.1.113883.6.238',
            code: '2186-5',
            display: 'Not Hispanic or Latino'
          }
        },
        {
          url: 'text',
          valueString: 'Not Hispanic or Latino'
        }
      ]
    },
    {
      url: 'http://hl7.org/fhir/StructureDefinition/patient-mothersMaidenName',
      valueString: 'Jonell764 Gerlach374'
    },
    {
      url: 'http://hl7.org/fhir/us/core/StructureDefinition/us-core-birthsex',
      valueCode: 'M'
    },
    {
      url: 'http://hl7.org/fhir/StructureDefinition/patient-birthPlace',
      valueAddress: {
        city: 'Plymouth',
        state: 'Massachusetts',
        country: 'US'
      }
    },
    {
      url: 'http://synthetichealth.github.io/synthea/disability-adjusted-life-years',
      valueDecimal: 21.90583818492967
    },
    {
      url: 'http://synthetichealth.github.io/synthea/quality-adjusted-life-years',
      valueDecimal: 60.09416181507033
    }
  ],
  identifier: [
    {
      system: 'https://github.com/synthetichealth/synthea',
      value: '47186a2c-8223-81e3-52dd-04fca1734b88'
    },
    {
      type: {
        coding: [
          {
            system: 'http://terminology.hl7.org/CodeSystem/v2-0203',
            code: 'MR',
            display: 'Medical Record Number'
          }
        ],
        text: 'Medical Record Number'
      },
      system: 'http://hospital.smarthealthit.org',
      value: '47186a2c-8223-81e3-52dd-04fca1734b88'
    },
    {
      type: {
        coding: [
          {
            system: 'http://terminology.hl7.org/CodeSystem/v2-0203',
            code: 'SS',
            display: 'Social Security Number'
          }
        ],
        text: 'Social Security Number'
      },
      system: 'http://hl7.org/fhir/sid/us-ssn',
      value: '999-15-8247'
    },
    {
      type: {
        coding: [
          {
            system: 'http://terminology.hl7.org/CodeSystem/v2-0203',
            code: 'DL',
            display: 'Driver\'s license number'
          }
        ],
        text: 'Driver\'s license number'
      },
      system: 'urn:oid:2.16.840.1.113883.4.3.25',
      value: 'S99953724'
    },
    {
      type: {
        coding: [
          {
            system: 'http://terminology.hl7.org/CodeSystem/v2-0203',
            code: 'PPN',
            display: 'Passport Number'
          }
        ],
        text: 'Passport Number'
      },
      system: 'http://hl7.org/fhir/sid/passport-USA',
      value: 'X70727171X'
    }
  ],
  name: [
    {
      use: 'official',
      family: 'Okuneva707',
      given: ['Aaron697', 'Mark765'],
      prefix: ['Mr.']
    }
  ],
  telecom: [
    {
      system: 'phone',
      value: '555-369-3393',
      use: 'home'
    }
  ],
  gender: 'male',
  birthDate: '1941-06-11',
  address: [
    {
      extension: [
        {
          url: 'http://hl7.org/fhir/StructureDefinition/geolocation',
          extension: [
            {
              url: 'latitude',
              valueDecimal: 41.79717134698846
            },
            {
              url: 'longitude',
              valueDecimal: -71.01421343474313
            }
          ]
        }
      ],
      line: ['734 Emmerich Extension Suite 9'],
      city: 'Freetown',
      state: 'MA',
      postalCode: '00000',
      country: 'US'
    }
  ],
  maritalStatus: {
    coding: [
      {
        system: 'http://terminology.hl7.org/CodeSystem/v3-MaritalStatus',
        code: 'M',
        display: 'Married'
      }
    ],
    text: 'Married'
  },
  multipleBirthBoolean: false,
  communication: [
    {
      language: {
        coding: [
          {
            system: 'urn:ietf:bcp:47',
            code: 'en-US',
            display: 'English (United States)'
          }
        ],
        text: 'English (United States)'
      }
    }
  ]
}
