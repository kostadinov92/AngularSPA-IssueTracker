'use strict';

angular.module('issueTracker.version', [
  'issueTracker.version.interpolate-filter',
  'issueTracker.version.version-directive'
])

.value('version', '0.1');
