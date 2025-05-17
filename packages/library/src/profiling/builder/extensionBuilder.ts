import {Basic}                                      from '../../ResourceDef'
import {Context, ExtensionDef, StructureDefinition} from '../definition'
import {Extension, Extensions}                      from '../profile.type'
import {BindingStrength}                            from '../util'
import {Builder}                                    from './builder.type'



export function extensionBuilder<T>(key: string, def: Extension): Builder<T> {

  let context: Context<T> | null = null

  const action = {
    setCtx: (ctx: Context<T>) => {context = ctx},
    build: () => {
      if (context) {

        const extensionDef: ExtensionDef = {
          defType: 'extension',
          key: key,
          url: def.url,
          valueType: def.valueType,
          valueTypeNarrowing: def.valueTypeNarrowing || [],
          isModifier: false,
          isSummary: false,
          cardinality: '1..1',
          bindings: def.bindings ?? [],
          bindingStrength: def.bindingStrength ?? BindingStrength.Example,
          choice: undefined,
          subdefs: undefined
        }

        context.def.set(extensionDef, key)

      } else {
        throw new Error('Context not set')
      }
    }

  }

  return action as unknown as Builder<T>
}

export function complexExtensionBuilder<T>(key: string, def: Extensions): Builder<T> {

  let context: Context<T> | null = null

  const action = {
    setCtx: (ctx: Context<T>) => {context = ctx},
    build: () => {
      if (context) {

        const ctx: Context<unknown> = new Context(Basic, new StructureDefinition(Basic))
        def.extensions.map(ext => {

          const builder: Builder<unknown> = extensionBuilder(ext.url, ext)
          builder.setCtx(ctx)
          builder.build()
        })

        const extensionDef: ExtensionDef = {
          defType: 'extension',
          key: key,
          url: def.url,
          valueType: undefined,
          valueTypeNarrowing: undefined,
          isModifier: false,
          isSummary: false,
          cardinality: '1..1',
          bindings: [],
          bindingStrength: BindingStrength.Example,
          choice: undefined,
          subdefs: ctx.def.props
        }
        context.def.set(extensionDef)

      } else {
        throw new Error('Context not set')
      }
    }

  }

  return action as unknown as Builder<T>
}

export function primitiveExtensionBuilder<T>(primitiveKey: string, url: string, def: Extension[]): Builder<T> {
  let context: Context<T> | null = null

  const action = {
    setCtx: (ctx: Context<T>) => {context = ctx},
    build: () => {
      if (context) {

        const ctx: Context<unknown> = new Context(Basic, new StructureDefinition(Basic))
        def.map(ext => {

          const builder: Builder<unknown> = extensionBuilder(toFixedKey(ext.valueType), ext)
          builder.setCtx(ctx)
          builder.build()
        })

        const extensionDef: ExtensionDef = {
          defType: 'extension',
          key: `_${primitiveKey}`,
          url: url,
          valueType: 'Extension',
          valueTypeNarrowing: undefined,
          isModifier: false,
          isSummary: false,
          cardinality: '1..1',
          bindings: [],
          bindingStrength: BindingStrength.Example,
          choice: undefined,
          subdefs: ctx.def.props
        }
        context.def.set(extensionDef)

      } else {
        throw new Error('Context not set')
      }
    }
  }

  return action as unknown as Builder<T>

}

function toFixedKey(type: string): string {
  const capitaliseFirstType: string = type.charAt(0).toUpperCase()
                                      + type.slice(1)
  const propKey: string = 'value' + capitaliseFirstType
  return propKey
}
