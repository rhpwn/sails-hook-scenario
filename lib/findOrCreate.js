'use strict';

var Deferred = require('sails/node_modules/waterline/lib/waterline/query/deferred');

module.exports = function(model) {

  var sailsFindOrCreate = model.findOrCreate;

  function findOrCreate(criteria, values, callback) {

    if (typeof callback !== 'function') {
      return new Deferred(model, model.findOrCreate, criteria, values);
    }

    sailsFindOrCreate.call(model, criteria, values, function(error, result) {
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

  model.findOrCreate = findOrCreate;
};
