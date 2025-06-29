export const data = {
  resourceType: 'Bundle',
  id: 'bundle-references',
  type: 'collection',
  entry: [
    {
      fullUrl: 'http://example.org/fhir/Patient/23',
      resource: {
        resourceType: 'Patient',
        id: '23',
        text: {
          status: 'generated',
          div: '<div xmlns="http://www.w3.org/1999/xhtml"><p style="border: 1px #661aff solid; background-color: #e6e6ff; padding: 10px;"><b>Anonymous Patient</b> (no stated gender), DoB Unknown ( id:\u00a01234567)</p><hr/></div>'
        },
        identifier: [
          {
            system: 'http://example.org/ids',
            value: '1234567'
          }
        ]
      }
    },
    {
      fullUrl: 'urn:uuid:04121321-4af5-424c-a0e1-ed3aab1c349d',
      resource: {
        resourceType: 'Patient',
        id: 'temp',
        text: {
          status: 'generated',
          div: '<div xmlns="http://www.w3.org/1999/xhtml"><p style="border: 1px #661aff solid; background-color: #e6e6ff; padding: 10px;"><b>Anonymous Patient</b> (no stated gender), DoB Unknown</p><hr/></div>'
        }
      }
    },
    {
      fullUrl: 'http://example.org/fhir/Observation/123',
      resource: {
        resourceType: 'Observation',
        id: '123',
        text: {
          status: 'generated',
          div: '<div xmlns="http://www.w3.org/1999/xhtml"><p><b>Generated Narrative: Observation</b><a name="123"> </a></p><div style="display: inline-block; background-color: #d9e0e7; padding: 6px; margin: 4px; border: 1px solid #8da1b4; border-radius: 5px; line-height: 60%"><p style="margin-bottom: 0px">Resource Observation &quot;123&quot; </p></div><p><b>status</b>: final</p><p><b>code</b>: Glucose [Moles/volume] in Blood <span style="background: LightGoldenRodYellow; margin: 4px; border: 1px solid khaki"> (<a href="https://loinc.org/">LOINC</a>#15074-8)</span></p><p><b>subject</b>: <a href="broken-link.html">Patient/23</a></p></div>'
        },
        status: 'final',
        code: {
          coding: [
            {
              system: 'http://loinc.org',
              code: '15074-8',
              display: 'Glucose [Moles/volume] in Blood'
            }
          ]
        },
        subject: {
          reference: 'Patient/23'
        }
      }
    },
    {
      fullUrl: 'http://example.org/fhir/Observation/124',
      resource: {
        resourceType: 'Observation',
        id: '124',
        text: {
          status: 'generated',
          div: '<div xmlns="http://www.w3.org/1999/xhtml"><p><b>Generated Narrative: Observation</b><a name="124"> </a></p><div style="display: inline-block; background-color: #d9e0e7; padding: 6px; margin: 4px; border: 1px solid #8da1b4; border-radius: 5px; line-height: 60%"><p style="margin-bottom: 0px">Resource Observation &quot;124&quot; </p></div><p><b>status</b>: final</p><p><b>code</b>: Glucose [Moles/volume] in Blood <span style="background: LightGoldenRodYellow; margin: 4px; border: 1px solid khaki"> (<a href="https://loinc.org/">LOINC</a>#15074-8)</span></p><p><b>subject</b>: <a href="broken-link.html">http://example.org/fhir/Patient/23</a></p></div>'
        },
        status: 'final',
        code: {
          coding: [
            {
              system: 'http://loinc.org',
              code: '15074-8',
              display: 'Glucose [Moles/volume] in Blood'
            }
          ]
        },
        subject: {
          reference: 'http://example.org/fhir/Patient/23'
        }
      }
    },
    {
      fullUrl: 'http://example.org/fhir/Observation/12',
      resource: {
        resourceType: 'Observation',
        id: '12',
        text: {
          status: 'generated',
          div: '<div xmlns="http://www.w3.org/1999/xhtml"><p><b>Generated Narrative: Observation</b><a name="12"> </a></p><div style="display: inline-block; background-color: #d9e0e7; padding: 6px; margin: 4px; border: 1px solid #8da1b4; border-radius: 5px; line-height: 60%"><p style="margin-bottom: 0px">Resource Observation &quot;12&quot; </p></div><p><b>status</b>: final</p><p><b>code</b>: Glucose [Moles/volume] in Blood <span style="background: LightGoldenRodYellow; margin: 4px; border: 1px solid khaki"> (<a href="https://loinc.org/">LOINC</a>#15074-8)</span></p><p><b>subject</b>: <a href="broken-link.html">urn:uuid:04121321-4af5-424c-a0e1-ed3aab1c349d</a></p></div>'
        },
        status: 'final',
        code: {
          coding: [
            {
              system: 'http://loinc.org',
              code: '15074-8',
              display: 'Glucose [Moles/volume] in Blood'
            }
          ]
        },
        subject: {
          reference: 'urn:uuid:04121321-4af5-424c-a0e1-ed3aab1c349d'
        }
      }
    },
    {
      fullUrl: 'http://example.org/fhir/Observation/14',
      resource: {
        resourceType: 'Observation',
        id: '14',
        text: {
          status: 'generated',
          div: '<div xmlns="http://www.w3.org/1999/xhtml"><p><b>Generated Narrative: Observation</b><a name="14"> </a></p><div style="display: inline-block; background-color: #d9e0e7; padding: 6px; margin: 4px; border: 1px solid #8da1b4; border-radius: 5px; line-height: 60%"><p style="margin-bottom: 0px">Resource Observation &quot;14&quot; </p></div><p><b>status</b>: final</p><p><b>code</b>: Glucose [Moles/volume] in Blood <span style="background: LightGoldenRodYellow; margin: 4px; border: 1px solid khaki"> (<a href="https://loinc.org/">LOINC</a>#15074-8)</span></p><p><b>subject</b>: <a href="broken-link.html">http://example.org/fhir-2/Patient/1</a></p></div>'
        },
        status: 'final',
        code: {
          coding: [
            {
              system: 'http://loinc.org',
              code: '15074-8',
              display: 'Glucose [Moles/volume] in Blood'
            }
          ]
        },
        subject: {
          reference: 'http://example.org/fhir-2/Patient/1'
        }
      }
    },
    {
      fullUrl: 'http://example.org/fhir-2/Observation/14',
      resource: {
        resourceType: 'Observation',
        id: '14',
        text: {
          status: 'generated',
          div: '<div xmlns="http://www.w3.org/1999/xhtml"><p><b>Generated Narrative: Observation</b><a name="14"> </a></p><div style="display: inline-block; background-color: #d9e0e7; padding: 6px; margin: 4px; border: 1px solid #8da1b4; border-radius: 5px; line-height: 60%"><p style="margin-bottom: 0px">Resource Observation &quot;14&quot; </p></div><p><b>status</b>: final</p><p><b>code</b>: Glucose [Moles/volume] in Blood <span style="background: LightGoldenRodYellow; margin: 4px; border: 1px solid khaki"> (<a href="https://loinc.org/">LOINC</a>#15074-8)</span></p><p><b>subject</b>: <a href="broken-link.html">Patient/23</a></p></div>'
        },
        status: 'final',
        code: {
          coding: [
            {
              system: 'http://loinc.org',
              code: '15074-8',
              display: 'Glucose [Moles/volume] in Blood'
            }
          ]
        },
        subject: {
          reference: 'Patient/23'
        }
      }
    },
    {
      fullUrl: 'http://example.org/fhir/Patient/45',
      resource: {
        resourceType: 'Patient',
        id: '45',
        meta: {
          versionId: '1'
        },
        text: {
          status: 'generated',
          div: '<div xmlns="http://www.w3.org/1999/xhtml"><p style="border: 1px #661aff solid; background-color: #e6e6ff; padding: 10px;"><b>Name 1</b> (no stated gender), DoB Unknown</p><hr/></div>'
        },
        name: [
          {
            text: 'Name 1'
          }
        ]
      }
    },
    {
      fullUrl: 'http://example.org/fhir/Patient/45',
      resource: {
        resourceType: 'Patient',
        id: '45',
        meta: {
          versionId: '2'
        },
        text: {
          status: 'generated',
          div: '<div xmlns="http://www.w3.org/1999/xhtml"><p style="border: 1px #661aff solid; background-color: #e6e6ff; padding: 10px;"><b>Name 2</b> (no stated gender), DoB Unknown</p><hr/></div>'
        },
        name: [
          {
            text: 'Name 2'
          }
        ]
      }
    },
    {
      fullUrl: 'http://example.org/fhir/Observation/47',
      resource: {
        resourceType: 'Observation',
        id: '47',
        text: {
          status: 'generated',
          div: '<div xmlns="http://www.w3.org/1999/xhtml"><p><b>Generated Narrative: Observation</b><a name="47"> </a></p><div style="display: inline-block; background-color: #d9e0e7; padding: 6px; margin: 4px; border: 1px solid #8da1b4; border-radius: 5px; line-height: 60%"><p style="margin-bottom: 0px">Resource Observation &quot;47&quot; </p></div><p><b>status</b>: final</p><p><b>code</b>: Glucose [Moles/volume] in Blood <span style="background: LightGoldenRodYellow; margin: 4px; border: 1px solid khaki"> (<a href="https://loinc.org/">LOINC</a>#15074-8)</span></p><p><b>subject</b>: <a href="broken-link.html">Patient/45/_history/2</a></p></div>'
        },
        status: 'final',
        code: {
          coding: [
            {
              system: 'http://loinc.org',
              code: '15074-8',
              display: 'Glucose [Moles/volume] in Blood'
            }
          ]
        },
        subject: {
          reference: 'Patient/45/_history/2'
        }
      }
    },
    {
      fullUrl: 'http://example.org/fhir/Observation/48',
      resource: {
        resourceType: 'Observation',
        id: '48',
        text: {
          status: 'generated',
          div: '<div xmlns="http://www.w3.org/1999/xhtml"><p><b>Generated Narrative: Observation</b><a name="48"> </a></p><div style="display: inline-block; background-color: #d9e0e7; padding: 6px; margin: 4px; border: 1px solid #8da1b4; border-radius: 5px; line-height: 60%"><p style="margin-bottom: 0px">Resource Observation &quot;48&quot; </p></div><p><b>status</b>: final</p><p><b>code</b>: Glucose [Moles/volume] in Blood <span style="background: LightGoldenRodYellow; margin: 4px; border: 1px solid khaki"> (<a href="https://loinc.org/">LOINC</a>#15074-8)</span></p><p><b>subject</b>: <span/></p></div>'
        },
        status: 'final',
        code: {
          coding: [
            {
              system: 'http://loinc.org',
              code: '15074-8',
              display: 'Glucose [Moles/volume] in Blood'
            }
          ]
        },
        subject: {
          identifier: {
            system: 'http://example.org/ids',
            value: '1234567'
          }
        }
      }
    }
  ]
}

