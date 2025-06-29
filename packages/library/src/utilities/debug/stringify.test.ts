import {describe, expect, it} from 'vitest'
import {stringify}            from './stringify'




describe('stringify', () => {
  // Test simple values
  it('should handle string values by removing quotes', () => {
    expect(stringify('test string')).to.eql('test string')
  })

  it('should handle number values', () => {
    expect(stringify(42)).to.eql('42')
  })

  it('should handle boolean values', () => {
    expect(stringify(true)).to.eql('true')
    expect(stringify(false)).to.eql('false')
  })

  // Test simple arrays (arrays of strings or numbers)
  it('should format arrays of strings on a single line', () => {
    const array = ['one', 'two', 'three']
    expect(stringify(array)).to.eql('[ "one", "two", "three" ]')
  })

  it('should format arrays of numbers on a single line', () => {
    const array = [1, 2, 3]
    expect(stringify(array)).to.eql('[ 1, 2, 3 ]')
  })

  it('should format arrays of mixed strings and numbers on a single line', () => {
    const array = ['one', 2, 'three', 4]
    expect(stringify(array)).to.eql('[ "one", 2, "three", 4 ]')
  })

  // Test objects with nested simple arrays
  it('should format nested arrays of strings on a single line', () => {
    const obj = {
      name: 'test',
      values: ['one', 'two', 'three']
    }
    const expected = `{
    "name": "test",
    "values": [ "one", "two", "three" ]
}`
    expect(stringify(obj)).to.eql(expected)
  })

  it('should format nested arrays of numbers on a single line', () => {
    const obj = {
      name: 'test',
      values: [1, 2, 3]
    }
    const expected = `{
    "name": "test",
    "values": [ 1, 2, 3 ]
}`
    expect(stringify(obj)).to.eql(expected)
  })

  it('should format deeply nested arrays of strings or numbers on a single line', () => {
    const obj = {
      name: 'test',
      nested: {
        values: ['one', 'two', 'three'],
        numbers: [1, 2, 3]
      }
    }
    const expected = `{
    "name": "test",
    "nested": {
        "values": [ "one", "two", "three" ],
        "numbers": [ 1, 2, 3 ]
    }
}`
    expect(stringify(obj)).to.eql(expected)
  })

  // Test complex objects with mixed array types
  it('should format complex arrays normally (multi-line)', () => {
    const complexArray = [
      { id: 1, name: 'item1' },
      { id: 2, name: 'item2' }
    ]
    const expected = `[
    {
        "id": 1,
        "name": "item1"
    },
    {
        "id": 2,
        "name": "item2"
    }
]`
    expect(stringify(complexArray)).to.eql(expected)
  })

  it('should handle objects with both simple and complex arrays', () => {
    const obj = {
      simpleArray: ['one', 'two', 'three'],
      complexArray: [
        { id: 1, tags: ['tag1', 'tag2'] },
        { id: 2, tags: ['tag3', 'tag4'] }
      ]
    }
    const expected = `{
    "simpleArray": [ "one", "two", "three" ],
    "complexArray": [
        {
            "id": 1,
            "tags": [ "tag1", "tag2" ]
        },
        {
            "id": 2,
            "tags": [ "tag3", "tag4" ]
        }
    ]
}`
    expect(stringify(obj)).to.eql(expected)
  })

  // Test edge cases
  it('should handle null values', () => {
    expect(stringify(null)).to.eql('null')
  })

  it('should handle undefined values', () => {
    // The stringify function doesn't have specific handling for undefined
    // and will throw an error when trying to access charAt on undefined
    expect(() => stringify(undefined)).to.throw(TypeError)
  })

  it('should handle empty arrays', () => {
    expect(stringify([])).to.eql('[  ]')
  })

  it('should handle empty objects', () => {
    expect(stringify({})).to.eql('{}')
  })
})
