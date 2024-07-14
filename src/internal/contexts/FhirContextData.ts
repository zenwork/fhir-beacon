import {JSONPath}        from 'jsonpath-plus'
import {BaseElementData} from '../base/base-element.data'

export interface FhirDataContext {

  data: {} & BaseElementData

  // TODO: for now just a string... but path should become FHIR path
  getAt<X>(path: string): X
}

export class FhirDataContextImpl implements FhirDataContext {

  declare _data: any

  public get data(): {} & BaseElementData {
    return this._data
  }

  public set data(value: {} & BaseElementData) {
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
