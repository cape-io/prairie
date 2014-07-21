should = require('chai').should()
prairie = require('../prairie')

rm_prefix = prairie.rm_prefix
describe 'prairie', () ->
  describe '#rm_prefix', () ->
    it 'Removes a string from the left of another. Removes leading slash by default.', () ->
      prairie.rm_prefix('/some/long/path', '/some').should.equal('long/path')
    it 'Only remove subject string. Not leading slash', () ->
      prairie.rm_prefix('/some/long/path', '/some', false).should.equal('/long/path')