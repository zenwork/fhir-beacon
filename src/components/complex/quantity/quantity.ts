import {html, nothing, TemplateResult}         from 'lit'
import {customElement}                         from 'lit/decorators.js'
import {FhirAges, FhirDistances, FhirDuration} from '../../../codesystems/code-systems'
import {ValidationErrors}                      from '../../../internal/base/base-element'
import {BaseElementContextConsumer}            from '../../../internal/base/base-element-context-consumer'
import {renderError}                           from '../../../shell/layout/renderError'
import {hasAllOrNone}                          from '../../../utilities/hasAllOrNone'
import {isWholeNumber}                         from '../../../utilities/isWhole'
import {asQuantityComparator}                  from '../../primitive/type-presenters/asQuantityComparator'
import {QuantityData, SimpleQuantityData}      from './quantity.data'


import {isQuantity, isSimpleQuantity} from './quantity.type-guards'

//TODO: rename to fhir-quanity
@customElement('fhir-quantity')
export class Quantity extends BaseElementContextConsumer<QuantityData | SimpleQuantityData> {
  private variation: QuantityVariations = QuantityVariations.unknown

  constructor() {super('Quantity')}

  // TODO: this simple quanity rule is not handled very well. There are a bunch more rules that need handling in quantity :-(

  protected renderDisplay(data: QuantityData | SimpleQuantityData): TemplateResult {

    const displayValue: undefined | string | number = data.value
    const type: string = 'decimal'
    const after = data.unit || data.code

    if (isQuantity(data)) {
      return html`
        <fhir-primitive .label=${this.label} .value=${displayValue} .type=${type}>
          <span slot="before">${data.comparator ? asQuantityComparator(data.comparator).display.toLowerCase() : nothing}&nbsp;</span >
          <span slot="after">&nbsp;${after}</span >
        </fhir-primitive>
      `
    }

    if (isSimpleQuantity(data)) {
      return html`
        <fhir-primitive .label=${this.label} .value=${displayValue} .type=${type}>
          <span slot="after">&nbsp;${after} </span >
        </fhir-primitive>
      `
    }

    return renderError(this.displayConfig.showerror, this.displayConfig.verbose, 'quantity', 'must be Quantity or Simple Quantity')
  }

  protected renderStructure(data: QuantityData | SimpleQuantityData): TemplateResult {

    if (isQuantity(data)) {
      return html`
        <fhir-primitive label="variation" .value=${this.variation}></fhir-primitive >
        <fhir-primitive label="value" .value=${data.value} type="decimal" summary></fhir-primitive >
        <fhir-primitive label="comparator" .value=${data.comparator} type="code" summary></fhir-primitive >
        <fhir-primitive label="unit" .value=${data.unit} summary></fhir-primitive >
        <fhir-primitive label="system" .value=${data.system} type="uri" summary></fhir-primitive >
        <fhir-primitive label="code" .value=${data.code} type="code" summary></fhir-primitive >
      `
    }

    if (isSimpleQuantity(data)) {
      return html`
        <fhir-primitive label="variation" .value=${this.variation}></fhir-primitive >
        <fhir-primitive label="value" .value=${data.value} type="decimal" summary></fhir-primitive >
        <fhir-primitive label="unit" .value=${data.unit} summary></fhir-primitive >
        <fhir-primitive label="system" .value=${data.system} type="uri" summary></fhir-primitive >
        <fhir-primitive label="code" .value=${data.code} type="code" summary></fhir-primitive >
      `
    }

    return renderError(this.displayConfig.showerror, this.displayConfig.verbose, 'quantity', 'must be Quantity or Simple Quantity')

  }

  protected convertData(data: QuantityData): QuantityData {
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

    // TODO: There is no guaranteed way to distinguish between a duration and an age. I this a bug or a feature?
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


    return data
  }

  protected validate(data: QuantityData | SimpleQuantityData): ValidationErrors {
    const errors = super.validate(data)
    if (!hasAllOrNone(data, ['code', 'system'])) {
      errors.push({ id: this.type + '::qty-3', err: `${this.type}: code and system should be set or none of the two` })
    }


    return errors

  }
}

export enum QuantityVariations {
  age = 'age',
  count = 'count',
  distance = 'distance',
  duration = 'duration',
  simple = 'simple',
  unknown = 'unknown',
}
