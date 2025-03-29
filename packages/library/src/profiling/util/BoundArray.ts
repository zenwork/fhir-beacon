export class BoundArray {

  private readonly min: number
  private readonly max: number
  private readonly array: any[]

  /**
   * @param {number} min - Minimum number of elements allowed in the array (e.g., 0, 1, n).
   * @param {number} max - Maximum number of elements allowed in the array (e.g., *, or m). Use Infinity for `*`.
   * @param {Array} initialValues - (Optional) Initial values for the array. Required if min = 1.
   */
  constructor(min: number = 0, max: number = Infinity, initialValues: Array<any> = []) {
    if (min < 0) {
      throw new Error('Min cardinality cannot be negative.')
    }
    if (max < min) {
      throw new Error('Max cardinality cannot be smaller than min cardinality.')
    }

    this.min = min
    this.max = max

    // Validation: Ensure initialValues respects cardinality requirements
    if (min === 1 && initialValues.length === 0) {
      throw new Error('Initial value is required when the minimum cardinality is 1.')
    }
    if (initialValues.length < min) {
      throw new Error(`Initial values must have at least ${min} elements.`)
    }
    if (initialValues.length > max) {
      throw new Error(`Initial values cannot exceed ${max} elements.`)
    }

    // Set the initial array values
    this.array = initialValues
  }

  /**
   * Adds an element to the array. Enforces the maximum
   * @param {any} element - The element to be added.
   */
  add(element: any) {
    if (this.array.length >= this.max) {
      throw new Error(`Cannot add more elements. Max cardinality of ${this.max} reached.`)
    }
    this.array.push(element)
  }

  /**
   * Removes an element from the array. Enforces the minimum cardinality constraint.
   * @param {any} element - The element to be removed.
   */
  remove(element: any) {
    if (this.array.length <= this.min) {
      throw new Error(`Cannot remove the element. Min cardinality of ${this.min} would be violated.`)
    }
    const index = this.array.indexOf(element)
    if (index === -1) {
      throw new Error('Element not found in the array.')
    }
    this.array.splice(index, 1)
  }

  /**
   * Inserts an element at a specified index. Enforces the maximum cardinality constraint.
   * @param {number} index - The index at which to insert the element.
   * @param {any} element - The element to be inserted.
   */
  insert(index: number, element: number) {
    if (this.array.length >= this.max) {
      throw new Error(`Cannot insert more elements. Max cardinality of ${this.max} reached.`)
    }
    if (index < 0 || index > this.array.length) {
      throw new Error('Invalid index.')
    }
    this.array.splice(index, 0, element)
  }

  /**
   * Checks if an element exists in the array.
   * @param {any} element - The element to check.
   * @returns {boolean} True if the element exists; false otherwise.
   */
  contains(element: number): boolean {
    return this.array.includes(element)
  }

  /**
   * Gets the current array.
   * @returns {Array} The array.
   */
  getArray(): Array<any> {
    return [...this.array]
  }

  /**
   * Gets the current size of the array.
   * @returns {number} The size of the array.
   */
  size(): number {
    return this.array.length
  }
}

// Example Usage
try {
  const mySet = new BoundArray(1, 5) // min 1, max 5
  mySet.add(10)
  console.log(mySet.getArray()) // [10]

  mySet.add(20)
  console.log(mySet.getArray()) // [10, 20]

  // Attempting to remove below the minimum cardinality
  mySet.remove(10)
  console.log(mySet.getArray()) // [20]

  mySet.remove(20) // Error: Cannot remove the element. Min cardinality of 1 would be violated.
} catch (error) {
  if (error instanceof Error) {
    console.error(error.message)
  } else {
    console.error('An unknown error occurred:', error)
  }
}
