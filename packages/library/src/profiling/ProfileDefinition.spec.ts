import {FhirElementData, ResourceData}                    from 'internal'
import {Array, Object, Optional, Static, String, Unknown} from 'runtypes'
import {describe, it}                                     from 'vitest'
import {ConstraintFn, StructureDefinition}                from './StructureDefinition'



type FhirElementDef = Object<{ id: Optional<String, never>, extension: Optional<Array<Object<{}>>, never> }>


describe('profileDefinition', () => {
  it('should be tested', () => {

    /*    const vitalSignDef = new StructureDefinition<ObservationData>(
     'Observation',
     'http://hl7.org/fhir/StructureDefinition/vitalsigns',
     'VitalSign',
     [
     {
     key: 'status',
     binding: useCodeChoices('vs-observation-status'),
     mustSupport: true
     },
     {
     key: 'category',
     cardinality: '1..*',
     children: [
     {
     key: 'coding',
     children: [
     {
     key: 'system',
     cardinality: '1..1',
     constraints: [
     fixedValue('system', 'http://terminology.hl7.org/CodeSystem/observation-category')
     ],
     mustSupport: true
     },
     {
     key: 'code',
     cardinality: '1..1',
     constraints: [
     fixedValue('code', 'vital-signs')
     ],
     mustSupport: true
     }
     ],
     mustSupport: true
     }
     ],
     mustSupport: true
     },
     {
     key: 'code',
     binding: useCodeChoices('vs-observation-vitalsignresult')
     },
     {
     key: 'subject',
     type: 'Reference(Patient)',
     mustSupport: true
     },
     {
     key: 'effective[x]',
     cardinality: '1..1',
     choiceOf: [
     { key: 'effectiveDateTime' },
     { key: 'effectivePeriod' }
     ],
     mustSupport: true
     },
     {
     key: 'value[x]',
     constraints: [
     (data: ObservationData) => {
     if (data.valueReference || data.dataAbsentReason) {
     return null
     } else {
     return {
     fqk: { path: [{ node: 'valueReference' }] },
     message: `valueReference or dataAbsentReason must be present`
     }
     }
     }
     ]
     },
     {
     key: 'dataAbsentReason',
     binding: useCodeChoices('vs-data-absent-reason'),
     constraints: [
     (data: ObservationData) => {
     if (data.valueReference || data.dataAbsentReason) {
     return null
     } else {
     return {
     fqk: { path: [{ node: 'dataAbsentReason' }] },
     message: `valueReference or dataAbsentReason must be present`
     }
     }
     }
     ]
     },
     {
     key: 'component',
     children: [
     {
     key: 'code',
     binding: useCodeChoices('vs-observation-vitalsignresult'),
     mustSupport: true
     },
     {
     key: 'value[x]',
     mustSupport: true
     }
     ],
     mustSupport: true


     }
     ],
     (data: ObservationData) => [html`test template: ${JSON.stringify(data)}`]
     )


     const bpDefinition = new StructureDefinition<ObservationData>(
     'Observation',
     'http://hl7.org/fhir/StructureDefinition/bp',
     'observation-bp',
     [
     {
     key: 'code',
     discriminator: 'BPCode',
     children: [
     {
     key: 'coding',
     cardinality: '1..1',
     children: [
     {
     key: 'system',
     cardinality: '1..1',
     constraints: [
     fixedValue<CodingData>('system', 'http://loinc.org')
     ]
     },
     {
     key: 'code',
     cardinality: '1..1',
     constraints: [
     fixedValue<CodingData>('code', '85354-9')
     ]
     }
     ]
     }
     ]
     },
     {
     key: 'component',
     discriminator: 'SystolicBP',
     type: 'BackboneElement[Array]',
     children: []
     }
     ],
     (data) => [html`test template: ${JSON.stringify(data)}`]
     )*/

    // fixture(html`test`)

  })

  it('should validate the base type alone when definition is not provided', async () => {

    const deff = { id: String.optional(), extension: Array(Unknown).optional() }
    const Base = Object(deff)
    type Base = Static<typeof Base>


    const def: StructureDefinition<Base> = new StructureDefinition<Base>({ runtype: Base })


    const dat: any = { id: 1234 }


    def.validate(dat)

  })
})

function fixedValue<T extends ResourceData | FhirElementData>(key: string, value: unknown): ConstraintFn<T> {
  return (data: T) => {
    // @ts-ignore
    if (data[key] && data[key] === value) {
      return null
    } else {
      return { fqk: { path: [{ node: key }] }, message: `${key} must be: ${value}` }
    }
  }
}
