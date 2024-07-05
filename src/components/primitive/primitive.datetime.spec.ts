import {assert}     from '@open-wc/testing'
import {toDatetime} from './type-converters/toDatetime'


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
    assert.throw(() => {
      toDatetime('abc')
    })

    assert.throw(() => {
      toDatetime('1971-12-31T23:59:59.99911:00')
    })

    assert.throw(() => {
      toDatetime('1971-12-31T235959999')
    })

    assert.throw(() => {
      toDatetime('-12-31T23:59:59.999')
    })
  })

})
