import _ from 'lodash/fp'
import {
  copy, getFields, move, updateTo, updateToWhen,
} from './fields'

/* globals describe test expect */
describe('copy', () => {
  const copier = copy('foo', 'bar')
  test('copies prop from foo to new prop bar', () => {
    expect(copier({ foo: 'happy' })).toEqual({ foo: 'happy', bar: 'happy' })
  })
})
describe('move', () => {
  const mover = move('foo', 'bar')
  test('calling with only two props should return func', () => {
    expect(typeof mover).toBe('function')
  })
  test('moves prop from foo to bar', () => {
    expect(mover({ foo: 'happy' })).toEqual({ bar: 'happy' })
  })
})
describe('getFields', () => {
  test('calling with structured selector passes item to func', () => {
    expect(getFields({ bar: _.get('foo') }, { foo: 'happy' }))
      .toEqual({ bar: 'happy' })
  })
  test('string values will be sent to _.get', () => {
    expect(getFields({ bar: 'foo' })({ foo: 'happy' }))
      .toEqual({ bar: 'happy' })
  })
  test('non string or function values will be return unchanged', () => {
    const dateField = new Date()
    expect(getFields({ bar: 'foo', baz: dateField })({ foo: 'happy' }).baz)
      .toBe(dateField)
  })
})
describe('updateTo', () => {
  const toUpper = updateTo(_.toUpper)
  const fooUpper = toUpper('foo')
  test('will replace value of foo prop with uppercase', () => {
    expect(fooUpper({ foo: 'happy' })).toEqual({ foo: 'HAPPY' })
  })
  const barUpper = toUpper('bar')
  test('will replace value of bar prop with uppercase', () => {
    expect(barUpper({ foo: 'sad', bar: 'happy' })).toEqual({ foo: 'sad', bar: 'HAPPY' })
  })
})
describe('updateToWhen', () => {
  const toArray = updateToWhen(Array, _.isPlainObject)
  test('will replace value of foo prop with array when obj', () => {
    expect(toArray('foo', { foo: { a: 'happy' } }))
      .toEqual({ foo: [{ a: 'happy' }] })
    const fooIsArrAlready = { foo: [{ a: 'happy' }] }
    expect(toArray('foo', fooIsArrAlready)).toBe(fooIsArrAlready)
  })
})
