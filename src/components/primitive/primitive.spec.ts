import {html}                           from 'lit'
import {assert, describe, expect, test} from 'vitest'
import {emptyLitShadow, fixture}        from '../../../tests/lit/lit-vitest-fixture'
import {Primitive}                      from './primitive'
import {PrimitiveLabel}                 from './primitive-label'
import {PrimitiveValue}                 from './primitive-value'

describe('fhir Primitive', () => {

  test('should display nothing', async () => {
    const el = await fixture<Primitive>(html`
      <fhir-primitive ></fhir-primitive >
    `).first()

    // TODO: find a way to assert emptiness better
    // only contains lit specific comments
    expect(el.shadowRoot!.innerHTML).toMatch(emptyLitShadow)

  })

  test('should display label', async () => {
    const el = await fixture<Primitive>(html`
      <fhir-primitive label="code" verbose></fhir-primitive >

    `).first()
    assert.isEmpty(el.queryShadow<PrimitiveLabel>({ select: 'fhir-label', expect: 0 }))
  })

  test('should should display a label when label attribute is defined', async () => {

    const el = await fixture<Primitive>(html`
      <fhir-primitive label="code" value="abc"></fhir-primitive >
    `).first()

    const label = el.queryShadow<PrimitiveLabel>({ select: 'fhir-label' })
    expect(label.text).to.equal('code')

    const value = el.queryShadow<PrimitiveValue>({ select: 'fhir-value' })
    expect(value.text).to.equal('abc')

  })

  test('should should display a label, a value', async () => {

    const el = await fixture<Primitive>(html`
      <fhir-primitive label="code" value="abc" context="important"></fhir-primitive >
    `).first()

    const label = el.queryShadow<PrimitiveLabel>({ select: 'fhir-label' })
    expect(label.text).to.equal('code')

    const value = el.queryShadow<PrimitiveValue>({ select: 'fhir-value' })
    expect(value.text).to.equal('abc')

    assert.ok(el.queryShadow<HTMLSpanElement>({ select: 'fhir-context', expect: 0 }))

  })

  test('should should display context only when verbose', async () => {

    const el = await fixture<Primitive>(html`
      <fhir-primitive label="code" value="abc" context="important" verbose></fhir-primitive >
    `).first()


    const span = el.queryShadow<HTMLSpanElement>({ select: ['fhir-context', 'span'] })
    expect(span.textContent).to.equal('(important - none)')

  })


  test('should display an error when the type-check fails', async () => {

    const el = await fixture<Primitive>(html`
      <fhir-primitive label="code" value="abc" type="decimal" showerror></fhir-primitive >
    `).first()

    const label = el.queryShadow<PrimitiveLabel>({ select: 'fhir-label' })
    expect(label!.text).to.equal('code')

    const value = el.queryShadow<PrimitiveValue>({ select: 'fhir-value' })
    expect(value!.text).to.equal('abc')

    const div = el.queryShadow<HTMLSpanElement>({ select: ['fhir-error', 'div'] })
    expect(div.textContent).to.equal('TypeError: decimal must be a valid number')

  })
})
