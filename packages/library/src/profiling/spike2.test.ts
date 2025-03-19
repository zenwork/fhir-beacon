import {describe, it} from 'vitest'



type  Action = {
  optional: () => Action
  required: () => Action
  hasMany: () => Action
  boundBy: (...binding: string[]) => Action
  constrainedBy: (...constraints: (() => { key: string, error: string })[]) => Action
  mustSupport: () => Action
  isModifier: () => Action
  isSummary: () => Action
}

type InternalAction = Action & {
  setCtx: (ctx: Context) => void,
  run: () => void
}

type Prop = {
  key: string,
  type: string | Definition,
  cardinality: string,
  bindings: string[],
  constraints: (() => { key: string, error: string })[],
  mustSupport: boolean | undefined,
  isModifier: boolean | undefined,
  isSummary: boolean | undefined,
}

type DefineProps = { name: string, refine?: Definition, props?: Action[] }

class Context {
  constructor(public name: string, public refines: string = '', public def: Definition) {}
}

function define({ name, refine = new Definition(name, name), props = [] }: DefineProps): Definition {
  const def: Definition = refine.clone()
  def.name = name
  const ctx: Context = new Context(name, refine.name, def)

  props.forEach(f => {
    const action: InternalAction = f as InternalAction
    action.setCtx(ctx)
    action.run()
  })

  return def
}

class Definition {
  name: string
  refines: string | null
  props = new Map<string, Prop>()
  constructor(name: string = 'unknown', refines?: string) {
    this.name = name
    this.refines = refines
  }
  set(kv: Prop) {
    this.props.set(kv.key, kv)
  }
  get(key: string): Prop | null {
    return this.props.get(key) || null
  }
  clone(): Definition {
    const def = new Definition(String(this.name), String(this.refines))
    this.props.forEach((v, k) => def.set({ ...v, key: k }))
    return def
  }

  toString(indent: string = '\t') {
    return `${Array.from(this.props.values())
                   .map(v => {
                     const k: string = (indent + '-' + v.key).padEnd(30, ' ')
                     const s: string = v.isSummary ? 'S ' : '  '
                     const c: string = v.cardinality.padEnd(15, ' ')
                     const b: any = v.bindings.length > 0 ? ` (${v.bindings.join(',')})` : ''
                     if (v.type instanceof Definition) {
                       const t: Definition = v.type
                       return `${k}${s}${c}BACKBONE${b}\n` + v.type.toString(indent + '    ')
                     }

                     const t: string = v.type
                     return `${k}${s}${c}${t}${b}`
                   }).join('\n')}`
  }

  toJSON() {
    let props = {}
    this.props.forEach((v, k) => props[k] = v)

    return {
      name: this.name,
      refines: this.refines,
      props: props
    }
  }


}

function property(key: string,
                  type: string | Definition,
                  cardinality: string = '1..1',
                  bindings: string[] = [],
                  constraints: (() => { key: string, error: string })[] = [],
                  mustSupport: boolean | undefined = undefined,
                  isModifier: boolean | undefined = undefined,
                  isSummary: boolean | undefined = undefined) {
  return { key, type, cardinality, bindings, constraints, mustSupport, isModifier, isSummary } as Prop
}

function createAction(kv: Prop): Action {

  let context: Context | null = null
  let optional = false
  let many = false

  const action = {
    setCtx: (ctx) => {context = ctx},
    run: () => {
      kv.key = `${kv.key}`
      let min = kv.cardinality.split('..')[0]
      let max = kv.cardinality.split('..')[1]
      if (optional) min = '0'
      if (many) max = '*'
      const existing: Prop = context.def.get(kv.key)
      if (existing) {
        context.def.set({
                          key: kv.key,
                          type: kv.type ? kv.type : existing.type,
                          bindings: kv.bindings.length > 0 ? kv.bindings : existing.bindings,
                          constraints: kv.constraints.length > 0 ? kv.constraints : existing.constraints,
                          cardinality: min + '..' + max,
                          mustSupport: kv.mustSupport ? kv.mustSupport : existing.mustSupport,
                          isModifier: kv.isModifier ? kv.isModifier : existing.isModifier,
                          isSummary: kv.isSummary ? kv.isSummary : existing.isSummary
                        })
      } else {
        context.def.set({ ...kv, cardinality: min + '..' + max })
      }
    },
    optional: (): Action => {
      optional = true
      return action as unknown as Action
    },
    required: (): Action => {
      optional = false
      return action as unknown as Action
    },
    hasMany: (): Action => {
      many = true
      return action as unknown as Action
    },
    boundBy: (...binding: string[]): Action => {
      kv.bindings = binding
      return action as unknown as Action
    },
    constrainedBy: (constraints: (() => { key: string, error: string })[]): Action => {
      kv.constraints = constraints
      return action as unknown as Action
    },
    mustSupport: (): Action => {
      kv.mustSupport = true
      return action as unknown as Action
    },
    isModifier: (): Action => {
      kv.isModifier = true
      return action as unknown as Action
    },
    isSummary: (): Action => {
      kv.isSummary = true
      return action as unknown as Action
    }
  }

  return action as unknown as Action
}

const add = {
  prop: (k, v) => createAction(property(k, v)),
  listOf: (k, v) => createAction(property(k, v, '1..*', [], [])),
  backboneOf: (props: Definition) => createAction(property(props.name, props, '1..*', [], []))
}

describe('test', () => {
  it('test', () => {

    const base: Definition = define({
                                      name: 'base',
                                      props: [
                                        add.prop('foo', 'bar')
                                           .optional()
                                           .boundBy('baz', 'biff'),
                                        add.listOf('baz', 'biff')
                                           .optional(),
                                        add.prop('baz', 'biff'),
                                        add.backboneOf(define({
                                                                name: 'stuff', props: [
                                            add.prop('bkStuff', 'bar').optional().boundBy('a', 'b', 'c'),
                                            add.prop('bkThing', 'foo').optional()
                                          ]
                                                              })).optional()
                                      ]
                                    })

    const profile: Definition = define({
                                         name: 'profile',
                                         refine: base,
                                         props: [
                                           add.prop('foo', 'bar')
                                              .required()
                                              .constrainedBy(() => ({ key: 'foo', error: 'foo is required' })),
                                           add.prop('baz', 'biff').isSummary(),
                                           add.backboneOf(define({
                                                                   name: 'stuff', props: [
                                               add.prop('bkStuff', 'bar').isSummary(),
                                               add.prop('bkThing', 'foo')
                                             ]
                                                                 }))

                                         ]
                                       })


    console.log(base.name + `${base.refines !== base.name ? `[refines:${base.refines}]` : ''}`)
    console.log(base.toString())
    console.log()
    console.log(profile.name + `${profile.refines !== profile.name ? `[refines:${profile.refines}]` : ''}`)
    console.log(profile.toString())
    console.log(JSON.stringify(profile, null, 2))

  })
})
