import {URI}                           from '../../components/primitive/primitive.data'
import {DatatypeName}                  from '../../DatatypeName'
import {PrimitiveName}                 from '../../PrimitiveName'
import {ExtensionDef, NarrowableNames} from '../definition/definition.type'



export function extensionProperty(
  key: string,
  url: URI,
  valueType: PrimitiveName | DatatypeName,
  valueTypeNarrowing: NarrowableNames[] = [],
  isModifier: boolean | undefined = undefined,
  isSummary: boolean | undefined = undefined
): ExtensionDef {

  return {
    choice: undefined,
    defType: 'extension',
    key,
    url,
    valueType,
    valueTypeNarrowing,
    cardinality: '1..1',
    isModifier,
    isSummary,
    subdefs: undefined
  }

}
