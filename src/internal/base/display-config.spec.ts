import {html}                                                             from 'lit'
import {assert, describe, expect, it}                                     from 'vitest'
import {aTimeout}                                                         from '../../../tests/aTimeout'
import {fixture}                                                          from '../../../tests/lit/lit-vitest-fixture'
import {Annotation, Medication, Primitive, PrimitiveError, PrimitiveType} from '../../components'
import {
  data as annotationData
}                                                                         from '../../components/complex/annotation/annotation.story.data'
import {Shell}                                                            from '../../shell'
import {DisplayMode}                                                      from '../../types'


describe('DisplayConfig', () => {
  describe('primitive', () => {
    it('should show error messages when \'showerror\' is set', async () => {

      const primitive = await fixture<Primitive>(html`
        <fhir-primitive label="something" value='abc' type="decimal" ?showerror=${true}></fhir-primitive >
      `).first()

      await aTimeout(500)

      const element = primitive.queryShadowByText('TypeError: decimal must be a valid number: abc')
      expect(element).toBeVisible()
      expect(getComputedStyle(element!).backgroundColor).toEqual('rgb(254, 202, 202)')

      primitive.showerror = false
      await primitive.updateComplete

      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      expect(element).not.toBeUndefined
      primitive.queryShadow<PrimitiveError>({ select: ['fhir-error'], expect: 0 })

    })

    it('should show different context when \'verbose\' is set', async () => {

      const primitives = await fixture<Primitive>(html`
        <fhir-primitive
          label="something"
          value='23'
          context="week"
          type="${PrimitiveType.decimal}"
          ?verbose=${false}
        ></fhir-primitive >
        <fhir-primitive
          label="something"
          value='23'
          context="week"
          type="${PrimitiveType.positiveInt}"
          ?verbose=${true}
        ></fhir-primitive >
      `).all()

      assert.ok(primitives[0].queryShadow({ select: 'fhir-context', expect: 0 }))
      expect(primitives[1].queryShadowByText('(week - positiveInt)')).toBeVisible()

      primitives[0].verbose = true
      await aTimeout(200)

      expect(primitives[0].queryShadowByText('(week - decimal)')).toBeVisible()

    })

    it('should show different layout when mode is changed', async () => {
      const primitives = await fixture<Primitive>(html`
        <fhir-primitive
          label="something"
          value='23'
          type="${PrimitiveType.decimal}"
        ></fhir-primitive >
        <fhir-primitive
          label="something"
          value='23'
          type="${PrimitiveType.positiveInt}"
          mode="structure" summary
        ></fhir-primitive >
      `).all()


      expect(primitives[0].queryShadowByText('something:')).toBeVisible()
      expect(primitives[0].queryShadowByText('23')).toBeVisible()

      expect(primitives[1].queryShadowByText('something:')).toBeVisible()
      expect(primitives[1].queryShadowByText('23')).toBeVisible()
      expect(primitives[1].queryShadowByText('∑')).toBeVisible()

      primitives[1].mode = DisplayMode.display
      await aTimeout()

      assert.isNull(primitives[1].queryShadowByText('∑'))

    })
  })
  describe('complex types', () => {
    it('should show nothing when there is no data and verbose is enabled', async () => {
      const annotation = await fixture<Annotation>(html`
        <fhir-shell verbose showerror>
            <fhir-annotation ></fhir-annotation >
        </fhir-shell >
      `, new Annotation().tagName).first()

      await aTimeout()

      assert.ok(annotation.queryShadow({ select: '*', expect: 14 }))
      /* eslint-disable @typescript-eslint/no-unused-expressions   */
      expect(annotation.queryShadowByText('error:')).toBeVisible
      expect(annotation.queryShadowByText('No data provided')).toBeVisible
      expect(annotation.queryShadowByText('the data or data-path property must be provided')).toBeVisible

    })

    it('should be empty when verbose is not enabled', async () => {
      const annotation = await fixture<Annotation>(html`
        <fhir-shell >
          <fhir-annotation ></fhir-annotation >
        </fhir-shell >
      `, new Annotation().tagName).first()

      await aTimeout()

      assert.isEmpty(annotation.queryShadow({ select: '*', expect: 0 }))

    })

    it('should show different layout when mode changes', async () => {

      const annotation = await fixture<Annotation>(html`
        <fhir-shell mode="structure">
            <fhir-annotation .data=${annotationData} summary></fhir-annotation >
        </fhir-shell >
      `, new Annotation().tagName).first()

      assert.ok(annotation.queryShadow({ select: 'fhir-structure-wrapper', expect: 2 }))
      assert.ok(annotation.queryShadow({ select: 'fhir-wrapper', expect: 0 }))
      assert.ok(annotation.queryShadow({ select: 'fhir-primitive', expect: 7 }))

      const shell = document.body.querySelector<Shell>('fhir-shell')!
      shell.mode = DisplayMode.structure
      shell.summaryonly = true
      await aTimeout()
      assert.ok(annotation.queryShadow({ select: 'fhir-structure-wrapper', expect: 2 }))
      assert.ok(annotation.queryShadow({ select: 'fhir-primitive', expect: 7 }))

      shell.mode = DisplayMode.display
      shell.summaryonly = false
      await aTimeout()
      assert.ok(annotation.queryShadow({ select: 'fhir-wrapper', expect: 0 }))
      assert.ok(annotation.queryShadow({ select: 'fhir-primitive', expect: 3 }))

      shell.summaryonly = true
      await aTimeout()
      assert.ok(annotation.queryShadow({ select: 'fhir-wrapper', expect: 0 }))
      assert.ok(annotation.queryShadow({ select: 'fhir-primitive', expect: 3 }))

      shell.mode = DisplayMode.debug
      await aTimeout()
      assert.ok(annotation.queryShadow({ select: 'fhir-debug', expect: 1 }))
      assert.ok(annotation.queryShadow({ select: 'fhir-primitive', expect: 0 }))

    })

    it('should show same layout when mode changes to summary mode', async () => {

      const annotation = await fixture<Annotation>(html`
          <fhir-shell mode="structure">
              <fhir-annotation .data=${annotationData} summary></fhir-annotation >
          </fhir-shell >
      `, new Annotation().tagName).first()


      assert.ok(annotation.queryShadow({ select: 'fhir-structure-wrapper', expect: 2 }))
      assert.ok(annotation.queryShadow({ select: 'fhir-wrapper', expect: 0 }))
      assert.ok(annotation.queryShadow({ select: 'fhir-primitive', expect: 7 }))

      const shell = document.body.querySelector<Shell>('fhir-shell')!
      shell.summaryonly = true
      await aTimeout()
      assert.ok(annotation.queryShadow({ select: 'fhir-structure-wrapper', expect: 2 }))
      assert.ok(annotation.queryShadow({ select: 'fhir-primitive', expect: 7 }))

      shell.mode = DisplayMode.display
      shell.summaryonly = true
      await aTimeout()
      assert.ok(annotation.queryShadow({ select: 'fhir-structure-wrapper', expect: 0 }))
      assert.ok(annotation.queryShadow({ select: 'fhir-primitive', expect: 3 }))


    })

    it('should show more when verbose is set on structure', async () => {

      const annotation = await fixture<Annotation>(html`
        <fhir-shell mode="structure">
          <fhir-annotation .data=${annotationData}></fhir-annotation >
        </fhir-shell >
      `, new Annotation().tagName).first()

      await aTimeout()
      assert.ok(annotation.queryShadow({ select: 'fhir-structure-wrapper', expect: 2 }))
      assert.ok(annotation.queryShadow({ select: 'fhir-primitive', expect: 7 }))

      const shell = document.body.querySelector<Shell>('fhir-shell')!
      shell.verbose = true
      await aTimeout(200)
      assert.ok(annotation.queryShadow({ select: 'fhir-structure-wrapper', expect: 7 }))
      assert.ok(annotation.queryShadow({ select: 'fhir-primitive', expect: 18 }))

    })


  })
  describe('resource types', () => {
    it('should show resource errors when verbose is enabled', async () => {
      const medication = await fixture<Medication>(html`
        <fhir-shell verbose showerror>
          <fhir-medication ></fhir-medication >
        </fhir-shell >
      `, new Medication().tagName).first()

      await aTimeout(500)


      const collection = medication.shadowedChildren()

      expect(collection.length).toEqual(1)
      const primitive = collection.item(0)! as HTMLDivElement
      expect(primitive.queryShadowByText('the data or data-path property must be provided')).toBeVisible()
      const shell: Shell = document.body.querySelector('fhir-shell')!

      shell.showerror = false
      await aTimeout()

      assert.isEmpty(medication.queryShadow({ select: 'fhir-error', expect: 0 }))

      expect(medication.queryShadowByText('No Data provided'))

    })

    it('should be empty when not verbose', async () => {
      const medication = await fixture<Medication>(html`
        <fhir-shell >
          <fhir-medication ></fhir-medication >
        </fhir-shell >
      `, new Medication().tagName).first()

      await aTimeout()


      assert.isEmpty(medication.queryShadow({ select: '*', expect: 0 }))

    })

  })
})
