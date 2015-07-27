sails-hook-scenario
=====================

Scenario validation for sails model. Its works with `callback`, `deferred` and `promise` style `model API` provided with sails.

*Note: This requires Sails v0.11.0+.

## Installation
```sh
$ npm install --save sails-hook-scenario
```

## Usage

### In model
Add `scenarios` static property in your sails model
```js
module.exports = {
    attributes: {
        name: {
            type: 'string',
        },
        surname: {
            type: 'string',
        }
        email: {
            type: 'email',
        }
    },
    //scenario definition
    scenarios: {
        register_step_1: {
          //ignoreDefaults: true,
          email: {
            required: true,
          }
        },
        register_step_2: {
          //ignoreDefaults: true,
          name: {
            required: true,
          },
          surname: {
              required: true,
          }
        }
  }
};
```

### In controller
Add `setScenario()` in your sails controller

Example
```javascript
    User.setScenario('register_step_1');
    User.create(params).exec(function(err, data) {
      ...
    });
```

Now you can call model static
- `create()`
- `createEach()`
- `findOrCreate()`
- `findOrCreateEach()`
- `update()`
- `validate()`.



*Note:*
- *`sails-hook-scenario` work by patch model static `validate()`, `create()`, `createEach()`, `findOrCreate()`, `findOrCreateEach()` and `update()`.*


## Contribute

Fork this repo and push in your ideas.
Do not forget to add a bit of test(s) of what value you adding.

## Licence



The MIT License (MIT)

Copyright (c) 2015 rhpwn & Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
