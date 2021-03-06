/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module, require);
}
define(function (require, exports, module) {

  var binarySearch = require('../../lib/source-map/binary-search');

  function numberCompare(a, b) {
    return a - b;
  }

  exports['test too high with default (glb) bias'] = function (assert, util) {
    var needle = 30;
    var haystack = [2,4,6,8,10,12,14,16,18,20];

    assert.doesNotThrow(function () {
      binarySearch.search(needle, haystack, numberCompare);
    });

    assert.equal(haystack[binarySearch.search(needle, haystack, numberCompare)], 20);
  };

  exports['test too low with default (glb) bias'] = function (assert, util) {
    var needle = 1;
    var haystack = [2,4,6,8,10,12,14,16,18,20];

    assert.doesNotThrow(function () {
      binarySearch.search(needle, haystack, numberCompare);
    });

    assert.equal(binarySearch.search(needle, haystack, numberCompare), -1);
  };

  exports['test too high with lub bias'] = function (assert, util) {
    var needle = 30;
    var haystack = [2,4,6,8,10,12,14,16,18,20];

    assert.doesNotThrow(function () {
      binarySearch.search(needle, haystack, numberCompare);
    });

    assert.equal(binarySearch.search(needle, haystack, numberCompare,
                                     binarySearch.LEAST_UPPER_BOUND), -1);
  };

  exports['test too low with lub bias'] = function (assert, util) {
    var needle = 1;
    var haystack = [2,4,6,8,10,12,14,16,18,20];

    assert.doesNotThrow(function () {
      binarySearch.search(needle, haystack, numberCompare);
    });

    assert.equal(haystack[binarySearch.search(needle, haystack, numberCompare,
                                              binarySearch.LEAST_UPPER_BOUND)], 2);
  };

  exports['test exact search'] = function (assert, util) {
    var needle = 4;
    var haystack = [2,4,6,8,10,12,14,16,18,20];

    assert.equal(haystack[binarySearch.search(needle, haystack, numberCompare)], 4);
  };

  exports['test fuzzy search with default (glb) bias'] = function (assert, util) {
    var needle = 19;
    var haystack = [2,4,6,8,10,12,14,16,18,20];

    assert.equal(haystack[binarySearch.search(needle, haystack, numberCompare)], 18);
  };

  exports['test fuzzy search with lub bias'] = function (assert, util) {
    var needle = 19;
    var haystack = [2,4,6,8,10,12,14,16,18,20];

    assert.equal(haystack[binarySearch.search(needle, haystack, numberCompare,
                                              binarySearch.LEAST_UPPER_BOUND)], 20);
  };

  exports['test multiple matches'] = function (assert, util) {
    var needle = 5;
    var haystack = [1, 1, 2, 5, 5, 5, 13, 21];

    assert.equal(binarySearch.search(needle, haystack, numberCompare,
                                     binarySearch.LEAST_UPPER_BOUND), 3);
  };

  exports['test multiple matches at the beginning'] = function (assert, util) {
    var needle = 1;
    var haystack = [1, 1, 2, 5, 5, 5, 13, 21];

    assert.equal(binarySearch.search(needle, haystack, numberCompare,
                                     binarySearch.LEAST_UPPER_BOUND), 0);
  };

});
