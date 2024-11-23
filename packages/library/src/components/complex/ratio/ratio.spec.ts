import {SlDetails}              from '@shoelace-style/shoelace'
import {html}                   from 'lit'
import {findAllByShadowText}    from 'shadow-dom-testing-library'
import {describe, expect, test} from 'vitest'
import {BeaconAssert}           from '../../../../tests/component/componentTestingUtils'
import {testPrimitive}          from '../../../../tests/component/testPrimitive'
import {fixture}                from '../../../../tests/lit/lit-vitest-fixture'
import {Shell}                  from '../../../shell'
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
    const quantities = ratio.queryShadow<Quantity[]>({ select: 'fhir-quantity', expect: 2 })

    expect(quantities[0].data).to.include({ value: '1' })
    expect(quantities[1].data).to.include({ value: '128' })

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

    ratio.queryShadow({ select: 'fhir-value', expect: 3 })

    const elements = await findAllByShadowText(ratio, anyMatcher(
      '103.5', 'US$', '/', 'day'
    ))
    expect(elements[1]).toHaveTextContent('103.5')
    expect(elements[0]).toHaveTextContent('US$')
    expect(elements[2]).toHaveTextContent('/')
    expect(elements[3]).toHaveTextContent('day')

  })

  test('should show verbose structure', async () => {
    const data = { numerator: { value: '1' }, denominator: { value: '128' } }

    const shell = await fixture<Shell>(html`
      <fhir-shell mode="structure" verbose>
        <fhir-ratio label="ratio" .data=${data}></fhir-ratio >
      </fhir-shell >
    `).first()

    const details = shell.queryShadow<SlDetails[]>({ select: 'sl-details', expect: 3 })


    // label
    expect(details[0].queryShadow<HTMLElement>({ select: 'label' })).toHaveTextContent('ratio')

    // id
    const id = shell.queryShadow<Primitive[]>({ select: 'fhir-primitive', expect: 13 })
    testPrimitive(id[0],
                  { key: 'id', value: null })

    const quantities = shell.queryShadow<Quantity[]>({ select: 'fhir-quantity', expect: 2 })


    // numerator
    BeaconAssert.hasLabelsAndValues.for.quantity.whenSimple(
      quantities[0],
      'numerator',
      { id: null, variation: 'simple', value: '1', unit: null, system: null, code: null }
    )

    // denominator
    BeaconAssert.hasLabelsAndValues.for.quantity.whenSimple(
      quantities[1],
      'denominator',
      { id: null, variation: 'simple', value: '128', unit: null, system: null, code: null }
    )

  })
})

const specialChars = /[.*+?^${}()|[\]\\]/g

function RegEscape(input: string) {
  return input.replace(specialChars, '\\$&')
}

function anyMatcher(...token: string[]) {
  const escapedTokens = token.map(RegEscape)
  const expression = escapedTokens.join('|')
  return new RegExp(expression)
}
