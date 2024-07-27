import {SlDetails}              from '@shoelace-style/shoelace'
import {html}                   from 'lit'
import {describe, expect, test} from 'vitest'
import {aTimeout}               from '../../../../tests/aTimeout'

import {emptyLitShadow, fixture}        from '../../../../tests/lit-vitest-fixture'
import {testPrimitive}                  from '../../../../tests/testPrimitive'
import {PrimitiveError, PrimitiveValue} from '../../primitive'
import {Quantity}                       from './quantity'


describe('Quantity', () => {

  test('should show no quantity in when no data is provided', async () => {
    const quantity = await fixture<Quantity>(html`
      <fhir-quantity label="quantity"></fhir-quantity >`).first()
    expect(quantity.shadowRoot!.innerHTML).toMatch(emptyLitShadow)
  })

  test('should show error when no data is provided and set to show error', async () => {
    const quantity = await fixture<Quantity>(html`
      <fhir-quantity label="quantity" showerror></fhir-quantity >`).first()
    const error = quantity.deepQuerySelector('fhir-error') as PrimitiveError
    expect(error).toHaveAttribute('text', 'no data provided')
  })

  test('quantity should show a simple quantity', async () => {
    const data = {
      value: '25',
      unit: 'sec',
      system: 'http://unitsofmeasure.org',
      code: 's'
    }

    const quantity = await fixture<Quantity>(html`
      <fhir-quantity label="quantity" .data=${data} showerror></fhir-quantity >
    `).first()

    const primitive = quantity.deepQuerySelector('fhir-primitive') as PrimitiveValue
    expect(primitive).toHaveAttribute('value', '25')
    expect(primitive).toHaveAttribute('label', 'quantity')
    expect(primitive.querySlot('after')[0]).toHaveTextContent('sec')

  })

  test('quantity should show converted comparator and unit', async () => {

    const data = {
      value: '40000',
      comparator: '&gt;',
      unit: 'ug/L',
      system: 'http://unitsofmeasure.org',
      code: 'ug'
    }

    const quantity = await fixture<Quantity>(html`
      <fhir-quantity label="quantity" .data=${data} showerror></fhir-quantity >
    `).first()

    const primitive = quantity.deepQuerySelector('fhir-primitive') as PrimitiveValue
    expect(primitive).toHaveAttribute('value', '40000')
    expect(primitive).toHaveAttribute('value', '40000')
    expect(primitive.querySlot('before')[0]).toHaveTextContent('greater than')
    expect(primitive.querySlot('after')[0]).toHaveTextContent('ug/L')

  })

  test('quantity should show structure with error', async () => {

    const data = {
      value: 'abc', // not a number
      unit: 'sec',
      system: 'http://unitsofmeasure.org',
      code: 's'
    }

    const quantity = await fixture<Quantity>(html`
      <fhir-shell showerror mode="structure">
        <fhir-quantity label="time" .data=${data} mode="structure"></fhir-quantity >
      </fhir-shell >
    `).first()

    await aTimeout(100)

    await quantity.updateComplete
    await quantity.updateComplete

    const header = quantity.deepQuerySelector<SlDetails>('sl-details')
    expect(header).toHaveTextContent('time')

    const elements = quantity.deepQuerySelectorAll<HTMLElement>('fhir-primitive')
    expect(elements.length).toEqual(6)

    // valid properties
    testPrimitive(elements[0], { key: 'id', value: null })
    testPrimitive(elements[1], { key: 'variation', value: 'duration' })
    testPrimitive(elements[2], { key: 'value', value: 'abc' })
    testPrimitive(elements[3], { key: 'unit', value: 'sec' })
    expect(elements[3].deepQuerySelector('sl-badge')).toHaveTextContent('∑')
    testPrimitive(elements[4], { key: 'system', value: 'http://unitsofmeasure.org' })
    expect(elements[4].deepQuerySelector('sl-badge')).toHaveTextContent('∑')
    testPrimitive(elements[5], { key: 'code', value: 's' })
    expect(elements[5].deepQuerySelector('sl-badge')).toHaveTextContent('∑')

    // invalid property
    // check error is underlined
    const value = elements[2].deepQuerySelector<PrimitiveValue>('fhir-value')
    const div = value.deepQuerySelector<HTMLDivElement>('div')
    expect(div!).toHaveTextContent('abc')
    expect(getComputedStyle(div).textDecoration).toEqual('underline wavy rgb(220, 38, 38)')

    // check error message is diplayed
    const error = elements[2].deepQuerySelector<PrimitiveError>('fhir-error')
    expect(error).toHaveAttribute('text', 'TypeError: decimal must be a valid number')

  })

})
