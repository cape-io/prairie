Add new fields/properties to an object based on the values of existing properties.

Composable utility functions that make it easy to edit/replace properties of objects. For best results learn about `_.flow()` and read the [Lodash FP Guide](https://github.com/lodash/lodash/wiki/FP-Guide).

All functions have been [curried](https://lodash.com/docs/4.17.11#curry) so they can be called with one argument at a time.

If you have used `_.set()` and `_.update()` but want more this is the library for you!

## createObj

Create a new object with key and value.

### Parameters

-   `key` **[string][38]** The string used for key.
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

Returns **[Object][39]** New object with `value` placed on `key` property.

## setIn

Rearranged `_.set` args to `setIn(path, state, value)`

Type: [function][40]

### Examples

```javascript
setIn(path, state, value)
```

## setVal

Rearranged `_.set` args to `setVal(value, state, path)`

Type: [function][40]

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

-   `path` **[string][38]** The path of the property to replace.
-   `transformer` **[Function][40]** Transformer given entire item. Return value set at path.
-   `item` **[Object][39]** The item to update field on.

Returns **[Object][39]** Item with `path` updated with result of `transformer`.

## addField

Set field if it's not already there. Transformer given item.

## setFieldHas

Replace field. Transformer given item.

## replaceField

Replace field only if found. Transformer gets field value.
Probably just use \_.update()!?

## updateToWhen

Replace field with result of transformer when boolCheck return true.

### Parameters

-   `transformer` **[Function][40]** Transformer given value at path of item. Return replacement value.
-   `boolCheck` **[Function][40]** A function that returns true when field should be replaced.
-   `path` **[string][38]** The path of the property to update.
-   `item` **[Object][39]** The item to conditionally update field on.

### Examples

```javascript
const toArray = updateToWhen(Array, _.isPlainObject, 'foo')
toArray({ foo: { a: 'happy' } }) // => { foo: [{ a: 'happy' }] }
```

Returns **[Object][39]** Item with conditional transformer applied to `path`.

## updateTo

Rearranged \_.update args to transformer, path, item

### Parameters

-   `transformer` **[Function][40]** Transformer given value at path of item. Return replacement value.
-   `path` **[string][38]** The path of the property to get.
-   `item` **[Object][39]** The item to update field on.

Returns **[Object][39]** Item with transformer applied to property at `path`.

## setFieldWith

Set field on item. Transformer given value of withId property.

### Parameters

-   `path` **[string][38]** The path of the property to get.
-   `withId` **[string][38]** The path of the property to send to `transformer`.
-   `transformer` **[Function][40]** Transformer given value of withId property.

Returns **ItemTransformer** Result of transformer set at `field` `item`.

## mergeFields

Replace item with result of transformer.

### Parameters

-   `transformer` **[Function][40]** Accepts single param that is `item`. Should return a new Object.
-   `item` **[Object][39]**

### Examples

```javascript
mergeFields(({ a, b }) => ({ a4: a * 4, b3: b * 3 }), { a: 2, b: 3 });
// => { a: 2, b: 3, a4: 8, b3: 9 }
```

Returns **[Object][39]** Merged result of transformer on top of `item`.

## mergeFieldsWith

Replace item. Transformer given value of withId property.

### Parameters

-   `withId` **[string][38]** The path of the property to send to `transformer`.
-   `transformer` **[Function][40]** Sent item property at path of `withId`. Should return new Object.
-   `item` **[Object][39]** The object to work with.

Returns **[Object][39]** Result of transformer set at `field` `item`.

## copy

Copy value of getPath to setPath.

### Parameters

-   `getPath` **[string][38]** The source path.
-   `setPath` **[string][38]** The destination path.
-   `item` **[Object][39]** The object to work with.

## move

Move property from one names to another.

### Parameters

-   `getPath` **[string][38]** The source path.
-   `setPath` **[string][38]** The destination path.
-   `item` **[Object][39]** The object to work with.

Returns **[Object][39]** Result after the move. Value at `getPath` removed and added to `setPath`.

## doProp

Return result of calling checker with object property.

Type: [Function][40]

### Examples

```javascript
doProp(_.isString, 'foo')({ foo: 'bar' }) // => true
```

```javascript
doProp(_.isString, 'foo')({ foo: 2 }) // => false
```

## doPropOf

Create a function that will accept a path string and send its value of object to transformer.

Type: [Function][40]

## hasMethodAt

Check if property has a method at path.

Type: [Function][40]

### Examples

```javascript
hasMethodAt(path)(object)
```

## hasMethodOf

Check if property at path is a function.

Type: [Function][40]

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

[14]: #replacefield

[15]: #updatetowhen

[16]: #parameters-2

[17]: #examples-4

[18]: #updateto

[19]: #parameters-3

[20]: #setfieldwith

[21]: #parameters-4

[22]: #mergefields

[23]: #parameters-5

[24]: #examples-5

[25]: #mergefieldswith

[26]: #parameters-6

[27]: #copy

[28]: #parameters-7

[29]: #move

[30]: #parameters-8

[31]: #doprop

[32]: #examples-6

[33]: #dopropof

[34]: #hasmethodat

[35]: #examples-7

[36]: #hasmethodof

[37]: #examples-8

[38]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String

[39]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object

[40]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function
