_ = require 'understory'

# Fields in the `values` object MUST match ALL `required` object fields.
module.exports = (item, field_info, key) ->
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
    if item.id
      key = 'id' # most common.
    else if item._id
      key = '_id'
    else if item.pk
      key = 'pk' # this might be removed in the future.
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
    if field == true
      if _.isFunction _[field_id]
        if not key
          console.log 'No primary key!'
        field = {func: field_id, arg_field: key}
    if _.isString field
      item[field_id] = _token_replace field, item
    else if _.isNumber field
      item[field_id] = field
    else if _.isObject field
      if field.arg_field and item[field.arg_field]
        field.arg = item[field.arg_field]
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
      if _.isObject field.arg
        field.arg = _.token_replace field.arg, item
      unless field.app
        field.app = 'map'
      unless field.func
        field.func = field_id
      if 'map' == field.app and _.isFunction @[field.func]
        item[field_id] = @[field.func] field.arg
      else if field.filter
        if @filter(item, field.filter)
          if field.default
            item = _.defaults item, field.default
          if field.field and key
            item = @field item, field.field, key
          if field.rename
            item = @rename item, field.rename
      else
        delete field.app
        delete field.map
        delete field.func
        field_overlay = _.token_replace(field, item)
        if item[field_id]
          item[field_id] = _.merge item[field_id], field_overlay
        else
          item[field_id] = field_overlay
  return item
