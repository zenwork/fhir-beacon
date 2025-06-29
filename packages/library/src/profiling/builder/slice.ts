import {DefConstraintAssertion} from '../definition/definition.type'
import {Slice}                  from '../profile.type'
import {Decorateable}           from './builder.type'
import {sliceBuilder}           from './sliceBuilder'

import {sliceProp} from './sliceProp'



export const slice: Slice = {

  oneFor: <T extends Decorateable>(key: string[], constraints: DefConstraintAssertion<T>[], fixedValues: unknown[] = [], choice: string = '') =>
    sliceBuilder<T>(sliceProp(key, choice, constraints, fixedValues)),

  constraint: <T extends Decorateable>(key: string[], constraints: DefConstraintAssertion<T>[], fixedValues: unknown[] = [], choice: string = '') =>
    sliceBuilder<T>(sliceProp(key, choice, constraints, fixedValues))


}
