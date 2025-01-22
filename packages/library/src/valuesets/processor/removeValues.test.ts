import {describe, expect, test} from 'vitest'
import {ResolvedValue}          from '../ValueSet.data'
import {removeValues}           from './ValueSetProcessor'



describe('removeValues', () => {

  test('should remove nothing when empty set provided', () => {
    const reducedSet: ResolvedValue[] = removeValues([{ code: 'a', display: 'a', definition: 'a' }], [])
    expect(reducedSet).to.eql([{ code: 'a', display: 'a', definition: 'a' }])
  })

  test('should remove all when all matched', () => {
    const included: ResolvedValue[] = [{ code: 'a', display: 'a', definition: 'a' }]
    const reducedSet: ResolvedValue[] = removeValues(included, included)
    expect(reducedSet).to.eql([])
  })

  test('should remove subset when subset passed', () => {
    const included: ResolvedValue[] = [{ code: 'a', display: 'a', definition: 'a' }]
    const reducedSet: ResolvedValue[] = removeValues([...included, { code: 'b', display: 'b', definition: 'b' }],
                                                     included)
    expect(reducedSet).to.eql([{ code: 'b', display: 'b', definition: 'b' }])
  })

  test('should remove nothing when no match', () => {
    const included: ResolvedValue[] = [
      { code: 'a', display: 'a', definition: 'a' },
      { code: 'c', display: 'c', definition: 'c' }
    ]

    const reducedSet: ResolvedValue[] = removeValues(included, [{ code: 'b', display: 'b', definition: 'b' }])

    expect(reducedSet).to.eql(included)
  })
})
