import {Context, ExtensionDef} from '../definition'
import {Builder}               from './builder.type'



export function extensionBuilder<T>(def: ExtensionDef): Builder<T> {

  let context: Context<T> | null = null

  const action = {
    setCtx: (ctx: Context<T>) => {context = ctx},
    build: () => {
      if (context) {

        context.def.set()

      } else {
        throw new Error('Context not set')
      }
    }

  }

  return action as unknown as Builder<T>
}
