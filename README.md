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
*   [setFieldWhen][20]
    *   [Parameters][21]
*   [replaceField][22]
*   [updateToWhen][23]
    *   [Parameters][24]
    *   [Examples][25]
*   [updateTo][26]
    *   [Parameters][27]
*   [setFieldWith][28]
    *   [Parameters][29]
*   [mergeFields][30]
    *   [Parameters][31]
    *   [Examples][32]
*   [mergeWith][33]
    *   [Parameters][34]
    *   [Examples][35]
*   [mergeFieldsWith][36]
    *   [Parameters][37]
*   [copy][38]
    *   [Parameters][39]
*   [move][40]
    *   [Parameters][41]
    *   [Examples][42]
*   [moveAll][43]
    *   [Parameters][44]
    *   [Examples][45]
*   [renameFields][46]
    *   [Parameters][47]
    *   [Examples][48]
*   [findValueAt][49]
    *   [Parameters][50]
    *   [Examples][51]
*   [findAt][52]
    *   [Parameters][53]
    *   [Examples][54]
*   [getFields][55]
    *   [Parameters][56]
    *   [Examples][57]
*   [doProp][58]
    *   [Parameters][59]
    *   [Examples][60]
*   [propDo][61]
    *   [Parameters][62]
    *   [Examples][63]
*   [doPropOf][64]
*   [hasMethodAt][65]
    *   [Examples][66]
*   [hasMethodOf][67]
    *   [Examples][68]
*   [transformHas][69]

## createObj

Create a new object based path and value.
Dot notation or an array of strings will result in nested objects.

### Parameters

*   `path` **([string][70] | [Array][71])** The path used for key creation.
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

Returns **[Object][72]** New object with `value` placed on the last key of `path`.

## toObject

Convert a collection into new object defined by path for key and value.

### Parameters

*   `getKey` **([string][70] | [Array][71] | [Function][73])** The path used for key creation.
*   `getValue` **([string][70] | [Array][71] | [Function][73])** The path used for key creation.
*   `collection` **any** The thing used for value of key.

### Examples

```javascript
toObject('a', 'b', [{a: 'a1', b: 'b2'}]) // => { a1: 'b2' }
```

Returns **[Object][72]** New object that is similar to map(getValue), keyBy(getKey).

## setIn

Rearranged `_.set` args to `setIn(path, object, value)`

Type: [function][73]

### Parameters

*   `path` **[string][70]** The path of the property to replace.
*   `object` **[Object][72]** The object that to set value on.
*   `value` **any** The value to place on path.

### Examples

```javascript
setIn('foo', {}, 'bar') // => { foo: 'bar' }
```

```javascript
setIn('a', { b: 1 }, 2) // => { a: 2, b: 1 }
```

Returns **[Object][72]** New object with `value` set at `path`.

## setVal

Rearranged `_.set` args to `setVal(value, object, path)`

Type: [function][73]

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

*   `path` **[string][70]** The path of the property to replace.
*   `transformer` **[Function][73]** Transformer given entire item. Return value set at path.
*   `item` **[Object][72]** The item to add or replace field on.

Returns **[Object][72]** Item with `path` updated with result of `transformer`.

## addField

Set field like `setField` but only if it's value is empty.

### Parameters

*   `path` **[string][70]** The path of the property to set.
*   `transformer` **[Function][73]** Transformer given entire item. Return value set at path.
*   `item` **[Object][72]** The item to update field on.

## setFieldHas

Replace field only if it is already set. Transformer given entire item.

### Parameters

*   `path` **[string][70]** The path of the property to replace.
*   `transformer` **[Function][73]** Transformer given entire item. Return value set at path.
*   `item` **[Object][72]** The item to update field on.

Returns **[Object][72]** Item with `path` updated with result of `transformer`.

## setFieldWhen

Set field when boolCheck is true. Otherwise return item untouched.

### Parameters

