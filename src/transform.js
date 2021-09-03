import _ from 'lodash/fp.js'

const {
  curry, get, has, isFunction, propertyOf,
} = _

/**
 * Return result of calling transformer with property value at path.
 * @param {Function} transformer Transformer given value at path of item.
 * @param {string} path The path of the property to get.
 * @param {Object} item The item to get property value on.
 * @example doProp(_.isString, 'foo')({ foo: 'bar' }) // => true
 * @example doProp(_.isString, 'foo')({ foo: 2 }) // => false
 */
export const doProp = curry(
  (transformer, path, item) => transformer(get(path, item)),
)
/**
 * Return result of calling transformer with property value at path.
 * @param {string} path The path of the property to get.
 * @param {Function} transformer Transformer given value at path of item.
 * @param {Object} item The item to get property value on.
 * @example propDo('foo', _.isString)({ foo: 'bar' }) // => true
 * @example propDo('foo', _.isString)({ foo: 2 }) // => false
 */
export const propDo = curry(
  (path, transformer, item) => transformer(get(path, item)),
)

/**
 * Create a function that will accept a path string and send its value of object to transformer.
 * @type {Function}
 */
export const doPropOf = curry(
  (transformer, item, path) => transformer(propertyOf(item, path)),
)

/**
 * Check if property has a method at path. An example of using `doProp()`.
 * @type {Function}
 * @example hasMethodAt(path)(object)
 */
export const hasMethodAt = doProp(isFunction)

/**
 * Check if property at path is a function. An example of using `doPropOf()`.
 * @type {Function}
 * @example hasMethodAt(path)(object)
 */
export const hasMethodOf = doPropOf(isFunction)

/**
 * Replace entire item if has field. Transformer given value at path.
 * @type {Function}
 */
export const transformHas = curry((path, transformer, item) => (
  has(path, item) ? doProp(transformer, path, item) : item // Why null?
))
