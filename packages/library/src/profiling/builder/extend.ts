import {URI}                 from 'components'
import {DatatypeName}        from 'DatatypeName'
import {PrimitiveName}       from 'PrimitiveName'
import {StructureDefinition} from '../definition'
import {Extend}              from '../profile.type'
import {Builder}             from './builder.type'
import {extensionBuilder}    from './extensionBuilder'
import {extensionProperty}   from './extensionProperty'



export const extend: Extend = {

  withSimple: <T>(url: URI, valueType: PrimitiveName | DatatypeName): Builder<T> =>
    extensionBuilder(extensionProperty('missing code', url, valueType))
  ,
  withComplex: function <T>(url: URI, extensions: StructureDefinition<T>): Builder<T> {
    throw new Error('Function not implemented.')
  }
}
