import {html}                   from 'lit'
import {describe, expect, test} from 'vitest'
import {dimmensions}            from '../../../../tests/dimensions'
import {getSlotContent}         from '../../../../tests/get-slot-content'
import {fixture}                from '../../../../tests/lit-vitest-fixture'
import {queryShadow}            from '../../../../tests/query-shadow'
import {PrimitiveValue}         from './primitive-value'

describe('fhir primitive value', () => {

  test('should display paceholder', async () => {

    const el = await fixture<PrimitiveValue>(html`
      <fhir-value ></fhir-value >
    `).first()

    const element = el.deepQuerySelector('span') as HTMLSpanElement
    expect(element?.classList[0]).toEqual('placeholder')
    await expect.element(element!).toHaveTextContent('n/a')

  })

  test('should display text', async () => {

    const el = await fixture<PrimitiveValue>(html`
      <fhir-value text="hello"></fhir-value >
    `).first()

    const element = await el.deepQuerySelector('div') as HTMLDivElement
    expect.element(element).toHaveTextContent('hello')

  })

  test('should display link', async () => {

    const el = await fixture<PrimitiveValue>(html`
      <fhir-value text="hello" link="https://google.com"></fhir-value >
    `).first()

    const element = await el.deepQuerySelector('a') as HTMLAnchorElement
    expect.element(element).toHaveTextContent('hello')
    expect(element.href).toEqual('https://google.com/')

  })

  test('should display context', async () => {

    const el = await fixture<PrimitiveValue>(html`
      <fhir-value text="" placeholder="missing value"></fhir-value >
    `).first()

    const span = el.deepQuerySelector('span') as HTMLSpanElement
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


    const before = queryShadow<HTMLSlotElement>(el, 'slot[name="before"]')
    expect(getSlotContent(before)).toEqual(`over`)

    expect.element(el.renderRoot as Element).toHaveTextContent('100')

    const after = queryShadow<HTMLSlotElement>(el, 'slot[name="after"]')
    expect(getSlotContent(after)).toEqual(`percent`)

  })


  test('should display text with hide-overflow', async () => {

    const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Praesent elementum facilisis leo vel fringilla est ullamcorper eget. Massa ultricies mi quis hendrerit dolor magna eget est lorem. Amet luctus venenatis lectus magna fringilla urna porttitor. Dolor sed viverra ipsum nunc aliquet bibendum enim facilisis gravida. Tellus in hac habitasse platea. Posuere urna nec tincidunt praesent semper feugiat nibh. Tortor pretium viverra suspendisse potenti nullam ac tortor. Fusce id velit ut tortor pretium viverra suspendisse potenti. Enim eu turpis egestas pretium aenean pharetra. Non consectetur a erat nam at lectus. Amet est placerat in egestas erat imperdiet sed.'

    const el = await fixture<PrimitiveValue>(html`
      <fhir-value text="${text}" variant="hide-overflow"></fhir-value >
    `).first()

    const div: HTMLDivElement = queryShadow(el, 'div')
    expect(div)
      .toHaveTextContent(text)

    if (div) {

      const { h, w } = dimmensions(div, 'rem')

      await expect(h).to.equal(2)
      await expect(w).to.equal(30)

    } else {
      expect.fail('shadow root content not found')
    }

    // TODO: next minor release might work better.
    // const target = document.querySelector('fhir-value')
    // console.log(target)
    // await userEvent.hover(target!,{timeout:2000})
    //
    //
    // if (div) {
    //   const { h, w } = dimmensions(div, 'rem')
    //
    //   await expect(h).to.equal(12)
    //   await expect(w).to.equal(30)
    // } else {
    //   expect.fail('shadow root content not found')
    // }


  })

  test('should display text with fixed width', async () => {

    const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Praesent elementum facilisis leo vel fringilla est ullamcorper eget. Massa ultricies mi quis hendrerit dolor magna eget est lorem. Amet luctus venenatis lectus magna fringilla urna porttitor. Dolor sed viverra ipsum nunc aliquet bibendum enim facilisis gravida. Tellus in hac habitasse platea. Posuere urna nec tincidunt praesent semper feugiat nibh. Tortor pretium viverra suspendisse potenti nullam ac tortor. Fusce id velit ut tortor pretium viverra suspendisse potenti. Enim eu turpis egestas pretium aenean pharetra. Non consectetur a erat nam at lectus. Amet est placerat in egestas erat imperdiet sed.'

    const el = await fixture<PrimitiveValue>(html`
      <fhir-value text=${text} variant="fixed-width"></fhir-value > `).first()

    const div: HTMLDivElement = queryShadow(el, 'div')
    expect(div)
      .toHaveTextContent(text)


    // if (div) {
    //   const { w } = dimmensions(div, 'rem')
    //   await expect(w).to.equal(40)
    // } else { expect.fail('shadow root content not found') }
  })
})
