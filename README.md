Add new fields/properties to an object based on the values of existing properties.

Composable utility functions that make it easy to edit/replace properties of objects. For best results learn about `_.flow()` and read the [Lodash FP Guide](https://github.com/lodash/lodash/wiki/FP-Guide).

All functions have been [curried](https://lodash.com/docs/4.17.11#curry) so they can be called with one argument at a time.

If you have used `_.set()` and `_.update()` but want more this is the library for you!

## createObj

Create a new object with key and value.

### Parameters

-   `key` **[string][42]** The string used for key.
-   `val` **any** The thing used for value of key.

### Examples

```javascript
createObj('foo', 'bar') // => { foo: 'bar' }
```

```javascript
createObj('foo')('bar') // => { foo: 'bar' }
```

```javascript
createObj('baz', { a: 1 }) // => { baz: { a: 1 } }
```

Returns **[Object][43]** New object with `value` placed on `key` property.

## setIn

Rearranged `_.set` args to `setIn(path, state, value)`

Type: [function][44]

### Examples

```javascript
setIn(path, state, value)
```

## setVal

Rearranged `_.set` args to `setVal(value, state, path)`

Type: [function][44]

### Examples

```javascript
setVal(value, state, path)
```

## setState

Normal lodash \_.set with no rearg. `setVal(state, path, value)`

### Examples

```javascript
setVal(state, path, value)
```

## setField

Set field. Like `_.update` but transformer is given the entire item instead of only the field.

### Parameters

-   `path` **[string][42]** The path of the property to replace.
-   `transformer` **[Function][44]** Transformer given entire item. Return value set at path.
-   `item` **[Object][43]** The item to update field on.

Returns **[Object][43]** Item with `path` updated with result of `transformer`.

## addField

Set field if it's not already there. Transformer given item.

## setFieldHas

Replace field only if it is already set. Transformer given entire item.

### Parameters

-   `path` **[string][42]** The path of the property to replace.
-   `transformer` **[Function][44]** Transformer given entire item. Return value set at path.
-   `item` **[Object][43]** The item to update field on.

Returns **[Object][43]** Item with `path` updated with result of `transformer`.

## replaceField

Replace field only if found. Transformer gets field value.
Probably just use \_.update()!?

## updateToWhen

Replace field with result of transformer when boolCheck return true.

### Parameters

-   `transformer` **[Function][44]** Transformer given value at path of item. Return replacement value.
-   `boolCheck` **[Function][44]** A function that returns true when field should be replaced.
-   `path` **[string][42]** The path of the property to update.
-   `item` **[Object][43]** The item to conditionally update field on.

### Examples

```javascript
const toArray = updateToWhen(Array, _.isPlainObject, 'foo')
toArray({ foo: { a: 'happy' } }) // => { foo: [{ a: 'happy' }] }
```

Returns **[Object][43]** Item with conditional transformer applied to `path`.

## updateTo

Rearranged \_.update args to transformer, path, item

### Parameters

-   `transformer` **[Function][44]** Transformer given value at path of item. Return replacement value.
-   `path` **[string][42]** The path of the property to get.
-   `item` **[Object][43]** The item to update field on.

Returns **[Object][43]** Item with transformer applied to property at `path`.

## setFieldWith

Set field on item. Transformer given value of withId property.

### Parameters

-   `path` **[string][42]** The path of the property to get.
-   `withId` **[string][42]** The path of the property to send to `transformer`.
-   `transformer` **[Function][44]** Transformer given value of withId property.

Returns **ItemTransformer** Result of transformer set at `field` `item`.

## mergeFields

Replace item with result of transformer.

### Parameters

-   `transformer` **[Function][44]** Accepts single param that is `item`. Should return a new Object.
-   `item` **[Object][43]**

### Examples

```javascript
mergeFields(({ a, b }) => ({ a4: a * 4, b3: b * 3 }), { a: 2, b: 3 });
// => { a: 2, b: 3, a4: 8, b3: 9 }
```

Returns **[Object][43]** Merged result of transformer on top of `item`.

## mergeFieldsWith

Replace item. Transformer given value of withId property.

### Parameters

-   `withId` **[string][42]** The path of the property to send to `transformer`.
-   `transformer` **[Function][44]** Sent item property at path of `withId`. Should return new Object.
-   `item` **[Object][43]** The object to work with.

Returns **[Object][43]** Result of transformer set at `field` `item`.

## copy

Copy value of getPath to setPath.

### Parameters

-   `getPath` **[string][42]** The source path.
-   `setPath` **[string][42]** The destination path.
-   `item` **[Object][43]** The object to work with.

## move

Move property from one names to another.

### Parameters

-   `getPath` **[string][42]** The source path.
-   `setPath` **[string][42]** The destination path.
-   `item` **[Object][43]** The object to work with.

Returns **[Object][43]** Result after the move. Value at `getPath` removed and added to `setPath`.

## getFields

Return an object with same keys as object argument.
  Values replaced with result of value selector.

### Parameters

-   `structuredSelector` **[Object][43]** Object where each value is a selector accepting item.
-   `item` **[Object][43]** The object to work with.

### Examples

```javascript
getFields({bar: _.get('foo')}, { foo: 'happy'}) // => { bar: 'happy' }
getFields({bar: 'foo'})({ foo: 'happy'}) // => { bar: 'happy' }
```

Returns **Object2** Result after each value is passed the item.

## doProp

Return result of calling checker with object property.

Type: [Function][44]

### Examples

```javascript
doProp(_.isString, 'foo')({ foo: 'bar' }) // => true
```

```javascript
doProp(_.isString, 'foo')({ foo: 2 }) // => false
```

## doPropOf

Create a function that will accept a path string and send its value of object to transformer.

Type: [Function][44]

## hasMethodAt

Check if property has a method at path.

Type: [Function][44]

### Examples

```javascript
hasMethodAt(path)(object)
```

## hasMethodOf

Check if property at path is a function.

Type: [Function][44]

### Examples

```javascript
hasMethodAt(path)(object)
```

[1]: #createobj

[2]: #parameters

[3]: #examples

[4]: #setin

[5]: #examples-1

[6]: #setval

[7]: #examples-2

[8]: #setstate

[9]: #examples-3

[10]: #setfield

[11]: #parameters-1

[12]: #addfield

[13]: #setfieldhas

[14]: #parameters-2

[15]: #replacefield

[16]: #updatetowhen

[17]: #parameters-3

[18]: #examples-4

[19]: #updateto

[20]: #parameters-4

[21]: #setfieldwith

[22]: #parameters-5

[23]: #mergefields

[24]: #parameters-6

[25]: #examples-5

[26]: #mergefieldswith

[27]: #parameters-7

[28]: #copy

[29]: #parameters-8

[30]: #move

[31]: #parameters-9

[32]: #getfields

[33]: #parameters-10

[34]: #examples-6

[35]: #doprop

[36]: #examples-7

[37]: #dopropof

[38]: #hasmethodat

[39]: #examples-8

[40]: #hasmethodof

[41]: #examples-9

[42]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String

[43]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object

[44]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function
