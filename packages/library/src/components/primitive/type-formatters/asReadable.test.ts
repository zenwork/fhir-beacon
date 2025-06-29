import {describe, expect, it} from 'vitest'
import {asReadable}           from './asReadable'




describe('asReadable', () => {
  it('should split simple camelcase', () => {
    expect(asReadable('HelloWorld')).to.equal('Hello World')
    expect(asReadable('myApplePie')).to.equal('my Apple Pie')
    expect(asReadable('ILikePinkLemonade')).to.equal('I Like Pink Lemonade')
  })

  it('should not split acronyms', () => {
    expect(asReadable('HTML')).to.equal('HTML')
    expect(asReadable('ABC123')).to.equal('ABC123')
    expect(asReadable('B2B')).to.equal('B2B')
    expect(asReadable('B2B4C')).to.equal('B2B4C')
  })

  it('should split camelcase and acronyms correctly', () => {
    expect(asReadable('HTMLDivElement')).to.equal('HTML Div Element')
    expect(asReadable('B2BBusinessCase')).to.equal('B2B Business Case')
    expect(asReadable('End2End')).to.equal('End 2 End')
  })

  it('should split camelcase with numbers correctly', () => {
    expect(asReadable('C4Explosive')).to.equal('C4 Explosive')
  })

  it('should split camelcase underscores', () => {
    expect(asReadable('_HiddenField')).to.equal('Hidden Field')
    expect(asReadable('100_000')).to.equal('100 000')
    expect(asReadable('I_Love_You_2')).to.equal('I Love You 2')
    expect(asReadable('4_by_4')).to.equal('4 by 4')
    expect(asReadable('$Sign')).to.equal('$ Sign')
  })

  it('should keep split strings as is', () => {
    expect(asReadable('HTML Code')).to.equal('HTML Code')
    expect(asReadable('I Like Pink Lemonade')).to.equal('I Like Pink Lemonade')
    expect(asReadable('C4 Explosive')).to.equal('C4 Explosive')
    expect(asReadable('B2B Business Case')).to.equal('B2B Business Case')
  })
  it('should work with mixed cases', () => {
    expect(asReadable('iso21090-codedString')).to.equal('iso 21090 coded String')

  })
})
