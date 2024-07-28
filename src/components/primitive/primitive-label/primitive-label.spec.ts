import {html}                   from 'lit'
import {describe, expect, test} from 'vitest'
import {fixture}                from '../../../../tests/lit/lit-vitest-fixture'
import {PrimitiveLabel}         from './primitive-label'

describe('fhir primitive label', () => {

  test('should display nothing', async () => {

    const el = await fixture<PrimitiveLabel>(html`
      <fhir-label >foo</fhir-label >
    `).first()

    const label = el.deepQuerySelector({ select: 'label' })
    expect(label).toHaveTextContent('')

  })

  test('should display attribute value', async () => {

    const el = await fixture<PrimitiveLabel>(html`
      <fhir-label text="id"></fhir-label >
    `).first()

    const label = el.deepQuerySelector({ select: 'label' })
    expect(label).toHaveTextContent(`id`)

  })

  test('should display default slotted value', async () => {

    // language=HTML format=false
    const el = await fixture<PrimitiveLabel>(html`
      <fhir-label >special slotted id<div slot="ignored">don't show</div ></fhir-label >
    `).first()

    const slot = el.queryDefaultSlot()
    expect(slot.length).toEqual(1)
    expect(slot[0].textContent).toStrictEqual(`special slotted id`)

  })


  test('should display id label in error state', async () => {

    const el = await fixture<PrimitiveLabel>(html`
      <fhir-label text="id" variant="error"></fhir-label >
    `).first()

    const label = el.deepQuerySelector<HTMLLabelElement>({ select: 'label' })
    expect(label).toHaveTextContent(`id`)
    expect(getComputedStyle(label!).fontStyle).to.eq('italic')

  })

  test('should add for for label', async () => {

    const el = await fixture<PrimitiveLabel>(html`
      <fhir-label for="identity" text="id"></fhir-label >
    `).first()

    const label = el.deepQuerySelector<HTMLLabelElement>({ select: 'label' })
    expect(label!.htmlFor).toEqual(`identity`)

  })

  test('should use alternative delimiter', async () => {

    const el = await fixture<PrimitiveLabel>(html`
      <fhir-label text="id" delimiter="->"></fhir-label >
    `).first()

    const label = el.deepQuerySelector({ select: 'label' })
    expect(label).toHaveTextContent(`id->`)

  })

})
