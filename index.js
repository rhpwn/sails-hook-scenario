'use strict';

/**
 * @description allow model to define its custom validation scenarios.
 *
 * @param  {Object} sails a sails application instance
 */

 var path = require('path');
 var libPath = path.join(__dirname, 'lib');

//patches
var create = require(path.join(libPath, 'create'));
var createEach = require(path.join(libPath, 'createEach'));
var findOrCreate = require(path.join(libPath, 'findOrCreate'));
var findOrCreateEach = require(path.join(libPath, 'findOrCreateEach'));
var update = require(path.join(libPath, 'update'));
var validate = require(path.join(libPath, 'validate'));


module.exports = function(sails) {
  function patch() {
    sails
    .util
    ._(sails.models)
    .forEach(function(model) {
      model._scenario = {
        setDefaults: false,
        autoClear: true,
        defaults: {
          validations: false,
          cast: false,
        }
      }
      model.setScenario = function(name, autoClear) {
        autoClear = typeof autoClear !== 'undefined' ? autoClear : true;
        model._scenario.autoClear = autoClear;
        if(!model._scenario.setDefaults) {
          model._scenario.setDefaults = true;
          model._scenario.defaults.validations = _.cloneDeep(model._validator.validations);
          model._scenario.defaults.cast = _.cloneDeep(model._cast._types);
        }

        if(model.scenarios && model.scenarios[name]) {
          if(model.scenarios[name].ignoreDefaults) {
            for(var i in model._validator.validations) {
              for(var j in model._validator.validations[i]) {
                if(j != 'type') {
                  delete model._validator.validations[i][j];
                }
              }
            }
          }
          for(var key in model.scenarios[name]) {
            if(key != 'ignoreDefaults') {
              for(var v in model.scenarios[name][key]) {
                if(v == 'type') {
                  model._cast._types.name = model.scenarios[name][key][v];
                }
                if(model._validator.validations[key]) {
                  model._validator.validations[key][v] = model.scenarios[name][key][v];
                }
              }
            }

          }
        }
      }

      model.clearScenarios = function() {
        model._validator.validations = _.cloneDeep(model._scenario.defaults.validations);
        model._cast._types = _.cloneDeep(model._scenario.defaults.cast);
        console.log(model._validator.validations);
      }

      if (model.globalId) {
        create(model);
        createEach(model);
        findOrCreate(model);
        findOrCreateEach(model);
        update(model);
        validate(model);
      }

    });
}

    return {

      initialize: function(done) {
        var eventsToWaitFor = [];
            if (sails.hooks.orm) {
              eventsToWaitFor.push('hook:orm:loaded');
            }
            if (sails.hooks.pubsub) {
              eventsToWaitFor.push('hook:pubsub:loaded');
            }
            sails.after(eventsToWaitFor, function() {
              patch();
              done();
            });
          }
        };

      };
