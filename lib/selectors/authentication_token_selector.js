'use strict';

// external imports

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.authenticationTokenSelector = undefined;

var _reselect = require('reselect');

var _authentication_state_selector = require('./authentication_state_selector');

// selector implementation
var authenticationTokenSelector = (0, _reselect.createSelector)([_authentication_state_selector.authenticationStateSelector], function (authenticationState) {
    return authenticationState.get('token');
});

// exports


// local imports
exports.authenticationTokenSelector = authenticationTokenSelector;