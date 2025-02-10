import {html, nothing, TemplateResult}                        from 'lit'
import {customElement, property}                              from 'lit/decorators.js'
import {when}                                                 from 'lit/directives/when.js'
import {systemChoices, useSystem}                             from '../../../codes/use-system'
import {BaseElement, Decorated, Validations}                  from '../../../internal'
import {DisplayConfig}                                        from '../../../shell/types'
import {hostStyles}                                           from '../../../styles'
import {hasAllOrNone}                                         from '../../../utilities/hasAllOrNone'
import {isWholeNumber}                                        from '../../../utilities/isWhole'
import {Choice, Choices}                                      from '../../../valuesets/ValueSet.data'
import {QuantityData, QuantityVariations, SimpleQuantityData} from './quantity.data'
import {componentStyles}                                      from './quantity.styles'
import {isQuantity, isSimpleQuantity}                         from './quantity.type-guards'



@customElement('fhir-quantity')
export class Quantity extends BaseElement<QuantityData | SimpleQuantityData> {

  static styles = [hostStyles, componentStyles]
  constructor() {super('Quantity')}

  @property({ type: Boolean })
  public simple: boolean = false

  private variation: QuantityVariations = QuantityVariations.unknown

  public renderDisplay(config: DisplayConfig,
                       data: QuantityData | SimpleQuantityData,
                       validations: Validations): TemplateResult[] {

    const displayValue: undefined | string | number = data.value
    const type: string = 'decimal'
    const after = config.verbose ? data.unit + '(' + data.code + ')' : data.code
    if (isQuantity(data) && !this.simple) {
      return [
        html`
            <fhir-primitive .label=${this.label} .value=${displayValue} .type=${type} summary>
                ${data.comparator ? html`<span slot="before"> ${useSystem(
                        'http://hl7.org/fhir/ValueSet/quantity-comparator')
                        .choices
                        .find(c => c.value
                                   === data.comparator)
                        ?.display
                        .toLowerCase()} </span>` : nothing}
                ${after ? html`<span slot="after"> ${after} </span>` : nothing}
            </fhir-primitive>
        `
      ]
    }

    if (isSimpleQuantity(data) || this.simple) {
      return [
        html`
            <fhir-primitive .label=${this.label} .value=${displayValue} .type=${type} summary>
                ${after ? html`<span slot="after"> ${after} </span>` : nothing}
            </fhir-primitive>
            ${validations.msgFor('comparator::sqty-1') ? html`
                <fhir-primitive label="comparator"
                                .value=${(data as QuantityData).comparator}
                                type="code"
                                summary
                                .errormessage=${validations.msgFor('comparator::sqty-1')}
                ></fhir-primitive>` : nothing}
        `
      ]
    }

    return [
      html`
          <fhir-not-supported
                  label="quantity"
                  description="must be Quantity or Simple Quantity"
          ></fhir-not-supported>`
    ]
  }

  public renderEditableDisplay(_: DisplayConfig,
                               data: Decorated<QuantityData | SimpleQuantityData>,
                               validations: Validations): TemplateResult[] {

    const system = useSystem(data.system)
    const comparators: Choices = useSystem('http://hl7.org/fhir/quantity-comparator')
    const sysChoices = systemChoices()

    return [
      html`
          <fhir-primitive key="variation" .value=${this.variation} .input=${false}></fhir-primitive>
          <fhir-primitive key="value" .value=${data.value} type="decimal" summary></fhir-primitive>
          ${when(
                  this.variation === 'simple',
                  () => html``,
                  () => html`
                      <fhir-primitive key="comparator"
                                      .value=${(data as QuantityData).comparator}
                                      type="code"
                                      summary
                                      .choices=${comparators.choices}

                      ></fhir-primitive>`
          )}

          <fhir-primitive key="system"
                          .value=${data.system}
                          type="uri"
                          summary
                          .choices=${sysChoices.choices}
          ></fhir-primitive>
          <fhir-primitive key="code"
                          .value=${data.code}
                          type="code"
                          summary
                          .choices=${system?.choices}
                          .errormessage=${validations.msgFor('code')}
          ></fhir-primitive>
          <fhir-primitive key="unit"
                          .value=${data.unit}
                          summary
          ></fhir-primitive>
      `
    ]
  }

