const { copy, move } = require('./fields')

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
