import {html}                   from 'lit'
import {describe, expect, test} from 'vitest'
import {dimmensions}            from '../../../../tests/dimensions'

import {fixture} from '../../../../tests/lit/lit-vitest-fixture'

import {PrimitiveValue} from './primitive-value'

describe('fhir primitive value', () => {

  test('should display placeholder', async () => {

    const el = await fixture<PrimitiveValue>(html`
      <fhir-value ></fhir-value >
    `).first()

    const element = el.deepQuerySelector({ select: 'span' }) as HTMLSpanElement
    expect(element?.classList[0]).toEqual('placeholder')
    await expect.element(element!).toHaveTextContent('n/a')

  })

  test('should display text', async () => {

    const el = await fixture<PrimitiveValue>(html`
      <fhir-value text="hello"></fhir-value >
    `).first()

    const element = el.deepQuerySelector({ select: 'div' }) as HTMLDivElement
    expect.element(element).toHaveTextContent('hello')

  })

  test('should display link', async () => {

    const el = await fixture<PrimitiveValue>(html`
      <fhir-value text="hello" link="https://google.com"></fhir-value >
    `).first()

    const element = el.deepQuerySelector({ select: 'a' }) as HTMLAnchorElement
    expect.element(element).toHaveTextContent('hello')
    expect(element.href).toEqual('https://google.com/')

  })

  test('should display context', async () => {

    const el = await fixture<PrimitiveValue>(html`
      <fhir-value text="" placeholder="missing value"></fhir-value >
    `).first()

    const span = el.deepQuerySelector({ select: 'span' }) as HTMLSpanElement
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


    const before = el.querySlot('before')[0]
    expect(before).toHaveTextContent(`over`)

    expect.element(el.renderRoot as Element).toHaveTextContent('100')

    const after = el.querySlot('after')[0]
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

    const div = el.deepQuerySelector<HTMLDivElement>({ select: 'div' })
    expect(div)
      .toHaveTextContent(text)

    if (div) {

      const { h, w } = dimmensions(div, 'rem')

      expect(h).to.equal(2)
      expect(w).to.equal(30)

    } else {
      expect.fail('shadow root content not found')
    }

    // TODO: next minor release might work better.
    // waiting for https://github.com/vitest-dev/vitest/pull/6175
    // await userEvent.hover(div)

    // await el.updateComplete

    // if (target) {
    //   const { h, w } = dimmensions(target, 'rem')
    //
    //   expect(h).to.equal(12)
    //   expect(w).to.equal(30)
    // } else {
    //   expect.fail('shadow root content not found')
    // }


  })

  test('should display text with fixed width', async () => {

    const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Praesent elementum facilisis leo vel fringilla est ullamcorper eget. Massa ultricies mi quis hendrerit dolor magna eget est lorem. Amet luctus venenatis lectus magna fringilla urna porttitor. Dolor sed viverra ipsum nunc aliquet bibendum enim facilisis gravida. Tellus in hac habitasse platea. Posuere urna nec tincidunt praesent semper feugiat nibh. Tortor pretium viverra suspendisse potenti nullam ac tortor. Fusce id velit ut tortor pretium viverra suspendisse potenti. Enim eu turpis egestas pretium aenean pharetra. Non consectetur a erat nam at lectus. Amet est placerat in egestas erat imperdiet sed.'

    const el = await fixture<PrimitiveValue>(html`
      <fhir-value text=${text} variant="fixed-width"></fhir-value > `).first()

    const div: HTMLDivElement = el.deepQuerySelector({ select: 'div' })
    expect(div)
      .toHaveTextContent(text)


    if (div) {
      const { w } = dimmensions(div, 'rem')
      expect(w).toEqual(40)
    } else { expect.fail('shadow root content not found') }

  })
})
