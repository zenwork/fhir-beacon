import {describe, expect, test}               from 'vitest'
import {FhirDataContext, FhirDataContextImpl} from '../../internal/contexts/FhirContextData'

import {PrimitiveValidator, PrimitiveValueHost} from './primitive.validator'
import {PrimitiveType}                          from './type-converters'



function createMockPrimitive(): { events: Event[], host: PrimitiveValueHost } {
  const events: Event[] = []
  return {
    events,
    host: {
      type: PrimitiveType.decimal,
      value: '10.0',
      choices: [],
      error: false,
      key: 'quantity',
      contextData: undefined,
      // biome-ignore lint/suspicious/noEmptyBlockStatements: <explanation>
      dispatchEvent: (event: Event) => events.push(event),
      required: false,
      presentableError: '',
      presentableTypeError: '',
      presentableValue: ''
    }
  }
}

describe('Primitive Validator', () => {


  test('should not change anything when there are no changes', () => {
    const { host } = createMockPrimitive()
    const validator: PrimitiveValidator = new PrimitiveValidator(host)

    validator.validate({})

    expect(host.error).to.be.false
    expect(host.presentableError).to.be.empty
    expect(host.presentableTypeError).to.be.empty
    expect(host.presentableValue).to.be.empty
  })

  test('should populate presentation value when valid', () => {
    const { events, host } = createMockPrimitive()
    const validator: PrimitiveValidator = new PrimitiveValidator(host)

    validator.validate({ valueChanged: true })

    expect(host.error).to.be.false
    expect(host.presentableError).to.be.empty
    expect(host.presentableTypeError).to.be.empty
    expect(host.presentableValue).toEqual(10.0)
    expect(events.length).to.equal(1)
    expect(events[0].type).to.equal('bkn-valid')
  })

  test('should populate presentation error when invalid', () => {
    const { events, host } = createMockPrimitive()
    host.value = 'abc'
    const validator: PrimitiveValidator = new PrimitiveValidator(host)

    validator.validate({ valueChanged: true })

    expect(host.error).to.be.true
    expect(host.presentableError).toEqual('')
    expect(host.presentableTypeError).toEqual('TypeError: decimal must be a valid number: abc')
    expect(host.presentableValue).toEqual('abc')
    expect(events.length).to.equal(1)
    expect(events[0].type).to.equal('bkn-invalid')
  })

  test('should populate presentation error when error message is provided', () => {
    const { events, host } = createMockPrimitive()
    host.type = PrimitiveType.none
    host.errormessage = 'Some error message'
    host.value = 'abc'
    const validator: PrimitiveValidator = new PrimitiveValidator(host)

    validator.validate({ valueChanged: true, errormessageChanged: true })

    expect(host.error).to.be.true
    expect(host.presentableError).toEqual('Some error message')
    expect(host.presentableTypeError).toEqual('')
    expect(host.presentableValue).toEqual('abc')
    expect(events.length).to.equal(1)
    expect(events[0].type).to.equal('bkn-invalid')
  })

  test('should populate presentation error when value not provided but is set as required', () => {
    const { events, host } = createMockPrimitive()
    host.value = ''
    host.required = true
    const validator: PrimitiveValidator = new PrimitiveValidator(host)

    validator.validate({ valueChanged: true, requiredChanged: true })

    expect(host.error).to.be.true
    expect(host.presentableError).toEqual('Error: this property is required')
    expect(host.presentableTypeError).toEqual('')
    expect(host.presentableValue).toEqual('')
    expect(events.length).to.equal(1)
    expect(events[0].type).to.equal('bkn-invalid')
  })

  test('should do something when valuepath changes', () => {
    const { events, host } = createMockPrimitive()
    host.value = ''
    host.type = PrimitiveType.fhir_string
    host.valuePath = '$.id'
    const contextData: FhirDataContext = new FhirDataContextImpl()
    contextData.data = { id: 'abc-123' }
    host.contextData = contextData

    const validator: PrimitiveValidator = new PrimitiveValidator(host)

    validator.validate({ valuePathChanged: true })
    validator.validate({ valueChanged: true })

    expect(host.error).to.be.false
    expect(host.presentableError).toEqual('')
    expect(host.presentableTypeError).toEqual('')
    expect(host.presentableValue).toEqual('abc-123')
    expect(events.length).to.equal(1)
    expect(events[0].type).to.equal('bkn-valid')
  })

})
