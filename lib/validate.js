'use strict';

module.exports = function(model) {

  var sailsValidate = model.validate;

  function validate(values, presentOnly, callback) {

    sailsValidate.call(model, values, presentOnly, function(error) {
      if(model._scenario.autoClear && model._scenario.setDefaults) {
        model.clearScenarios();
      }
      if (error) {
        callback(error);
      } else {
        callback(null);
      }
    });
  }

  model.validate = validate;
};
