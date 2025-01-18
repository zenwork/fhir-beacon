/* eslint-disable @typescript-eslint/no-unused-expressions */
import {describe, expect, test} from 'vitest'
import {FSSource}               from './FSSource'
import {ResolvedValueSet}       from './ValueSet.data'



describe('FSSource', () => {

  const exampleData: string = `${process.cwd()}/../data/r5/examples-json`

  test('should read a dir', async () => {
    const source: FSSource = new FSSource(exampleData)
    const result: boolean = await source.load()
    expect(result).to.be.true
    expect(source.size()).to.equal(1331)
    expect(source.exists('valueset-transport-intent.json')).to.be.true
  })

  test('should read a file and resolve referenced coding system concepts over the internet', async () => {
    const source: FSSource = new FSSource(exampleData)
    await source.load()

    const valueSet: ResolvedValueSet = await source.read('valueset-transport-intent.json')

    expect(valueSet.id).to.equal('transport-intent')
    expect(valueSet.name).to.equal('TransportIntent')
    expect(valueSet.status).to.equal('draft')
    expect(valueSet.version).to.equal('5.0.0')
    expect(valueSet.compose.include.concept).to.have.lengthOf(9)
    expect(valueSet.compose.exclude.concept).to.have.lengthOf(0)

  })
})
