_ = require 'understory'

seed = (item, field, field_id) ->
  # Shortcut gets expanded here.
  if field == true and _.isFunction(_[field_id]) and key
    # This is the expanded version
    field =
      func: field_id
      arg_field: key

  # Simple string is a "template".
  if _.isString field
    item[field_id] = _token_replace field, item
  # Do not process numbers. It's the final value.
  else if _.isNumber field
    item[field_id] = field
  # Process first as normal. Pass result to each further func.
  else if _.isArray field
    field1 = field.shift()
    grow item, field1, field_id
    unless _.isEmpty field
      _.each field, (field_func) ->
        if field_func.string == true
          field_func.string = item[field_id]
        else if field_func.arg == true
          field_func.arg = item[field_id]
        grow item, field_func, field_id

  # The function returns the value of the new field.
  else if _.isObject field
    # Grow the size of the object by adding another property.
    grow item, field, field_id

grow = (item, field, field_id) ->
  if field.arg_field and item[field.arg_field]
    field.arg = item[field.arg_field]
    delete field.arg_field
  else if field.arg
    if _.isString(field.arg) and item[field.arg]
      field.arg = item[field.arg]
    else if field.arg.string
      if item[field.arg.string]
        field.arg.string = item[field.arg.string]
      else
        tre = _.token_replace field.arg.string, {}
        tr = _.token_replace field.arg.string, item
        if tr and tr != field.arg.string and tr != tre
          field.arg.string = tr
        else
          field.arg.string = null
  # A field arg can be an object of string templates.
  # Why is this happening here?!?!?! >:-( Think about moving it.
  if _.isObject(field.arg) and (field.arg.string or field.arg.path) and not _.isArray(field.arg)
    field.arg = _.token_replace field.arg, item
  # @todo. Allow this module to require other modules based on 'app' field.
  unless field.app
    field.app = 'map'
  unless field.func
    field.func = field_id
  if 'map' == field.app and _.isFunction _[field.func]
    item[field_id] = _[field.func] field.arg
  # Filtering?!? Here? What for?
  # else if field.filter
  #   if @filter(item, field.filter)
  #     if field.default
  #       item = _.defaults item, field.default
  #     if field.field and key
  #       item = @field item, field.field, key
  #     if field.rename
  #       item = @rename item, field.rename
  else # Please describe what this does.
    delete field.app
    delete field.map
    delete field.func
    field_overlay = _.token_replace(field, item)
    if item[field_id]
      item[field_id] = _.merge item[field_id], field_overlay
    else
      item[field_id] = field_overlay

# Fields in the `values` object MUST match ALL `required` object fields.
module.exports = (item, field_info, key = false) ->
  # We only care about adding fields to an object.
  unless _.isObject(item) and not _.isArray(item)
    return item

  unless _.isObject(field_info)
    return item

  # Fresh copy of field_info so we can hack at it.
  field_info = _.cloneDeep field_info

  # The primary key field.
  unless key
    # Try to find the primary key field if it is not set.
    try_keys = ['id', '_id', 'path', 'pk']
    _.each try_keys, (try_key) ->
      if item[try_key]
        key = try_key
        return false

  if key and item[key]
    # Special fields.
    if field_info.dir_i == true
      unless item.dirname
        item.dirname = _.dirname item[key]
        # If this was one of the fields we can delete it now.
        if field_info.dirname == true
          delete field_info.dirname
      item = _.merge item, _.dir_i(item.dirname)
      delete field_info.dir_i

  _.each field_info, (field, field_id) =>
    seed item, field, field_id

  return item
