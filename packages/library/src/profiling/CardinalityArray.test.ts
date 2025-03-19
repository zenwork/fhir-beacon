import {describe, expect, it} from 'vitest'
import {BoundedArray}         from './BoundedArray'



describe('CardinalityArray', () => {
  // Test creating an array with min = 0 and no initial values
  it('should allow creation with min=0 and no initial values', () => {
    const array = new BoundedArray(0, 5)
    expect(array.getArray()).toEqual([])
    expect(array.size()).toBe(0)
  })

  // Test creating an array with min = 1 but no initial value, which should throw an error
  it('should throw an error if min=1 and no initial value is provided', () => {
    expect(() => new BoundedArray(1, 5)).toThrow(
      'Initial value is required when the minimum cardinality is 1.'
    )
  })

  // Test creating an array with min = 1 and an initial value
  it('should allow creation with min=1 and an initial value', () => {
    const array = new BoundedArray(1, 5, [10])
    expect(array.getArray()).toEqual([10])
    expect(array.size()).toBe(1)
  })

  // Test adding elements up to the maximum cardinality
  it('should allow adding elements up to the max cardinality', () => {
    const array = new BoundedArray(0, 3)
    array.add(10)
    array.add(20)
    array.add(30)
    expect(array.getArray()).toEqual([10, 20, 30])
    expect(array.size()).toBe(3)
  })

  // Test attempting to add elements beyond the maximum cardinality
  it('should throw an error when adding elements beyond the max cardinality', () => {
    const array = new BoundedArray(0, 2)
    array.add(10)
    array.add(20)
    expect(() => array.add(30)).toThrow(
      'Cannot add more elements. Max cardinality of 2 reached.'
    )
  })

  // Test removing an element that violates the minimum cardinality
  it('should throw an error when removing elements below the min cardinality', () => {
    const array = new BoundedArray(1, 5, [10])
    expect(() => array.remove(10)).toThrow(
      'Cannot remove the element. Min cardinality of 1 would be violated.'
    )
  })

  // Test removing elements when within the valid range of cardinality
  it('should allow removing elements when within the min cardinality', () => {
    const array = new BoundedArray(0, 5, [10, 20])
    array.remove(10)
    expect(array.getArray()).toEqual([20])
  })

  // Test inserting elements at a valid index
  it('should allow inserting elements at a specific index', () => {
    const array = new BoundedArray(0, 5, [10, 20])
    array.insert(1, 15) // Insert at index 1
    expect(array.getArray()).toEqual([10, 15, 20])
  })

  // Test attempting to insert an element if maximum cardinality is reached
  it('should throw an error if inserting beyond max cardinality', () => {
    const array = new BoundedArray(0, 2, [10, 20])
    expect(() => array.insert(1, 15)).toThrow(
      'Cannot insert more elements. Max cardinality of 2 reached.'
    )
  })

  // Test contains method
  it('should confirm whether an element is present or not', () => {
    const array = new BoundedArray(0, 5, [10, 20])
    expect(array.contains(10)).toBe(true)
    expect(array.contains(15)).toBe(false)
  })

  // Test getting the size of the array
  it('should return the correct size of the array', () => {
    const array = new BoundedArray(0, 5, [10, 20])
    expect(array.size()).toBe(2)
  })

  // Test setting initial values outside the max cardinality
  it('should throw an error if initial values exceed max cardinality', () => {
    expect(() => new BoundedArray(0, 2, [10, 20, 30])).toThrow(
      'Initial values cannot exceed 2 elements.'
    )
  })

  // Test setting initial values below the min cardinality
  it('should throw an error if initial values are less than min cardinality', () => {
    expect(() => new BoundedArray(2, 5, [10])).toThrow(
      'Initial values must have at least 2 elements.'
    )
  })
})
