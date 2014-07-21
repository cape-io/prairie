// Generated by CoffeeScript 1.6.3
var prairie, rm_prefix, should;

should = require('chai').should();

prairie = require('../prairie');

rm_prefix = prairie.rm_prefix;

describe('prairie', function() {
  return describe('#rm_prefix', function() {
    it('Removes a string from the left of another. Removes leading slash by default.', function() {
      return prairie.rm_prefix('/some/long/path', '/some').should.equal('long/path');
    });
    return it('Only remove subject string. Not leading slash', function() {
      return prairie.rm_prefix('/some/long/path', '/some', false).should.equal('/long/path');
    });
  });
});
