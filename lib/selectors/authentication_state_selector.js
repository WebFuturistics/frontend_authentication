'use strict';

// external imports

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.authenticationStateSelector = undefined;

var _reselect = require('reselect');

// selector implementation


// local imports
var getAuthenticationState = function getAuthenticationState(state) {
    return state.get('hr_authentication');
};

var authenticationStateSelector = (0, _reselect.createSelector)([getAuthenticationState], function (authenticationState) {
    return authenticationState;
});

// exports
exports.authenticationStateSelector = authenticationStateSelector;