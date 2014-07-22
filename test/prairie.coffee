fs = require 'fs'
yaml = require 'js-yaml'

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
    prairie(data.item, data.field_t_rep).should.have.property('template').and.equal('Green Tree')

  it 'Allows an array to be sent as a field description. Processes each one in succession.', () ->
    new_item = prairie(data.item, data.field_arr)
    #console.log new_item
    new_item.should.have.property('name').and.equal('Green, Blué')
