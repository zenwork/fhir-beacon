import {TemplateResult} from 'lit'
import { wrap}    from '../../../shell'
import {DisplayConfig}  from '../../../types'
import {IdentifierData} from '../index'



export function identifiers(data: IdentifierData[]|undefined, config: DisplayConfig): TemplateResult {
  return wrap({
                key: 'identifier',
                collection: data??[],
                generator: 'fhir-identifier',
                config
              }
  )
}
