var data, fs, prairie, should, yaml;

fs = require('fs');

yaml = require('js-yaml');

should = require('chai').should();

prairie = require('../prairie');

data = yaml.safeLoad(fs.readFileSync(__dirname + '/data.yaml'));

describe('prairie', function() {
  var new_item;
  new_item = prairie(data.item, data.field);
  it('Adds dirname and dirsplit fields when the field object wants dir_i.', function() {
    new_item.should.have.property('dirname').and.equal('one/folder/two');
    return new_item.should.have.property('dirsplit').and.eql(['one', 'folder', 'two']);
  });
  it('Adds dir fields based on path field. Auto find key field.', function() {
    new_item.should.have.property('dir1').and.equal('one');
    new_item.should.have.property('dir2').and.equal('folder');
    return new_item.should.have.property('dir3').and.equal('two');
  });
  it('Has access to lodash functions such as _.first()', function() {
    return new_item.should.have.property('thing').and.equal("Fancy Name'");
  });
  it('Handle string_replace correctly.', function() {
    var res;
    res = prairie(data.item, data.field_t_rep);
    return res.should.have.property('template').and.equal('Green Tree');
  });
  it('Handle a field def that is a string.', function() {
    var res;
    res = prairie(data.item, data.field_t_rep);
    return res.should.have.property('str_field').and.equal('Green Tree');
  });
  return it('Allows an array to be sent as a field description. Processes each one in succession.', function() {
    new_item = prairie(data.item, data.field_arr);
    new_item.should.have.property('name').and.equal('Green, Blué');
    new_item.should.have.property('char1int').and.equal(9);
    return new_item.should.have.property('char2int').and.equal(false);
  });
});
