import '../../components/primitive/type-converters'
import '../../components/primitive/type-presenters'

import '../../components/primitive/primitive.data'
import '../../components/primitive/primitive-context/primitive-context'
import '../../components/primitive/primitive-error/primitive-error'
import '../../components/primitive/primitive-label/primitive-label'
import '../../components/primitive/primitive-value/primitive-value'
import '../../components/primitive/primitive-wrapper/primitive-wrapper'

export enum fhir {
  node_count_up = 'fhir-node-count-up',
  node_count_down = 'fhir-node-count-down'
}

export function global(name: fhir, detail: Record<PropertyKey, any> | undefined = undefined) {
  if (detail) return new CustomEvent(name, {detail, bubbles: true, composed: true})
  return new Event(name, {bubbles: true, composed: true})
}
