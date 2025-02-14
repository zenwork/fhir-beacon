export const data = {
  resourceType: 'Slot',
  id: '1',
  text: {
    status: 'generated',
    div: '<div xmlns="http://www.w3.org/1999/xhtml">\n\t\t\t25 Dec 2013 9:00am - 9:15am: <b>Busy</b> Physiotherapy\n\t\t</div>'
  },
  identifier: [
    {
      system: 'http://example.org/identifiers/slots',
      value: '123132'
    }
  ],
  serviceCategory: [
    {
      coding: [
        {
          code: '17',
          display: 'General Practice'
        }
      ]
    }
  ],
  schedule: {
    reference: 'Schedule/example'
  },
  status: 'busy',
  start: '2013-12-25T09:00:00Z',
  end: '2013-12-25T09:15:00Z',
  overbooked: true,
  comment: 'Assessments should be performed before requesting appointments in this slot.'
}
