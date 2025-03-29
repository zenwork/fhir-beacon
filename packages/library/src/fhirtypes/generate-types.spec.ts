import {describe, it} from 'vitest'
import {FhirTypes}    from './code-systems'



describe('FHIR Types', { skip: true }, () => {
  it('should generate primitive names', () => {
    console.log('export type PrimitiveName = \n')
    FhirTypes.sort((a, b) => a.code.localeCompare(b.code))
             .filter(t => !t.abstract && t.kind === 'primitive')
             .forEach(t => console.log('| \'' + t.code + '\'\n'))

  })

  it('should generate datatype names', () => {
    console.log('export type DatatypeName = \n')
    FhirTypes.sort((a, b) => a.code.localeCompare(b.code))
             .filter(t => !t.abstract && t.kind === 'datatype')
             .forEach(t => console.log('| \'' + t.code + '\'\n'))

  })

  it('should generate resource', () => {
    console.log('export type ResourceName = \n')
    FhirTypes.sort((a, b) => a.code.localeCompare(b.code))
             .filter(t => !t.abstract && t.kind === 'resource')
             .forEach(t => console.log('| \'' + t.code + '\'\n'))

  })

  it('should generate primitive types', () => {


    FhirTypes.sort((a, b) => a.code.localeCompare(b.code))
             .filter(t => !t.abstract && t.kind === 'primitive')
             .forEach(t => {
               console.log(`
  /** 
   * @description ${t.definition}
   * - code: ${t.code}
   */\n`)
               console.log('export type '
                           + t.code.substring(0, 1).toUpperCase()
                           + t.code.substring(1, t.code.length)
                           + ' =  string \n')

             })


  })


  it('should generate datatype types', () => {


    FhirTypes.sort((a, b) => a.code.localeCompare(b.code))
             .filter(t => !t.abstract && t.kind === 'datatype')
             .forEach(t => {
               console.log(`
  /** 
   * @description ${t.definition}
   * - code: ${t.code}
   */\n`)
               console.log('export type ' + t.code + 'Data = FhirElementData & {}\n')

             })


  })


  it('should generate resource types', () => {


    FhirTypes.sort((a, b) => a.code.localeCompare(b.code))
             .filter(t => !t.abstract && t.kind === 'resource')
             .forEach(t => {
               console.log(`
  /** 
   * @description ${t.definition}
   * - code: ${t.code}
   */\n`)
               console.log('export type ' + t.code + 'Data = DomainResourceData & {}\n')


             })


  })

})
