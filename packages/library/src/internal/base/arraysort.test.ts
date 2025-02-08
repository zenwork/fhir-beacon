import {describe, expect, test} from 'vitest'
import {reindex, sort}          from './ArraySortingFunction'
import {FullyQualifiedKey}      from './Validations.type'



describe('array sort', () => {


  test.each([
              {
                input: [
                  [{ path: [{ node: 'a', index: 0 }], key: 'foo', index: 3 }, ['foo']],
                  [{ path: [{ node: 'a', index: 0 }], key: 'foo', index: 1 }, ['foo']]
                ],
                expected: [
                  [{ path: [{ node: 'a', index: 0 }], key: 'foo', index: 1 }, ['foo']],
                  [{ path: [{ node: 'a', index: 0 }], key: 'foo', index: 3 }, ['foo']]
                ]
              },
              {
                input: [
                  [{ path: [{ node: 'a', index: 1 }], key: 'foo', index: 1 }, ['foo']],
                  [{ path: [{ node: 'a', index: 0 }], key: 'foo', index: 3 }, ['foo']]
                ],
                expected: [
                  [{ path: [{ node: 'a', index: 0 }], key: 'foo', index: 3 }, ['foo']],
                  [{ path: [{ node: 'a', index: 1 }], key: 'foo', index: 1 }, ['foo']]
                ]
              },
              {
                input: [
                  [{ path: [{ node: 'a', index: 1 }], key: 'foo', index: 1 }, ['foo']],
                  [{ path: [{ node: 'a' }], key: 'foo', index: 3 }, ['foo']]
                ],
                expected: [
                  [{ path: [{ node: 'a' }], key: 'foo', index: 3 }, ['foo']],
                  [{ path: [{ node: 'a', index: 1 }], key: 'foo', index: 1 }, ['foo']]
                ]
              },
              {
                input: [
                  [{ path: [{ node: 'a', index: 1 }], key: 'foo' }, ['foo']],
                  [{ path: [{ node: 'a' }], key: 'foo', index: 3 }, ['foo']]
                ],
                expected: [
                  [{ path: [{ node: 'a' }], key: 'foo', index: 3 }, ['foo']],
                  [{ path: [{ node: 'a', index: 1 }], key: 'foo' }, ['foo']]
                ]
              },
              {
                input: [
                  [{ path: [{ node: 'a', index: 1 }], key: 'foo' }, ['foo']],
                  [{ path: [{ node: 'a' }], key: 'bar' }, ['foo']]
                ],
                expected: [
                  [{ path: [{ node: 'a' }], key: 'bar' }, ['foo']],
                  [{ path: [{ node: 'a', index: 1 }], key: 'foo' }, ['foo']]
                ]
              },
              {
                input: [
                  [{ path: [{ node: 'a' }, { node: 'b' }], key: 'foo' }, ['foo']],
                  [{ path: [{ node: 'a' }, { node: 'a' }], key: 'bar' }, ['foo']]
                ],
                expected: [
                  [{ path: [{ node: 'a' }, { node: 'a' }], key: 'bar' }, ['foo']],
                  [{ path: [{ node: 'a' }, { node: 'b' }], key: 'foo' }, ['foo']]
                ]
              },
              {
                input: [
                  [{ path: [{ node: 'a' }, { node: 'a', index: 1 }], key: 'foo' }, ['foo']],
                  [{ path: [{ node: 'a' }, { node: 'a' }], key: 'bar' }, ['foo']]
                ],
                expected: [
                  [{ path: [{ node: 'a' }, { node: 'a' }], key: 'bar' }, ['foo']],
                  [{ path: [{ node: 'a' }, { node: 'a', index: 1 }], key: 'foo' }, ['foo']]
                ]
              },
              {
                input: [
                  [{ path: [{ node: 'a' }, { node: 'a' }], key: 'bar', index: 5 }, ['b']],
                  [{ path: [{ node: 'a' }, { node: 'a' }], key: 'bar', index: 3 }, ['a']]
                ],
                expected: [
                  [{ path: [{ node: 'a' }, { node: 'a' }], key: 'bar', index: 3 }, ['a']],
                  [{ path: [{ node: 'a' }, { node: 'a' }], key: 'bar', index: 5 }, ['b']]
                ]
              },
              {
                input: [
                  [{ path: [{ node: 'a', index: 5 }, { node: 'a' }], key: 'bar' }, ['b']],
                  [{ path: [{ node: 'a', index: 3 }, { node: 'a' }], key: 'bar' }, ['a']]
                ],
                expected: [
                  [{ path: [{ node: 'a', index: 3 }, { node: 'a' }], key: 'bar' }, ['a']],
                  [{ path: [{ node: 'a', index: 5 }, { node: 'a' }], key: 'bar' }, ['b']]
                ]
              },
              {
                input: [
                  [{ path: [{ node: 'a', index: 5 }, { node: 'a' }], key: 'bar' }, ['a5abar']],
                  [{ path: [{ node: 'c', index: 5 }, { node: 'a' }], key: 'bar', index: 10 }, ['c5abar10']],
                  [{ path: [{ node: 'c', index: 5 }, { node: 'a' }], key: 'bar' }, ['c5abar']],
                  [{ path: [{ node: 'a', index: 3 }, { node: 'a' }], key: 'bar' }, ['a3abar']]
                ],
                expected: [
                  [{ path: [{ node: 'a', index: 3 }, { node: 'a' }], key: 'bar' }, ['a3abar']],
                  [{ path: [{ node: 'a', index: 5 }, { node: 'a' }], key: 'bar' }, ['a5abar']],
                  [{ path: [{ node: 'c', index: 5 }, { node: 'a' }], key: 'bar' }, ['c5abar']],
                  [{ path: [{ node: 'c', index: 5 }, { node: 'a' }], key: 'bar', index: 10 }, ['c5abar10']]
                ]
              }
            ])
      ('test sorting %#', ({ input, expected }) => {

        const sorted: [FullyQualifiedKey, string[]][] = sort(input as [FullyQualifiedKey, string[]][])

        expect(sorted).toStrictEqual(expected)
      })

  test.each([
              {
                input: [
                  [{ path: [{ node: 'a', index: 4 }, { node: 'b', index: 0 }], key: 'foo', index: 1 }, ['a']],
                  [{ path: [{ node: 'a', index: 4 }, { node: 'b', index: 0 }], key: 'foo', index: 3 }, ['b']],
                  [{ path: [{ node: 'a', index: 4 }, { node: 'b', index: 7 }], key: 'foo', index: 3 }, ['c']],
                  [{ path: [{ node: 'b', index: 4 }, { node: 'a', index: 7 }], key: 'bar', index: 3 }, ['d']],
                  [{ path: [{ node: 'c' }, { node: 'c' }], key: 'baz', index: 2 }, ['e']],
                  [{ path: [{ node: 'c' }, { node: 'c' }], key: 'baz', index: 4 }, ['f']]
                ],
                expected: [
                  [{ path: [{ node: 'a', index: 0 }, { node: 'b', index: 0 }], key: 'foo', index: 0 }, ['a']],
                  [{ path: [{ node: 'a', index: 0 }, { node: 'b', index: 0 }], key: 'foo', index: 1 }, ['b']],
                  [{ path: [{ node: 'a', index: 0 }, { node: 'b', index: 1 }], key: 'foo', index: 1 }, ['c']],
                  [{ path: [{ node: 'b', index: 0 }, { node: 'a', index: 0 }], key: 'bar', index: 0 }, ['d']],
                  [{ path: [{ node: 'c' }, { node: 'c' }], key: 'baz', index: 0 }, ['e']],
                  [{ path: [{ node: 'c' }, { node: 'c' }], key: 'baz', index: 1 }, ['f']]
                ]
              }
            ])
      ('test reindexing %#', ({ input, expected }) => {
        const reindexed: [FullyQualifiedKey, string[]][] = reindex(input as [FullyQualifiedKey, string[]][])
        // console.log(reindexed.map(e => JSON.stringify(e[0]) + ' : [' + e[1].join(', ') + ']') )
        expect(reindexed).toStrictEqual(expected)
      })

  test.each([
              {
                input: [
                  [{ path: [{ node: 'a', index: 4 }, { node: 'b', index: 7 }], key: 'foo', index: 3 }, ['c']],
                  [{ path: [{ node: 'a' }], key: 'foo' }, ['top']],
                  [{ path: [{ node: 'a', index: 4 }, { node: 'b', index: 0 }], key: 'foo', index: 3 }, ['b']],
                  [{ path: [{ node: 'c' }, { node: 'c' }], key: 'baz', index: 2 }, ['e']],
                  [{ path: [{ node: 'a', index: 4 }, { node: 'b', index: 0 }], key: 'foo', index: 1 }, ['a']],
                  [{ path: [{ node: 'b', index: 4 }, { node: 'a', index: 7 }], key: 'bar', index: 3 }, ['d']],
                  [{ path: [{ node: 'c' }, { node: 'c' }], key: 'baz', index: 4 }, ['f']]
                ],
                expected: [
                  [{ path: [{ node: 'a' }], key: 'foo' }, ['top']],
                  [{ path: [{ node: 'a', index: 0 }, { node: 'b', index: 0 }], key: 'foo', index: 0 }, ['a']],
                  [{ path: [{ node: 'a', index: 0 }, { node: 'b', index: 0 }], key: 'foo', index: 1 }, ['b']],
                  [{ path: [{ node: 'a', index: 0 }, { node: 'b', index: 1 }], key: 'foo', index: 1 }, ['c']],
                  [{ path: [{ node: 'b', index: 0 }, { node: 'a', index: 0 }], key: 'bar', index: 0 }, ['d']],
                  [{ path: [{ node: 'c' }, { node: 'c' }], key: 'baz', index: 0 }, ['e']],
                  [{ path: [{ node: 'c' }, { node: 'c' }], key: 'baz', index: 1 }, ['f']]
                ]
              }
            ])
      ('test sort and reindexing %#', ({ input, expected }) => {
        const reindexed: [FullyQualifiedKey, string[]][] = reindex(sort(input as [FullyQualifiedKey, string[]][]))
        // console.log(reindexed.map(e => JSON.stringify(e[0]) + ' : [' + e[1].join(', ') + ']') )
        expect(reindexed).toStrictEqual(expected)
      })


})
