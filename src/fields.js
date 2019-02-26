import {
  at, cond, constant, curry, curryN, find, get, has, identity, isEmpty, isFunction, isString,
  mapValues, rearg, set, stubTrue, unset, update,
} from 'lodash/fp'
import overBranch from 'understory/lib/overBranch'
import { doProp } from './transform'

// _.set(path, value, state)
// _.update()

/**
 * Create a new object based path and value.
 * Dot notation or an array of strings will result in nested objects.
 * @param {string|Array} path The path used for key creation.
 * @param {any} value The thing used for value of key.
 * @returns {Object} New object with `value` placed on the last key of `path`.
 * @example createObj('foo.bar', 'happy') // => { foo: { bar: 'happy' } }
 * @example createObj('foo', 'bar') // => { foo: 'bar' }
 * @example createObj('foo')('bar') // => { foo: 'bar' }
 * @example createObj('baz', { a: 1 }) // => { baz: { a: 1 } }
 */
export const createObj = curry((path, value) => set(path, value, {}))

/**
 * Rearranged `_.set` args to `setIn(path, object, value)`
 * @type {function}
 * @param {string} path The path of the property to replace.
 * @param {Function} object The object that to set value on.
 * @param {any} value The value to place on path.
 * @returns {Object} New object with `value` set at `path`.
 * @example setIn('foo', {}, 'bar') // => { foo: 'bar' }
 * @example setIn('a', { b: 1 }, 2) // => { a: 2, b: 1 }
 */
export const setIn = curryN(3, rearg([0, 2, 1], set))

/**
 * Rearranged `_.set` args to `setVal(value, object, path)`
 * @type {function}
 * @example setVal(value, object, path)
 */
export const setVal = curryN(3, rearg([2, 0, 1], set))

/**
 * Normal lodash _.set with no rearg. `setVal(object, path, value)`
 * @function
 * @example setVal(object, path, value)
 */
export const setState = set.convert({ rearg: false })

/**
 * Set field. Like `_.update` but transformer is given the entire item instead of only the field.
 * @param {string} path The path of the property to replace.
 * @param {Function} transformer Transformer given entire item. Return value set at path.
 * @param {Object} item The item to update field on.
 * @returns {Object} Item with `path` updated with result of `transformer`.
 */
export const setField = curry((path, transformer, item) => set(
  path, transformer(item), item,
))

/**
 * Set field like `setField` but only if it's value is empty.
 * @param {string} path The path of the property to replace.
 * @param {Function} transformer Transformer given entire item. Return value set at path.
 * @param {Object} item The item to update field on.
 */
export const addField = curry((path, transformer) => overBranch(
  doProp(isEmpty, path), setField(path, transformer),
))

/**
 * Replace field only if it is already set. Transformer given entire item.
 * @param {string} path The path of the property to replace.
 * @param {Function} transformer Transformer given entire item. Return value set at path.
 * @param {Object} item The item to update field on.
 * @returns {Object} Item with `path` updated with result of `transformer`.
 */
export const setFieldHas = curry((path, transformer) => overBranch(
  has(path), setField(path, transformer),
))

/**
 * Replace field only if found. Transformer gets field value.
 * Probably just use _.update()!?
 * @function replaceField
 */
export const replaceField = curry((path, transformer) => overBranch(
  has(path), update(path, transformer),
))

/**
 * Replace field with result of transformer when boolCheck return true.
 * @param {Function} transformer Transformer given value at path of item. Return replacement value.
 * @param {Function} boolCheck A function that returns true when field should be replaced.
 * @param {string} path The path of the property to update.
 * @param {Object} item The item to conditionally update field on.
 * @returns {Object} Item with conditional transformer applied to `path`.
 * @example
 * const toArray = updateToWhen(Array, _.isPlainObject, 'foo')
 * toArray({ foo: { a: 'happy' } }) // => { foo: [{ a: 'happy' }] }
 */
export const updateToWhen = curry((transformer, boolCheck, path, item) => overBranch(
  doProp(boolCheck, path), update(path, transformer),
)(item))