*   `path` **[string][70]** The path of the property to set.
*   `transformer` **[Function][73]** Transformer given entire item. Should return value of path.
*   `boolCheck` **[Function][73]** A function that returns true when field should be set.
*   `item` **[Object][72]** The item to update field on.

Returns **[Object][72]** Item with `path` updated with result of `transformer`.

## replaceField

Replace field only if found. Transformer gets field value.
Probably just use \_.update() unless you want the check beforehand.

## updateToWhen

Replace field with result of transformer when boolCheck return true.

### Parameters

*   `transformer` **[Function][73]** Transformer given value at path of item. Return replacement value.
*   `boolCheck` **[Function][73]** A function that returns true when field should be replaced.
*   `path` **[string][70]** The path of the property to update.
*   `item` **[Object][72]** The item to conditionally update field on.

### Examples

```javascript
const toArray = updateToWhen(Array, _.isPlainObject, 'foo')
toArray({ foo: { a: 'happy' } }) // => { foo: [{ a: 'happy' }] }
```

Returns **[Object][72]** Item with conditional transformer applied to `path`.

## updateTo

Rearranged \_.update args to transformer, path, item

### Parameters

*   `transformer` **[Function][73]** Transformer given value at path of item. Return replacement value.
*   `path` **[string][70]** The path of the property to get.
*   `item` **[Object][72]** The item to update field on.

Returns **[Object][72]** Item with transformer applied to property at `path`.

## setFieldWith

Set field on item. Transformer given value of withId property.

### Parameters

*   `path` **[string][70]** The path of the property to get.
*   `withId` **[string][70]** The path of the property to send to `transformer`.
*   `transformer` **[Function][73]** Transformer given value of withId property.

Returns **ItemTransformer** Result of transformer set at `field` `item`.

## mergeFields

Replace item with result of transformer.

### Parameters

*   `transformer` **[Function][73]** Accepts single param that is `item`. Should return a new Object.
*   `item` **[Object][72]**

### Examples

```javascript
mergeFields(({ a, b }) => ({ a4: a * 4, b3: b * 3 }), { a: 2, b: 3 });
// => { a: 2, b: 3, a4: 8, b3: 9 }
```

Returns **[Object][72]** Merged result of transformer on top of `item`.

## mergeWith

Merge source on top of item.

### Parameters

*   `source` **[Object][72]** Object to apply on top of item.
*   `item` **[Object][72]** Object that values of source will be applied.

### Examples

```javascript
mergeWith({ a: 1 })({ a: 2, b: 4 });
// => { a: 1, b: 4 }
```

Returns **[Object][72]** Merged result of `surce` on top of `item`.

## mergeFieldsWith

Replace item. Transformer given value of withId property.

### Parameters

*   `withId` **[string][70]** The path of the property to send to `transformer`.
*   `transformer` **[Function][73]** Sent item property at path of `withId`. Should return new Object.
*   `item` **[Object][72]** The object to work with.

Returns **[Object][72]** Result of transformer set at `field` `item`.

## copy

Copy value of getPath to setPath only if getPath finds something.
Otherwise item left untouched.

### Parameters

*   `getPath` **[string][70]** The source path.
*   `setPath` **[string][70]** The destination path.
*   `item` **[Object][72]** The object to work with.

## move

Move property from one names to another.

### Parameters

*   `getPath` **[string][70]** The source path.
*   `setPath` **([string][70] | [Function][73])** The destination path.
*   `item` **[Object][72]** The object to work with.

### Examples

```javascript
move('foo', 'bar', { foo: 1, baz: 2 }) // => { bar: 1, baz: 2 }
```

Returns **[Object][72]** Result after the move. Value at `getPath` removed and added to `setPath`.

## moveAll

Map some keys.

### Parameters

*   `renamer` **[Function][73]** The function to send each key. Should return new key string.
*   `renameKeys` **[Array][71]** An array of source paths.
*   `item` **[Object][72]** The object to work with.

### Examples

```javascript
move('foo', 'bar', { foo: 1, baz: 2 }) // => { bar: 1, baz: 2 }
```

