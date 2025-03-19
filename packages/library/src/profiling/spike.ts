class FhirType<T extends FhirType<T>> {

  isOptional: boolean = false

  optional(): T {
    this.isOptional = true
    return this as unknown as T
  }
}

class FhirString extends FhirType<FhirString> {
  constructor() {
    super()
  }
}

class FhirNumber extends FhirType<FhirNumber> {
  constructor() {
    super()
  }
}

class FhirArray<T extends FhirType<any>> extends FhirType<FhirArray<T>> {
  constructor() {
    super()
  }
}


const x: FhirString = new FhirString().optional()


type FhirProps = { [key: string]: FhirType<any> }
type Definition<T> =
  { [key: string]: FhirType<any> }
  & { isOptional: boolean, optional: () => T }
  & { validate: (data: T) => boolean }
  & { profileWith: <P extends (Partial<T> & Definition<Partial<T>>)>(data: P) => FhirProps & Definition<T> }


function FhirElementDef<DEF extends FhirProps>(props: DEF): DEF & Definition<DEF> {

  const p = props as unknown as DEF & Definition<DEF>

  p.isOptional = false

  p.optional = () => {
    p.isOptional = true
    return props as unknown as DEF
  }

  p.profileWith = <T extends (Partial<DEF> & Definition<Partial<DEF>>)>(def: T): DEF & Definition<DEF> => {
    return def as unknown as DEF & Definition<DEF>
  }

  p.validate = (data: unknown) => true

  return p
}


type Data = {
  bar: FhirNumber
  baz: FhirArray<FhirString>
  foo: FhirString
}

type DataDef = Data & Definition<Data>

const def: DataDef = FhirElementDef({
                                      foo: new FhirString().optional(),
                                      bar: new FhirNumber().optional(),
                                      baz: new FhirArray<FhirString>().optional()
                                    })

// const profile = FhirElementDef({
//
//                                         foo: new FhirString()
//                                       })

// def.profileWith(profile)
