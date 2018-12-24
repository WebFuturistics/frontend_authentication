'use strict';

// external imports

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.prepareAuthenticationData = exports.deauthenticateUser = exports.saveAuthenticationDataToLocalStorage = exports.authenticateUser = exports.removeAuthenticationDataFromLocalStorage = exports.checkAuthenticationUser = exports.loadAuthenticationDataFromLocalStorage = undefined;

var _authentication_constants = require('./../constants/authentication_constants');

// actions implementation


// local imports
var loadAuthenticationDataFromLocalStorage = exports.loadAuthenticationDataFromLocalStorage = function loadAuthenticationDataFromLocalStorage() {
    return {
        type: _authentication_constants.WF_LOAD_AUTHENTICATION_DATA_FROM_LOCAL_STORAGE
    };
};var checkAuthenticationUser = exports.checkAuthenticationUser = function checkAuthenticationUser() {
    return {
        type: _authentication_constants.WF_CHECK_AUTHENTICATION_USER
    };
};

var removeAuthenticationDataFromLocalStorage = exports.removeAuthenticationDataFromLocalStorage = function removeAuthenticationDataFromLocalStorage() {
    return {
        type: _authentication_constants.WF_REMOVE_AUTHENTICATION_DATA_FROM_LOCAL_STORAGE
    };
};

var authenticateUser = exports.authenticateUser = function authenticateUser(login, password) {
    return {
        type: _authentication_constants.WF_AUTHENTICATE_USER,
        payload: { login: login, password: password }
    };
};

var saveAuthenticationDataToLocalStorage = exports.saveAuthenticationDataToLocalStorage = function saveAuthenticationDataToLocalStorage() {
    return {
        type: _authentication_constants.WF_SAVE_AUTHENTICATION_DATA_TO_LOCAL_STORAGE
    };
};

var deauthenticateUser = exports.deauthenticateUser = function deauthenticateUser() {
    return {
        type: _authentication_constants.WF_DEAUTHENTICATE_USER
    };
};

var prepareAuthenticationData = exports.prepareAuthenticationData = function prepareAuthenticationData() {
    return {
        type: _authentication_constants.WF_PREPARE_AUTHENTICATION_DATA
    };
};