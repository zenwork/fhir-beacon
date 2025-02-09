import {describe, expect, it} from 'vitest'
import {asFormattedDateTime}  from './asFormattedDateTime'



describe('asFormattedDateTime', () => {

  it('returns formatted string for YYYY-MM-DDThh:mm:ss.sss+zz:zz ', () => {
    let formatted: string = asFormattedDateTime({
                                                  datetime: '2015-02-07T13:28:17.239+02:00',
                                                  timeZoneName: 'Europe/Berlin'
                                                })
    expect(formatted).toBe('07.02.2015 12:28:17')

    formatted = asFormattedDateTime({
                                      datetime: '2015-02-07T13:28:17.239+02:00',
                                      timeZoneName: 'Europe/Berlin',
                                      order: 'MDY',
                                      dateSeparator: '.'
                                    })
    expect(formatted).toBe('02.07.2015 12:28:17')

    formatted = asFormattedDateTime({
                                      datetime: '2015-02-07T13:28:17.239+02:00',
                                      timeZoneName: 'Europe/Berlin',
                                      format: '12h',
                                      order: 'DMY',
                                      dateSeparator: '-',
                                      monthFormat: 'medium',
                                      shape: 'HMSM'
                                    })
    expect(formatted).toBe('7-Feb-2015 12:28:17.239 PM')
  })

  it('returns formatted string for various forms', () => {

    let formatted: string = asFormattedDateTime({ datetime: '2015-02-07T00:28' })
    expect(formatted).toBe('07.02.2015 00:28')

    formatted = asFormattedDateTime({ datetime: '2013-06-08T10:57:00' })
    expect(formatted).toBe('08.06.2013 10:57:00')

    formatted = asFormattedDateTime({
                                      datetime: '2015-02-07T13',
                                      timeZoneName: 'Europe/Berlin',
                                      order: 'MDY',
                                      dateSeparator: '.',
                                      format: '12h'
                                    })
    expect(formatted).toBe('02.07.2015 1 PM')

    formatted = asFormattedDateTime({
                                      datetime: '2015-02',
                                      timeZoneName: 'Europe/Berlin',
                                      format: '12h',
                                      order: 'DMY',
                                      dateSeparator: '-',
                                      monthFormat: 'medium'
                                    })
    expect(formatted).toBe('Feb-2015')
  })


})
