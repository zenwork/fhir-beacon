import {DefConstraintAssertion, PropertySliceDef} from '../index'



export function sliceProp<T>(key: string | string[],
                             choice: string | undefined,
                             constraints: DefConstraintAssertion<T>[],
                             fixedValues: unknown[]
): PropertySliceDef<T> {

  constraints.forEach((c, i) => {
    // @ts-ignore
    c._constraintType = 'profile-constraint'
    // @ts-ignore
    if (fixedValues[i]) c._fixedValue = fixedValues[i]
  })

  return {
    key,
    choice,
    constraints

  }

}
