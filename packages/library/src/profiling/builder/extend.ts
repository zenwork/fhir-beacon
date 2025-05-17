import {Extend, Extension, Extensions}                                        from '../profile.type'
import {Builder}                                                              from './builder.type'
import {complexExtensionBuilder, extensionBuilder, primitiveExtensionBuilder} from './extensionBuilder'



export const extend: Extend = {
  withOne: <T>(key: string, extension: Extension): Builder<T> => extensionBuilder(key, extension),
  withComplex: <T>(key: string, extensions: Extensions): Builder<T> => complexExtensionBuilder(key, extensions),
  primitive: <T>(primtiveKey: string, url: string, extensions: Extension[]): Builder<T> => primitiveExtensionBuilder(primtiveKey, url, extensions)

}
