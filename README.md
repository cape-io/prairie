Add new fields/properties to an object based on the values of existing properties.

Should probably be replaced with `setField`, `replaceField`, `setWith` from cape-io/cape-lodash.

## createObj

Create a new object with key and value.

### Parameters

-   `key` **[string][31]** The string used for key.
-   `val` **any** The thing used for value of key.

Returns **[Object][32]** New object with `value` placed on `key` property.

## setIn

Rearranged \_.set args to path, state, value

Type: [function][33]

### Examples

```javascript
setIn(path, state, value)
```

## setVal

Rearranged `_.set` args to value, state, path

Type: [function][33]

### Examples

```javascript
setVal(value, state, path)
```

## setState

Normal lodash \_.set with no rearg.

### Examples

```javascript
setVal(state, path, value)
```

## setField

Set field. Transformer given entire item.

## addField

Set field if it's not already there. Transformer given item.

## setFieldHas

Replace field. Transformer given item.

## replaceField

Replace field. Transformer gets field value.

## setFieldWith

Set field on item. Transformer given value of withId property.

### Parameters

-   `path` **[string][31]** The path of the property to get.
-   `withId` **[string][31]** The path of the property to send to `transformer`.
-   `transformer` **[Function][33]** Transformer given value of withId property.

Returns **ItemTransformer** Result of transformer set at `field` `item`.

## mergeFields

Replace item with result of transformer.

### Parameters

-   `transformer` **[Function][33]** Accepts single param that is `item`. Should return a new Object.
-   `item` **[Object][32]**

### Examples

```javascript
mergeFields(({ a, b }) => ({ a4: a * 4, b3: b * 3 }), { a: 2, b: 3 });
// => { a: 2, b: 3, a4: 8, b3: 9 }
```

Returns **[Object][32]** Merged result of transformer on top of `item`.

## mergeFieldsWith

Replace item. Transformer given value of withId property.

### Parameters

-   `withId` **[string][31]** The path of the property to send to `transformer`.
-   `transformer` **[Function][33]** Sent item property at path of `withId`. Should return new Object.
-   `item` **[Object][32]** The object to work with.

Returns **[Object][32]** Result of transformer set at `field` `item`.

## copy

Copy value of getPath to setPath.

### Parameters

-   `getPath` **[string][31]** The source path.
-   `setPath` **[string][31]** The destination path.
-   `item` **[Object][32]** The object to work with.

## move

Move property from one names to another.

### Parameters

-   `getPath` **[string][31]** The source path.
-   `setPath` **[string][31]** The destination path.
-   `item` **[Object][32]** The object to work with.

Returns **[Object][32]** Result after the move. Value at `getPath` removed and added to `setPath`.

## doProp

Return result of calling checker with object property.

Type: [Function][33]

### Examples

```javascript
doProp(_.isString, 'foo')({ foo: 'bar' }) // => true
```

```javascript
doProp(_.isString, 'foo')({ foo: 2 }) // => false
```

## doPropOf

Create a function that will accept a path string and send its value of object to transformer.

Type: [Function][33]

## hasMethodAt

Check if property has a method at path.

Type: [Function][33]

### Examples

```javascript
hasMethodAt(path)(object)
```

## hasMethodOf

Check if property at path is a function.

Type: [Function][33]

### Examples

```javascript
hasMethodAt(path)(object)
```

[1]: #createobj

[2]: #parameters

[3]: #setin

[4]: #examples

[5]: #setval

[6]: #examples-1

[7]: #setstate

[8]: #examples-2

[9]: #setfield

[10]: #addfield

[11]: #setfieldhas

[12]: #replacefield

[13]: #setfieldwith

[14]: #parameters-1

[15]: #mergefields

[16]: #parameters-2

[17]: #examples-3

[18]: #mergefieldswith

[19]: #parameters-3

[20]: #copy

[21]: #parameters-4

[22]: #move

[23]: #parameters-5

[24]: #doprop

[25]: #examples-4

[26]: #dopropof

[27]: #hasmethodat

[28]: #examples-5

[29]: #hasmethodof

[30]: #examples-6

[31]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String

[32]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object

[33]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function