export const data2 = {
  resourceType: 'Bundle',
  id: 'bundle-response-simplesummary',
  type: 'batch-response',
  entry: [
    {
      resource: {
        resourceType: 'Patient',
        id: 'example',
        meta: {
          versionId: '1',
          lastUpdated: '2018-11-12T03:35:20.715Z'
        },
        text: {
          status: 'generated',
          div: '<div xmlns="http://www.w3.org/1999/xhtml">\n                        <table>\n                            <tbody>\n                                <tr>\n                                    <td>Name</td>\n                                    <td>Peter James \n                                        <b>Chalmers</b> (&quot;Jim&quot;)\n                                    </td>\n                                </tr>\n                                <tr>\n                                    <td>Address</td>\n                                    <td>534 Erewhon, Pleasantville, Vic, 3999</td>\n                                </tr>\n                                <tr>\n                                    <td>Contacts</td>\n                                    <td>Home: unknown. Work: (03) 5555 6473</td>\n                                </tr>\n                                <tr>\n                                    <td>Id</td>\n                                    <td>MRN: 12345 (Acme Healthcare)</td>\n                                </tr>\n                            </tbody>\n                        </table>\n                    </div>'
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
            value: '12345',
            period: {
              start: '2001-05-06'
            },
            assigner: {
              display: 'Acme Healthcare'
            }
          }
        ],
        active: true,
        name: [
          {
            use: 'official',
            family: 'Chalmers',
            given: [
              'Peter',
              'James'
            ]
          },
          {
            use: 'usual',
            given: ['Jim']
          },
          {
            use: 'maiden',
            family: 'Windsor',
            given: [
              'Peter',
              'James'
            ],
            period: {
              end: '2002'
            }
          }
        ],
        telecom: [
          {
            use: 'home'
          },
          {
            system: 'phone',
            value: '(03) 5555 6473',
            use: 'work',
            rank: 1
          },
          {
            system: 'phone',
            value: '(03) 3410 5613',
            use: 'mobile',
            rank: 2
          },
          {
            system: 'phone',
            value: '(03) 5555 8834',
            use: 'old',
            period: {
              end: '2014'
            }
          }
        ],
        gender: 'male',
        birthDate: '1974-12-25',
        _birthDate: {
          extension: [
            {
              url: 'http://hl7.org/fhir/StructureDefinition/patient-birthTime',
              valueDateTime: '1974-12-25T14:35:45-05:00'
            }
          ]
        },
        deceasedBoolean: false,
        address: [
          {
            use: 'home',
            type: 'both',
            text: '534 Erewhon St PeasantVille, Rainbow, Vic  3999',
            line: ['534 Erewhon St'],
            city: 'PleasantVille',
            district: 'Rainbow',
            state: 'Vic',
            postalCode: '3999',
            period: {
              start: '1974-12-25'
            }
          }
        ],
        contact: [
          {
            relationship: [
              {
                coding: [
                  {
                    system: 'http://terminology.hl7.org/CodeSystem/v2-0131',
                    code: 'N'
                  }
                ]
              }
            ],
            name: {
              family: 'du Marché',
              _family: {
                extension: [
                  {
                    url: 'http://hl7.org/fhir/StructureDefinition/humanname-own-prefix',
                    valueString: 'VV'
                  }
                ]
              },
              given: ['Bénédicte']
            },
            telecom: [
              {
                system: 'phone',
                value: '+33 (237) 998327'
              }
            ],
            address: {
              use: 'home',
              type: 'both',
              line: ['534 Erewhon St'],
              city: 'PleasantVille',
              district: 'Rainbow',
              state: 'Vic',
              postalCode: '3999',
              period: {
                start: '1974-12-25'
              }
            },
            gender: 'female',
            period: {
              start: '2012'
            }
          }
        ],
        managingOrganization: {
          reference: 'Organization/1'
        }
      },
      response: {
        status: '200',
        etag: 'W/1',
        lastModified: '2018-11-12T03:35:20.717Z'
      }
    },
    {
      resource: {
        resourceType: 'Bundle',
        id: '2c2fb771-6c4b-4df8-89b2-47a1178e7c',
        meta: {
          lastUpdated: '2018-11-12T05:42:49.445Z'
        },
        type: 'searchset',
        total: 4,
        link: [
          {
            relation: 'self',
            url: 'http://test.fhir.org/r5/Condition?_format=application/fhir+xml&search-id=36aac5c3-a9f6-4c3a-bf94-24d32ed604&&patient=example&_sort=_id'
          }
        ],
        entry: [
          {
            fullUrl: 'http://test.fhir.org/r5/Condition/example',
            resource: {
              resourceType: 'Condition',
              id: 'example',
              meta: {
                versionId: '1',
                lastUpdated: '2018-11-12T03:34:46.552Z'
              },
              text: {
                status: 'generated',
                div: '<div xmlns="http://www.w3.org/1999/xhtml">Severe burn of left ear (Date: 24-May 2012)</div>'
              },
              clinicalStatus: {
                coding: [
                  {
                    system: 'http://terminology.hl7.org/CodeSystem/condition-clinical',
                    code: 'active'
                  }
                ]
              },
              verificationStatus: {
                coding: [
                  {
                    system: 'http://terminology.hl7.org/CodeSystem/condition-ver-status',
                    code: 'confirmed'
                  }
                ]
              },
              category: [
                {
                  coding: [
                    {
                      system: 'http://terminology.hl7.org/CodeSystem/condition-category',
                      code: 'encounter-diagnosis',
                      display: 'Encounter Diagnosis'
                    },
                    {
                      system: 'http://snomed.info/sct',
                      code: '439401001',
                      display: 'Diagnosis'
                    }
                  ]
                }
              ],
              severity: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '24484000',
                    display: 'Severe'
                  }
                ]
              },
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '39065001',
                    display: 'Burn of ear'
                  }
                ],
                text: 'Burnt Ear'
              },
              bodySite: [
                {
                  coding: [
                    {
                      system: 'http://snomed.info/sct',
                      code: '49521004',
                      display: 'Left external ear structure'
                    }
                  ],
                  text: 'Left Ear'
                }
              ],
              subject: {
                reference: 'Patient/example'
              },
              onsetDateTime: '2012-05-24'
            },
            search: {
              mode: 'match'
            }
          },
          {
            fullUrl: 'http://test.fhir.org/r5/Condition/example2',
            resource: {
              resourceType: 'Condition',
              id: 'example2',
              meta: {
                versionId: '1',
                lastUpdated: '2018-11-12T03:34:46.626Z'
              },
              text: {
                status: 'generated',
                div: '<div xmlns="http://www.w3.org/1999/xhtml">Mild Asthma (Date: 12-Nov 2012)</div>'
              },
              clinicalStatus: {
                coding: [
                  {
                    system: 'http://terminology.hl7.org/CodeSystem/condition-clinical',
                    code: 'active'
                  }
                ]
              },
              verificationStatus: {
                coding: [
                  {
                    system: 'http://terminology.hl7.org/CodeSystem/condition-ver-status',
                    code: 'confirmed'
                  }
                ]
              },
              category: [
                {
                  coding: [
                    {
                      system: 'http://terminology.hl7.org/CodeSystem/condition-category',
                      code: 'problem-list-item',
                      display: 'Problem List Item'
                    }
                  ]
                }
              ],
              severity: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '255604002',
                    display: 'Mild'
                  }
                ]
              },
              code: {
                text: 'Asthma'
              },
              subject: {
                reference: 'Patient/example'
              },
              onsetString: 'approximately November 2012'
            },
            search: {
              mode: 'match'
            }
          },
          {
            fullUrl: 'http://test.fhir.org/r5/Condition/family-history',
            resource: {
              resourceType: 'Condition',
              id: 'family-history',
              meta: {
                versionId: '1',
                lastUpdated: '2018-11-12T03:34:47.274Z'
              },
              text: {
                status: 'generated',
                div: '<div xmlns="http://www.w3.org/1999/xhtml">Family history of cancer of colon</div>'
              },
              clinicalStatus: {
                coding: [
                  {
                    system: 'http://terminology.hl7.org/CodeSystem/condition-clinical',
                    code: 'active'
                  }
                ]
              },
              category: [
                {
                  coding: [
                    {
                      system: 'http://terminology.hl7.org/CodeSystem/condition-category',
                      code: 'problem-list-item',
                      display: 'Problem List Item'
                    }
                  ]
                }
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '312824007',
                    display: 'Family history of cancer of colon'
                  }
                ]
              },
              subject: {
                reference: 'Patient/example'
              }
            },
            search: {
              mode: 'match'
            }
          },
          {
            fullUrl: 'http://test.fhir.org/r5/Condition/stroke',
            resource: {
              resourceType: 'Condition',
              id: 'stroke',
              meta: {
                versionId: '1',
                lastUpdated: '2018-11-12T03:34:47.337Z'
              },
              text: {
                status: 'generated',
                div: '<div xmlns="http://www.w3.org/1999/xhtml">Ischemic stroke, July 18, 2010</div>'
              },
              clinicalStatus: {
                coding: [
                  {
                    system: 'http://terminology.hl7.org/CodeSystem/condition-clinical',
                    code: 'active'
                  }
                ]
              },
              verificationStatus: {
                coding: [
                  {
                    system: 'http://terminology.hl7.org/CodeSystem/condition-ver-status',
                    code: 'confirmed'
                  }
                ]
              },
              category: [
                {
                  coding: [
                    {
                      system: 'http://terminology.hl7.org/CodeSystem/condition-category',
                      code: 'encounter-diagnosis',
                      display: 'Encounter Diagnosis'
                    }
                  ]
                }
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '422504002',
                    display: 'Ischemic stroke (disorder)'
                  }
                ],
                text: 'Stroke'
              },
              subject: {
                reference: 'Patient/example'
              },
              onsetDateTime: '2010-07-18'
            },
            search: {
              mode: 'match'
            }
          }
        ]
      },
      response: {
        status: '200',
        etag: 'W/1',
        lastModified: '2018-11-12T03:35:20.717Z'
      }
    },
    {
      resource: {
        resourceType: 'Bundle',
        id: '86846953-60dd-47ba-b37a-7e7d7e3312',
        meta: {
          lastUpdated: '2018-11-12T05:42:49.476Z'
        },
        type: 'searchset',
        total: 0,
        link: [
          {
            relation: 'self',
            url: 'http://test.fhir.org/r5/MedicationStatement?_format=application/fhir+xml&search-id=0f08b401-5120-4444-9a83-3fd21d33df&&patient=example&_sort=_id'
          }
        ]
      },
      response: {
        status: '200',
        etag: 'W/1',
        lastModified: '2018-11-12T03:35:20.717Z'
      }
    },
    {
      resource: {
        resourceType: 'Bundle',
        id: '4bafe9c4-ba53-4d7b-89d0-d92ee0859a',
        meta: {
          lastUpdated: '2018-11-12T05:42:49.498Z'
        },
        type: 'searchset',
        total: 0,
        link: [
          {
            relation: 'self',
            url: 'http://test.fhir.org/r5/Observation?_format=application/fhir+xml&search-id=50df0414-1375-48a4-ba1e-66f580360a&&patient=example&code=http%3A//loinc.org%7C55284%2D4&date=ge2015%2D01%2D01&_sort=_id'
          }
        ]
      },
      response: {
        status: '200',
        etag: 'W/1',
        lastModified: '2018-11-12T03:35:20.717Z'
      }
    }
  ]
}

