import {expect, test} from '@playwright/test'
import {toCode}       from '../../src/data/primitive/converters/ToCode'
import {toDatetime}   from '../../src/data/primitive/converters/ToDatetime'


test.describe('Primitives', () => {
  test('should parse a DateTime string', async ({page}) => {
    toDatetime('1971')
    toDatetime('1971-12')
    toDatetime('1971-12-31')
    toDatetime('1971-12-31T23:59:59')
    toDatetime('1971-12-31T23:59:59.999')
    toDatetime('1971-12-31T23:59:59.999+11:00')

  })
  test('should fail to parse datetime string', async ({page}) => {
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
