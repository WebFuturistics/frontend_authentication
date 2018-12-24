'use strict';

// external imports

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.authenticationIsBusySelector = undefined;

var _ramda = require('ramda');

var _reselect = require('reselect');

var _authentication_is_checking_selector = require('./authentication_is_checking_selector');

var _authentication_is_being_authenticated_selector = require('./authentication_is_being_authenticated_selector');

var _authentication_is_syncing_with_local_storage_selector = require('./authentication_is_syncing_with_local_storage_selector');

var _authentication_is_authenticated_selector = require('./authentication_is_authenticated_selector');

// selector implementation


// local imports
var authenticationIsBusySelector = (0, _reselect.createSelector)([_authentication_is_checking_selector.authenticationIsCheckingSelector, _authentication_is_being_authenticated_selector.authenticationIsBeingAuthenticatedSelector, _authentication_is_syncing_with_local_storage_selector.authenticationIsSyncingWithLocalStorageSelector, _authentication_is_authenticated_selector.authenticationIsAuthenticatedSelector], function (authenticationIsChecking, authenticationIsBeingAuthenticated, authenticationIsSyncingWithLocalStorage, authenticationIsAuthenticated) {
    return (0, _ramda.any)(function (flag) {
        return flag === true;
    }, [authenticationIsChecking, authenticationIsBeingAuthenticated, authenticationIsSyncingWithLocalStorage, authenticationIsAuthenticated]);
});

// exports
exports.authenticationIsBusySelector = authenticationIsBusySelector;