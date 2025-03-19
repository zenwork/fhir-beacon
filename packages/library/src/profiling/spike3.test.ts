import {describe, it} from 'vitest'



let things = []

function capture(dostuff: () => void) {
  const foo = 'hello'
  things = []
  dostuff()
  return things
}

function send(thing: string) {
  things.push(thing)
}

describe('test', () => {
  it('test', () => {

    const out = capture(() => {
      send('test')
      send('test2')
    })

    console.log(out)

  })
})
