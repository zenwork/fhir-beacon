import {userEvent}              from '@vitest/browser/context'
import {html}                   from 'lit'
import {describe, expect, test} from 'vitest'
import {aTimeout}               from '../../../../tests/aTimeout'
import {dimmensions}            from '../../../../tests/dimensions'

import {fixture} from '../../../../tests/lit/lit-vitest-fixture'

import {PrimitiveValue} from './primitive-value'

describe('fhir primitive value', () => {

  test('should display placeholder', async () => {

    const el = await fixture<PrimitiveValue>(html`
      <fhir-value ></fhir-value >
    `).first()

    const element = el.queryShadow({ select: 'span' }) as HTMLSpanElement
    expect(element?.classList[0]).toEqual('placeholder')
    await expect.element(element!).toHaveTextContent('n/a')

  })

  test('should display text', async () => {

    const el = await fixture<PrimitiveValue>(html`
      <fhir-value text="hello"></fhir-value >
    `).first()

    const element = el.queryShadow({ select: 'div' }) as HTMLDivElement
    await expect.element(element).toHaveTextContent('hello')

  })

  test('should display link', async () => {

    const el = await fixture<PrimitiveValue>(html`
      <fhir-value text="hello" link="https://google.com"></fhir-value >
    `).first()

    const element = el.queryShadow({ select: 'a' }) as HTMLAnchorElement
    await expect.element(element).toHaveTextContent('hello')
    expect(element.href).toEqual('https://google.com/')

  })

  test('should display context', async () => {

    const el = await fixture<PrimitiveValue>(html`
      <fhir-value text="" placeholder="missing value"></fhir-value >
    `).first()

    const span = el.queryShadow({ select: 'span' }) as HTMLSpanElement
    expect(span.classList[0]).toEqual(`placeholder`)
    expect(span.textContent).toEqual(`missing value`)

  })

  test('should display prefix and suffixes', async () => {

    const el = await fixture<PrimitiveValue>(html`
      <fhir-value text="100">
        <span slot="before">over</span >
        <span slot="after">percent</span >
      </fhir-value >
    `).first()

    const before = el.queryShadowNamedSlot('before')[0]
    expect(before).toHaveTextContent(`over`)

    expect(el.shadowRoot).toHaveTextContent('100')

    const after = el.queryShadowNamedSlot('after')[0]
    expect(after).toHaveTextContent(`percent`)

  })


  test('should display text with hide-overflow', async () => {

    const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Praesent elementum facilisis leo vel fringilla est ullamcorper eget. Massa ultricies mi quis hendrerit dolor magna eget est lorem. Amet luctus venenatis lectus magna fringilla urna porttitor. Dolor sed viverra ipsum nunc aliquet bibendum enim facilisis gravida. Tellus in hac habitasse platea. Posuere urna nec tincidunt praesent semper feugiat nibh. Tortor pretium viverra suspendisse potenti nullam ac tortor. Fusce id velit ut tortor pretium viverra suspendisse potenti. Enim eu turpis egestas pretium aenean pharetra. Non consectetur a erat nam at lectus. Amet est placerat in egestas erat imperdiet sed.'

    const el = await fixture<PrimitiveValue>(html`
      <div style="height:5rem; width:10rem">
      <fhir-value text="${text}" variant="hide-overflow"></fhir-value >
      </div >
    `).first()

    await el.updateComplete

    let div = el.queryShadow<HTMLDivElement>({ select: 'div' })
    expect(div).toHaveTextContent(text)
    await userEvent.unhover(div)
    await aTimeout(1000)

    if (div) {

      const { h, w } = dimmensions(div, 'rem')

      expect(h).to.equal(2)
      expect(w).to.equal(30)

    } else {
      expect.fail('shadow root content not found')
    }


    await userEvent.hover(div)
    await aTimeout(1000)

    div = el.queryShadow<HTMLDivElement>({ select: 'div' })

    if (div) {
      const { h, w } = dimmensions(div, 'rem')

      expect(h).to.equal(12)
      expect(w).to.equal(30)
    } else {
      expect.fail('shadow root content not found')
    }


  })

  test('should display text with fixed width', async () => {

    const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Praesent elementum facilisis leo vel fringilla est ullamcorper eget. Massa ultricies mi quis hendrerit dolor magna eget est lorem. Amet luctus venenatis lectus magna fringilla urna porttitor. Dolor sed viverra ipsum nunc aliquet bibendum enim facilisis gravida. Tellus in hac habitasse platea. Posuere urna nec tincidunt praesent semper feugiat nibh. Tortor pretium viverra suspendisse potenti nullam ac tortor. Fusce id velit ut tortor pretium viverra suspendisse potenti. Enim eu turpis egestas pretium aenean pharetra. Non consectetur a erat nam at lectus. Amet est placerat in egestas erat imperdiet sed.'

    const el = await fixture<PrimitiveValue>(html`
      <fhir-value text=${text} variant="fixed-width"></fhir-value > `).first()

    const div: HTMLDivElement = el.queryShadow({ select: 'div' })
    expect(div)
      .toHaveTextContent(text)


    if (div) {
      const { w } = dimmensions(div, 'rem')
      expect(w).toEqual(40)
    } else { expect.fail('shadow root content not found') }

  })
})
