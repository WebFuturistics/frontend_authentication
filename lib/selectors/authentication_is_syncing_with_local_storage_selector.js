'use strict';

// external imports

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.authenticationIsSyncingWithLocalStorageSelector = undefined;

var _reselect = require('reselect');

var _authentication_state_selector = require('./authentication_state_selector');

// selector implementation
var authenticationIsSyncingWithLocalStorageSelector = (0, _reselect.createSelector)([_authentication_state_selector.authenticationStateSelector], function (authenticationState) {
    return authenticationState.get('isSyncingWithLocalStorage');
});

// exports


// local imports
exports.authenticationIsSyncingWithLocalStorageSelector = authenticationIsSyncingWithLocalStorageSelector;