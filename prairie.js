(function() {
  var grow, seed, _;

  _ = require('understory');

  seed = function(item, field, field_id) {
    var field1;
    if (field === true && _.isFunction(_[field_id]) && key) {
      field = {
        func: field_id,
        arg_field: key
      };
    }
    if (_.isString(field)) {
      return item[field_id] = _.token_replace(field, item);
    } else if (_.isNumber(field)) {
      return item[field_id] = field;
    } else if (_.isArray(field)) {
      field1 = field.shift();
      grow(item, field1, field_id);
      if (!_.isEmpty(field)) {
        return _.each(field, function(field_func) {
          if (_.isString(field_func)) {
            field_func = {
              func: field_func,
              arg: item[field_id]
            };
          } else if (_.isString(field_func.func) && _.isUndefined(field_func.arg) && _.isUndefined(field_func.arg_field)) {
            field_func.arg = item[field_id];
          }
          if (_.isObject(field_func.arg)) {
            if (field_func.arg.string === true) {
              field_func.arg.string = item[field_id];
            } else if (field_func.arg.value === true) {
              field_func.arg.value = item[field_id];
            }
          }
          grow(item, field_func, field_id);
        });
      }
    } else if (_.isObject(field)) {
      return grow(item, field, field_id);
    }
  };

  grow = function(item, field, field_id) {
    var field_overlay;
    if (field.arg_field) {
      if (item[field.arg_field]) {
        field.arg = item[field.arg_field];
        delete field.arg_field;
      } else {
        console.log('Error finding field ' + field_id);
        return;
      }
    } else if (field.arg) {
      if (_.isString(field.arg) && item[field.arg]) {
        field.arg = item[field.arg];
      } else if (_.isString(field.arg.string) && item[field.arg.string]) {
        field.arg.string = item[field.arg.string];
      } else if (_.isString(field.arg.value) && item[field.arg.value]) {
        field.arg.value = item[field.arg.value];
      }
    }
    if (!field.app) {
      field.app = 'map';
    }
    if (!field.func) {
      field.func = field_id;
    }
    if ('map' === field.app && _.isFunction(_[field.func])) {
      if ('token_replace' === field.func) {
        return item[field_id] = _.token_replace(field.arg, item);
      } else if ('join' === field.func && _.isArray(field.arg)) {
        return item[field_id] = field.arg.join(field.join_with);
      } else {
        return item[field_id] = _[field.func](field.arg);
      }
    } else {
      console.log('did not find function ' + field.func);
      delete field.app;
      delete field.map;
      delete field.func;
      field_overlay = _.token_replace(field, item);
      if (item[field_id]) {
        return item[field_id] = _.merge(item[field_id], field_overlay);
      } else {
        return item[field_id] = field_overlay;
      }
    }
  };

  module.exports = function(item, field_info, key) {
    var try_keys;
    if (key == null) {
      key = false;
    }
    if (!(_.isObject(item) && !_.isArray(item))) {
      return item;
    }
    if (!_.isObject(field_info)) {
      return item;
    }
    field_info = _.cloneDeep(field_info);
    if (!key) {
      try_keys = ['id', '_id', 'path', 'pk'];
      _.each(try_keys, function(try_key) {
        if (item[try_key]) {
          key = try_key;
          return false;
        }
      });
    }
    if (key && item[key]) {
      if (field_info.dir_i === true) {
        if (!item.dirname) {
          item.dirname = _.dirname(item[key]);
          if (field_info.dirname === true) {
            delete field_info.dirname;
          }
        }
        item = _.merge(item, _.dir_i(item.dirname));
        delete field_info.dir_i;
      }
    }
    _.each(field_info, function(field, field_id) {
      return seed(item, field, field_id);
    });
    return item;
  };

}).call(this);
