import {FSSource}                          from './FSSource'
import {ResolvedValueSet, ValueSetChoices} from './ValueSet.data'



export interface ValueSetSource {
  read(source: string): Promise<ResolvedValueSet>
}

interface ValueSetStore {
  write(valueSet: ValueSetChoices): Promise<boolean>
  get(id: string): Promise<ValueSetChoices>
}

class ValueSetProcessor {
  private source: ValueSetSource
  constructor(source: ValueSetSource) {this.source = source}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  process(id: ResolvedValueSet): Promise<ValueSetChoices> {
    throw new Error('Method not implemented.')
  }
}

class FSStore implements ValueSetStore {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  write(valueSet: ValueSetChoices): Promise<boolean> {
    throw new Error('Method not implemented.')
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  get(id: string): Promise<ValueSetChoices> {
    throw new Error('Method not implemented.')
  }
}

export class ValueSets {
  private processor: ValueSetProcessor
  private store: ValueSetStore
  constructor(processor: ValueSetProcessor, store: ValueSetStore) {
    this.processor = processor
    this.store = store

  }

  async process(set: ResolvedValueSet): Promise<boolean> {
    return this.processor.process(set).then(choices => this.store.write(choices))
  }

  async get(id: string): Promise<ValueSetChoices> {
    return this.store.get(id)
  }

}

export class ValueSetsFactory {
  static fs(): ValueSets {
    return new ValueSets(new ValueSetProcessor(new FSSource('.')), new FSStore())
  }
}
