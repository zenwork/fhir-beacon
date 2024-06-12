import jp                from 'jsonpath'
import {BaseElementData} from '../base/base-element.data'

export interface FhirDataContext {

  data: {} & BaseElementData

  // TODO: for now just a string... but path should become FHIR path
  getAt<X>(path: string): X | null
}

export class FhirDataContextImpl implements FhirDataContext {

  public get data(): {} & BaseElementData {
    return this._data
  }

  public set data(value: {} & BaseElementData) {
    this._data = value
  }

  declare _data: any

  getAt<X>(path: string): X | null {
    if (path) {
      let array = jp.query(this.data, path) as X[]
      if (array) return array[0] as X
    }
    return null
  }
}
