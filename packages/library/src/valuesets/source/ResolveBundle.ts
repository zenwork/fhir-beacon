import {BundleData}  from '../../components'
import {ResolvedSet} from '../ValueSet.data'
import {empty}       from './FSSource'



export async function resolveBundle(bundle: BundleData,
                                    skipUrl: (url: string) => boolean,
                                    debug: boolean = false): Promise<ResolvedSet[]> {

  console.log('resolving Bundle')

  return [empty(bundle.id ?? 'n/a', 'Bundle', 'not implemented', 'unknown', undefined, false)]
}
