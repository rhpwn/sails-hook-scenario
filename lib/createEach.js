'use strict';

var Deferred = require('sails/node_modules/waterline/lib/waterline/query/deferred');

module.exports = function(model) {

  var sailsCreate = model.createEach;

  function createEach(values, callback) {

    if (arguments.length === 3) {
      var args = Array.prototype.slice.call(arguments);
      callback = args.pop();
      values = args.pop();
    }

    if (typeof callback !== 'function') {
      return new Deferred(model, model.createEach, {}, values);
    }

    sailsCreate.call(model, values, function(error, result) {
      if(model._scenario.autoClear && model._scenario.setDefaults) {
        model.clearScenarios();
      }
      if (error) {
        callback(error);
      } else {
        callback(null, result);
      }
    });
  }

  model.createEach = createEach;
};
