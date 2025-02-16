import {describe, expect, it} from 'vitest'
import {asFormattedDate}      from './asFormattedDate'



describe('asFormattedDate', () => {

  it('returns formatted string for YYYY-MM-DD ', () => {
    let formatted: string = asFormattedDate({ date: '1905-08-23' })
    expect(formatted).toBe('23.08.05')

    formatted = asFormattedDate({ date: '1905-08-23', order: 'MDY', separator: '/' })
    expect(formatted).toBe('08/23/05')

    formatted = asFormattedDate({ date: '1905-08-23', order: 'DMY', separator: '-', monthFormat: 'medium' })
    expect(formatted).toBe('23-Aug-1905')
  })

  it('returns formatted string for YYYY-MM ', () => {
    let formatted: string = asFormattedDate({ date: '1905-08' })
    expect(formatted).toBe('08.05')

    formatted = asFormattedDate({ date: '1905-08', order: 'MDY', separator: '/' })
    expect(formatted).toBe('08/05')

    formatted = asFormattedDate({ date: '1905-08', order: 'DMY', separator: '-', monthFormat: 'medium' })
    expect(formatted).toBe('Aug-1905')
  })

  it('returns formatted string for YYYY ', () => {
    let formatted: string = asFormattedDate({ date: '1905' })
    expect(formatted).toBe('05')

    formatted = asFormattedDate({ date: '1905', order: 'MDY', separator: '/' })
    expect(formatted).toBe('05')

    formatted = asFormattedDate({ date: '1905', order: 'DMY', separator: '-', monthFormat: 'medium' })
    expect(formatted).toBe('1905')
  })

})
