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
