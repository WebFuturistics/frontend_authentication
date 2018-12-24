'use strict';

// external imports

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.authenticationIsBeingAuthenticatedSelector = undefined;

var _reselect = require('reselect');

var _authentication_state_selector = require('./authentication_state_selector');

// selector implementation
var authenticationIsBeingAuthenticatedSelector = (0, _reselect.createSelector)([_authentication_state_selector.authenticationStateSelector], function (authenticationState) {
    return authenticationState.get('isBeingAuthenticated');
});

// exports


// local imports
exports.authenticationIsBeingAuthenticatedSelector = authenticationIsBeingAuthenticatedSelector;