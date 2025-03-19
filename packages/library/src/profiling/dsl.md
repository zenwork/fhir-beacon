```typescript

const base = createBase('base', {
  name: fhirString().optional(),
  size: fhirNumber().,
  list: fhirArray(fhirString()),
  struct: fhirObject({
                       first: fhirString(),
                       last: fhirString()
                     })
})

const profiledBase = profile('SpecialCase',
                             base, 
                             {
  name: fhirString(),
  size: fhirNumber(),
  list: fhirArray(fhirString()),
  struct: fhirObject({
                       first: fhirString(),
                       last: fhirString()
                     })
})


```
