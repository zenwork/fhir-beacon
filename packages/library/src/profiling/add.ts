import {actionWith} from './actionWith'
import {Definition} from './definition'
import {property}   from './property'



export const add = {
  prop: (k, v) => actionWith(property(k, v)),
  listOf: (k, v) => actionWith(property(k, v, '1..*', [], [])),
  backboneOf: (props: Definition) => actionWith(property(props.name, props, '1..*', [], []))
}
