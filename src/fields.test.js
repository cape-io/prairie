import _ from 'lodash/fp'
import {
  copy, createObj, findAt, getFields, mergeWith, move, moveAll,
  renameFields, toObject, updateTo, updateToWhen,
} from './fields'

/* globals describe test expect */

describe('copy', () => {
  const copier = copy('foo', 'bar')
  test('copies prop from foo to new prop bar', () => {
    expect(copier({ foo: 'happy' })).toEqual({ foo: 'happy', bar: 'happy' })
  })
})
describe('createObj', () => {
  test('creates obj from (key, val) args', () => {
    expect(createObj('foo', 'happy')).toEqual({ foo: 'happy' })
  })
  test('nested', () => {
    expect(createObj('foo.bar', 'happy')).toEqual({ foo: { bar: 'happy' } })
  })
})
describe('toObject', () => {
  const collection = [
    { a: 'a1', b: 'b1', c: 'c1' },
    { a: 'a2', b: 'b2', c: 'c2' },
    { a: 'a3', b: 'b3', c: 'c3' },
  ]
  const obj = {
    a1: 'c1',
    a2: 'c2',
    a3: 'c3',
  }
  test('creates new obj from (key, val) string args', () => {
    expect(toObject('a', 'c', collection)).toEqual(obj)
  })
  test('creates new obj from (key, val) array args', () => {
    expect(toObject(['a'], ['c'], collection)).toEqual(obj)
  })
  test('creates new obj from (key, val) func args', () => {
    expect(toObject(_.get('a'), _.get('c'), collection)).toEqual(obj)
  })
  test('creates new obj with all same values', () => {
    expect(toObject('a', 2, collection)).toEqual({
      a1: 2,
      a2: 2,
      a3: 2,
    })
  })
})
describe('move', () => {
  const mover = move('foo', 'bar')
  test('calling with only two props should return func', () => {
    expect(typeof mover).toBe('function')
  })
  test('moves prop from foo to bar', () => {
    expect(mover({ foo: 'happy', baz: 'b' })).toEqual({ bar: 'happy', baz: 'b' })
  })
})
describe('moveAll', () => {
  const rename = moveAll(_.camelCase, ['foo_1', 'bar_2', 'baz_3'])
  test('rename select keys with a function', () => {
    expect(rename({
      foo_1: 1, bin_baz: 2, bar_2: 3, other: 4,
    })).toEqual({
      foo1: 1, bin_baz: 2, bar2: 3, other: 4,
    })
  })
})
describe('moveFields', () => {
  const rename = renameFields({ foo: 'bar', bin_baz: _.camelCase })
  test('rename with string or function', () => {
    expect(rename({
      foo: 1, bin_baz: 2, bar: 3, other: 4,
    })).toEqual({ bar: 1, binBaz: 2, other: 4 })
  })
})

describe('findAt', () => {
  test('finds first truthy path', () => {
    const getFirst = findAt(['c', 'b', 'a'])
    expect(getFirst({ a: 'foo', b: 'bar', c: null })).toBe('bar')
    expect(getFirst({ a: 'foo', b: false, c: '' })).toBe('foo')
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
describe('mergeWith', () => {
  test('apply 1st arg ontop of 2nd arg', () => {
    expect(mergeWith({ a: 'foo', b: 'bar' })({ b: 'baz', c: '' }))
      .toEqual({ a: 'foo', b: 'bar', c: '' })
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
