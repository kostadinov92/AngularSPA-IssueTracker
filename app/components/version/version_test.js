'use strict';

describe('issueTracker.version module', function() {
  beforeEach(module('issueTracker.version'));

  describe('version service', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});
