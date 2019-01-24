import _ from 'lodash/fp'
import {
  doProp, doPropOf, hasMethodAt, hasMethodOf,
} from './transform'

const fonop = { foo: _.noop }
/* globals describe test expect */
describe('doProp', () => {
  test('is curried', () => {
    const f1 = doProp(_.isFunction)
    expect(typeof f1).toBe('function')
    expect(f1('foo', fonop)).toBe(true)
    expect(f1('foo', { foo: 'sad' })).toBe(false)
    const f2 = doProp(_.isFunction, 'foo')
    expect(typeof f2).toBe('function')
    expect(f2(fonop)).toBe(true)
    expect(f2({ foo: 'sad' })).toBe(false)
  })
  test('applies transformer to item field.', () => {
    const item = { foo: [4, 2, 8, 6] }
    expect(doProp(_.min, 'foo', item)).toBe(2)
  })
})
describe('doPropOf', () => {
  test('Like doProp but accept object instead of path', () => {
    expect(doPropOf(_.isFunction, fonop, 'foo')).toBe(true)
    expect(doPropOf(_.min)({ foo: [4, 2, 8, 6] })('foo')).toBe(2)
  })
})

describe('hasMethodAt', () => {
  test('checks to see if path on item is a function', () => {
    expect(hasMethodAt('foo', fonop)).toBe(true)
    expect(hasMethodAt('bar', fonop)).toBe(false)
  })
})
describe('hasMethodOf', () => {
  test('checks to see if item path is a function', () => {
    expect(hasMethodOf(fonop)('foo')).toBe(true)
    expect(hasMethodAt(fonop, 'bar')).toBe(false)
  })
})
