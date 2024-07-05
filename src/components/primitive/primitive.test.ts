import {expect, fixture} from '@open-wc/testing'
import {html}            from 'lit'
import {Primitive}       from './primitive'
import '../../../index'

describe('fhir Primitive', () => {

  it('should display nothing', async () => {
    const el = await fixture<Primitive>(html`
      <fhir-primitive ></fhir-primitive >
    `)
    await expect(el).shadowDom.to.equal('')
  })

  it('should display label', async () => {
    const el = await fixture<Primitive>(html`
      <fhir-primitive label="code" verbose></fhir-primitive >
    `)
    await expect(el).shadowDom.to
      .equal(`
          <fhir-primitive-wrapper>
            <fhir-label delimiter=": " text="code"></fhir-label>
          </fhir-primitive-wrapper>
      `)


  })

  it('should should display a label when label attribute is defined', async () => {
    const el = await fixture<Primitive>(html`
      <fhir-primitive label="code" value="abc"></fhir-primitive >
    `)

    await expect(el).shadowDom.to.equal(`
      <fhir-primitive-wrapper>
        <fhir-label delimiter=": " text="code" > </fhir-label>
        <fhir-value link="" text="abc" >
          <span slot="before">
            <slot name="before">
            </slot>
          </span>
          <span slot="after">
            <slot name="after">
            </slot>
          </span>
      </fhir-value>
      </fhir-primitive-wrapper>


    `)


  })

  it('should should display a label, a value, and a context', async () => {
    const el = await fixture<Primitive>(html`
      <fhir-primitive label="code" value="abc" context="important"></fhir-primitive >
    `)

    await expect(el).shadowDom.to.equal(`
      <fhir-primitive-wrapper>
        <fhir-label delimiter=": " text="code" > </fhir-label>
        <fhir-value link="" text="abc" >
          <span slot="before">
            <slot name="before">
            </slot>
          </span>
          <span slot="after">
            <slot name="after">
            </slot>
          </span>
      </fhir-value>
      <fhir-context></fhir-context>
      </fhir-primitive-wrapper>


    `)
  })


  xit('should display a label, a value, and an error', async () => {
    const el = await fixture<Primitive>(html`
      <fhir-primitive label="code" value="abc" type="decimal" showerror></fhir-primitive >
    `)

    await expect(el).shadowDom.to.equal(`
      <fhir-primitive-wrapper>
        <fhir-label delimiter=": " text="code" variant="error"></fhir-label>
        <fhir-value link="" text="abc" variant="error">
        </fhir-value>
        <fhir-error text="TypeError: decimal must be a valid number"></fhir-error>
      </fhir-primitive-wrapper>
    `)

    await expect(el).dom.to.equalSnapshot()

  })
})
