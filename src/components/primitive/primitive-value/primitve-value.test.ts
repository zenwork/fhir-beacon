import '../../../index'
import {expect, fixture} from '@open-wc/testing'
import {html}            from 'lit'
import {dimmensions}     from '../../../../tests/dimensions'
import {PrimitiveValue}  from './primitive-value'

describe('fhir primitive value', () => {

  it('should display nothing', async () => {

    const el = await fixture<PrimitiveValue>(html`
      <fhir-value ></fhir-value >
    `)

    await expect(el).shadowDom.to.equal(`
            <div >
              <span class="placeholder">n/a</span >
            </div >
      `)

  })

  it('should display text', async () => {

    const el = await fixture<PrimitiveValue>(html`
      <fhir-value text="hello"></fhir-value >
    `)

    await expect(el).shadowDom.to.equal(`
             <div>
                <slot name="before"></slot>
                hello
                <slot name="after"></slot>
             </div>
      `)

  })

  it('should display link', async () => {

    const el = await fixture<PrimitiveValue>(html`
      <fhir-value text="hello" link="https://google.com"></fhir-value >
    `)

    await expect(el).shadowDom.to.equal(`
            <div>
             <a href="https://google.com">
                <slot name="before"></slot>
                hello
                <slot name="after"></slot>
             </a>
            </div>
      `)

  })

  it('should display context', async () => {

    const el = await fixture<PrimitiveValue>(html`
      <fhir-value text="" placeholder="missing value"></fhir-value >
    `)

    await expect(el).shadowDom.to.equal(`
            <div>
              <span class="placeholder">
                missing value
              </span>
            </div>


      `)

  })

  it('should display prefix and suffixes', async () => {

    const el = await fixture<PrimitiveValue>(html`
      <fhir-value text="100">
        <span slot="before">over</span >
        <span slot="after">percent</span >
      </fhir-value >
    `)

    await expect(el).shadowDom.to.equal(`
            <div>
              <slot name="before"></slot>
              100
              <slot name="after"></slot>
            </div>


      `)

    await expect(el).lightDom.to.equal(`
      <span slot="before">over</span>
      <span slot="after">percent</span>
    `)

  })


  it('should display text with hide-overflow', async () => {

    const el = await fixture<PrimitiveValue>(html`
      <fhir-value text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Praesent elementum facilisis leo vel fringilla est ullamcorper eget. Massa ultricies mi quis hendrerit dolor magna eget est lorem. Amet luctus venenatis lectus magna fringilla urna porttitor. Dolor sed viverra ipsum nunc aliquet bibendum enim facilisis gravida. Tellus in hac habitasse platea. Posuere urna nec tincidunt praesent semper feugiat nibh. Tortor pretium viverra suspendisse potenti nullam ac tortor. Fusce id velit ut tortor pretium viverra suspendisse potenti. Enim eu turpis egestas pretium aenean pharetra. Non consectetur a erat nam at lectus. Amet est placerat in egestas erat imperdiet sed." variant="hide-overflow"></fhir-value >
    `)

    await expect(el).shadowDom.to.equal(`
             <div class="hide-overflow">
                <slot name="before"></slot>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Praesent elementum facilisis leo vel fringilla est ullamcorper eget. Massa ultricies mi quis hendrerit dolor magna eget est lorem. Amet luctus venenatis lectus magna fringilla urna porttitor. Dolor sed viverra ipsum nunc aliquet bibendum enim facilisis gravida. Tellus in hac habitasse platea. Posuere urna nec tincidunt praesent semper feugiat nibh. Tortor pretium viverra suspendisse potenti nullam ac tortor. Fusce id velit ut tortor pretium viverra suspendisse potenti. Enim eu turpis egestas pretium aenean pharetra. Non consectetur a erat nam at lectus. Amet est placerat in egestas erat imperdiet sed.
                <slot name="after"></slot>
             </div>
      `)

    const div: HTMLDivElement | null | undefined = el.shadowRoot?.querySelector('div.hide-overflow')
    if (div) {
      const { h, w } = dimmensions(div, 'rem')

      await expect(h).to.equal(2)
      await expect(w).to.equal(30)
    } else {
      expect.fail('shadow root content not found')
    }

    //TODO get hover test to work

    // const mouseoverEvent = new MouseEvent('mouseover', {
    //   view: window,
    //   bubbles: true,
    //   cancelable: true
    // })
    //
    // el.dispatchEvent(mouseoverEvent)
    //
    // await elementUpdated(el)
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

  it('should display text with fixed width', async () => {

    const el = await fixture<PrimitiveValue>(html`
      <fhir-value text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Praesent elementum facilisis leo vel fringilla est ullamcorper eget. Massa ultricies mi quis hendrerit dolor magna eget est lorem. Amet luctus venenatis lectus magna fringilla urna porttitor. Dolor sed viverra ipsum nunc aliquet bibendum enim facilisis gravida. Tellus in hac habitasse platea. Posuere urna nec tincidunt praesent semper feugiat nibh. Tortor pretium viverra suspendisse potenti nullam ac tortor. Fusce id velit ut tortor pretium viverra suspendisse potenti. Enim eu turpis egestas pretium aenean pharetra. Non consectetur a erat nam at lectus. Amet est placerat in egestas erat imperdiet sed." variant="fixed-width"></fhir-value >
    `)

    await expect(el).shadowDom.to.equal(`
             <div class="fixed-width">
                <slot name="before"></slot>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Praesent elementum facilisis leo vel fringilla est ullamcorper eget. Massa ultricies mi quis hendrerit dolor magna eget est lorem. Amet luctus venenatis lectus magna fringilla urna porttitor. Dolor sed viverra ipsum nunc aliquet bibendum enim facilisis gravida. Tellus in hac habitasse platea. Posuere urna nec tincidunt praesent semper feugiat nibh. Tortor pretium viverra suspendisse potenti nullam ac tortor. Fusce id velit ut tortor pretium viverra suspendisse potenti. Enim eu turpis egestas pretium aenean pharetra. Non consectetur a erat nam at lectus. Amet est placerat in egestas erat imperdiet sed.
                <slot name="after"></slot>
             </div>
      `)

    const div: HTMLDivElement | null | undefined = el.shadowRoot?.querySelector('div.fixed-width')
    if (div) {
      const { w } = dimmensions(div, 'rem')

      await expect(w).to.equal(40)
    } else {
      expect.fail('shadow root content not found')
    }



  })
})
