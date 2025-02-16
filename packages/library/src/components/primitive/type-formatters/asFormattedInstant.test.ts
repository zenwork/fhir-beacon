import {describe, expect, it} from 'vitest'
import {asFormattedDate}      from './asFormattedDate'
import {asFormattedInstant}   from './asFormattedInstant'



describe('asFormattedDate', () => {

  it('returns formatted string for YYYY-MM-DDThh:mm:ss.sss+zz:zz ', () => {
    let formatted: string = asFormattedInstant({
                                                 instant: '2015-02-07T13:28:17.239+02:00',
                                                 timeZoneName: 'Europe/Berlin'
                                               })
    expect(formatted).toBe('07.02.15 12:28:17.239')

    formatted = asFormattedInstant({
                                     instant: '2015-02-07T13:28:17.239+02:00',
                                     timeZoneName: 'Europe/Berlin',
                                     order: 'MDY',
                                     dateSeparator: '.'
                                   })
    expect(formatted).toBe('02.07.15 12:28:17.239')

    formatted = asFormattedInstant({
                                     instant: '2015-02-07T13:28:17.239+02:00',
                                     timeZoneName: 'Europe/Berlin',
                                     format: '24h',
                                     order: 'DMY',
                                     dateSeparator: '-',
                                     monthFormat: 'medium'
                                   })
    expect(formatted).toBe('07-Feb-2015 12:28:17.239')
  })

  it('returns formatted string for YYYY-MM-DDThh:mm:ss+zz:zz ', () => {
    let formatted: string = asFormattedInstant({
                                                 instant: '2015-02-07T00:28:17Z',
                                                 timeZoneName: 'Europe/Berlin'
                                               })
    expect(formatted).toBe('07.02.15 01:28:17')

    formatted = asFormattedInstant({
                                     instant: '2015-02-07T13:28:17Z',
                                     timeZoneName: 'Europe/Berlin',
                                     order: 'MDY',
                                     dateSeparator: '.'
                                   })
    expect(formatted).toBe('02.07.15 14:28:17')

    formatted = asFormattedInstant({
                                     instant: '2015-02-07T00:28:17Z',
                                     timeZoneName: 'Europe/Berlin',
                                     format: '12h',
                                     order: 'DMY',
                                     dateSeparator: '-',
                                     monthFormat: 'medium'
                                   })
    expect(formatted).toBe('7-Feb-2015 1:28:17 AM')

    formatted = asFormattedInstant({
                                     instant: '2015-12-31T23:28:17.239-05:00',
                                     timeZoneName: 'Europe/Berlin',
                                     format: '12h',
                                     order: 'DMY',
                                     dateSeparator: '-',
                                     monthFormat: 'medium'
                                   })
    expect(formatted).toBe('1-Jan-2016 5:28:17.239 AM')
  })


})
