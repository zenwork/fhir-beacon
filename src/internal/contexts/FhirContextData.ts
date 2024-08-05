import {JSONPath}            from 'jsonpath-plus'
import {FhirDataElementData} from '../base/fhir-data-element.data'

export interface FhirDataContext {

  data: {} & FhirDataElementData

  // TODO: for now just a string... but path should become FHIR path
  getAt<X>(path: string): X
}

export class FhirDataContextImpl implements FhirDataContext {

  declare _data: any

  public get data(): {} & FhirDataElementData {
    return this._data
  }

  public set data(value: {} & FhirDataElementData) {
    this._data = value
  }

  getAt<X>(path: string): X {
    if (path) {
      const array = JSONPath({ path, json: this.data }) as X[]
      if (array) return array[0] as X
    }
    throw new SyntaxError(`Could not resolve ${path}`)
  }
}
