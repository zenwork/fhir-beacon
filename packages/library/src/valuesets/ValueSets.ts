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

  async processAll(debug: boolean = false): Promise<Choices[]> {
    return this.processor
               .processAll(debug)
               .then((sets: Choices[]) => {
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

  // todo: the link between id and single file is broken
  async process(id: string): Promise<void> {
    return this.processor
               .process(id)
               .then((choices: Choices[]) => Promise.all(choices.map(choice => this.store.write(choice))))
  }

  // todo: the link between id and single file is broken
  async get(id: string): Promise<Choices[]> {
    return this.processor.process(id)
  }

}

export class ValueSetsFactory {

  static fs(source: string,
            target: string,
            regex: RegExp | undefined,
            skipUrl: (url: string) => boolean = () => false): ValueSets {

    const fsSource: LoadableStore = !regex
                                    ? new FSSource(source, undefined, skipUrl)
                                    : new FSSource(source, file => regex.test(file), skipUrl)

    fsSource.loadDir()

    const processor: ValueSetProcessor = new ValueSetProcessor(fsSource)

    const store: ValueSetStore = new FSStore(target)

    return new ValueSets(processor, store)

  }

  static singleSource(file: string,
                      target: string,
                      skipUrl: (url: string) => boolean = () => false): ValueSets {

    const fsSource = new FSSource(file, undefined, skipUrl)

    fsSource.loadfile()

    const processor: ValueSetProcessor = new ValueSetProcessor(fsSource)

    const store: ValueSetStore = new FSStore(target)

    return new ValueSets(processor, store)

  }
}
