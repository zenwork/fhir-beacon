import {assert, expect} from '@open-wc/testing'
import {Code}           from './primitive.data'
import {toCode}         from './type-converters/toCode'
import {toUrl}          from './type-converters/toUrl'


describe('Primitives', () => {
  it('should parse a URL', async () => {
    let url = toUrl('http://hl7.org/fhir/sid/icd-10')

    await expect(url.protocol).to.equal('http:')
    await expect(url.hostname).to.equal('hl7.org')
    await expect(url.pathname).to.equal('/fhir/sid/icd-10')

  })

  it('should fail to parse a valid URL', async () => {
    assert.throws(() => {
      toUrl('')
    })

    assert.throws(() => {
      toUrl(null as unknown as string)
    })

    assert.throws(() => {
      toUrl('http//hl7.org/fhir/sid/icd-10')
    })

  })

  it('should parse a valid Code', async () => {

    let code: Code = toCode('G44.1')
    await expect(code).to.equal('G44.1')

    code = toCode('G44.1 123')
    await expect(code).to.equal('G44.1 123')

    code = toCode('A-B-C D')
    await expect(code).to.equal('A-B-C D')
  })

  it('should fail to parse invalid Code', async () => {

    assert.throws(() => {
      toCode('G44  .1 asdsa')

    })
  })
})