Returns **[Object][72]** Result after the move. Value at `getPath` removed and added to `setPath`.

## renameFields

Move property from one names to another.

### Parameters

*   `renameObj` **[Object][72]** Object where each key will be moved to the value path.
    If value is a function it is sent the old key and will return the new one.
*   `item` **[Object][72]** The object to work with.

### Examples

```javascript
const rename = renameFields({ foo: 'bar', bin_baz: _.camelCase })
  rename({ foo: 1, bin_baz: 2, bar: 3, other: 4 })
  // => { bar: 1, binBaz: 2, other: 4 }
```

Returns **[Object][72]** Result after the renames.

## findValueAt

Return the first value of paths. 0, null, and false are valid values.

### Parameters

*   `getPaths` **[Array][71]** An array of source paths.
*   `item` **[Object][72]** The item to look for values on.

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

*   `getPaths` **[Array][71]** An array of source paths.
*   `item` **[Object][72]** The item to look for values on.

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

*   `structuredSelector` **[Object][72]** Object where each value is a selector accepting item.
*   `item` **[Object][72]** The object to work with.

### Examples

```javascript
getFields({bar: _.get('foo')}, { foo: 'happy'}) // => { bar: 'happy' }
getFields({bar: 'foo'})({ foo: 'happy'}) // => { bar: 'happy' }
```

Returns **Object2** Result after each value is passed the item.

## doProp

Return result of calling transformer with property value at path.

### Parameters

*   `transformer` **[Function][73]** Transformer given value at path of item.
*   `path` **[string][70]** The path of the property to get.
*   `item` **[Object][72]** The item to get property value on.

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

*   `path` **[string][70]** The path of the property to get.
*   `transformer` **[Function][73]** Transformer given value at path of item.
*   `item` **[Object][72]** The item to get property value on.

### Examples

```javascript
propDo('foo', _.isString)({ foo: 'bar' }) // => true
```

```javascript
propDo('foo', _.isString)({ foo: 2 }) // => false
```

## doPropOf

Create a function that will accept a path string and send its value of object to transformer.

Type: [Function][73]

## hasMethodAt

Check if property has a method at path. An example of using `doProp()`.

Type: [Function][73]

### Examples

```javascript
hasMethodAt(path)(object)
```

## hasMethodOf

Check if property at path is a function. An example of using `doPropOf()`.

Type: [Function][73]

### Examples

```javascript
hasMethodAt(path)(object)
```

## transformHas

Replace entire item if has field. Transformer given value at path.

Type: [Function][73]

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

[20]: #setfieldwhen

[21]: #parameters-6

[22]: #replacefield

[23]: #updatetowhen

[24]: #parameters-7

[25]: #examples-5

[26]: #updateto

[27]: #parameters-8

[28]: #setfieldwith

[29]: #parameters-9

[30]: #mergefields

[31]: #parameters-10

[32]: #examples-6

[33]: #mergewith

[34]: #parameters-11

[35]: #examples-7

[36]: #mergefieldswith

[37]: #parameters-12

[38]: #copy

[39]: #parameters-13

[40]: #move

[41]: #parameters-14

[42]: #examples-8

[43]: #moveall

[44]: #parameters-15

[45]: #examples-9

[46]: #renamefields

[47]: #parameters-16

[48]: #examples-10

[49]: #findvalueat

[50]: #parameters-17

[51]: #examples-11

[52]: #findat

[53]: #parameters-18

[54]: #examples-12

[55]: #getfields

[56]: #parameters-19

[57]: #examples-13

[58]: #doprop

[59]: #parameters-20

[60]: #examples-14

[61]: #propdo

[62]: #parameters-21

[63]: #examples-15

[64]: #dopropof

[65]: #hasmethodat

[66]: #examples-16

[67]: #hasmethodof

[68]: #examples-17

[69]: #transformhas

[70]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String

[71]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array

[72]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object

[73]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function