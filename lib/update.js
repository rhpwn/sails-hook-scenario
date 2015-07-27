'use strict';

var Deferred = require('sails/node_modules/waterline/lib/waterline/query/deferred');

module.exports = function(model) {

  var sailsUpdate = model.update;

  function update(criterias, values, callback) {

    if (typeof callback !== 'function') {
      return new Deferred(model, model.update, criterias, values);
    }

    sailsUpdate.call(model, criterias, values, function(error, result) {
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

  model.update = update;
};
