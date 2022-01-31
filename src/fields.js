import _ from 'lodash/fp.js'
import {
  getThunk, isWorthless, isValue, onTrue,
} from 'understory'
import { doProp } from './transform.js'

const {
  at, cond, constant, curry, curryN, every, find, fromPairs, get, has, identity,
  isArray, isFunction, isString, isUndefined, map,
  mapValues, over, overEvery, overSome, rearg, reduce,
  set, stubTrue, unset, update,
} = _

const transform = reduce.convert({ cap: false })

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

export const isStringArray = overEvery([isArray, every(isString)])
export const selector = cond([
  [overSome([isString, isStringArray]), get],
  [isFunction, identity],
  [stubTrue, constant],
])

/**
 * Convert a collection into new object defined by path for key and value.
 * @param {string|Array|Function} getKey The path used for key creation.
 * @param {string|Array|Function} getValue The path used for key creation.
 * @param {any} collection The thing used for value of key.
 * @returns {Object} New object that is similar to map(getValue), keyBy(getKey).
 * @example toObject('a', 'b', [{a: 'a1', b: 'b2'}]) // => { a1: 'b2' }
 */
export const toObject = curry((getKey, getValue, collection) => fromPairs(
  map(over([selector(getKey), selector(getValue)]), collection),
))

/**
 * Rearranged `_.set` args to `setIn(path, object, value)`
 * @type {function}
 * @param {string} path The path of the property to replace.
 * @param {Object} object The object that to set value on.
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
 * @param {Object} item The item to add or replace field on.
 * @returns {Object} Item with `path` updated with result of `transformer`.
 */
export const setField = curry((path, transformer, item) => set(
  path, transformer(item), item,
))

/**
 * Set field like `setField` but only if it's value is empty.
 * @param {string} path The path of the property to set.
 * @param {Function} transformer Transformer given entire item. Return value set at path.
 * @param {Object} item The item to update field on.
 */
export const addField = curry((path, transformer) => onTrue(
  doProp(isWorthless, path), setField(path, getThunk(transformer)),
))

/**
 * Replace field only if it is already set. Transformer given entire item.
 * @param {string} path The path of the property to replace.
 * @param {Function} transformer Transformer given entire item. Return value set at path.
 * @param {Object} item The item to update field on.
 * @returns {Object} Item with `path` updated with result of `transformer`.
 */
export const setFieldHas = curry((path, transformer) => onTrue(
  has(path), setField(path, transformer),
))

/**
 * Set field when boolCheck is true. Otherwise return item untouched.
 * @param {string} path The path of the property to set.
 * @param {Function} transformer Transformer given entire item. Should return value of path.
 * @param {Function} boolCheck A function that returns true when field should be set.
 * @param {Object} item The item to update field on.
 * @returns {Object} Item with `path` updated with result of `transformer`.
 */
export const setFieldWhen = curry((path, transformer, boolCheck, item) => onTrue(
  boolCheck(item), setField(path, transformer, item), item,
))

/**
 * Replace field only if found. Transformer gets field value.
 * Probably just use _.update() unless you want the check beforehand.
 * @function replaceField
 */
export const replaceField = curry((path, transformer) => onTrue(
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
export const updateToWhen = curry((transformer, boolCheck, path, item) => onTrue(
  doProp(boolCheck, path), update(path, transformer), item,
))

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
export const setFieldWith = curry((path, withId, transformer, item) => setField(
  path, doProp(transformer, withId), item,
))
// Note that setWith is a different lodash function.
export const setWith = setFieldWith

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
export const mergeWith = curry((source, item) => ({ ...item, ...source }))

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

// export const mergeFieldsWithWhen

/**
 * Copy value of getPath to setPath only if getPath finds something.
 *   Otherwise item left untouched.
 * @param {string} getPath The source path.
 * @param {string} setPath The destination path.
 * @param {Object} item The object to work with.
 */
export const copy = curry(
  (getPath, setPath, item) => {
    const val = get(getPath, item)
    return isUndefined(val) ? item : set(setPath, val, item)
  },
)

const rename = (newPath, oldPath) => (isFunction(newPath) ? newPath(oldPath) : newPath)
/**
 * Move property from one names to another.
 * @param {string} getPath The source path.
 * @param {string|Function} setPath The destination path.
 * @param {Object} item The object to work with.
 * @returns {Object} Result after the move. Value at `getPath` removed and added to `setPath`.
 * @example move('foo', 'bar', { foo: 1, baz: 2 }) // => { bar: 1, baz: 2 }
 */
export const move = curry((getPath, setPath, item) => unset(
  getPath,
  copy(getPath, rename(setPath, getPath), item),
))

/**
 * Map some keys.
 * @param {Function} renamer The function to send each key. Should return new key string.
 * @param {Array} renameKeys An array of source paths.
 * @param {Object} item The object to work with.
 * @returns {Object} Result after the move. Value at `getPath` removed and added to `setPath`.
 * @example move('foo', 'bar', { foo: 1, baz: 2 }) // => { bar: 1, baz: 2 }
 */
export const moveAll = curry((renamer, renameKeys, item) => renameKeys.reduce(
  (result, oldPath) => move(oldPath, renamer, result),
  item,
))
export const mapSomeKeys = moveAll

/**
 * Move property from one names to another.
 * @param {Object} renameObj Object where each key will be moved to the value path.
 *   If value is a function it is sent the old key and will return the new one.
 * @param {Object} item The object to work with.
 * @returns {Object} Result after the renames.
 * @example
 *   const rename = renameFields({ foo: 'bar', bin_baz: _.camelCase })
 *   rename({ foo: 1, bin_baz: 2, bar: 3, other: 4 })
 *   // => { bar: 1, binBaz: 2, other: 4 }
 */
export const renameFields = curry(
  (renameObj, item) => (
    transform(
      (result, newPath, oldPath) => move(oldPath, newPath, result),
      item,
      renameObj,
    )
  ),
)
export const moveFields = renameFields

/**
 * Return the first value of paths. 0, null, and false are valid values.
 * @param {Array} getPaths An array of source paths.
 * @param {Object} item The item to look for values on.
 * @returns {any} The first truthy value found at one of the `getPaths`.
 * @example findAt(['c', 'b', 'a'])({ a: 'foo', b: 'bar', c: null }) // => null
 * @example findAt(['c', 'b', 'a'])({ a: 'foo', b: false, c: '' }) // => false
 */
export const findValueAt = curry((getPaths, item) => find(isValue, at(getPaths, item)))

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
  (structuredSelector, item) => mapValues((val) => selector(val)(item), structuredSelector),
)
