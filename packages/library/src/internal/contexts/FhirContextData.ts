import {JSONPath}        from 'jsonpath-plus'
import {FhirElementData} from '../base/FhirElement.type'



export interface FhirDataContext {

  data: {} & FhirElementData

  // TODO: for now just a string... but path should become FHIR path
  getAt<X>(path: string): X
}

export class FhirDataContextImpl implements FhirDataContext {

  declare _data: {} & FhirElementData

  public get data(): {} & FhirElementData {
    return this._data
  }

  public set data(value: {} & FhirElementData) {
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
