import {Choice, Choices}    from '../valuesets/ValueSet.data'
import cs_address_type      from './codesystems/cs-address-type.json' with {type: 'json'}
import cs_address_use       from './codesystems/cs-address-use.json' with {type: 'json'}
import cs_icd_10_procedures from './codesystems/cs-icd-10-procedures.json' with {type: 'json'}
import cs_identifier_use    from './codesystems/cs-identifier-use.json' with {type: 'json'}
import cs_quantity_comparator    from './codesystems/cs-quantity-comparator.json' with {type: 'json'}

import cs_observation_status from './codesystems/cs-observation-status.json'
import cs_slotstatus         from './codesystems/cs-slotstatus.json' with {type: 'json'}
import cs_v3_orderableDrugForm         from './codesystems/cs-v3-orderableDrugForm.json' with {type: 'json'}
import {CodeIds}             from './types'
import vs_age_units          from './valuesets/vs-age-units.json' with {type: 'json'}

import vs_data_absent_reason         from './valuesets/vs-data-absent-reason.json' with {type: 'json'}
import vs_distance_unit              from './valuesets/vs-distance-units.json' with {type: 'json'}
import vs_duration_unit              from './valuesets/vs-duration-units.json' with {type: 'json'}
import vs_identifier_type            from './valuesets/vs-identifier-type.json' with {type: 'json'}
import vs_identifier_use             from './valuesets/vs-identifier-use.json' with {type: 'json'}
import vs_observation_category       from './valuesets/vs-observation-category.json' with {type: 'json'}
import vs_observation_interpretation from './valuesets/vs-observation-interpretation.json' with {type: 'json'}
import vs_observation_methods        from './valuesets/vs-observation-methods.json' with {type: 'json'}
import vs_quantity_comparator        from './valuesets/vs-quantity-comparator.json' with {type: 'json'}
import vs_referencerange_appliesto   from './valuesets/vs-referencerange-appliesto.json' with {type: 'json'}
import vs_ucum_common                from './valuesets/vs-ucum-common.json' with {type: 'json'}



export class Codes {

  #map: Map<CodeIds, Choices> = new Map()
  #translations: Map<string, string> = new Map()

  constructor() {

    this.#map.set('cs-address-type', cs_address_type)
    this.#map.set('cs-address-use', cs_address_use)
    this.#map.set('cs-icd-10-procedures', cs_icd_10_procedures)
    this.#map.set('cs-identifier-use', cs_identifier_use)
    this.#map.set('cs-observation-status', cs_observation_status)
    this.#map.set('cs-slotstatus', cs_slotstatus)
    this.#map.set('cs-quantity-comparator', cs_quantity_comparator)
    this.#map.set('cs-v3-orderableDrugForm', cs_v3_orderableDrugForm)

    this.#map.set('vs-age-units', vs_age_units)
    this.#map.set('vs-data-absent-reason', vs_data_absent_reason)
    this.#map.set('vs-distance-units', vs_distance_unit)
    this.#map.set('vs-duration-units', vs_duration_unit)
    this.#map.set('vs-identifier-type', vs_identifier_type)
    this.#map.set('vs-identifier-use', vs_identifier_use)
    this.#map.set('vs-observation-category', vs_observation_category)
    this.#map.set('vs-observation-interpretation', vs_observation_interpretation)
    this.#map.set('vs-observation-methods', vs_observation_methods)
    this.#map.set('vs-quantity-comparator', vs_quantity_comparator)
    this.#map.set('vs-referencerange-appliesto', vs_referencerange_appliesto)
    this.#map.set('vs-ucum-common', vs_ucum_common)

    this.#translations.set('http://unitsofmeasure.org', 'http://hl7.org/fhir/ValueSet/ucum-common')
  }

  getById(id: CodeIds): Choices | undefined {
    const choices: Choices | undefined = this.#map.get(id) as Choices
    if (!choices) throw new Error(`No codeset found for id: ${id}`)
    return choices
  }

  getBySystem(url: string): Choices | undefined {
    if (!url || !url.startsWith('http') || url === 'http://snomed.info/sct') return undefined
    let lookup = url
    if (this.#translations.has(url)) lookup = this.#translations.get(url)!
    const choices: Choices | undefined = Array.from(this.#map.values()).find(set => set.system === lookup)
    if (!choices) throw new Error(`No codeset found for system: ${url}`)
    return choices
  }

  public getAllSystemsAsChoices(): Choices {
    return {
      id: 'systems',
      system: 'http:/?fhir-beacon/all/systems',
      type: 'fhir-beacon',
      choices: Array.from(this.#map.values()).map(v => ({ value: v.system, display: v.id } as Choice))
    } as Choices
  }
}
