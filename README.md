# Prairie

**Version 4 is ESM.**

Add new fields/properties to an object based on the values of existing properties.

Composable utility functions that make it easy to edit/replace properties of objects. For best results learn about `_.flow()` and read the [Lodash FP Guide](https://github.com/lodash/lodash/wiki/FP-Guide).

All functions have been [curried](https://lodash.com/docs/4.17.11#curry) so they can be called with one argument at a time.

If you have used `_.set()` and `_.update()` but want more this is the library for you!

## createObj

Create a new object based path and value.
Dot notation or an array of strings will result in nested objects.

### Parameters

-   `path` **([string][63] \| [Array][64])** The path used for key creation.
-   `value` **any** The thing used for value of key.

### Examples

```javascript
createObj('foo.bar', 'happy') // => { foo: { bar: 'happy' } }
```

```javascript
createObj('foo', 'bar') // => { foo: 'bar' }
```

```javascript
createObj('foo')('bar') // => { foo: 'bar' }
```

```javascript
createObj('baz', { a: 1 }) // => { baz: { a: 1 } }
```

Returns **[Object][65]** New object with `value` placed on the last key of `path`.

## toObject

Convert a collection into new object defined by path for key and value.

### Parameters

-   `getKey` **([string][63] \| [Array][64] \| [Function][66])** The path used for key creation.
-   `getValue` **([string][63] \| [Array][64] \| [Function][66])** The path used for key creation.
-   `collection` **any** The thing used for value of key.

### Examples

```javascript
toObject('a', 'b', [{a: 'a1', b: 'b2'}]) // => { a1: 'b1' }
```

Returns **[Object][65]** New object that is similar to map(getValue), keyBy(getKey).

## setIn

Rearranged `_.set` args to `setIn(path, object, value)`

Type: [function][66]

### Parameters

-   `path` **[string][63]** The path of the property to replace.
-   `object` **[Function][66]** The object that to set value on.
-   `value` **any** The value to place on path.

### Examples

```javascript
setIn('foo', {}, 'bar') // => { foo: 'bar' }
```

```javascript
setIn('a', { b: 1 }, 2) // => { a: 2, b: 1 }
```

Returns **[Object][65]** New object with `value` set at `path`.

## setVal

Rearranged `_.set` args to `setVal(value, object, path)`

Type: [function][66]

### Examples

```javascript
setVal(value, object, path)
```

## setState

Normal lodash \_.set with no rearg. `setVal(object, path, value)`

### Examples

```javascript
setVal(object, path, value)
```

## setField

Set field. Like `_.update` but transformer is given the entire item instead of only the field.

### Parameters

-   `path` **[string][63]** The path of the property to replace.
-   `transformer` **[Function][66]** Transformer given entire item. Return value set at path.
-   `item` **[Object][65]** The item to update field on.

Returns **[Object][65]** Item with `path` updated with result of `transformer`.

## addField

Set field like `setField` but only if it's value is empty.

### Parameters

-   `path` **[string][63]** The path of the property to replace.
-   `transformer` **[Function][66]** Transformer given entire item. Return value set at path.
-   `item` **[Object][65]** The item to update field on.

## setFieldHas

Replace field only if it is already set. Transformer given entire item.

### Parameters

-   `path` **[string][63]** The path of the property to replace.
-   `transformer` **[Function][66]** Transformer given entire item. Return value set at path.
-   `item` **[Object][65]** The item to update field on.

Returns **[Object][65]** Item with `path` updated with result of `transformer`.

## replaceField

Replace field only if found. Transformer gets field value.
Probably just use \_.update()!?

## updateToWhen

Replace field with result of transformer when boolCheck return true.

### Parameters

-   `transformer` **[Function][66]** Transformer given value at path of item. Return replacement value.
-   `boolCheck` **[Function][66]** A function that returns true when field should be replaced.
-   `path` **[string][63]** The path of the property to update.
-   `item` **[Object][65]** The item to conditionally update field on.

### Examples

```javascript
const toArray = updateToWhen(Array, _.isPlainObject, 'foo')
toArray({ foo: { a: 'happy' } }) // => { foo: [{ a: 'happy' }] }
```

Returns **[Object][65]** Item with conditional transformer applied to `path`.

## updateTo

Rearranged \_.update args to transformer, path, item

### Parameters

-   `transformer` **[Function][66]** Transformer given value at path of item. Return replacement value.
-   `path` **[string][63]** The path of the property to get.
-   `item` **[Object][65]** The item to update field on.

Returns **[Object][65]** Item with transformer applied to property at `path`.

## setFieldWith

Set field on item. Transformer given value of withId property.

### Parameters

-   `path` **[string][63]** The path of the property to get.
-   `withId` **[string][63]** The path of the property to send to `transformer`.
-   `transformer` **[Function][66]** Transformer given value of withId property.

Returns **ItemTransformer** Result of transformer set at `field` `item`.

## mergeFields

Replace item with result of transformer.

### Parameters

-   `transformer` **[Function][66]** Accepts single param that is `item`. Should return a new Object.
-   `item` **[Object][65]**

### Examples

```javascript
mergeFields(({ a, b }) => ({ a4: a * 4, b3: b * 3 }), { a: 2, b: 3 });
// => { a: 2, b: 3, a4: 8, b3: 9 }
```

Returns **[Object][65]** Merged result of transformer on top of `item`.

## mergeWith

Merge source on top of item.

### Parameters

-   `source` **[Object][65]** Object to apply on top of item.
-   `item` **[Object][65]** Object that values of source will be applied.

### Examples

```javascript
mergeWith({ a: 1 })({ a: 2, b: 4 });
// => { a: 1, b: 4 }
```

Returns **[Object][65]** Merged result of `surce` on top of `item`.

## mergeFieldsWith

Replace item. Transformer given value of withId property.

### Parameters

-   `withId` **[string][63]** The path of the property to send to `transformer`.
-   `transformer` **[Function][66]** Sent item property at path of `withId`. Should return new Object.
-   `item` **[Object][65]** The object to work with.

Returns **[Object][65]** Result of transformer set at `field` `item`.

## copy

Copy value of getPath to setPath only if getPath finds something.
  Otherwise item left untouched.

### Parameters

-   `getPath` **[string][63]** The source path.
-   `setPath` **[string][63]** The destination path.
-   `item` **[Object][65]** The object to work with.

## move

Move property from one names to another.

### Parameters

-   `getPath` **[string][63]** The source path.
-   `setPath` **([string][63] \| [Function][66])** The destination path.
-   `item` **[Object][65]** The object to work with.

### Examples

```javascript
move('foo', 'bar', { foo: 1, baz: 2 }) // => { bar: 1, baz: 2 }
```

Returns **[Object][65]** Result after the move. Value at `getPath` removed and added to `setPath`.

## moveAll

Map some keys.

### Parameters

-   `renamer` **[Function][66]** The function to send each key. Should return new key string.
-   `renameKeys` **[Array][64]** An array of source paths.
-   `item` **[Object][65]** The object to work with.

### Examples

```javascript
move('foo', 'bar', { foo: 1, baz: 2 }) // => { bar: 1, baz: 2 }
```

Returns **[Object][65]** Result after the move. Value at `getPath` removed and added to `setPath`.

## renameFields

Move property from one names to another.

### Parameters

-   `renameObj` **[Object][65]** Object where each key will be moved to the value path.
      If value is a function it is sent the old key and will return the new one.
-   `item` **[Object][65]** The object to work with.

### Examples

```javascript
const rename = renameFields({ foo: 'bar', bin_baz: _.camelCase })
  rename({ foo: 1, bin_baz: 2, bar: 3, other: 4 })
  // => { bar: 1, binBaz: 2, other: 4 }
```

Returns **[Object][65]** Result after the renames.

## findAt

Return the first truthy value of paths.

### Parameters

-   `getPaths` **[Array][64]** An array of source paths.
-   `item` **[Object][65]** The item to look for values on.

### Examples

```javascript
findAt(['c', 'b', 'a'])({ a: 'foo', b: 'bar', c: null }) // => 'bar'
```

```javascript
findAt(['c', 'b', 'a'])({ a: 'foo', b: false, c: '' }) // => 'foo'
```

Returns **any** The first truthy value found at one of the `getPaths`.

## getFields

Return an object with same keys as object argument.
  Values replaced with result of value selector.

### Parameters

-   `structuredSelector` **[Object][65]** Object where each value is a selector accepting item.
-   `item` **[Object][65]** The object to work with.

### Examples

```javascript
getFields({bar: _.get('foo')}, { foo: 'happy'}) // => { bar: 'happy' }
getFields({bar: 'foo'})({ foo: 'happy'}) // => { bar: 'happy' }
```

Returns **Object2** Result after each value is passed the item.

## doProp

Return result of calling transformer with property value at path.

### Parameters

-   `transformer` **[Function][66]** Transformer given value at path of item.
-   `path` **[string][63]** The path of the property to get.
-   `item` **[Object][65]** The item to get property value on.

### Examples

```javascript
doProp(_.isString, 'foo')({ foo: 'bar' }) // => true
```

```javascript
doProp(_.isString, 'foo')({ foo: 2 }) // => false
```

## doPropOf

Create a function that will accept a path string and send its value of object to transformer.

Type: [Function][66]

## hasMethodAt

Check if property has a method at path. An example of using `doProp()`.

Type: [Function][66]

### Examples

```javascript
hasMethodAt(path)(object)
```

## hasMethodOf

Check if property at path is a function. An example of using `doPropOf()`.

Type: [Function][66]

### Examples

```javascript
hasMethodAt(path)(object)
```

## transformHas

Replace entire item if has field. Transformer given value at path.

Type: [Function][66]

### Examples

```javascript
hasMethodAt(path)(object)
```

[1]: #createobj

[2]: #parameters

[3]: #examples

[4]: #toobject

[5]: #parameters-1

[6]: #examples-1

[7]: #setin

[8]: #parameters-2

[9]: #examples-2

[10]: #setval

[11]: #examples-3

[12]: #setstate

[13]: #examples-4

[14]: #setfield

[15]: #parameters-3

[16]: #addfield

[17]: #parameters-4

[18]: #setfieldhas

[19]: #parameters-5

[20]: #replacefield

[21]: #updatetowhen

[22]: #parameters-6

[23]: #examples-5

[24]: #updateto

[25]: #parameters-7

[26]: #updatewith

[27]: #parameters-8

[28]: #mergefields

[29]: #parameters-9

[30]: #examples-6

[31]: #mergewith

[32]: #parameters-10

[33]: #examples-7

[34]: #mergefieldswith

[35]: #parameters-11

[36]: #copy

[37]: #parameters-12

[38]: #move

[39]: #parameters-13

[40]: #examples-8

[41]: #moveall

[42]: #parameters-14

[43]: #examples-9

[44]: #renamefields

[45]: #parameters-15

[46]: #examples-10

[47]: #findat

[48]: #parameters-16

[49]: #examples-11

[50]: #getfields

[51]: #parameters-17

[52]: #examples-12

[53]: #doprop

[54]: #parameters-18

[55]: #examples-13

[56]: #dopropof

[57]: #hasmethodat

[58]: #examples-14

[59]: #hasmethodof

[60]: #examples-15

[61]: #transformhas

[62]: #examples-16

[63]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String

[64]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array

[65]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object

[66]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function
