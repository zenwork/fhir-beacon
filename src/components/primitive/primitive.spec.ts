import {html}                           from 'lit'
import {assert, describe, expect, test} from 'vitest'
import {emptyLitShadow, fixture}        from '../../../tests/lit-vitest-fixture'
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

    const label = el.deepQuerySelector('fhir-label') as PrimitiveLabel
    assert.exists(label)
    expect(label.delimiter).to.equal(': ')
    expect(label.text).to.equal('code')

  })

  test('should should display a label when label attribute is defined', async () => {

    const el = await fixture<Primitive>(html`
      <fhir-primitive label="code" value="abc"></fhir-primitive >
    `).first()

    const label = el.deepQuerySelector('fhir-label') as PrimitiveLabel
    expect(label.text).to.equal('code')

    const value = el.deepQuerySelector('fhir-value') as PrimitiveValue
    expect(value.text).to.equal('abc')

  })

  test('should should display a label, a value, and a context', async () => {

    const el = await fixture<Primitive>(html`
      <fhir-primitive label="code" value="abc" context="important"></fhir-primitive >
    `).first()

    const label = el.deepQuerySelector('fhir-label') as PrimitiveLabel
    expect(label.text).to.equal('code')

    const value = el.deepQuerySelector('fhir-value') as PrimitiveValue
    expect(value.text).to.equal('abc')

    const span = el.deepQuerySelector(['fhir-context', 'span']) as HTMLSpanElement
    expect(span.textContent).to.equal('(important)')

  })


  test('should display an error when the type-check fails', async () => {

    const el = await fixture<Primitive>(html`
      <fhir-primitive label="code" value="abc" type="decimal" showerror></fhir-primitive >
    `).first()

    const label = el.deepQuerySelector('fhir-label') as PrimitiveLabel
    expect(label!.text).to.equal('code')

    const value = el.deepQuerySelector('fhir-value') as PrimitiveValue
    expect(value!.text).to.equal('abc')

    const div = el.deepQuerySelector(['fhir-error', 'div']) as HTMLSpanElement
    expect(div.textContent).to.equal('TypeError: decimal must be a valid number')

  })
})
