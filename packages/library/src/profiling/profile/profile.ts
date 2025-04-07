import {DefConstraintAssertion, InternalPropertyBuilder, Name} from '../index'
import {sliceProp}                                             from '../profile/sliceProp'
import {setSlice}                                              from './setSlice'



export interface Profile {
  slice: <T>(key: string[],
             type: Name,
             constraints: DefConstraintAssertion<T>[],
             choice?: string) => InternalPropertyBuilder<T>
}


export const profile: Profile = {

  slice: <T>(key: string[], type: Name, constraints: DefConstraintAssertion<T>[], choice: string = '') =>
    setSlice<T>(sliceProp(key, choice, type.value, [], constraints))

}
