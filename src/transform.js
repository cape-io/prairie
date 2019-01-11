import {
  curry, flow, get, has, isFunction, propertyOf,
} from 'lodash/fp'
import overBranch from 'understory/lib/overBranch'

/**
 * Return result of calling checker with object property.
 * @type {Function}
 * @example doProp(_.isString, 'foo')({ foo: 'bar' }) // => true
 * @example doProp(_.isString, 'foo')({ foo: 2 }) // => false
 */
export const doProp = curry((transformer, path) => flow(get(path), transformer))

/**
 * Create a function that will accept a path string and send its value of object to transformer.
 * @type {Function}
 */
export const doPropOf = curry((transformer, object) => flow(propertyOf(object), transformer))

/**
 * Check if property has a method at path.
 * @type {Function}
 * @example hasMethodAt(path)(object)
 */
export const hasMethodAt = doProp(isFunction)

/**
 * Check if property at path is a function.
 * @type {Function}
 * @example hasMethodAt(path)(object)
 */
export const hasMethodOf = doPropOf(isFunction)

// Replace entire item if has field. Transformer given value at path.
export const transformHas = curry((path, transformer) => overBranch(
  has(path), doProp(transformer, path),
))
