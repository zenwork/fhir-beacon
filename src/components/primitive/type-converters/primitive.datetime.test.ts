import {describe, expect, it} from 'vitest'
import {toDatetime}           from './toDatetime'


describe('Primitives', () => {
  it('should parse a DateTime string', async () => {
    toDatetime('1971')
    toDatetime('1971-12')
    toDatetime('1971-12-31')
    toDatetime('1971-12-31T23:59:59')
    toDatetime('1971-12-31T23:59:59.999')
    toDatetime('1971-12-31T23:59:59.999+11:00')

  })
  it('should fail to parse datetime string', async () => {
    expect(() => {
      toDatetime('abc')
    }).toThrowError()

    expect(() => {
      toDatetime('1971-12-31T23:59:59.99911:00')
    }).toThrowError()

    expect(() => {
      toDatetime('1971-12-31T235959999')
    }).toThrowError()

    expect(() => {
      toDatetime('-12-31T23:59:59.999')
    }).toThrowError()
  })

})