export const data3 = {
  resourceType: 'Bundle',
  id: 'bundle-response-medsallergies',
  type: 'batch-response',
  entry: [
    {
      resource: {
        resourceType: 'Patient',
        id: 'example',
        meta: {
          versionId: '1',
          lastUpdated: '2018-11-12T03:35:20.715Z'
        },
        text: {
          status: 'generated',
          div: '<div xmlns="http://www.w3.org/1999/xhtml">\n                        <table>\n                            <tbody>\n                                <tr>\n                                    <td>Name</td>\n                                    <td>Peter James \n                                        <b>Chalmers</b> (&quot;Jim&quot;)\n                                    </td>\n                                </tr>\n                                <tr>\n                                    <td>Address</td>\n                                    <td>534 Erewhon, Pleasantville, Vic, 3999</td>\n                                </tr>\n                                <tr>\n                                    <td>Contacts</td>\n                                    <td>Home: unknown. Work: (03) 5555 6473</td>\n                                </tr>\n                                <tr>\n                                    <td>Id</td>\n                                    <td>MRN: 12345 (Acme Healthcare)</td>\n                                </tr>\n                            </tbody>\n                        </table>\n                    </div>'
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
            value: '12345',
            period: {
              start: '2001-05-06'
            },
            assigner: {
              display: 'Acme Healthcare'
            }
          }
        ],
        active: true,
        name: [
          {
            use: 'official',
            family: 'Chalmers',
            given: [
              'Peter',
              'James'
            ]
          },
          {
            use: 'usual',
            given: ['Jim']
          },
          {
            use: 'maiden',
            family: 'Windsor',
            given: [
              'Peter',
              'James'
            ],
            period: {
              end: '2002'
            }
          }
        ],
        telecom: [
          {
            use: 'home'
          },
          {
            system: 'phone',
            value: '(03) 5555 6473',
            use: 'work',
            rank: 1
          },
          {
            system: 'phone',
            value: '(03) 3410 5613',
            use: 'mobile',
            rank: 2
          },
          {
            system: 'phone',
            value: '(03) 5555 8834',
            use: 'old',
            period: {
              end: '2014'
            }
          }
        ],
        gender: 'male',
        birthDate: '1974-12-25',
        _birthDate: {
          extension: [
            {
              url: 'http://hl7.org/fhir/StructureDefinition/patient-birthTime',
              valueDateTime: '1974-12-25T14:35:45-05:00'
            }
          ]
        },
        deceasedBoolean: false,
        address: [
          {
            use: 'home',
            type: 'both',
            text: '534 Erewhon St PeasantVille, Rainbow, Vic  3999',
            line: ['534 Erewhon St'],
            city: 'PleasantVille',
            district: 'Rainbow',
            state: 'Vic',
            postalCode: '3999',
            period: {
              start: '1974-12-25'
            }
          }
        ],
        contact: [
          {
            relationship: [
              {
                coding: [
                  {
                    system: 'http://terminology.hl7.org/CodeSystem/v2-0131',
                    code: 'N'
                  }
                ]
              }
            ],
            name: {
              family: 'du Marché',
              _family: {
                extension: [
                  {
                    url: 'http://hl7.org/fhir/StructureDefinition/humanname-own-prefix',
                    valueString: 'VV'
                  }
                ]
              },
              given: ['Bénédicte']
            },
            telecom: [
              {
                system: 'phone',
                value: '+33 (237) 998327'
              }
            ],
            address: {
              use: 'home',
              type: 'both',
              line: ['534 Erewhon St'],
              city: 'PleasantVille',
              district: 'Rainbow',
              state: 'Vic',
              postalCode: '3999',
              period: {
                start: '1974-12-25'
              }
            },
            gender: 'female',
            period: {
              start: '2012'
            }
          }
        ],
        managingOrganization: {
          reference: 'Organization/1'
        }
      },
      response: {
        status: '200',
        etag: 'W/1',
        lastModified: '2018-11-12T03:35:20.717Z'
      }
    },
    {
      resource: {
        resourceType: 'Bundle',
        id: '5bdf95d0-24a6-4024-95f5-d546fb479b',
        meta: {
          lastUpdated: '2018-11-12T05:42:16.086Z'
        },
        type: 'searchset',
        total: 0,
        link: [
          {
            relation: 'self',
            url: 'http://test.fhir.org/r5/MedicationStatement?_format=application/fhir+xml&search-id=804eee4a-0a54-4414-9c07-169952f929&&patient=example&_list=%24current%2Dmedications&_sort=_id'
          }
        ]
      },
      response: {
        status: '200',
        etag: 'W/1',
        lastModified: '2018-11-12T03:35:20.717Z'
      }
    },
    {
      resource: {
        resourceType: 'Bundle',
        id: '0c11a91c-3638-4d58-8cf1-40e60f43c6',
        meta: {
          lastUpdated: '2018-11-12T05:42:16.209Z'
        },
        type: 'searchset',
        total: 0,
        link: [
          {
            relation: 'self',
            url: 'http://test.fhir.org/r5/AllergyIntolerance?_format=application/fhir+xml&search-id=b1981f8a-4139-4db6-923d-77d764c990&&patient=example&_list=%24current%2Dallergies&_sort=_id'
          }
        ]
      },
      response: {
        status: '200',
        etag: 'W/1',
        lastModified: '2018-11-12T03:35:20.717Z'
      }
    },
    {
      resource: {
        resourceType: 'Bundle',
        id: '19f0fa29-f8fe-4b07-b035-f488893f06',
        meta: {
          lastUpdated: '2018-11-12T05:42:16.279Z'
        },
        type: 'searchset',
        total: 0,
        link: [
          {
            relation: 'self',
            url: 'http://test.fhir.org/r5/Condition?_format=application/fhir+xml&search-id=4d097c43-54aa-4157-b500-be22208dd0&&patient=example&_list=%24current%2Dproblems&_sort=_id'
          }
        ]
      },
      response: {
        status: '200',
        etag: 'W/1',
        lastModified: '2018-11-12T03:35:20.717Z'
      }
    },
    {
      resource: {
        resourceType: 'Bundle',
        id: 'dff8ab42-33f9-42ec-88c5-83d3f05323',
        meta: {
          lastUpdated: '2018-11-12T05:42:16.351Z'
        },
        type: 'searchset',
        total: 0,
        link: [
          {
            relation: 'self',
            url: 'http://test.fhir.org/r5/MedicationStatement?_format=application/fhir+xml&search-id=31d4af75-cdcf-4f85-9666-4bafadebb5&&patient=example&_sort=_id'
          }
        ]
      },
      response: {
        status: '200',
        etag: 'W/1',
        lastModified: '2018-11-12T03:35:20.717Z'
      }
    }
  ]
}

