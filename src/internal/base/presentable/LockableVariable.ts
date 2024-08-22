import is from '@sindresorhus/is'
import undefined = is.undefined

export function Lockable(props: { lockInitial: boolean } = { lockInitial: false }) {

  let firstCallCompleted = false
  let registry: LockableRegistryImpl

  return function (target: any, propertyKey: string): void {

    // Initially set up the property to capture the default value
    let defaultValue: any
    const originalDescriptor = Object.getOwnPropertyDescriptor(target, propertyKey)
    if (originalDescriptor && originalDescriptor.value !== undefined) {
      defaultValue = originalDescriptor.value
    }

    function lazy(id: string) {
      registry = new LockableRegistryImpl(id)
      const locker = new LockableVariable(id, propertyKey)
      locker.value = defaultValue
      registry.add(locker)
    }

    const getter = function () {
      if (!registry) {
        // @ts-ignore
        lazy(this['__id'])
      }

      // @ts-ignore
      return registry.get(propertyKey)!.value
    }

    const setter = function (newValue: unknown) {

      if (!registry) {
        // @ts-ignore
        lazy(this['__id'])
      }

      // @ts-ignore
      registry.get(propertyKey)!.value = newValue
      if (props.lockInitial || firstCallCompleted) {
        registry.get(propertyKey)!.lock()
      }
      firstCallCompleted = true
    }

    Object.defineProperty(target, propertyKey, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true
    })

  }

}


class LockableVariable {

  readonly #id: string
  readonly #name: string
  #locked: boolean = false
  #value: unknown

  constructor(id: string, name: string) {
    this.#id = id
    this.#name = name
  }

  public get value(): unknown {
    return this.#value
  }

  public set value(value: unknown) {
    if (!this.#locked) this.#value = value
  }

  public force(value: unknown) {
    this.#value = value
  }

  public lock() {
    this.#locked = true
  }

  public unlock() {
    this.#locked = false
  }

  public isLocked() {
    return this.#locked
  }

  public getId(): string {
    return this.#id + this.#name
  }

}

export function LockableRegistry() {
  return function (target: any, propertyKey: string): void {

    const id = `lockable_id_${Date.now().toString()}_`
    const reg = new LockableRegistryImpl(id)

    Object.defineProperty(target, propertyKey, {
      get: function () {return reg},
      enumerable: true,
      configurable: true
    })

    Object.defineProperty(target, '__id', {
      get: function () {return id},
      enumerable: true,
      configurable: true
    })
  }
}

export interface Lockables {
  lock(name: string): void

  unlock(name: string): void

  override(name: string, value: unknown): void
}


class LockableRegistryImpl implements Lockables {
  static #lockables: Map<string, LockableVariable> = new Map()
  #id: string

  constructor(id: string) {
    this.#id = id
  }

  public lock(name: string) {
    LockableRegistryImpl.#lockables.get(this.#id + name)?.lock()
  }

  public unlock(name: string): void {
    LockableRegistryImpl.#lockables.get(this.#id + name)?.unlock()
  }

  public add(lock: LockableVariable): void {
    LockableRegistryImpl.#lockables.set(lock.getId(), lock)
  }


  public get(name: string): LockableVariable | undefined {
    return LockableRegistryImpl.#lockables.get(this.#id + name)
  }

  public override(name: string, value: unknown): void {
    const lockableVariable = LockableRegistryImpl.#lockables.get(this.#id + name)
    if (lockableVariable) lockableVariable.force(value)
  }

}
