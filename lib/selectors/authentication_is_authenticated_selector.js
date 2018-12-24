'use strict';

// external imports

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.authenticationIsAuthenticatedSelector = undefined;

var _reselect = require('reselect');

var _authentication_state_selector = require('./authentication_state_selector');

// selector implementation
var authenticationIsAuthenticatedSelector = (0, _reselect.createSelector)([_authentication_state_selector.authenticationStateSelector], function (authenticationState) {
    return authenticationState.get('isAuthenticated');
});

// exports


// local imports
exports.authenticationIsAuthenticatedSelector = authenticationIsAuthenticatedSelector;