import {FhirDatatypeName}                            from 'FhirDatatypeName'
import {FhirPrimitiveName}                           from 'FhirPrimitiveName'
import {FhirResourceName}                            from 'FhirResourceName'
import {FhirElementData, KeyErrorPair, ResourceData} from 'internal'
import {html, TemplateResult}                        from 'lit'
import {Object, Runtype}                             from 'runtypes'
import {Choices}                                     from 'valuesets'



type choiceFor = string

type FhirTypeName = FhirPrimitiveName | FhirDatatypeName | FhirResourceName | 'BackboneElement'

export type ConstraintFn<T extends ResourceData | FhirElementData> = (data: T) => KeyErrorPair | null

type Infinity = typeof Number.POSITIVE_INFINITY

export interface KeyDef {
  key: string | `${choiceFor}[x]`
  discriminator?: string
  type?: FhirTypeName | `${FhirTypeName}[Array]` | `Reference(${FhirDatatypeName | FhirResourceName})`
  cardinality?: '0..*' | '0..1' | '1..1' | '1..*' | { min: number, max: number | Infinity }
  constraints?: (ConstraintFn<any>)[]
  binding?: Choices
  children?: KeyDef[]
  choiceOf?: KeyDef[]
  mustSupport?: boolean
  isModifier?: boolean
  isSummary?: boolean
}


export class StructureDefinition<T> {

  public type: FhirDatatypeName | FhirResourceName | 'unknown'
  public url: string
  public name: string
  public keys: KeyDef[]
  public template: (data: T) => TemplateResult[]
  private runtype: Object<any>

  constructor(props: {
    runtype: Object<any>
    type?: FhirDatatypeName | FhirResourceName | 'unknown',
    url?: string,
    name?: string,
    keys?: KeyDef[],
    template?: (data: T) => TemplateResult[]
  }) {

    this.runtype = props.runtype
    this.template = props.template ?? (() => [html``])
    this.keys = props.keys ?? []
    this.name = props.name ?? ''
    this.url = props.url ?? ''
    this.type = props.type ?? 'unknown'

  }


  validate(data: Runtype<T>): KeyErrorPair[] {
    this.runtype.check(data)
    return []
  }
}
