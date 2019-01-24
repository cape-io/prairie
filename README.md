Add new fields/properties to an object based on the values of existing properties.

Composable utility functions that make it easy to edit/replace properties of objects. For best results learn about `_.flow()` and read the [Lodash FP Guide](https://github.com/lodash/lodash/wiki/FP-Guide).

All functions have been [curried](https://lodash.com/docs/4.17.11#curry) so they can be called with one argument at a time.

If you have used `_.set()` and `_.update()` but want more this is the library for you!

## createObj

Create a new object with key and value.

### Parameters

-   `key` **[string][46]** The string used for key.
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

Returns **[Object][47]** New object with `value` placed on `key` property.

## setIn

Rearranged `_.set` args to `setIn(path, state, value)`

Type: [function][48]

### Examples

```javascript
setIn(path, state, value)
```

## setVal

Rearranged `_.set` args to `setVal(value, state, path)`

Type: [function][48]

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

-   `path` **[string][46]** The path of the property to replace.
-   `transformer` **[Function][48]** Transformer given entire item. Return value set at path.
-   `item` **[Object][47]** The item to update field on.

Returns **[Object][47]** Item with `path` updated with result of `transformer`.

## addField

Set field like `setField` but only if it's value is empty.

### Parameters

-   `path` **[string][46]** The path of the property to replace.
-   `transformer` **[Function][48]** Transformer given entire item. Return value set at path.
-   `item` **[Object][47]** The item to update field on.

## setFieldHas

Replace field only if it is already set. Transformer given entire item.

### Parameters

-   `path` **[string][46]** The path of the property to replace.
-   `transformer` **[Function][48]** Transformer given entire item. Return value set at path.
-   `item` **[Object][47]** The item to update field on.

Returns **[Object][47]** Item with `path` updated with result of `transformer`.

## replaceField

Replace field only if found. Transformer gets field value.
Probably just use \_.update()!?

## updateToWhen

Replace field with result of transformer when boolCheck return true.

### Parameters

-   `transformer` **[Function][48]** Transformer given value at path of item. Return replacement value.
-   `boolCheck` **[Function][48]** A function that returns true when field should be replaced.
-   `path` **[string][46]** The path of the property to update.
-   `item` **[Object][47]** The item to conditionally update field on.

### Examples

```javascript
const toArray = updateToWhen(Array, _.isPlainObject, 'foo')
toArray({ foo: { a: 'happy' } }) // => { foo: [{ a: 'happy' }] }
```

Returns **[Object][47]** Item with conditional transformer applied to `path`.

## updateTo

Rearranged \_.update args to transformer, path, item

### Parameters

-   `transformer` **[Function][48]** Transformer given value at path of item. Return replacement value.
-   `path` **[string][46]** The path of the property to get.
-   `item` **[Object][47]** The item to update field on.

Returns **[Object][47]** Item with transformer applied to property at `path`.

## updateWith

Set field on item. Transformer given value of withId property.

### Parameters

-   `path` **[string][46]** The path of the property to get.
-   `withId` **[string][46]** The path of the property to send to `transformer`.
-   `transformer` **[Function][48]** Transformer given value of withId property.

Returns **ItemTransformer** Result of transformer set at `field` `item`.

## mergeFields

Replace item with result of transformer.

### Parameters

-   `transformer` **[Function][48]** Accepts single param that is `item`. Should return a new Object.
-   `item` **[Object][47]**

### Examples

```javascript
mergeFields(({ a, b }) => ({ a4: a * 4, b3: b * 3 }), { a: 2, b: 3 });
// => { a: 2, b: 3, a4: 8, b3: 9 }
```

Returns **[Object][47]** Merged result of transformer on top of `item`.

## mergeFieldsWith

Replace item. Transformer given value of withId property.

### Parameters

-   `withId` **[string][46]** The path of the property to send to `transformer`.
-   `transformer` **[Function][48]** Sent item property at path of `withId`. Should return new Object.
-   `item` **[Object][47]** The object to work with.

Returns **[Object][47]** Result of transformer set at `field` `item`.

## copy

Copy value of getPath to setPath.

### Parameters

-   `getPath` **[string][46]** The source path.
-   `setPath` **[string][46]** The destination path.
-   `item` **[Object][47]** The object to work with.

## move

Move property from one names to another.

### Parameters

-   `getPath` **[string][46]** The source path.
-   `setPath` **[string][46]** The destination path.
-   `item` **[Object][47]** The object to work with.

Returns **[Object][47]** Result after the move. Value at `getPath` removed and added to `setPath`.

## getFields

Return an object with same keys as object argument.
  Values replaced with result of value selector.

### Parameters

-   `structuredSelector` **[Object][47]** Object where each value is a selector accepting item.
-   `item` **[Object][47]** The object to work with.

### Examples

```javascript
getFields({bar: _.get('foo')}, { foo: 'happy'}) // => { bar: 'happy' }
getFields({bar: 'foo'})({ foo: 'happy'}) // => { bar: 'happy' }
```

Returns **Object2** Result after each value is passed the item.

## doProp

Return result of calling transformer with property value at path.

### Parameters

-   `transformer` **[Function][48]** Transformer given value at path of item.
-   `path` **[string][46]** The path of the property to get.
-   `item` **[Object][47]** The item to get property value on.

### Examples

```javascript
doProp(_.isString, 'foo')({ foo: 'bar' }) // => true
```

```javascript
doProp(_.isString, 'foo')({ foo: 2 }) // => false
```

## doPropOf

Create a function that will accept a path string and send its value of object to transformer.

Type: [Function][48]

## hasMethodAt

Check if property has a method at path. An example of using `doProp()`.

Type: [Function][48]

### Examples

```javascript
hasMethodAt(path)(object)
```

## hasMethodOf

Check if property at path is a function. An example of using `doPropOf()`.

Type: [Function][48]

### Examples

```javascript
hasMethodAt(path)(object)
```

## transformHas

Replace entire item if has field. Transformer given value at path.

Type: [Function][48]

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

[13]: #parameters-2

[14]: #setfieldhas

[15]: #parameters-3

[16]: #replacefield

[17]: #updatetowhen

[18]: #parameters-4

[19]: #examples-4

[20]: #updateto

[21]: #parameters-5

[22]: #updatewith

[23]: #parameters-6

[24]: #mergefields

[25]: #parameters-7

[26]: #examples-5

[27]: #mergefieldswith

[28]: #parameters-8

[29]: #copy

[30]: #parameters-9

[31]: #move

[32]: #parameters-10

[33]: #getfields

[34]: #parameters-11

[35]: #examples-6

[36]: #doprop

[37]: #parameters-12

[38]: #examples-7

[39]: #dopropof

[40]: #hasmethodat

[41]: #examples-8

[42]: #hasmethodof

[43]: #examples-9

[44]: #transformhas

[45]: #examples-10

[46]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String

[47]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object

[48]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function
