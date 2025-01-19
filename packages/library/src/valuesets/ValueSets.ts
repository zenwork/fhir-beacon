import {FSSource}                       from './FSSource'
import {FSStore}                        from './FSStore'
import {ValueSetChoices, ValueSetStore} from './ValueSet.data'
import {ValueSetProcessor}              from './ValueSetProcessor'



export class ValueSets {

  private processor: ValueSetProcessor
  private store: ValueSetStore

  constructor(processor: ValueSetProcessor, store: ValueSetStore) {
    this.processor = processor
    this.store = store
  }

  async processAll(): Promise<ValueSetChoices[]> {
    return this.processor
               .processAll()
               .then(sets => {
                 return Promise
                   .all(sets.map(set => this.store.write(set)))
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

  async get(id: string): Promise<ValueSetChoices> {
    return this.processor.process(id)
  }

}

export class ValueSetsFactory {
  static fs(source: string, target: string): ValueSets {
    return new ValueSets(new ValueSetProcessor(new FSSource(source)), new FSStore(target))
  }
}
