import {html, nothing, TemplateResult}                        from 'lit'
import {customElement}                                        from 'lit/decorators.js'
import {FhirAges, FhirDistances, FhirDuration}                from '../../../codesystems/code-systems'
import {BaseElement, Decorated, Validations} from '../../../internal'
import {DisplayConfig}                                        from '../../../types'
import {hasAllOrNone}                                         from '../../../utilities/hasAllOrNone'
import {isWholeNumber}                                        from '../../../utilities/isWhole'
import {
  asQuantityComparator
}                                                             from '../../primitive/type-presenters/asQuantityComparator'
import {QuantityData, QuantityVariations, SimpleQuantityData} from './quantity.data'
import {isQuantity, isSimpleQuantity}                         from './quantity.type-guards'


@customElement('fhir-quantity')
export class Quantity extends BaseElement<QuantityData | SimpleQuantityData> {

  private variation: QuantityVariations = QuantityVariations.unknown

  constructor() {super('Quantity')}


  public renderDisplay(config: DisplayConfig, data: QuantityData | SimpleQuantityData): TemplateResult[] {

    const displayValue: undefined | string | number = data.value
    const type: string = 'decimal'
    const after = data.unit || data.code
    if (isQuantity(data)) {
      return [
        html`
            <fhir-primitive .label=${this.label} .value=${displayValue} .type=${type}>
                <span slot="before">${data.comparator
                                      ? asQuantityComparator(data.comparator).display.toLowerCase()
                                      : nothing}&nbsp;</span >
                <span slot="after">&nbsp;${after}</span >
            </fhir-primitive >
        `
      ]
    }

    if (isSimpleQuantity(data)) {
      return [
        html`
            <fhir-primitive .label=${this.label} .value=${displayValue} .type=${type}>
                <span slot="after">&nbsp;${after} </span >
            </fhir-primitive >
        `
      ]
    }

    return [
      html`
          <fhir-not-supported
                  label="quantity"
                  description="must be Quantity or Simple Quantity"
          ></fhir-not-supported >`
    ]
  }

  public renderStructure(config: DisplayConfig, data: QuantityData | SimpleQuantityData): TemplateResult[] {

    if (isQuantity(data)) {
      return [
        html`
            <fhir-primitive label="variation" .value=${this.variation}></fhir-primitive >
            <fhir-primitive label="value" .value=${data.value} type="decimal" summary></fhir-primitive >
            <fhir-primitive label="comparator" .value=${data.comparator} type="code" summary></fhir-primitive >
            <fhir-primitive label="unit" .value=${data.unit} summary></fhir-primitive >
            <fhir-primitive label="system" .value=${data.system} type="uri" summary></fhir-primitive >
            <fhir-primitive label="code" .value=${data.code} type="code" summary></fhir-primitive >
        `
      ]
    }

    if (isSimpleQuantity(data)) {
      return [
        html`
            <fhir-primitive label="variation" .value=${this.variation}></fhir-primitive >
            <fhir-primitive label="value" .value=${data.value} type="decimal" summary></fhir-primitive >
            <fhir-primitive label="unit" .value=${data.unit} summary></fhir-primitive >
            <fhir-primitive label="system" .value=${data.system} type="uri" summary></fhir-primitive >
            <fhir-primitive label="code" .value=${data.code} type="code" summary></fhir-primitive >
        `
      ]
    }

    return [
      html`
          <fhir-not-supported
                  label="quantity"
                  description="must be Quantity or Simple Quantity"
          ></fhir-not-supported >`
    ]

  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public validate(data: QuantityData | SimpleQuantityData, validations: Validations, fetched: boolean) {

    if (!hasAllOrNone(data, ['code', 'system'])) {
      validations.addErr({
                           key: this.type + '::qty-3',
                           err: `${this.type}: code and system should be set or none of the two`
                         })
    }


  }

  public decorate(data: QuantityData): Decorated<QuantityData> | Decorated<SimpleQuantityData> {
    // rule: sqty-1
    if (data.comparator) {
      // convert html encoded strings such as &gt;
      data.comparator = new DOMParser().parseFromString(data.comparator, 'text/html').body.textContent ?? undefined
    } else {
      this.variation = QuantityVariations.simple
    }

    const isBlankOrUcum = !data.system || data.system.toString() === 'http://unitsofmeasure.org'

    // rule: dis-1
    if (data.unit
        && FhirDistances.find(d => data.code === d.code && data.system === d.source)) {
      this.variation = QuantityVariations.distance
    }


    // rule: cnt-3
    if (data.code === '1'
        && isBlankOrUcum
        && (!data.value || isWholeNumber(data.value))) {
      this.variation = QuantityVariations.count
    }

    // TODO: There is no guaranteed way to distinguish between a duration and an age. Is this a bug or a feature?
    // rule: drt-1
    if ((!data.value || data.code)
        && FhirDuration.find(d => data.code === d.code && data.system === d.source)
        && isBlankOrUcum
    ) {
      this.variation = QuantityVariations.duration
    }

    // rule: age-1
    if (data.value && data.value > 0
        && FhirAges.find(a => data.code === a.code && data.system === a.source)) {
      this.variation = QuantityVariations.age
    }
    return data as Decorated<QuantityData> | Decorated<SimpleQuantityData>
  }

}
