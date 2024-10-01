import {IdentifierData} from './identifier.data'

export const data = {
  use: 'official',
  system: 'http://www.acmehosp.com/patients',
  value: '44552',
  period: {
    start: '2003-05-03'
  }
}
export const data1 = {
  use: 'official',
  system: 'urn:oid:2.16.840.1.113883.16.4.3.2.5',
  value: '123'
}
export const data2: IdentifierData = {
  use: 'official',
  type: { coding: [{ code: 'BSN' }] },
  system: 'urn:oid:2.16.840.1.113883.2.4.6.3',
  value: '123456789',
  period: {
    start: '2003-05-03',
    end: '2024-12-31'
  }
}
