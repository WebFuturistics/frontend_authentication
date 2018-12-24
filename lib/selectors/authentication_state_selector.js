'use strict';

// external imports

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.authenticationStateSelector = undefined;

var _general_register = require('@webfuturistics/design_components/lib/registers/general_register');

var _reselect = require('reselect');

// selector implementation

// local imports
var getAuthenticationState = function getAuthenticationState(state) {
    var reducerName = (0, _general_register.getValue)('authenticationReducerName');
    return state.get(reducerName);
};

var authenticationStateSelector = (0, _reselect.createSelector)([getAuthenticationState], function (authenticationState) {
    return authenticationState;
});

// exports
exports.authenticationStateSelector = authenticationStateSelector;