/**
 * Rearranged _.update args to transformer, path, item
 * @param {Function} transformer Transformer given value at path of item. Return replacement value.
 * @param {string} path The path of the property to get.
 * @param {Object} item The item to update field on.
 * @returns {Object} Item with transformer applied to property at `path`.
 */
export const updateTo = curry(
  (transformer, path, item) => update(path, transformer, item),
)

/**
 * Set field on item. Transformer given value of withId property.
 * @param {string} path The path of the property to get.
 * @param {string} withId The path of the property to send to `transformer`.
 * @param {Function} transformer Transformer given value of withId property.
 * @returns {ItemTransformer} Result of transformer set at `field` `item`.
 */
export const updateWith = curry((path, withId, transformer, item) => setField(
  path, doProp(transformer, withId), item,
))
export const setFieldWith = updateWith
export const setWith = updateWith

/**
 * Replace item with result of transformer.
 * @example
 * mergeFields(({ a, b }) => ({ a4: a * 4, b3: b * 3 }), { a: 2, b: 3 });
 * // => { a: 2, b: 3, a4: 8, b3: 9 }
 *
 * @param {Function} transformer Accepts single param that is `item`. Should return a new Object.
 * @param {Object} item
 * @returns {Object} Merged result of transformer on top of `item`.
 */
export const mergeFields = curry((transformer, item) => ({
  ...item, ...transformer(item),
}))

/**
 * Merge source on top of item.
 * @example
 * mergeWith({ a: 1 })({ a: 2, b: 4 });
 * // => { a: 1, b: 4 }
 *
 * @param {Object} source Object to apply on top of item.
 * @param {Object} item Object that values of source will be applied.
 * @returns {Object} Merged result of `surce` on top of `item`.
 */
export const mergeWith = curry((source, item) => Object.assign(
  {}, item, source,
))

/**
 * Replace item. Transformer given value of withId property.
 * @param {string} withId The path of the property to send to `transformer`.
 * @param {Function} transformer Sent item property at path of `withId`. Should return new Object.
 * @param {Object} item The object to work with.
 * @returns {Object} Result of transformer set at `field` `item`.
 */
export const mergeFieldsWith = curry((withId, transformer, item) => ({
  ...item,
  ...doProp(transformer, withId, item),
}))

/**
 * Copy value of getPath to setPath.
 * @param {string} getPath The source path.
 * @param {string} setPath The destination path.
 * @param {Object} item The object to work with.
 */
export const copy = curry(
  (getPath, setPath, item) => set(setPath, get(getPath, item), item),
)

/**
 * Move property from one names to another.
 * @param {string} getPath The source path.
 * @param {string} setPath The destination path.
 * @param {Object} item The object to work with.
 * @returns {Object} Result after the move. Value at `getPath` removed and added to `setPath`.
 */
export const move = curry(
  (getPath, setPath, item) => unset(getPath, copy(getPath, setPath, item)),
)

export const selector = cond([
  [isString, get],
  [isFunction, identity],
  [stubTrue, constant],
])

/**
 * Return the first truthy value of paths.
 * @param {Array} getPaths An array of source paths.
 * @param {Object} item The item to look for values on.
 * @returns {any} The first truthy value found at one of the `getPaths`.
 * @example findAt(['c', 'b', 'a'])({ a: 'foo', b: 'bar', c: null }) // => 'bar'
 * @example findAt(['c', 'b', 'a'])({ a: 'foo', b: false, c: '' }) // => 'foo'
 */
export const findAt = curry((getPaths, item) => find(identity, at(getPaths, item)))

/**
 * Return an object with same keys as object argument.
 *   Values replaced with result of value selector.
 * @param {Object} structuredSelector Object where each value is a selector accepting item.
 * @param {Object} item The object to work with.
 * @return {Object2} Result after each value is passed the item.
 * @example
 * getFields({bar: _.get('foo')}, { foo: 'happy'}) // => { bar: 'happy' }
 * getFields({bar: 'foo'})({ foo: 'happy'}) // => { bar: 'happy' }
 */
export const getFields = curry(
  (structuredSelector, item) => mapValues(val => selector(val)(item), structuredSelector),
)
