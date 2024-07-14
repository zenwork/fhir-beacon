import '../../../index'
import {expect, fixture} from '@open-wc/testing'
import {html}            from 'lit'
import {Primitive}       from '../primitive'

describe('fhir primitive label', () => {

  it('should display nothing', async () => {

    const el = await fixture<Primitive>(html`
      <fhir-label ></fhir-label >
    `)

    await expect(el).shadowDom.to.equal(`
    <label for=""><slot></slot></label>`)
  })

  it('should display slotted content', async () => {

    const el = await fixture<Primitive>(html`
      <fhir-label >id</fhir-label >
    `)

    await expect(el).shadowDom.to.equal(`
    <label for=""><slot></slot></label>`)

    await expect(el).lightDom.to.equal(`id`)
  })

  it('should display id label in error state', async () => {

    const el = await fixture<Primitive>(html`
      <fhir-label text="id" variant="error"></fhir-label >
    `)

    await expect(el).shadowDom.to.equal(`
    <label class="error" for="">id:<slot></slot></label>`)

    const label = el.shadowRoot?.querySelector('label')
    if (label) await expect(getComputedStyle(label).fontStyle).to.eq('italic')
  })

  it('should add for for label', async () => {

    const el = await fixture<Primitive>(html`
      <fhir-label for="identity" text="id"></fhir-label >
    `)

    await expect(el).shadowDom.to.equal(`
    <label for="identity">id:<slot></slot></label>`)

  })

  it('should use alternative delimiter', async () => {

    const el = await fixture<Primitive>(html`
      <fhir-label text="id" delimiter="->"></fhir-label >
    `)

    await expect(el).shadowDom.to.equal(`
    <label for="">id-><slot></slot></label>`)

  })
})