  public renderStructure(_config: DisplayConfig,
                         data: QuantityData | SimpleQuantityData,
                         validations: Validations): TemplateResult[] {

    if (isQuantity(data) && !this.simple) {
      return [
        html`
            <fhir-primitive label="variation" .value=${this.variation}></fhir-primitive>
            <fhir-primitive label="value" .value=${data.value} type="decimal" summary></fhir-primitive>
            <fhir-primitive label="comparator" .value=${data.comparator} type="code" summary></fhir-primitive>
            <fhir-primitive label="unit" .value=${data.unit} summary></fhir-primitive>
            <fhir-primitive label="system" .value=${data.system} type="uri" summary></fhir-primitive>
            <fhir-primitive label="code" .value=${data.code} type="code" summary></fhir-primitive>
        `
      ]
    }

    if (isSimpleQuantity(data) || this.simple) {
      return [
        html`
            <fhir-primitive label="variation" .value=${this.variation}></fhir-primitive>
            <fhir-primitive label="value" .value=${data.value} type="decimal" summary></fhir-primitive>
            ${validations.msgFor('comparator::sqty-1') ? html`
                <fhir-primitive label="comparator"
                                .value=${(data as QuantityData).comparator}
                                type="code"
                                summary
                                .errormessage=${validations.msgFor('comparator::sqty-1')}
                ></fhir-primitive>` : nothing}
            <fhir-primitive label="unit" .value=${data.unit} summary></fhir-primitive>
            <fhir-primitive label="system" .value=${data.system} type="uri" summary></fhir-primitive>
            <fhir-primitive label="code" .value=${data.code} type="code" summary></fhir-primitive>
        `
      ]
    }

    return [
      html`
          <fhir-not-supported
                  label="quantity"
                  description="must be Quantity or Simple Quantity"
          ></fhir-not-supported>`
    ]

  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public validate(data: QuantityData | SimpleQuantityData, validations: Validations, _fetched: boolean) {
    if (this.simple && !isSimpleQuantity(data)) {
      validations.add({
                        fqk: { path: [{ node: 'comparator::sqty-1' }] },
                        message: `${this.type}:${this.key}: comparator should not be present`
                         })

    }

    if (!hasAllOrNone(data, ['code', 'system'])) {
      validations.add({
                        fqk: { path: [{ node: this.type + '::qty-3' }] },
                        message: `${this.type}: code and system should be set or none of the two`
                         })
    }

    const system = useSystem(data.system)
    if (system && !system.choices.find((c: Choice) => c.value === data.code)) {
      validations.add({
                        fqk: { path: [{ node: 'code' }] },
                        message: `${this.type}: code ${data.code} is not valid for system: ${data.system}`
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

    if (this.simple) {
      this.variation = QuantityVariations.simple
    }

    const isBlankOrUcum = !data.system || data.system.toString() === 'http://unitsofmeasure.org'

    // rule: dis-1
    const distanceUnits: Choices = useSystem('http://hl7.org/fhir/ValueSet/distance-units')
    if (data.unit
        && distanceUnits.choices.find(d => data.code === d.value && data.system === distanceUnits.system)) {
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
    const durations: Choices = useSystem('http://hl7.org/fhir/ValueSet/duration-units')
    if ((!data.value || data.code)
        && durations.choices.find(d => data.code === d.value)
        && isBlankOrUcum
    ) {
      this.variation = QuantityVariations.duration
    }

    // rule: age-1
    const ageUnits: Choices = useSystem('http://hl7.org/fhir/ValueSet/age-units')
    if (data.value && data.value > 0
        && ageUnits.choices.find(a => data.code === a.value && data.system === ageUnits.system)) {
      this.variation = QuantityVariations.age
    }
    return data as Decorated<QuantityData> | Decorated<SimpleQuantityData>
  }

  protected edited(data: QuantityData | SimpleQuantityData,
                   key: string,
                   oldValue: unknown,
                   newValue: unknown) {

    super.edited(data, key, oldValue, newValue)

    if (key === 'code') {
      const system = useSystem(data.system)
      if (system) {
        const choice = system.choices.find((c) => c.value === newValue)
        if (choice) data.unit = choice.display || choice.value
      }
    }
  }

}
