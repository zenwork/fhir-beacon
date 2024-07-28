import {expect} from 'vitest'

export const testPrimitive = (p: HTMLElement, prop: { key: string, value: string | null | undefined }) => {
  expect(p).toHaveAttribute('label', prop.key)

  if (prop.value === null) {
    expect(p.getAttribute('value')).toBeNull()
  } else if (prop.value === undefined) {
    expect(p.getAttribute('value')).toBeUndefined()
  } else {
    expect(p).toHaveAttribute('value', prop.value)
  }
}
