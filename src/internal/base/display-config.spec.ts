import {html}                                     from 'lit'
import {describe, expect, it}                     from 'vitest'
import {aTimeout}                                 from '../../../tests/aTimeout'
import {fixture}                                  from '../../../tests/lit/lit-vitest-fixture'
import {Primitive, PrimitiveError, PrimitiveType} from '../../components'
import {DisplayMode}                              from '../../types'

describe('DisplayConfig', () => {
  describe('primitive', () => {
    it('should show error messages when \'showerror\' is set', async () => {

      const primitive = await fixture<Primitive>(html`
        <fhir-primitive label="something" value='abc' type="decimal" ?showerror=${true}></fhir-primitive >
      `).first()

      const element = primitive.queryByShadowText('TypeError: decimal must be a valid number')
      expect(element).toBeVisible()
      expect(getComputedStyle(element!).backgroundColor).toEqual('rgb(254, 202, 202)')

      primitive.showerror = false
      await primitive.updateComplete

      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      expect(element).not.toBeUndefined
      primitive.deepQuerySelector<PrimitiveError>({ select: ['fhir-error'], expect: 0 })

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

      expect(primitives[0].queryByShadowText('(week)')).toBeVisible()
      expect(primitives[1].queryByShadowText('(week - positiveInt)')).toBeVisible()

      primitives[0].verbose = true
      await aTimeout(200)

      expect(primitives[0].queryByShadowText('(week - decimal)')).toBeVisible()

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


      expect(primitives[0].queryByShadowText('something:')).toBeVisible()
      expect(primitives[0].queryByShadowText('23')).toBeVisible()

      expect(primitives[1].queryByShadowText('something:')).toBeVisible()
      expect(primitives[1].queryByShadowText('23')).toBeVisible()
      expect(primitives[1].queryByShadowText('∑')).toBeVisible()

      primitives[1].mode = DisplayMode.display
      await aTimeout(100)
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      expect(primitives[1].queryByShadowText('∑')).toBeNull


    })
  })
})
