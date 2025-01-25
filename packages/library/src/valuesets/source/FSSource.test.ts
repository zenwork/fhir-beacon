/* eslint-disable @typescript-eslint/no-unused-expressions */
import {describe, expect, test} from 'vitest'
import {ResolvedSet}            from '../ValueSet.data'
import {FSSource}               from './FSSource'



describe('FSSource', () => {

  const exampleData: string = `${process.cwd()}/../data/r5/examples-json`

  test('should read a dir', async () => {
    const source: FSSource = new FSSource(exampleData, undefined, () => false)
    const result: boolean = await source.load()
    expect(result).to.be.true
    expect(source.size()).to.equal(2824)
    expect(source.exists('valueset-transport-intent.json')).to.be.true
  })

  test('should read a file and resolve referenced coding system concepts over the internet',
       { timeout: 30000 },
       async () => {
         const source: FSSource = new FSSource(exampleData, undefined, () => false)
         await source.load()

         const valueSet: ResolvedSet = await source.resolve('valueset-transport-intent.json', false)

         expect(valueSet.id).to.equal('transport-intent')
         expect(valueSet.name).to.equal('TransportIntent')
         expect(valueSet.status).to.equal('draft')
         expect(valueSet.version).to.equal('5.0.0')
         expect(valueSet.compose.include.concept).to.have.lengthOf(9)
         expect(valueSet.compose.exclude.concept).to.have.lengthOf(0)

       })

  test('should read a file and resolve referenced coding system concepts over the internet',
       { timeout: 30000 },
       async () => {
         const source: FSSource = new FSSource(exampleData, undefined, () => false)
         await source.load()

         const valueSet: ResolvedSet = await source.resolve('valueset-week-of-month.json', false)

         // console.log(JSON.stringify(valueSet,null,2))
         expect(valueSet.id).to.equal('week-of-month')
         expect(valueSet.name).to.equal('WeekOfMonth')
         expect(valueSet.status).to.equal('draft')
         expect(valueSet.version).to.equal('5.0.0')
         expect(valueSet.compose.include.concept).to.have.lengthOf(5)
         expect(valueSet.compose.exclude.concept).to.have.lengthOf(0)

       })

  test('should read a file and resolve referenced value set concepts over the internet',
       { timeout: 30000 },
       async () => {
         const source: FSSource = new FSSource(exampleData, undefined, () => false)
         await source.load()

         const valueSet: ResolvedSet = await source.resolve('valueset-definition-topic.json')

         expect(valueSet.id).to.equal('definition-topic')
         expect(valueSet.name).to.equal('DefinitionTopic')
         expect(valueSet.compose.include.concept).to.have.lengthOf(9)
         expect(valueSet.compose.exclude.concept).to.have.lengthOf(0)

       }
  )

  test('should fail when url are not resolvable',
       { timeout: 30000 },
       async () => {
         const source: FSSource = new FSSource(exampleData, undefined, () => false)
         await source.load()

         try {
           await source.resolve('valueset-participation-role-type.json')
         } catch (err) {
           expect((err as Error).message).to.equal(
             'Failed to read and resolve ValueSet for source "valueset-participation-role-type.json". Details: Error: Failed to resolve value set [Error: Failed to coding system set [http://dicom.nema.org/resources/ontology/DCM][SyntaxError: Unexpected token \'<\', "<!DOCTYPE "... is not valid JSON]]')
         }

       }
  )

  test('should fail when file not found',
       { timeout: 30000 },
       async () => {
         const source: FSSource = new FSSource(exampleData, undefined, () => false)
         await source.load()

         try {
           await source.resolve('foo.json')
         } catch (err) {
           expect((err as Error).message).to.equal('ValueSet foo.json not found')
         }

       }
  )


})
