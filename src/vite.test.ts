import {html}                 from 'lit'
import {describe, expect, it} from 'vitest'
import {fixture}              from '../tests/lit-vitest-fixture'
import {PrimitiveValue}       from './components'
import '../index'


describe('FHIR value field', async () => {

  it('should render one value', async () => {
    const el = await fixture<PrimitiveValue>(html`
      <fhir-value text="World"></fhir-value >
    `).first()
    await expect(el.text).to.equal('World')
    expect(el.renderRoot.textContent).toContain('World')
  })

  it('should should render two values', async () => {
    const els = await fixture<PrimitiveValue>(html`
      <fhir-value text="World"></fhir-value >
      <div >foobar</div >
      <fhir-value text="Peace"></fhir-value >
    `).all()

    await expect(els[0].text).to.equal('World')
    expect(els[0].renderRoot.textContent).toContain('World')

    await expect(els[1].text).to.equal('Peace')
    expect(els[1].renderRoot.textContent).toContain('Peace')

  })

})
