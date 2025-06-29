import {TemplateGenerator}                          from '../../internal'
import {Basic}                                      from '../../ResourceDef'
import {DisplayMode}                                from '../../shell'
import {Context, ExtensionDef, StructureDefinition} from '../definition'
import {Extension, Extensions}                      from '../profile.type'
import {BindingStrength}                            from '../util'
import {Builder, Decorateable, RenderBuilder}       from './builder.type'



export function extensionBuilder<T extends Decorateable>(key: string, def: Extension): RenderBuilder<T> {

  let context: Context<T> | null = null
  const extendRender = new Map<DisplayMode, TemplateGenerator<T>>()
  const overrideRender = new Map<DisplayMode, TemplateGenerator<T>>()

  const action: RenderBuilder<T> = {
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
          subdefs: undefined,
          extendRender: extendRender,
          overrideRender: overrideRender
        }

        context.def.set(extensionDef, key)

      } else {
        throw new Error('Context not set')
      }
    },
    extendRender: (forMode: DisplayMode, fn: TemplateGenerator<T>) => {

      extendRender.set(forMode, fn)
      return action
    },
    overrideRender: (forMode: DisplayMode, fn: TemplateGenerator<T>) => {
      overrideRender.set(forMode, fn)
      return action
    }

  }

  return action as unknown as RenderBuilder<T>
}

export function complexExtensionBuilder<T extends Decorateable>(key: string, def: Extensions): RenderBuilder<T> {

  let context: Context<T> | null = null
  const extendRender = new Map<DisplayMode, TemplateGenerator<T>>()
  const overrideRender = new Map<DisplayMode, TemplateGenerator<T>>()


  const action: RenderBuilder<T> = {
    setCtx: (ctx: Context<T>) => {context = ctx},
    build: () => {
      if (context) {

        const ctx: Context<any> = new Context(Basic, new StructureDefinition(Basic))
        def.extensions.map(ext => {

          const builder: Builder<any> = extensionBuilder(ext.url, ext)
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
          subdefs: ctx.def.props,
          extendRender,
          overrideRender
        }
        context.def.set(extensionDef)

      } else {
        throw new Error('Context not set')
      }
    },
    extendRender: (forMode: DisplayMode, fn: TemplateGenerator<T>) => {
      extendRender.set(forMode, fn)
      return action
    },
    overrideRender: (forMode: DisplayMode, fn: TemplateGenerator<T>) => {
      overrideRender.set(forMode, fn)
      return action
    }

  }

  return action
}

export function primitiveExtensionBuilder<T extends Decorateable>(primitiveKey: string, url: string, def: Extension[]): RenderBuilder<T> {
  let context: Context<T> | null = null
  const extendRender = new Map<DisplayMode, TemplateGenerator<T>>()
  const overrideRender = new Map<DisplayMode, TemplateGenerator<T>>()

  const action: RenderBuilder<T> = {
    setCtx: (ctx: Context<T>) => {context = ctx},
    build: () => {
      if (context) {

        const ctx: Context<any> = new Context(Basic, new StructureDefinition(Basic))
        def.map(ext => {

          const builder: Builder<any> = extensionBuilder(toFixedKey(ext.valueType), ext)
          builder.setCtx(ctx)
          builder.build()
        })

        console.log(primitiveKey, extendRender)

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
          subdefs: ctx.def.props,
          extendRender,
          overrideRender
        }
        context.def.set(extensionDef)

      } else {
        throw new Error('Context not set')
      }
    },

    extendRender: (forMode: DisplayMode, fn: TemplateGenerator<T>) => {
      extendRender.set(forMode, fn)
      return action
    },

    overrideRender: (forMode: DisplayMode, fn: TemplateGenerator<T>) => {
      overrideRender.set(forMode, fn)
      return action
    }
  }

  return action

}

function toFixedKey(type: string): string {
  const capitaliseFirstType: string = type.charAt(0).toUpperCase()
                                      + type.slice(1)
  const propKey: string = 'value' + capitaliseFirstType
  return propKey
}
