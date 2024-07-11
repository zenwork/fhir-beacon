import {BaseElementData}                from '../../../internal/base/base-element.data'
import {DateTime, FhirString, Markdown} from '../../primitive/primitive.data'
import {ReferenceData}                  from '../../special/reference/reference.data'

export type AuthorReferenceData = ReferenceData
export type AuthorFhirString = FhirString

export type AnnotationData = BaseElementData & {
  authorReference?: AuthorReferenceData,
  authorString?: AuthorFhirString
  time?: DateTime
  text?: Markdown
}
