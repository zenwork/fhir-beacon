import {DefConstraintAssertion} from '../definition/definition.type'
import {Slice}                  from '../profile.type'
import {sliceBuilder}           from './sliceBuilder'

import {sliceProp} from './sliceProp'



export const slice: Slice = {

  oneFor: <T>(key: string[], constraints: DefConstraintAssertion<T>[], fixedValues: unknown[] = [], choice: string = '') =>
    sliceBuilder<T>(sliceProp(key, choice, constraints, fixedValues)),

  constraint: <T>(key: string[], constraints: DefConstraintAssertion<T>[], fixedValues: unknown[] = [], choice: string = '') =>
    sliceBuilder<T>(sliceProp(key, choice, constraints, fixedValues))


}
