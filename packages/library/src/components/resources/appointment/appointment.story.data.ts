export const data = {
  'resourceType': 'Appointment',
  'id': 'example',
  'text': {
    'status': 'generated',
    'div': '<div xmlns="http://www.w3.org/1999/xhtml">Brian MRI results discussion</div>'
  },
  'status': 'booked',
  'class': [
    {
      'coding': [
        {
          'system': 'http://terminology.hl7.org/CodeSystem/v3-ActCode',
          'code': 'AMB',
          'display': 'ambulatory'
        }
      ]
    }
  ],
  'serviceCategory': [
    {
      'coding': [
        {
          'system': 'http://example.org/service-category',
          'code': 'gp',
          'display': 'General Practice'
        }
      ]
    }
  ],
  'serviceType': [
    {
      'concept': {
        'coding': [
          {
            'code': '52',
            'display': 'General Discussion'
          }
        ]
      }
    }
  ],
  'specialty': [
    {
      'coding': [
        {
          'system': 'http://snomed.info/sct',
          'code': '394814009',
          'display': 'General practice'
        }
      ]
    }
  ],
  'appointmentType': {
    'coding': [
      {
        'system': 'http://terminology.hl7.org/CodeSystem/v2-0276',
        'code': 'FOLLOWUP',
        'display': 'A follow up visit from a previous appointment'
      }
    ]
  },
  'reason': [
    {
      'reference': {
        'reference': 'Condition/example',
        'display': 'Severe burn of left ear'
      }
    }
  ],
  'description': 'Discussion on the results of your recent MRI',
  'start': '2013-12-10T09:00:00Z',
  'end': '2013-12-10T11:00:00Z',
  'created': '2013-10-10',
  'note': [
    {
      'text': 'Further expand on the results of the MRI and determine the next actions that may be appropriate.'
    }
  ],
  'patientInstruction': [
    {
      'concept': {
        'text': 'Please avoid excessive travel (specifically flying) before this appointment'
      }
    }
  ],
  'basedOn': [
    {
      'reference': 'ServiceRequest/myringotomy'
    }
  ],
  'subject': {
    'reference': 'Patient/example',
    'display': 'Peter James Chalmers'
  },
  'participant': [
    {
      'actor': {
        'reference': 'Patient/example',
        'display': 'Peter James Chalmers'
      },
      'required': true,
      'status': 'accepted'
    },
    {
      'type': [
        {
          'coding': [
            {
              'system': 'http://terminology.hl7.org/CodeSystem/v3-ParticipationType',
              'code': 'ATND'
            }
          ]
        }
      ],
      'actor': {
        'reference': 'Practitioner/example',
        'display': 'Dr Adam Careful'
      },
      'required': true,
      'status': 'accepted'
    },
    {
      'actor': {
        'reference': 'Location/1',
        'display': 'South Wing, second floor'
      },
      'required': true,
      'status': 'accepted'
    }
  ]
}
export const data2 = {
  resourceType: 'Appointment',
  id: 'examplereq',
  text: {
    status: 'generated',
    div: '<div xmlns="http://www.w3.org/1999/xhtml">Brian MRI results discussion</div>'
  },
  identifier: [
    {
      system: 'http://example.org/sampleappointment-identifier',
      value: '123'
    }
  ],
  status: 'proposed',
  serviceCategory: [
    {
      coding: [
        {
          system: 'http://example.org/service-category',
          code: 'gp',
          display: 'General Practice'
        }
      ]
    }
  ],
  specialty: [
    {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '394814009',
          display: 'General practice'
        }
      ]
    }
  ],
  appointmentType: {
    coding: [
      {
        system: 'http://terminology.hl7.org/CodeSystem/v2-0276',
        code: 'WALKIN',
        display: 'A previously unscheduled walk-in visit'
      }
    ]
  },
  reason: [
    {
      concept: {
        coding: [
          {
            system: 'http://snomed.info/sct',
            code: '413095006'
          }
        ],
        text: 'Clinical Review'
      }
    }
  ],
  description: 'Discussion on the results of your recent MRI',
  minutesDuration: 15,
  requestedPeriod: [
    {
      start: '2016-06-02',
      end: '2016-06-09'
    }
  ],
  slot: [
    {
      reference: 'Slot/example'
    }
  ],
  created: '2015-12-02',
  note: [
    {
      text: 'Further expand on the results of the MRI and determine the next actions that may be appropriate.'
    }
  ],
  subject: {
    reference: 'Patient/example',
    display: 'Peter James Chalmers'
  },
  participant: [
    {
      actor: {
        reference: 'Patient/example',
        display: 'Peter James Chalmers'
      },
      required: true,
      status: 'needs-action'
    },
    {
      type: [
        {
          coding: [
            {
              system: 'http://terminology.hl7.org/CodeSystem/v3-ParticipationType',
              code: 'ATND'
            }
          ]
        }
      ],
      required: true,
      status: 'needs-action'
    },
    {
      actor: {
        reference: 'Location/1',
        display: 'South Wing, second floor'
      },
      required: true,
      status: 'accepted'
    }
  ]
}