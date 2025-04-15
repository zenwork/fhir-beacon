import {DefConstraintAssertion, InternalPropertyBuilder} from '../index'
import {sliceProp}                                       from '../profile/sliceProp'
import {setSlice}                                        from './setSlice'



export interface Profile {

  slice: <T>(key: string[],
             constraints: DefConstraintAssertion<T>[],
             fixedValue?: unknown[],
             choice?: string) => InternalPropertyBuilder<T>

  constraint: <T>(key: string[],
                  constraints: DefConstraintAssertion<T>[],
                  fixedValue?: unknown[],
                  choice?: string) => InternalPropertyBuilder<T>
}


export const profile: Profile = {

  slice: <T>(key: string[], constraints: DefConstraintAssertion<T>[], fixedValues: unknown[] = [], choice: string = '') =>
    setSlice<T>(sliceProp(key, choice, constraints, fixedValues)),

  constraint: <T>(key: string[], constraints: DefConstraintAssertion<T>[], fixedValues: unknown[] = [], choice: string = '') =>
    setSlice<T>(sliceProp(key, choice, constraints, fixedValues))

}
