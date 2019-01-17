import {
  curry, curryN, get, has, isEmpty, rearg, set, unset, update,
} from 'lodash/fp'
import overBranch from 'understory/lib/overBranch'
import { doProp } from './transform'

// _.set(path, value, state)
// _.update()

/**
 * Create a new object with key and value.
 * @param {string} key The string used for key.
 * @param {any} val The thing used for value of key.
 * @returns {Object} New object with `value` placed on `key` property.
 * @example createObj('foo', 'bar') // => { foo: 'bar' }
 * @example createObj('baz', { a: 1 }) // => { baz: { a: 1 } }
 */
export const createObj = curry((key, val) => ({ [key]: val }))

/**
 * Rearranged _.set args to path, state, value
 * @type {function}
 * @example setIn(path, state, value)
 */
export const setIn = curryN(3, rearg([0, 2, 1], set))

/**
 * Rearranged `_.set` args to value, state, path
 * @type {function}
 * @example setVal(value, state, path)
 */
export const setVal = curryN(3, rearg([2, 0, 1], set))

/**
 * Normal lodash _.set with no rearg.
 * @function
 * @example setVal(state, path, value)
 */
export const setState = set.convert({ rearg: false })

/**
 * Set field. Transformer given entire item.
 * @function
 */
export const setField = curry((path, transformer, item) => set(path, transformer(item), item))

/**
 * Set field if it's not already there. Transformer given item.
 * @function
 */
export const addField = curry((path, transformer) => overBranch(
  doProp(isEmpty, path), setField(path, transformer),
))

/**
 * Replace field. Transformer given item.
 * @function
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
 * Set field on item. Transformer given value of withId property.
 * @param {string} path The path of the property to get.
 * @param {string} withId The path of the property to send to `transformer`.
 * @param {Function} transformer Transformer given value of withId property.
 * @returns {ItemTransformer} Result of transformer set at `field` `item`.
 */
export const setFieldWith = curry((path, withId, transformer) => setField(
  path, doProp(transformer, withId),
))

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
export const mergeFields = curry((transformer, item) => ({ ...item, ...transformer(item) }))

/**
 * Replace item. Transformer given value of withId property.
 * @param {string} withId The path of the property to send to `transformer`.
 * @param {Function} transformer Sent item property at path of `withId`. Should return new Object.
 * @param {Object} item The object to work with.
 * @returns {Object} Result of transformer set at `field` `item`.
 */
export const mergeFieldsWith = curry((withId, transformer, item) => ({
  ...item,
  ...doProp(transformer, withId)(item),
}))

/**
 * Copy value of getPath to setPath.
 * @param {string} getPath The source path.
 * @param {string} setPath The destination path.
 * @param {Object} item The object to work with.
 */
export const copy = curry((getPath, setPath, item) => set(setPath, get(getPath, item), item))

/**
 * Move property from one names to another.
 * @param {string} getPath The source path.
 * @param {string} setPath The destination path.
 * @param {Object} item The object to work with.
 * @returns {Object} Result after the move. Value at `getPath` removed and added to `setPath`.
 */
export const move = curry((getPath, setPath, item) => unset(getPath, copy(getPath, setPath, item)))
