import {ValueSetProcessor}                     from './processor/ValueSetProcessor'
import {FSSource}                              from './source/FSSource'
import {FSStore}                               from './store/FSStore'
import {Choices, LoadableStore, ValueSetStore} from './ValueSet.data'



export class ValueSets {

  private processor: ValueSetProcessor
  private store: ValueSetStore

  constructor(processor: ValueSetProcessor, store: ValueSetStore) {
    this.processor = processor
    this.store = store
  }

  async processAll(): Promise<Choices[]> {
    return this.processor
               .processAll()
               .then(sets => {
                 return Promise
                   .all(sets
                          .filter(set => set.type
                                         === 'ValueSet'
                                         || set.type
                                         === 'CodeSystem'
                                         || set.type
                                         === 'unknown')
                          .map(set => this.store.write(set))
                   )
                   .then(() => sets)
                   .catch((e) => {
                     throw new Error(`processing failed: ${e}`)
                   })
               })
  }

  async process(id: string): Promise<void> {
    return this.processor
               .process(id)
               .then(choices => this.store.write(choices))
  }

  async get(id: string): Promise<Choices> {
    return this.processor.process(id)
  }

}

export class ValueSetsFactory {

  static fs(source: string, target: string, regex?: RegExp): ValueSets {

    const fsSource: LoadableStore = !regex
                                    ? new FSSource(source)
                                    : new FSSource(source, file => regex.test(file))

    const processor: ValueSetProcessor = new ValueSetProcessor(fsSource)

    const store: ValueSetStore = new FSStore(target)

    return new ValueSets(processor, store)

  }
}
