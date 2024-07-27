import {SlDetails}              from '@shoelace-style/shoelace'
import {html}                   from 'lit'
import {findAllByShadowText}    from 'shadow-dom-testing-library'
import {describe, expect, test} from 'vitest'
import {fixture}                from '../../../../tests/lit-vitest-fixture'
import {testPrimitive}          from '../../../../tests/testPrimitive'
import {StructureWrapper}       from '../../../shell'
import {Primitive}              from '../../primitive'
import {Quantity}               from '../quantity'
import {Ratio}                  from './ratio'

describe('Ratio', () => {

  test('should return the ratio of two numbers', async () => {
    const data = { numerator: { value: '1' }, denominator: { value: '128' } }

    const ratio = await fixture<Ratio>(html`
      <fhir-shell mode="structure">
        <fhir-ratio label="ratio" .data=${data}></fhir-ratio >
      </fhir-shell >
    `).first()

    await ratio.updateComplete
    const quantities = ratio.deepQuerySelectorAll<Quantity>('fhir-quantity')

    expect(quantities.length).toEqual(2)

    expect(quantities[0].data).toEqual({ value: '1' })
    expect(quantities[1].data).toEqual({ value: '128' })

  })

  test('should ignore the denominator value when there is a unit and teh value is 1', async () => {

    const data = {
      numerator: {
        value: '103.50',
        unit: 'US$',
        code: 'USD',
        system: 'urn:iso:std:iso:4217'
      },
      denominator: {
        value: '1',
        unit: 'day',
        code: 'day',
        system: 'http://unitsofmeasure.org'
      }
    }

    const ratio = await fixture<Ratio>(html`
      <fhir-shell >
        <fhir-ratio label="ratio" .data=${data}></fhir-ratio >
      </fhir-shell >
    `).first()

    await ratio.updateComplete
    const values = ratio.deepQuerySelectorAll<Quantity>('fhir-value')
    expect(values.length).toEqual(3)
    const elements = await findAllByShadowText(ratio, /103\.5|US\$|\/|day/)
    expect(elements[0]).toHaveTextContent('US$')
    expect(elements[1]).toHaveTextContent('103.5')
    expect(elements[2]).toHaveTextContent('/')
    expect(elements[3]).toHaveTextContent('day')

  })

  test('should show verbose structure', async () => {
    const data = { numerator: { value: '1' }, denominator: { value: '128' } }

    const ratio = await fixture<Ratio>(html`
      <fhir-shell mode="structure" verbose>
        <fhir-ratio label="ratio" .data=${data}></fhir-ratio >
      </fhir-shell >
    `).first()

    const wrapper = ratio.deepQuerySelector<StructureWrapper>('fhir-structure-wrapper')
    const details = wrapper.deepQuerySelector<SlDetails>('sl-details')

    // label
    expect(details.deepQuerySelector('label')).toHaveTextContent('ratio')

    // id
    const id = ratio.deepQuerySelector<Primitive>('fhir-primitive')
    testPrimitive(id, { key: 'id', value: null })

    const quantities = ratio.deepQuerySelectorAll<Quantity>('fhir-quantity')
    expect(quantities.length).toEqual(2)

    // numerator
    testSimpleQuantity(
      quantities[0],
      'numerator',
      { id: null, variation: 'simple', value: '1', unit: null, system: null, code: null })

    // denominator
    testSimpleQuantity(
      quantities[1],
      'denominator',
      { id: null, variation: 'simple', value: '128', unit: null, system: null, code: null })

  })
})

const testSimpleQuantity = (
  quantity: Quantity, label: string,
  { id, variation, value, unit, system, code }: {
    id: string | null | undefined,
    variation: string | null | undefined,
    value: string | null | undefined,
    unit: string | null | undefined,
    system: string | null | undefined,
    code: string | null | undefined
  }) => {
  expect(quantity.deepQuerySelector('label')).toHaveTextContent(label)

  const primitives = quantity.deepQuerySelectorAll<Primitive>('fhir-primitive')
  expect(primitives.length).toEqual(6)

  testPrimitive(primitives[0], { key: 'id', value: id })
  testPrimitive(primitives[1], { key: 'variation', value: variation })
  testPrimitive(primitives[2], { key: 'value', value: value })
  testPrimitive(primitives[3], { key: 'unit', value: unit })
  testPrimitive(primitives[4], { key: 'system', value: system })
  testPrimitive(primitives[5], { key: 'code', value: code })
}
