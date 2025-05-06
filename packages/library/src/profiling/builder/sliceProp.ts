import {DefConstraintAssertion, PropertySliceDef} from '../index'



export type TypedConstraintAssertion<T> = DefConstraintAssertion<T> & { _constraintType?: string; _fixedValue?: unknown }

export function sliceProp<T>(key: string | string[],
                             choice: string | undefined,
                             constraints: DefConstraintAssertion<T>[],
                             fixedValues: unknown[]
): PropertySliceDef<T> {

  constraints.forEach((c, i) => {
    const constraint: TypedConstraintAssertion<T> = c as TypedConstraintAssertion<T>
    constraint._constraintType = 'profile-constraint'
    if (fixedValues[i]) {
      constraint._fixedValue = fixedValues[i]
    }
  });

  return {
    defType: 'property-slice',
    key,
    choice,
    constraints,
    subdefs: undefined
  }

}
