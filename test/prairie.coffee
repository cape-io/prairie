fs = require 'fs'
yaml = require 'js-yaml'
_ = require 'understory'

should = require('chai').should()
prairie = require('../prairie')

data = yaml.safeLoad(fs.readFileSync(__dirname+'/data.yaml'))

describe 'prairie', () ->
  new_item = prairie(data.item, data.field)
  it 'Adds dirname and dirsplit fields when the field object wants dir_i.', () ->
    new_item.should.have.property('dirname').and.equal('one/folder/two')
    new_item.should.have.property('dirsplit').and.eql(['one', 'folder', 'two'])

  it 'Adds dir fields based on path field. Auto find key field.', () ->
    new_item.should.have.property('dir1').and.equal('one')
    new_item.should.have.property('dir2').and.equal('folder')
    new_item.should.have.property('dir3').and.equal('two')

  it 'Has access to lodash functions such as _.first()', () ->
    new_item.should.have.property('thing').and.equal("Fancy Name'")

  it 'Handle string_replace correctly.', () ->
    res = prairie(data.item, data.field_t_rep)
    res.should.have.property('template').and.equal('Green Tree')
  it 'Handle a field def that is a string.', () ->
    res = prairie(data.item, data.field_t_rep)
    res.should.have.property('str_field').and.equal('Green Tree')

  it 'Allows an array to be sent as a field description. Processes each one in succession.', () ->
    new_item = prairie(data.item, data.field_arr)
    #console.log new_item
    new_item.should.have.property('name').and.equal('Green, Blué')
    new_item.should.have.property('char1int').and.equal(9)
    new_item.should.have.property('char2int').and.equal(false)
    new_item.should.have.property('char_is_int').and.equal(true)

  it 'Field def array will replace arg.value === true with previous result.', () ->
    new_item = prairie(data.item, data.field_value)
    new_item.should.have.property('kai').and.eql(data.field_value_val)

  it 'Does not set field if arg_field is set but not found in item obj.', () ->
    before = _.clone(data.item)
    new_item = prairie(before, data.field_undefined)
    new_item.should.eql(data.item)