export const masterDetail = {
  resourceType: 'Bundle',
  id: 'b1e4aca6-8695-4f22-84e1-7b7ac22242e5',
  meta: {
    lastUpdated: '2025-02-21T17:08:35.396+00:00'
  },
  type: 'searchset',
  link: [
    {
      relation: 'self',
      url: 'https://hapi.fhir.org/baseR5/Patient/silth-practice-2/$everything'
    },
    {
      relation: 'next',
      url: 'https://hapi.fhir.org/baseR5?_getpages=b1e4aca6-8695-4f22-84e1-7b7ac22242e5&_getpagesoffset=20&_count=20&_pretty=true&_bundletype=searchset'

    }
  ],
  entry: [
    {
      fullUrl: 'https://hapi.fhir.org/baseR5/Patient/silth-practice-2',
      resource: {
        resourceType: 'Patient',
        id: 'silth-practice-2',
        meta: {
          versionId: '1',
          lastUpdated: '2023-07-02T19:34:36.982+00:00',
          source: '#NUpi2aO4BEPJGGQg'
        },
        text: {
          status: 'generated',
          div: '<div xmlns="http://www.w3.org/1999/xhtml"><div class="hapiHeaderText">Mr. Josh <b>JAIDEE </b></div><table class="hapiPropertyTable"><tbody><tr><td>Identifier</td><td>8-4027-26620-53-3</td></tr><tr><td>Date of birth</td><td><span>03 April 1967</span></td></tr></tbody></table></div>'

        },
        identifier: [
          {
            type: {
              coding: [
                {
                  system: 'http://terminology.hl7.org/CodeSystem/v2-0203',
                  code: 'NI'
                }
              ]
            },
            system: 'http://thailand.com/citizenid',
            value: '8-4027-26620-53-3'
          },
          {
            type: {
              coding: [
                {
                  system: 'http://terminology.hl7.org/CodeSystem/v2-0203',
                  code: 'MR'
                }
              ]
            },
            system: 'http://fhirhealthhospital.com/mrn',
            value: '64-52323'
          }
        ],
        active: true,
        name: [
          {
            family: 'Jaidee',
            given: [
              'Josh'
            ],
            prefix: [
              'Mr.'
            ]
          }
        ],
        gender: 'male',
        birthDate: '1967-04-03'
      },
      search: {
        mode: 'match'
      }
    },
    {
      fullUrl: 'https://hapi.fhir.org/baseR5/Condition/81973',
      resource: {
        resourceType: 'Condition',
        id: '81973',
        meta: {
          versionId: '2',
          lastUpdated: '2023-09-10T09:45:22.044+00:00',
          source: '#y1csxzmLCMKFr88n'
        },
        clinicalStatus: {
          coding: [
            {
              system: 'http://terminology.hl7.org/CodeSystem/condition-clinical',
              code: 'resolved'
            }
          ]
        },
        code: {
          coding: [
            {
              system: 'http://hl7.org/fhir/sid/icd-10',
              code: 'K35.8',
              display: 'Acute appendicitis, other and unspecified'
            }
          ],
          text: 'Acute appendicitis, other and unspecified'
        },
        subject: {
          reference: 'Patient/silth-practice-2'
        }
      },
      search: {
        mode: 'match'
      }
    },
    {
      fullUrl: 'https://hapi.fhir.org/baseR5/DiagnosticReport/81974',
      resource: {
        resourceType: 'DiagnosticReport',
        id: '81974',
        meta: {
          versionId: '1',
          lastUpdated: '2023-07-02T19:34:36.982+00:00',
          source: '#NUpi2aO4BEPJGGQg'
        },
        text: {
          status: 'generated',
          div: '<div xmlns="http://www.w3.org/1999/xhtml"><div class="hapiHeaderText"> Complete Blood Count </div><table class="hapiPropertyTable"><tbody><tr><td>Status</td><td>FINAL</td></tr></tbody></table><table class="hapiTableOfValues"><thead><tr><td>Name</td><td>Value</td><td>Interpretation</td><td>Reference Range</td><td>Status</td></tr></thead><tbody><tr class="hapiTableOfValuesRowOdd"><td> Haemoglobin </td><td>13.1 g/dL </td><td/><td> 12 g/dL - 16 g/dL </td><td>FINAL</td></tr><tr class="hapiTableOfValuesRowEven"><td> Hematocrit, Blood </td><td>40.1 % </td><td/><td> 36 % - 46 % </td><td>FINAL</td></tr><tr class="hapiTableOfValuesRowOdd"><td> White blood cell (WBC) count, Blood </td><td>12.7 10*3/uL </td><td/><td> 4.5 10*3/uL - 11 10*3/uL </td><td>FINAL</td></tr><tr class="hapiTableOfValuesRowEven"><td> Neutrophils per 100 white blood cells, Blood </td><td>70 % </td><td/><td> 54 % - 62 % </td><td>FINAL</td></tr></tbody></table></div>'

        },
        status: 'final',
        code: {
          coding: [
            {
              system: 'http://loinc.org',
              code: '57021-8',
              display: 'CBC W Auto Differential panel - Blood'
            }
          ],
          text: 'Complete Blood Count'
        },
        subject: {
          reference: 'Patient/silth-practice-2'
        },
        encounter: {
          reference: 'Encounter/81975'
        },
        result: [
          {
            reference: 'Observation/81977'
          },
          {
            reference: 'Observation/81978'
          },
          {
            reference: 'Observation/81979'
          },
          {
            reference: 'Observation/81980'
          }
        ]
      },
      search: {
        mode: 'match'
      }
    },
    {
      fullUrl: 'https://hapi.fhir.org/baseR5/Encounter/81975',
      resource: {
        resourceType: 'Encounter',
        id: '81975',
        meta: {
          versionId: '1',
          lastUpdated: '2023-07-02T19:34:36.982+00:00',
          source: '#NUpi2aO4BEPJGGQg'
        },
        identifier: [
          {
            system: 'http://fhirhealthhospital.com/vn',
            value: '123'
          }
        ],
        status: 'completed',
        'class': [
          {
            coding: [
              {
                system: 'http://terminology.hl7.org/CodeSystem/v3-ActCode',
                code: 'AMB',
                display: 'ambulatory'
              }
            ]
          }
        ],
        subject: {
          reference: 'Patient/silth-practice-2',
          display: 'Mr. Josh Jaidee'
        },
        serviceProvider: {
          reference: 'Organization/81981',
          display: 'FHIRHealth Hospital'
        },
        participant: [
          {
            actor: {
              reference: 'Practitioner/81982',
              display: 'Dr. Sumit Jingjai'
            }
          }
        ],
        actualPeriod: {
          start: '2023-04-01T09:00:00+07:00',
          end: '2023-04-01T12:00:00+07:00'
        },
        location: [
          {
            location: {
              display: 'OPD 1'
            }
          }
        ]
      },
      search: {
        mode: 'match'
      }
    },
    {
      fullUrl: 'https://hapi.fhir.org/baseR5/MedicationRequest/81976',
      resource: {
        resourceType: 'MedicationRequest',
        id: '81976',
        meta: {
          versionId: '1',
          lastUpdated: '2023-07-02T19:34:36.982+00:00',
          source: '#NUpi2aO4BEPJGGQg'
        },
        status: 'completed',
        intent: 'order',
        medication: {
          concept: {
            coding: [
              {
                system: 'http://tmt.this.or.th',
                code: '694553',
                display: 'ceftriaxone 2 g powder for solution for injection/infusion, 1 vial'
              }
            ]
          }
        },
        subject: {
          reference: 'Patient/silth-practice-2',
          display: 'Mr. Josh Jaidee'
        },
        encounter: {
          reference: 'Encounter/81975',
          display: 'VN 123'
        },
        authoredOn: '2023-04-01',
        requester: {
          reference: 'Practitioner/81982',
          display: 'Dr. Sumit Jingjai'
        },
        dosageInstruction: [
          {
            sequence: 1,
            text: '2 gm intravenous daily for 3 days',
            timing: {
              repeat: {
                boundsDuration: {
                  value: 3,
                  unit: 'd'
                },
                frequency: 1,
                period: 1,
                periodUnit: 'd'
              }
            },
            route: {
              coding: [
                {
                  system: 'http://snomed.info/sct',
                  code: '255560000',
                  display: 'Intravenous'
                }
              ]
            },
            doseAndRate: [
              {
                doseQuantity: {
                  value: 2,
                  unit: 'g',
                  system: 'http://unitsofmeasure.org',
                  code: 'g'
                }
              }
            ]
          }
        ]
      },
      search: {
        mode: 'match'
      }
    },
    {
      fullUrl: 'https://hapi.fhir.org/baseR5/Observation/81977',
      resource: {
        resourceType: 'Observation',
        id: '81977',
        meta: {
          versionId: '1',
          lastUpdated: '2023-07-02T19:34:36.982+00:00',
          source: '#NUpi2aO4BEPJGGQg'
        },
        status: 'final',
        code: {
          coding: [
            {
              system: 'http://loinc.org',
              code: '718-7',
              display: 'Hemoglobin [Mass/volume] in Blood'
            }
          ],
          text: 'Haemoglobin'
        },
        subject: {
          reference: 'Patient/silth-practice-2'
        },
        valueQuantity: {
          value: 13.1,
          unit: 'g/dL',
          system: 'http://unitsofmeasure.org',
          code: 'g/dL'
        },
        referenceRange: [
          {
            low: {
              value: 12,
              unit: 'g/dL',
              system: 'http://unitsofmeasure.org',
              code: 'g/dL'
            },
            high: {
              value: 16,
              unit: 'g/dL',
              system: 'http://unitsofmeasure.org',
              code: 'g/dL'
            }
          }
        ]
      },
      search: {
        mode: 'match'
      }
    },
    {
      fullUrl: 'https://hapi.fhir.org/baseR5/Observation/81978',
      resource: {
        resourceType: 'Observation',
        id: '81978',
        meta: {
          versionId: '1',
          lastUpdated: '2023-07-02T19:34:36.982+00:00',
          source: '#NUpi2aO4BEPJGGQg'
        },
        status: 'final',
        code: {
          coding: [
            {
              system: 'http://loinc.org',
              code: '4544-3',
              display: 'Hematocrit [Volume Fraction] of Blood by Automated count'
            }
          ],
          text: 'Hematocrit, Blood'
        },
        subject: {
          reference: 'Patient/silth-practice-2'
        },
        valueQuantity: {
          value: 40.1,
          unit: '%',
          system: 'http://unitsofmeasure.org',
          code: '%'
        },
        referenceRange: [
          {
            low: {
              value: 36,
              unit: '%',
              system: 'http://unitsofmeasure.org',
              code: '%'
            },
            high: {
              value: 46,
              unit: '%',
              system: 'http://unitsofmeasure.org',
              code: '%'
            }
          }
        ]
      },
      search: {
        mode: 'match'
      }
    },
    {
      fullUrl: 'https://hapi.fhir.org/baseR5/Observation/81979',
      resource: {
        resourceType: 'Observation',
        id: '81979',
        meta: {
          versionId: '1',
          lastUpdated: '2023-07-02T19:34:36.982+00:00',
          source: '#NUpi2aO4BEPJGGQg'
        },
        status: 'final',
        code: {
          coding: [
            {
              system: 'http://loinc.org',
              code: '6690-2',
              display: 'Leukocytes [#/volume] in Blood by Automated count'
            }
          ],
          text: 'White blood cell (WBC) count, Blood'
        },
        subject: {
          reference: 'Patient/silth-practice-2'
        },
        valueQuantity: {
          value: 12.7,
          unit: '10*3/uL',
          system: 'http://unitsofmeasure.org',
          code: '10*3/uL'
        },
        referenceRange: [
          {
            low: {
              value: 4.5,
              unit: '10*3/uL',
              system: 'http://unitsofmeasure.org',
              code: '10*3/uL'
            },
            high: {
              value: 11,
              unit: '10*3/uL',
              system: 'http://unitsofmeasure.org',
              code: '10*3/uL'
            }
          }
        ]
      },
      search: {
        mode: 'match'
      }
    },
    {
      fullUrl: 'https://hapi.fhir.org/baseR5/Observation/81980',
      resource: {
        resourceType: 'Observation',
        id: '81980',
        meta: {
          versionId: '1',
          lastUpdated: '2023-07-02T19:34:36.982+00:00',
          source: '#NUpi2aO4BEPJGGQg'
        },
        status: 'final',
        code: {
          coding: [
            {
              system: 'http://loinc.org',
              code: '770-8',
              display: 'Neutrophils/100 leukocytes in Blood by Automated count'
            }
          ],
          text: 'Neutrophils per 100 white blood cells, Blood'
        },
        subject: {
          reference: 'Patient/silth-practice-2'
        },
        valueQuantity: {
          value: 70,
          unit: '%',
          system: 'http://unitsofmeasure.org',
          code: '%'
        },
        referenceRange: [
          {
            low: {
              value: 54,
              unit: '%',
              system: 'http://unitsofmeasure.org',
              code: '%'
            },
            high: {
              value: 62,
              unit: '%',
              system: 'http://unitsofmeasure.org',
              code: 'g/L'
            }
          }
        ]
      },
      search: {
        mode: 'match'
      }
    },
    {
      fullUrl: 'https://hapi.fhir.org/baseR5/Procedure/81983',
      resource: {
        resourceType: 'Procedure',
        id: '81983',
        meta: {
          versionId: '1',
          lastUpdated: '2023-07-02T19:34:36.982+00:00',
          source: '#NUpi2aO4BEPJGGQg'
        },
        status: 'completed',
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '6025007',
              display: 'Laparoscopic appendectomy (procedure)'
            }
          ],
          text: 'Laparoscopic appendectomy'
        },
        subject: {
          reference: 'Patient/silth-practice-2'
        },
        outcome: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '385669000',
              display: 'Successful (qualifier value)'
            }
          ],
          text: 'Successful'
        }
      },
      search: {
        mode: 'match'
      }
    },
    {
      fullUrl: 'https://hapi.fhir.org/baseR5/Condition/81985',
      resource: {
        resourceType: 'Condition',
        id: '81985',
        meta: {
          versionId: '1',
          lastUpdated: '2023-07-02T19:34:42.256+00:00',
          source: '#v5vnpLpRn1XxmM9I'
        },
        clinicalStatus: {
          coding: [
            {
              system: 'http://terminology.hl7.org/CodeSystem/condition-clinical',
              code: 'resolved'
            }
          ]
        },
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '72048003',
              display: 'Acute appendicitis without peritonitis'
            },
            {
              system: 'http://hl7.org/fhir/sid/icd-10',
              code: 'K35.8',
              display: 'Acute appendicitis, other and unspecified'
            }
          ],
          text: 'Acute appendicitis without peritonitis'
        },
        subject: {
          reference: 'Patient/silth-practice-2'
        }
      },
      search: {
        mode: 'match'
      }
    },
    {
      fullUrl: 'https://hapi.fhir.org/baseR5/DiagnosticReport/81986',
      resource: {
        resourceType: 'DiagnosticReport',
        id: '81986',
        meta: {
          versionId: '1',
          lastUpdated: '2023-07-02T19:34:42.256+00:00',
          source: '#v5vnpLpRn1XxmM9I'
        },
        text: {
          status: 'generated',
          div: '<div xmlns="http://www.w3.org/1999/xhtml"><div class="hapiHeaderText"> Complete Blood Count </div><table class="hapiPropertyTable"><tbody><tr><td>Status</td><td>FINAL</td></tr></tbody></table><table class="hapiTableOfValues"><thead><tr><td>Name</td><td>Value</td><td>Interpretation</td><td>Reference Range</td><td>Status</td></tr></thead><tbody><tr class="hapiTableOfValuesRowOdd"><td> Haemoglobin </td><td>13.1 g/dL </td><td/><td> 12 g/dL - 16 g/dL </td><td>FINAL</td></tr><tr class="hapiTableOfValuesRowEven"><td> Hematocrit, Blood </td><td>40.1 % </td><td/><td> 36 % - 46 % </td><td>FINAL</td></tr><tr class="hapiTableOfValuesRowOdd"><td> White blood cell (WBC) count, Blood </td><td>12.7 10*3/uL </td><td/><td> 4.5 10*3/uL - 11 10*3/uL </td><td>FINAL</td></tr><tr class="hapiTableOfValuesRowEven"><td> Neutrophils per 100 white blood cells, Blood </td><td>70 % </td><td/><td> 54 % - 62 % </td><td>FINAL</td></tr></tbody></table></div>'

        },
        status: 'final',
        code: {
          coding: [
            {
              system: 'http://loinc.org',
              code: '57021-8',
              display: 'CBC W Auto Differential panel - Blood'
            }
          ],
          text: 'Complete Blood Count'
        },
        subject: {
          reference: 'Patient/silth-practice-2'
        },
        encounter: {
          reference: 'Encounter/81987'
        },
        result: [
          {
            reference: 'Observation/81989'
          },
          {
            reference: 'Observation/81990'
          },
          {
            reference: 'Observation/81991'
          },
          {
            reference: 'Observation/81992'
          }
        ]
      },
      search: {
        mode: 'match'
      }
    },
    {
      fullUrl: 'https://hapi.fhir.org/baseR5/Encounter/81987',
      resource: {
        resourceType: 'Encounter',
        id: '81987',
        meta: {
          versionId: '1',
          lastUpdated: '2023-07-02T19:34:42.256+00:00',
          source: '#v5vnpLpRn1XxmM9I'
        },
        identifier: [
          {
            system: 'http://fhirhealthhospital.com/vn',
            value: '123'
          }
        ],
        status: 'completed',
        'class': [
          {
            coding: [
              {
                system: 'http://terminology.hl7.org/CodeSystem/v3-ActCode',
                code: 'AMB',
                display: 'ambulatory'
              }
            ]
          }
        ],
        subject: {
          reference: 'Patient/silth-practice-2',
          display: 'Mr. Josh Jaidee'
        },
        serviceProvider: {
          reference: 'Organization/81993',
          display: 'FHIRHealth Hospital'
        },
        participant: [
          {
            actor: {
              reference: 'Practitioner/81994',
              display: 'Dr. Sumit Jingjai'
            }
          }
        ],
        actualPeriod: {
          start: '2023-04-01T09:00:00+07:00',
          end: '2023-04-01T12:00:00+07:00'
        },
        location: [
          {
            location: {
              display: 'OPD 1'
            }
          }
        ]
      },
      search: {
        mode: 'match'
      }
    },
    {
      fullUrl: 'https://hapi.fhir.org/baseR5/MedicationRequest/81988',
      resource: {
        resourceType: 'MedicationRequest',
        id: '81988',
        meta: {
          versionId: '1',
          lastUpdated: '2023-07-02T19:34:42.256+00:00',
          source: '#v5vnpLpRn1XxmM9I'
        },
        status: 'completed',
        intent: 'order',
        medication: {
          concept: {
            coding: [
              {
                system: 'http://tmt.this.or.th',
                code: '694553',
                display: 'ceftriaxone 2 g powder for solution for injection/infusion, 1 vial'
              }
            ]
          }
        },
        subject: {
          reference: 'Patient/silth-practice-2',
          display: 'Mr. Josh Jaidee'
        },
        encounter: {
          reference: 'Encounter/81987',
          display: 'VN 123'
        },
        authoredOn: '2023-04-01',
        requester: {
          reference: 'Practitioner/81994',
          display: 'Dr. Sumit Jingjai'
        },
        dosageInstruction: [
          {
            sequence: 1,
            text: '2 gm intravenous daily for 3 days',
            timing: {
              repeat: {
                boundsDuration: {
                  value: 3,
                  unit: 'd'
                },
                frequency: 1,
                period: 1,
                periodUnit: 'd'
              }
            },
            route: {
              coding: [
                {
                  system: 'http://snomed.info/sct',
                  code: '255560000',
                  display: 'Intravenous'
                }
              ]
            },
            doseAndRate: [
              {
                doseQuantity: {
                  value: 2,
                  unit: 'g',
                  system: 'http://unitsofmeasure.org',
                  code: 'g'
                }
              }
            ]
          }
        ]
      },
      search: {
        mode: 'match'
      }
    },
    {
      fullUrl: 'https://hapi.fhir.org/baseR5/Observation/81989',
      resource: {
        resourceType: 'Observation',
        id: '81989',
        meta: {
          versionId: '1',
          lastUpdated: '2023-07-02T19:34:42.256+00:00',
          source: '#v5vnpLpRn1XxmM9I'
        },
        status: 'final',
        code: {
          coding: [
            {
              system: 'http://loinc.org',
              code: '718-7',
              display: 'Hemoglobin [Mass/volume] in Blood'
            }
          ],
          text: 'Haemoglobin'
        },
        subject: {
          reference: 'Patient/silth-practice-2'
        },
        valueQuantity: {
          value: 13.1,
          unit: 'g/dL',
          system: 'http://unitsofmeasure.org',
          code: 'g/dL'
        },
        referenceRange: [
          {
            low: {
              value: 12,
              unit: 'g/dL',
              system: 'http://unitsofmeasure.org',
              code: 'g/dL'
            },
            high: {
              value: 16,
              unit: 'g/dL',
              system: 'http://unitsofmeasure.org',
              code: 'g/dL'
            }
          }
        ]
      },
      search: {
        mode: 'match'
      }
    },
    {
      fullUrl: 'https://hapi.fhir.org/baseR5/Observation/81990',
      resource: {
        resourceType: 'Observation',
        id: '81990',
        meta: {
          versionId: '1',
          lastUpdated: '2023-07-02T19:34:42.256+00:00',
          source: '#v5vnpLpRn1XxmM9I'
        },
        status: 'final',
        code: {
          coding: [
            {
              system: 'http://loinc.org',
              code: '4544-3',
              display: 'Hematocrit [Volume Fraction] of Blood by Automated count'
            }
          ],
          text: 'Hematocrit, Blood'
        },
        subject: {
          reference: 'Patient/silth-practice-2'
        },
        valueQuantity: {
          value: 40.1,
          unit: '%',
          system: 'http://unitsofmeasure.org',
          code: '%'
        },
        referenceRange: [
          {
            low: {
              value: 36,
              unit: '%',
              system: 'http://unitsofmeasure.org',
              code: '%'
            },
            high: {
              value: 46,
              unit: '%',
              system: 'http://unitsofmeasure.org',
              code: '%'
            }
          }
        ]
      },
      search: {
        mode: 'match'
      }
    },
    {
      fullUrl: 'https://hapi.fhir.org/baseR5/Observation/81991',
      resource: {
        resourceType: 'Observation',
        id: '81991',
        meta: {
          versionId: '1',
          lastUpdated: '2023-07-02T19:34:42.256+00:00',
          source: '#v5vnpLpRn1XxmM9I'
        },
        status: 'final',
        code: {
          coding: [
            {
              system: 'http://loinc.org',
              code: '6690-2',
              display: 'Leukocytes [#/volume] in Blood by Automated count'
            }
          ],
          text: 'White blood cell (WBC) count, Blood'
        },
        subject: {
          reference: 'Patient/silth-practice-2'
        },
        valueQuantity: {
          value: 12.7,
          unit: '10*3/uL',
          system: 'http://unitsofmeasure.org',
          code: '10*3/uL'
        },
        referenceRange: [
          {
            low: {
              value: 4.5,
              unit: '10*3/uL',
              system: 'http://unitsofmeasure.org',
              code: '10*3/uL'
            },
            high: {
              value: 11,
              unit: '10*3/uL',
              system: 'http://unitsofmeasure.org',
              code: '10*3/uL'
            }
          }
        ]
      },
      search: {
        mode: 'match'
      }
    },
    {
      fullUrl: 'https://hapi.fhir.org/baseR5/Observation/81992',
      resource: {
        resourceType: 'Observation',
        id: '81992',
        meta: {
          versionId: '1',
          lastUpdated: '2023-07-02T19:34:42.256+00:00',
          source: '#v5vnpLpRn1XxmM9I'
        },
        status: 'final',
        code: {
          coding: [
            {
              system: 'http://loinc.org',
              code: '770-8',
              display: 'Neutrophils/100 leukocytes in Blood by Automated count'
            }
          ],
          text: 'Neutrophils per 100 white blood cells, Blood'
        },
        subject: {
          reference: 'Patient/silth-practice-2'
        },
        valueQuantity: {
          value: 70,
          unit: '%',
          system: 'http://unitsofmeasure.org',
          code: '%'
        },
        referenceRange: [
          {
            low: {
              value: 54,
              unit: '%',
              system: 'http://unitsofmeasure.org',
              code: '%'
            },
            high: {
              value: 62,
              unit: '%',
              system: 'http://unitsofmeasure.org',
              code: 'g/L'
            }
          }
        ]
      },
      search: {
        mode: 'match'
      }
    },
    {
      fullUrl: 'https://hapi.fhir.org/baseR5/Procedure/81995',
      resource: {
        resourceType: 'Procedure',
        id: '81995',
        meta: {
          versionId: '1',
          lastUpdated: '2023-07-02T19:34:42.256+00:00',
          source: '#v5vnpLpRn1XxmM9I'
        },
        status: 'completed',
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '6025007',
              display: 'Laparoscopic appendectomy (procedure)'
            }
          ],
          text: 'Laparoscopic appendectomy'
        },
        subject: {
          reference: 'Patient/silth-practice-2'
        },
        outcome: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '385669000',
              display: 'Successful (qualifier value)'
            }
          ],
          text: 'Successful'
        }
      },
      search: {
        mode: 'match'
      }
    },
    {
      fullUrl: 'https://hapi.fhir.org/baseR5/Condition/82010',
      resource: {
        resourceType: 'Condition',
        id: '82010',
        meta: {
          versionId: '3',
          lastUpdated: '2023-09-10T09:50:11.731+00:00',
          source: '#24Vx6GrMz5ttlC2B'
        },
        clinicalStatus: {
          coding: [
            {
              system: 'http://terminology.hl7.org/CodeSystem/condition-clinical',
              code: 'resolved'
            }
          ]
        },
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '72048003',
              display: 'Acute appendicitis without peritonitis'
            }
          ],
          text: 'Acute appendicitis without peritonitis'
        },
        subject: {
          reference: 'Patient/silth-practice-2'
        }
      },
      search: {
        mode: 'match'
      }
    }
  ]
}
