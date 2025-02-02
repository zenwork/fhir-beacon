import {ResourceData}                                  from '../resource/domain-resource.data'
import {Decorated}                                     from './Decorate.types'
import {FqkMap}                                        from './DeepKeyMap'
import {FhirElementData}                               from './FhirElement.type'
import {ErrorNodeKey, errors, FullyQualifiedKey, meta} from './Validations.type'



/**
 * The NoDataSet variable is a constant value of type FhirElementData.
 * It represents a null value for FHIR objects in the context of the Beacon system.
 *
 * The NoDataSet value is created by freezing an object with a single property 'id',
 * which is set to the string value 'FHIR::BEACON::NULL::OBJECT'.
 *
 * The NoDataSet value is immutable and cannot be modified once created.
 * It can be used to indicate the absence or unavailability of valid FHIR data. It is meant to be used as a default
 * value to differentiate between default emptiness and user-set emptiness.
 *
 * @type {FhirElementData}
 * @const
 */
export const NoDataObject: FhirElementData | ResourceData = Object.freeze({ id: 'FHIR::BEACON::NO::DATA' })

export function decorate<T extends (FhirElementData | Decorated<FhirElementData>)>(
  key: string,
  data?: T,
  errorMap?: FqkMap
): Decorated<T> {

  const tempData: T | {} = (data && data !== NoDataObject) ? data : {}

  const dataErrors: [FullyQualifiedKey, string[]][] = (data && errors in data)
                                                      ? (data[errors] as FqkMap).entries()
                                                      : []


  let injectedErrors: [FullyQualifiedKey, string[]][] = errorMap ? errorMap.entries() : []
  if (key === 'category') console.log('err', key, data, injectedErrors)

  injectedErrors = injectedErrors
    .filter(e => {
      const path: ErrorNodeKey[] | undefined = e[0].path
      return (path && path.length > 0) ? path[0].node === key : false
    })
    .map(e => [
      {
        path: e[0].path!.slice(1),
        key: e[0].key,
        index: e[0].index
      }, e[1]
    ])


  const errs: FqkMap = new FqkMap([...dataErrors, ...injectedErrors])

  return {
    ...tempData,
    [errors]: errs,
    //TODO: hide is not the right metadata... it's the likely wanted behaviour
    [meta]: { hide: data === NoDataObject }
  } as Decorated<T>
}
