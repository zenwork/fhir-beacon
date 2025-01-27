import {Choices} from '../valuesets/ValueSet.data'

import cs_observation_status from './codesystems/cs-observation-status.json'
import {CodeIds}             from './types'

import vs_data_absent_reason         from './valuesets/vs-data-absent-reason.json' with {type: 'json'}
import vs_observation_category       from './valuesets/vs-observation-category.json' with {type: 'json'}
import vs_observation_interpretation from './valuesets/vs-observation-interpretation.json' with {type: 'json'}
import vs_observation_methods        from './valuesets/vs-observation-methods.json' with {type: 'json'}
import vs_referencerange_appliesto   from './valuesets/vs-referencerange-appliesto.json' with {type: 'json'}



export class Codes {
  #map: Map<CodeIds, Choices> = new Map()

  constructor() {
    this.#map.set('vs-observation-interpretation', vs_observation_interpretation)
    this.#map.set('vs-observation-methods', vs_observation_methods)
    this.#map.set('vs-observation-category', vs_observation_category)
    this.#map.set('vs-referencerange-appliesto', vs_referencerange_appliesto)
    this.#map.set('vs-data-absent-reason', vs_data_absent_reason)
    this.#map.set('cs-observation-status', cs_observation_status)
  }
  get(id: CodeIds): Choices | undefined {
    return this.#map.get(id) as Choices
  }
}
