import {DomainResourceData}                                        from '../../../internal/resource/domain-resource.data'
import {
  CodeableConceptData
}                                                                  from '../../complex/codeable-concept/codeable-concept.data'
import {
  CodeableReferenceData
}                                                                  from '../../complex/codeable-reference/codeable-reference.data'
import {IdentifierData}                                            from '../../complex/identifier/identifier.data'
import {SimpleQuantityData}                                        from '../../complex/quantity/quantity.data'
import {Code, DateTime, Markdown}                                  from '../../primitive/primitive.data'
import {SubstanceIngredientData, SubstanceIngredientReferenceData} from './substance-ingredient.data'

export type SubstanceData = DomainResourceData & {
  identifier?: IdentifierData[]
  instance: boolean
  status?: Code
  category: CodeableConceptData[]
  code: CodeableReferenceData
  description?: Markdown
  expiry?: DateTime
  quantity?: SimpleQuantityData
  ingredient: (SubstanceIngredientData | SubstanceIngredientReferenceData)[]

}
