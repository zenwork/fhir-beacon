import {describe, expect, it} from 'vitest'
import {asFormattedTime}      from './asFormattedTime'



describe('asFormattedTime', () => {

  it('returns formatted string for HH:MM:SS ', () => {
    let formatted: string = asFormattedTime({ time: '00:30:30', hourSeparator: 'h', minuteSeparator: 'm' })
    expect(formatted).toBe('00h30m30')

    formatted = asFormattedTime({ time: '23:30:30', format: '12h' })
    expect(formatted).toBe('11:30:30 PM')

    formatted = asFormattedTime({ time: '17:59:59', minuteSeparator: '.', format: '12h' })
    expect(formatted).toBe('5:59.59 PM')
  })

  it('returns formatted string for HH:MM ', () => {
    let formatted: string = asFormattedTime({ time: '00:30', hourSeparator: 'h', minuteSeparator: 'm' })
    expect(formatted).toBe('00h30')

    formatted = asFormattedTime({ time: '11:30', format: '12h' })
    expect(formatted).toBe('11:30 AM')

    formatted = asFormattedTime({ time: '17:00', minuteSeparator: '.', format: '12h' })
    expect(formatted).toBe('5:00 PM')
  })

  it('returns formatted string for HH', () => {
    let formatted: string = asFormattedTime({ time: '00', hourSeparator: 'h', minuteSeparator: 'm' })
    expect(formatted).toBe('00')

    formatted = asFormattedTime({ time: '11', format: '12h' })
    expect(formatted).toBe('11 AM')

    formatted = asFormattedTime({ time: '17', minuteSeparator: '.', format: '12h' })
    expect(formatted).toBe('5 PM')
  })

})
