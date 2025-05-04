import {html}                               from 'lit'
import {assert, describe, expect, it, test} from 'vitest'
import {aTimeout}                           from '../../../tests/aTimeout'
import {emptyLitShadow, fixture}            from '../../../tests/lit/lit-vitest-fixture'
import {Primitive}                          from './primitive'
import {PrimitiveLabel}                     from './primitive-label'
import {PrimitiveValue}                     from './primitive-value'



describe('fhir Primitive', () => {
  describe('logic', () => {

    test('should display nothing', async () => {
      const el = await fixture<Primitive>(html`
          <fhir-primitive></fhir-primitive>
      `).first()

      // TODO: find a way to assert emptiness better
      // only contains lit specific comments
      expect(el.shadowRoot!.innerHTML).toMatch(emptyLitShadow)

    })

    test('should display label', async () => {
      const el = await fixture<Primitive>(html`
          <fhir-primitive label="code" verbose></fhir-primitive>

      `).first()
      assert.isEmpty(el.queryShadow<PrimitiveLabel>({ select: 'fhir-label', expect: 0 }))
    })

    test('should should display a label when label attribute is defined', async () => {

      const el = await fixture<Primitive>(html`
          <fhir-primitive label="code" value="abc"></fhir-primitive>
      `).first()

      const label = el.queryShadow<PrimitiveLabel>({ select: 'fhir-label' })
      expect(label.text).to.equal('code')

      const value = el.queryShadow<PrimitiveValue>({ select: 'fhir-value' })
      expect(value.text).to.equal('abc')

    })

    test('should should display a label, a value', async () => {

      const el = await fixture<Primitive>(html`
          <fhir-primitive label="code" value="abc" context="important"></fhir-primitive>
      `).first()

      const label = el.queryShadow<PrimitiveLabel>({ select: 'fhir-label' })
      expect(label.text).to.equal('code')

      const value = el.queryShadow<PrimitiveValue>({ select: 'fhir-value' })
      expect(value.text).to.equal('abc')

      assert.ok(el.queryShadow<HTMLSpanElement>({ select: 'fhir-context', expect: 0 }))

    })

    test('should should display context only when verbose', async () => {

      const el = await fixture<Primitive>(html`
          <fhir-primitive label="code" value="abc" context="important" verbose></fhir-primitive>
      `).first()


      const span = el.queryShadow<HTMLSpanElement>({ select: ['fhir-context', 'span'] })
      expect(span.textContent).to.equal('(important - none)')

    })


    test('should display an error when the type-check fails', async () => {

      const el = await fixture<Primitive>(html`
          <fhir-primitive label="code" value="abc" type="decimal" showerror></fhir-primitive>
      `).first()

      const label = el.queryShadow<PrimitiveLabel>({ select: 'fhir-label' })
      expect(label!.text).to.equal('code')

      const value = el.queryShadow<PrimitiveValue>({ select: 'fhir-value' })
      expect(value!.text).to.equal('abc')

      const div = el.queryShadow<HTMLSpanElement>({ select: ['fhir-error', 'div'] })
      expect(div.textContent).to.equal('decimal must be a valid number: abc')

    })

    test('should display an error when a validation error is passed', async () => {

      const el = await fixture<Primitive>(html`
          <fhir-primitive label="code"
                          value="10"
                          type="decimal"
                          errormessage="should be less than 10"
                          showerror
          ></fhir-primitive>
      `).first()

      const label = el.queryShadow<PrimitiveLabel>({ select: 'fhir-label' })
      expect(label!.text).to.equal('code')

      const div = el.queryShadow<HTMLSpanElement>({ select: ['fhir-error', 'div'] })
      expect(div.textContent).to.equal('should be less than 10')

    })

    test('should display an error when a validation error is passed and type validation fails', async () => {

      const el = await fixture<Primitive>(html`
          <fhir-primitive label="code"
                          value="10.5"
                          type="integer"
                          errormessage="must be less than 10"
                          showerror
          ></fhir-primitive>
      `).first()

      const label = el.queryShadow<PrimitiveLabel>({ select: 'fhir-label' })
      expect(label!.text).to.equal('code')

      const div = el.queryShadow<HTMLSpanElement>({ select: ['fhir-error', 'div'] })
      expect(div.textContent).to.equal('Input must be a non-negative integer within the range 1 to'
                                       + ' 2,147,483,647 | must be less than 10')

    })

    test('should remove an error when a validation error is passed and then removed', async () => {

      const el: Primitive = await fixture<Primitive>(html`
          <fhir-primitive label="code"
                          value="11"
                          type="integer"
                          errormessage="must be less than 10"
                          showerror
          ></fhir-primitive>
      `).first()

      const div = el.queryShadow<HTMLSpanElement>({ select: ['fhir-error', 'div'] })
      expect(div.textContent).to.equal('must be less than 10')

      el.errormessage = ''

      await aTimeout()

      el.queryShadow<HTMLSpanElement>({ select: ['fhir-error'], expect: 0 })


    })

    test('should display an error value is missing but is required', async () => {

      const el = await fixture<Primitive>(html`
          <fhir-primitive key="required"
                          label="required"
                          mode="structure"
                          .value=${null}
                          showerror
                          required
          ></fhir-primitive>
      `).first()

      const label = el.queryShadow<PrimitiveLabel>({ select: 'fhir-label' })
      expect(label!.text).to.equal('required')

      const div = el.queryShadow<HTMLSpanElement>({ select: ['fhir-error', 'div'] })
      expect(div.textContent).to.equal('This property is required')

    })

    test('should display summary flag correctly', async () => {

      const all = await fixture<Primitive>(html`
          <fhir-shell summaryonly>

              <fhir-primitive label="required"
                              mode="structure"
                              .value= ${'show it'}
                              summary
              ></fhir-primitive>
              <fhir-primitive label="not required"
                              mode="structure"
                              .value= ${'don\'t show it'}
              ></fhir-primitive>
          </fhir-shell>
      `, 'fhir-primitive').all()

      assert.ok(all[0].queryShadow<HTMLDivElement>({ select: 'fhir-label', expect: 1 }))
      assert.ok(all[0].queryShadow<HTMLDivElement>({ select: 'fhir-value', expect: 1 }))

      assert.ok(all[1].queryShadow<HTMLDivElement>({ select: 'fhir-label', expect: 0 }))
      assert.ok(all[1].queryShadow<HTMLDivElement>({ select: 'fhir-value', expect: 0 }))

    })
  })

  describe('types', () => {
    it('Should display a boolean', async () => {

      const el = await fixture<Primitive>(html`
          <fhir-primitive label="test" .value=${false} type="boolean"></fhir-primitive>
      `).first()

      const value = el.queryShadow<PrimitiveLabel>({ select: ['fhir-value', 'div'] })

      expect(value.textContent!.trim()).to.equal('false')

    })
  })
})
