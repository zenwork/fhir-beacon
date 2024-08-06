import {html}                 from 'lit'
import {describe, expect, it} from 'vitest'
import {fixture}              from '../../../tests/lit/lit-vitest-fixture'
import {Shell}                from '../../shell'
import {NotSupported}         from './not-supported'
import {PrimitiveError}       from './primitive-error'

describe('fhir-not-supported', () => {

  it('Should display default when no attributes are set', async () => {

    const el = await fixture<NotSupported>(html`
      <fhir-not-supported ></fhir-not-supported >
    `).first()

    expect(el).to.be.instanceof(NotSupported)

    const label = el.deepQuerySelector<HTMLLabelElement>({ select: 'label' })
    expect(label).toHaveTextContent('error')
    expect(getComputedStyle(label).fontStyle).to.eq('italic')

    const value = el.deepQuerySelector<HTMLDivElement>({ select: ['fhir-value', 'div'] })
    expect(value).toHaveTextContent('Undefined reason')
    expect(getComputedStyle(value).textDecorationStyle).toEqual('wavy')

  })

  it('Should display custom label when all attributes are set without variant', async () => {

    const el = await fixture<Shell>(html`
      <fhir-shell showerror>
        <fhir-not-supported label="check" description="desc" error="custom error"></fhir-not-supported >
      </fhir-shell >
    `).first()

    expect(el).to.be.instanceof(Shell)

    const label = el.deepQuerySelector<HTMLLabelElement>({ select: 'label' })
    expect(label).toHaveTextContent('check:')

    const value = el.deepQuerySelector<HTMLDivElement>({ select: ['fhir-value', 'div'] })
    expect(value).toHaveTextContent('desc')

    const err = el.deepQuerySelector<PrimitiveError>({ select: ['fhir-error', 'div'] })
    expect(err).toHaveTextContent('custom error')
    const errCss = getComputedStyle(err)
    expect(errCss.fontStyle).to.eq('italic')
    expect(errCss.backgroundColor).to.eq('rgb(254, 202, 202)')
  })

  it('Should display not implemented variant', async () => {

    const el = await fixture<Shell>(html`
      <fhir-shell showerror>
        <fhir-not-supported description="desc" variant='no-impl'></fhir-not-supported >
      </fhir-shell >
    `).first()

    expect(el).to.be.instanceof(Shell)

    const label = el.deepQuerySelector<HTMLLabelElement>({ select: 'label' })
    expect(label).toHaveTextContent('')

    const value = el.deepQuerySelector<HTMLDivElement>({ select: ['fhir-value', 'div'] })
    expect(value).toHaveTextContent('desc')

    const err = el.deepQuerySelector<PrimitiveError>({ select: ['fhir-error', 'div'] })
    expect(err).toHaveTextContent('Not Implemented')

  })

  it('Should display no support variant', async () => {

    const el = await fixture<Shell>(html`
      <fhir-shell showerror>
        <fhir-not-supported description="desc" variant='no-sup'></fhir-not-supported >
      </fhir-shell >
    `).first()

    expect(el).to.be.instanceof(Shell)

    const label = el.deepQuerySelector<HTMLLabelElement>({ select: 'label' })
    expect(label).toHaveTextContent('')

    const value = el.deepQuerySelector<HTMLDivElement>({ select: ['fhir-value', 'div'] })
    expect(value).toHaveTextContent('desc')

    const err = el.deepQuerySelector<PrimitiveError>({ select: ['fhir-error', 'div'] })
    expect(err).toHaveTextContent('Not Supported')

  })

  it('Should display stop variant', async () => {

    const el = await fixture<Shell>(html`
      <fhir-shell showerror>
        <fhir-not-supported label='foo' error="custom error desc" variant='stop'></fhir-not-supported >
      </fhir-shell >
    `).first()

    expect(el).to.be.instanceof(Shell)

    const label = el.deepQuerySelector<HTMLLabelElement>({ select: 'label' })
    expect(label).toHaveTextContent('foo:')

    const value = el.deepQuerySelector<HTMLDivElement>({ select: ['fhir-value', 'div'] })
    expect(value).toHaveTextContent('Rendering Stopped')

    const err = el.deepQuerySelector<PrimitiveError>({ select: ['fhir-error', 'div'] })
    expect(err).toHaveTextContent('custom error desc')

  })

})
