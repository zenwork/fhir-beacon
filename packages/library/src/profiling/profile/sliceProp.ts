import {DefConstraintAssertion, NarrowableNames, PropertySliceDef, TypeName} from '../index'



export function sliceProp<T>(key: string | string[],
                             choice: string | undefined,
                             type: TypeName,
                             typeNarrowing: NarrowableNames[] = [],
                             constraints: DefConstraintAssertion<T>[]
): PropertySliceDef<T> {

  // @ts-ignore
  constraints.forEach(c => c._constraintType = 'slice-constraint')

  return {
    key,
    choice,
    type,
    typeNarrowing,
    constraints
  }

}
