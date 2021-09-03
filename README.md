# Prairie

**Version 4 is ESM.**

Add new fields/properties to an object based on the values of existing properties.

Composable utility functions that make it easy to edit/replace properties of objects. For best results learn about `_.flow()` and read the [Lodash FP Guide](https://github.com/lodash/lodash/wiki/FP-Guide).

All functions have been [curried](https://lodash.com/docs/4.17.11#curry) so they can be called with one argument at a time.

If you have used `_.set()` and `_.update()` but want more this is the library for you!

### Table of Contents

*   [createObj][1]
    *   [Parameters][2]
    *   [Examples][3]
*   [toObject][4]
    *   [Parameters][5]
    *   [Examples][6]
*   [setIn][7]
    *   [Parameters][8]
    *   [Examples][9]
*   [setVal][10]
    *   [Examples][11]
*   [setState][12]
    *   [Examples][13]
*   [setField][14]
    *   [Parameters][15]
*   [addField][16]
    *   [Parameters][17]
*   [setFieldHas][18]
    *   [Parameters][19]
*   [replaceField][20]
*   [updateToWhen][21]
    *   [Parameters][22]
    *   [Examples][23]
*   [updateTo][24]
    *   [Parameters][25]
*   [setFieldWith][26]
    *   [Parameters][27]
*   [mergeFields][28]
    *   [Parameters][29]
    *   [Examples][30]
*   [mergeWith][31]
    *   [Parameters][32]
    *   [Examples][33]
*   [mergeFieldsWith][34]
    *   [Parameters][35]
*   [copy][36]
    *   [Parameters][37]
*   [move][38]
    *   [Parameters][39]
    *   [Examples][40]
*   [moveAll][41]
    *   [Parameters][42]
    *   [Examples][43]
*   [renameFields][44]
    *   [Parameters][45]
    *   [Examples][46]
*   [findValueAt][47]
    *   [Parameters][48]
    *   [Examples][49]
*   [findAt][50]
    *   [Parameters][51]
    *   [Examples][52]
*   [getFields][53]
    *   [Parameters][54]
    *   [Examples][55]
*   [doProp][56]
    *   [Parameters][57]
    *   [Examples][58]
*   [propDo][59]
    *   [Parameters][60]
    *   [Examples][61]
*   [doPropOf][62]
*   [hasMethodAt][63]
    *   [Examples][64]
*   [hasMethodOf][65]
    *   [Examples][66]
*   [transformHas][67]

## createObj

Create a new object based path and value.
Dot notation or an array of strings will result in nested objects.

### Parameters

*   `path` **([string][68] | [Array][69])** The path used for key creation.
*   `value` **any** The thing used for value of key.

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

Returns **[Object][70]** New object with `value` placed on the last key of `path`.

## toObject

Convert a collection into new object defined by path for key and value.

### Parameters

*   `getKey` **([string][68] | [Array][69] | [Function][71])** The path used for key creation.
*   `getValue` **([string][68] | [Array][69] | [Function][71])** The path used for key creation.
*   `collection` **any** The thing used for value of key.

### Examples

```javascript
toObject('a', 'b', [{a: 'a1', b: 'b2'}]) // => { a1: 'b2' }
```

Returns **[Object][70]** New object that is similar to map(getValue), keyBy(getKey).

## setIn

Rearranged `_.set` args to `setIn(path, object, value)`

Type: [function][71]

### Parameters

*   `path` **[string][68]** The path of the property to replace.
*   `object` **[Object][70]** The object that to set value on.
*   `value` **any** The value to place on path.

### Examples

```javascript
setIn('foo', {}, 'bar') // => { foo: 'bar' }
```

```javascript
setIn('a', { b: 1 }, 2) // => { a: 2, b: 1 }
```

Returns **[Object][70]** New object with `value` set at `path`.

## setVal

Rearranged `_.set` args to `setVal(value, object, path)`

Type: [function][71]

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

*   `path` **[string][68]** The path of the property to replace.
*   `transformer` **[Function][71]** Transformer given entire item. Return value set at path.
*   `item` **[Object][70]** The item to update field on.

Returns **[Object][70]** Item with `path` updated with result of `transformer`.

## addField

Set field like `setField` but only if it's value is empty.

### Parameters

*   `path` **[string][68]** The path of the property to replace.
*   `transformer` **[Function][71]** Transformer given entire item. Return value set at path.
*   `item` **[Object][70]** The item to update field on.

## setFieldHas

Replace field only if it is already set. Transformer given entire item.

### Parameters

*   `path` **[string][68]** The path of the property to replace.
*   `transformer` **[Function][71]** Transformer given entire item. Return value set at path.
*   `item` **[Object][70]** The item to update field on.

Returns **[Object][70]** Item with `path` updated with result of `transformer`.

## replaceField

Replace field only if found. Transformer gets field value.
Probably just use \_.update() unless you want the check beforehand.

## updateToWhen

Replace field with result of transformer when boolCheck return true.

### Parameters

*   `transformer` **[Function][71]** Transformer given value at path of item. Return replacement value.
*   `boolCheck` **[Function][71]** A function that returns true when field should be replaced.
*   `path` **[string][68]** The path of the property to update.
*   `item` **[Object][70]** The item to conditionally update field on.

### Examples

```javascript
const toArray = updateToWhen(Array, _.isPlainObject, 'foo')
toArray({ foo: { a: 'happy' } }) // => { foo: [{ a: 'happy' }] }
```

Returns **[Object][70]** Item with conditional transformer applied to `path`.

## updateTo

Rearranged \_.update args to transformer, path, item

### Parameters

*   `transformer` **[Function][71]** Transformer given value at path of item. Return replacement value.
*   `path` **[string][68]** The path of the property to get.
*   `item` **[Object][70]** The item to update field on.

Returns **[Object][70]** Item with transformer applied to property at `path`.

## setFieldWith

Set field on item. Transformer given value of withId property.

### Parameters

*   `path` **[string][68]** The path of the property to get.
*   `withId` **[string][68]** The path of the property to send to `transformer`.
*   `transformer` **[Function][71]** Transformer given value of withId property.

Returns **ItemTransformer** Result of transformer set at `field` `item`.

## mergeFields

Replace item with result of transformer.

### Parameters

*   `transformer` **[Function][71]** Accepts single param that is `item`. Should return a new Object.
*   `item` **[Object][70]** 

### Examples

```javascript
mergeFields(({ a, b }) => ({ a4: a * 4, b3: b * 3 }), { a: 2, b: 3 });
// => { a: 2, b: 3, a4: 8, b3: 9 }
```

Returns **[Object][70]** Merged result of transformer on top of `item`.

## mergeWith

Merge source on top of item.

### Parameters

*   `source` **[Object][70]** Object to apply on top of item.
*   `item` **[Object][70]** Object that values of source will be applied.

### Examples

```javascript
mergeWith({ a: 1 })({ a: 2, b: 4 });
// => { a: 1, b: 4 }
```

Returns **[Object][70]** Merged result of `surce` on top of `item`.

## mergeFieldsWith

Replace item. Transformer given value of withId property.

### Parameters

*   `withId` **[string][68]** The path of the property to send to `transformer`.
*   `transformer` **[Function][71]** Sent item property at path of `withId`. Should return new Object.
*   `item` **[Object][70]** The object to work with.

Returns **[Object][70]** Result of transformer set at `field` `item`.

## copy

Copy value of getPath to setPath only if getPath finds something.
Otherwise item left untouched.

### Parameters

*   `getPath` **[string][68]** The source path.
*   `setPath` **[string][68]** The destination path.
*   `item` **[Object][70]** The object to work with.

## move

Move property from one names to another.

### Parameters

*   `getPath` **[string][68]** The source path.
*   `setPath` **([string][68] | [Function][71])** The destination path.
*   `item` **[Object][70]** The object to work with.

### Examples

```javascript
move('foo', 'bar', { foo: 1, baz: 2 }) // => { bar: 1, baz: 2 }
```

Returns **[Object][70]** Result after the move. Value at `getPath` removed and added to `setPath`.

## moveAll

Map some keys.

### Parameters

*   `renamer` **[Function][71]** The function to send each key. Should return new key string.
*   `renameKeys` **[Array][69]** An array of source paths.
*   `item` **[Object][70]** The object to work with.

### Examples

```javascript
move('foo', 'bar', { foo: 1, baz: 2 }) // => { bar: 1, baz: 2 }
```

Returns **[Object][70]** Result after the move. Value at `getPath` removed and added to `setPath`.

## renameFields

Move property from one names to another.

### Parameters

*   `renameObj` **[Object][70]** Object where each key will be moved to the value path.
    If value is a function it is sent the old key and will return the new one.
*   `item` **[Object][70]** The object to work with.

### Examples

```javascript
const rename = renameFields({ foo: 'bar', bin_baz: _.camelCase })
  rename({ foo: 1, bin_baz: 2, bar: 3, other: 4 })
  // => { bar: 1, binBaz: 2, other: 4 }
```

Returns **[Object][70]** Result after the renames.

## findValueAt

Return the first value of paths. 0, null, and false are valid values.

### Parameters

*   `getPaths` **[Array][69]** An array of source paths.
*   `item` **[Object][70]** The item to look for values on.

### Examples

```javascript
findAt(['c', 'b', 'a'])({ a: 'foo', b: 'bar', c: null }) // => null
```

```javascript
findAt(['c', 'b', 'a'])({ a: 'foo', b: false, c: '' }) // => false
```

Returns **any** The first truthy value found at one of the `getPaths`.

## findAt

Return the first truthy value of paths.

### Parameters

*   `getPaths` **[Array][69]** An array of source paths.
*   `item` **[Object][70]** The item to look for values on.

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

*   `structuredSelector` **[Object][70]** Object where each value is a selector accepting item.
*   `item` **[Object][70]** The object to work with.

### Examples

```javascript
getFields({bar: _.get('foo')}, { foo: 'happy'}) // => { bar: 'happy' }
getFields({bar: 'foo'})({ foo: 'happy'}) // => { bar: 'happy' }
```

Returns **Object2** Result after each value is passed the item.

## doProp

Return result of calling transformer with property value at path.

### Parameters

*   `transformer` **[Function][71]** Transformer given value at path of item.
*   `path` **[string][68]** The path of the property to get.
*   `item` **[Object][70]** The item to get property value on.

### Examples

```javascript
doProp(_.isString, 'foo')({ foo: 'bar' }) // => true
```

```javascript
doProp(_.isString, 'foo')({ foo: 2 }) // => false
```

## propDo

Return result of calling transformer with property value at path.

### Parameters

*   `path` **[string][68]** The path of the property to get.
*   `transformer` **[Function][71]** Transformer given value at path of item.
*   `item` **[Object][70]** The item to get property value on.

### Examples

```javascript
propDo('foo', _.isString)({ foo: 'bar' }) // => true
```

```javascript
propDo('foo', _.isString)({ foo: 2 }) // => false
```

## doPropOf

Create a function that will accept a path string and send its value of object to transformer.

Type: [Function][71]

## hasMethodAt

Check if property has a method at path. An example of using `doProp()`.

Type: [Function][71]

### Examples

```javascript
hasMethodAt(path)(object)
```

## hasMethodOf

Check if property at path is a function. An example of using `doPropOf()`.

Type: [Function][71]

### Examples

```javascript
hasMethodAt(path)(object)
```

## transformHas

Replace entire item if has field. Transformer given value at path.

Type: [Function][71]

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

[26]: #setfieldwith

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

[47]: #findvalueat

[48]: #parameters-16

[49]: #examples-11

[50]: #findat

[51]: #parameters-17

[52]: #examples-12

[53]: #getfields

[54]: #parameters-18

[55]: #examples-13

[56]: #doprop

[57]: #parameters-19

[58]: #examples-14

[59]: #propdo

[60]: #parameters-20

[61]: #examples-15

[62]: #dopropof

[63]: #hasmethodat

[64]: #examples-16

[65]: #hasmethodof

[66]: #examples-17

[67]: #transformhas

[68]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String

[69]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array

[70]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object

[71]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function

