import {expect}                    from 'vitest'
import {Quantity}                  from '../../src/components/complex/quantity'
import {Primitive, PrimitiveLabel} from '../../src/components/primitive'
import {testPrimitive}             from './testPrimitive'


export const BeaconAssert = {
  hasLabelsAndValues: {
    for: {
      quantity: {
        whenSimple: function simple(
          quantity: Quantity, label: string,
          { id, variation, value, unit, system, code }: QuantitySimple) {

          expect(quantity.queryShadow<PrimitiveLabel[]>({ select: 'label', expect: 7 })[0]).toHaveTextContent(label)

          const primitives = quantity.queryShadow<Primitive[]>({ select: 'fhir-primitive', expect: 6 })

          testPrimitive(primitives[0], { key: 'id', value: id })
          testPrimitive(primitives[1], { key: 'variation', value: variation })
          testPrimitive(primitives[2], { key: 'value', value: value })
          testPrimitive(primitives[3], { key: 'unit', value: unit })
          testPrimitive(primitives[4], { key: 'system', value: system })
          testPrimitive(primitives[5], { key: 'code', value: code })

        }
      }
    }
  }
}

type QuantitySimple = {
  id: string | null | undefined,
  variation: string | null | undefined,
  value: string | null | undefined,
  unit: string | null | undefined,
  system: string | null | undefined,
  code: string | null | undefined
}
