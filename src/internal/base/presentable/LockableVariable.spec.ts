import {html, LitElement, PropertyValues}      from 'lit'
import {customElement, property}               from 'lit/decorators.js'
import {describe, expect, it}                  from 'vitest'
import {fixture}                               from '../../../../tests/lit/lit-vitest-fixture'
import {Lockable, LockableRegistry, Lockables} from './LockableVariable'

describe('LockableVariable', () => {
  it('Should return true if there is no variable', async () => {

    const testBed: TestBed = await fixture<TestBed>(html`
        <test-bed ></test-bed >
    `, 'test-bed').first()


    // take in initial
    expect(testBed.myVar).toEqual('initial')

    // set first time
    testBed.setIt()
    expect(testBed.myVar).toEqual('bye')

    //reject second time
    testBed.myVar = 'Kaboom!'
    expect(testBed.myVar).toEqual('bye')

    //override
    testBed.registry.override('myVar', 'Kaboom!')
    expect(testBed.myVar).toEqual('Kaboom!')

    //unlock
    testBed.registry.unlock('myVar')
    testBed.myVar = 'Kablammo!'
    expect(testBed.myVar).toEqual('Kablammo!')

    testBed.myVar = 'Kaboom!'
    expect(testBed.myVar).toEqual('Kablammo!')

  })
})

@customElement('test-bed')
class TestBed extends LitElement {

  @LockableRegistry()
  declare registry: Lockables

  @property()
  @Lockable()
  public myVar: string = 'initial'

  public setIt() {
    console.log('foo')
    this.myVar = 'bye'
  }

  public attributeChangedCallback(name: string, _old: string | null, value: string | null) {
    console.log('attribute changed')
    super.attributeChangedCallback(name, _old, value)
  }

  protected willUpdate(_changedProperties: PropertyValues) {
    console.log('willUpdate')
    super.willUpdate(_changedProperties)
  }
}
