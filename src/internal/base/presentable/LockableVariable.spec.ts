import {html, LitElement}                      from 'lit'
import {customElement, property}               from 'lit/decorators.js'
import {assert, describe, expect, it}          from 'vitest'
import {fixture}                               from '../../../../tests/lit/lit-vitest-fixture'
import {Lockable, LockableRegistry, Lockables} from './LockableVariable'

describe('LockableVariable', () => {
  it('Should handle attribute set first', { retry: 3 }, async () => {

    // set first time
    const testBed: TestBed = await fixture<TestBed>(
      html`
          <test-bed myvar="boo"></test-bed >
      `,
      'test-bed').first()


    testBed.setAttribute('myvar', 'bam')
    expect(testBed.myvar).toEqual('bam')

    testBed.setAttribute('myvar', 'bim')
    expect(testBed.myvar).toEqual('bim')

    //reject
    testBed.myvar = 'Kaboom!'
    expect(testBed.myvar).toEqual('bim')

    //reject second time
    testBed.myvar = 'Kaboom!'
    expect(testBed.myvar).toEqual('bim')

    //override
    testBed.registry.override('myvar', 'Kaboom!')
    expect(testBed.myvar).toEqual('Kaboom!')

    //unlock
    testBed.registry.unlock('myvar')
    testBed.myvar = 'Kablammo!'
    expect(testBed.myvar).toEqual('Kablammo!')

    testBed.myvar = 'Kaboom!'
    expect(testBed.myvar).toEqual('Kablammo!')

  })

  it('Should handle internal set first', { retry: 3 }, async () => {

    // set first time
    const testBed: TestBed = await fixture<TestBed>(
      html`
          <test-bed ></test-bed >
      `,
      'test-bed').first()

    // override internal
    testBed.registry.override('myvar', 'Kaboom!')
    // lock it
    testBed.registry.lock('myvar')
    expect(testBed.myvar).toEqual('Kaboom!')

    // attribute set from outside
    testBed.setAttribute('myvar', 'bam')
    expect(testBed.myvar).toEqual('bam')

  })

  it('Should handle flag properties', { retry: 3 }, async () => {

    // set first time
    const testBed: TestBed = await fixture<TestBed>(
      html`
          <test-bed ?mybool=${true}></test-bed >
      `,
      'test-bed').first()

    assert.isTrue(testBed.mybool)

    testBed.setAttribute('mybool', '')
    assert.isTrue(testBed.mybool)

    testBed.removeAttribute('mybool')
    assert.isFalse(testBed.mybool)

  })
})

@customElement('test-bed')
class TestBed extends LitElement {

  @LockableRegistry()
  declare registry: Lockables

  @property()
  @Lockable()
  public myvar: string = 'initial'

  @property({ type: Boolean })
  @Lockable({ lockInitial: true })
  public mybool: boolean = false


  public attributeChangedCallback(name: string, _old: string | null, value: string | null) {
    this.registry.unlock(name)
    super.attributeChangedCallback(name, _old, value)
  }

}
