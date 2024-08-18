import {TemplateResult} from 'lit'

export type GeneratorGroup<T> = { [key: string]: (data: T) => TemplateResult | TemplateResult[] }
export type Generators<T> = { structure: GeneratorGroup<T>, display: GeneratorGroup<T> }
