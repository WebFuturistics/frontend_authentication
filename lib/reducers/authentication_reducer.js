'use strict';

// external imports

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.authenticationReducer = undefined;

var _ramda = require('ramda');

var _immutable = require('immutable');

var _authentication_constants = require('./../constants/authentication_constants');

// reducer implementation
var initialState = {
    isChecking: false,
    isBeingAuthenticated: false,
    isSyncingWithLocalStorage: false,

    isAuthenticated: null,
    token: null
};

// local imports


var initialStateRecord = (0, _immutable.Record)(initialState);

var authenticationReducer = function authenticationReducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new initialStateRecord();
    var _ref = arguments[1];
    var type = _ref.type,
        payload = _ref.payload;

    switch (type) {
        case _authentication_constants.WF_REQUEST_LOAD_AUTHENTICATION_DATA_FROM_LOCAL_STORAGE:
        case _authentication_constants.WF_REQUEST_REMOVE_AUTHENTICATION_DATA_FROM_LOCAL_STORAGE:
        case _authentication_constants.WF_REQUEST_SAVE_AUTHENTICATION_DATA_TO_LOCAL_STORAGE:
            {
                return state.set('isSyncingWithLocalStorage', true);
            }

        case _authentication_constants.WF_SUCCESS_LOAD_AUTHENTICATION_DATA_FROM_LOCAL_STORAGE:
            {
                return state.merge({
                    isSyncingWithLocalStorage: false,
                    token: payload ? payload : state.get('token')
                });
            }

        case _authentication_constants.WF_SUCCESS_REMOVE_AUTHENTICATION_DATA_FROM_LOCAL_STORAGE:
        case _authentication_constants.WF_SUCCESS_SAVE_AUTHENTICATION_DATA_TO_LOCAL_STORAGE:
            {
                return state.set('isSyncingWithLocalStorage', false);
            }

        // TODO: add error handling logic
        case _authentication_constants.WF_ERROR_LOAD_AUTHENTICATION_DATA_FROM_LOCAL_STORAGE:
        case _authentication_constants.WF_ERROR_REMOVE_AUTHENTICATION_DATA_FROM_LOCAL_STORAGE:
        case _authentication_constants.WF_ERROR_SAVE_AUTHENTICATION_DATA_TO_LOCAL_STORAGE:
            {
                return state.set('isSyncingWithLocalStorage', false);
            }

        case _authentication_constants.WF_REQUEST_CHECK_AUTHENTICATION_USER:
            {
                return state.set('isChecking', false);
            }

        case _authentication_constants.WF_SUCCESS_CHECK_AUTHENTICATION_USER:
            {
                return state.merge({
                    isChecking: false,
                    isAuthenticated: true
                });
            }

        // TODO: add error handling logic
        case _authentication_constants.WF_ERROR_CHECK_AUTHENTICATION_USER:
            {
                return new initialStateRecord({
                    isChecking: false,
                    isAuthenticated: false
                });
            }

        case _authentication_constants.WF_REQUEST_AUTHENTICATE_USER:
            {
                return state.set('isBeingAuthenticated', true);
            }

        case _authentication_constants.WF_SUCCESS_AUTHENTICATE_USER:
            {
                if ((0, _ramda.is)(Object, payload) && (0, _ramda.is)(Object, payload.data)) {
                    return state.merge({
                        isBeingAuthenticated: false,
                        isAuthenticated: true,
                        token: payload.data.authenticationToken
                    });
                } else {
                    return state.merge({
                        isBeingAuthenticated: false,
                        isAuthenticated: false,
                        token: null
                    });
                }
            }

        // TODO: add error handling logic
        case _authentication_constants.WF_ERROR_AUTHENTICATE_USER:
            {
                return state.set('isBeingAuthenticated', false);
            }

        case _authentication_constants.WF_SUCCESS_DEAUTHENTICATE_USER:
            {
                return state.merge({
                    isAuthenticated: false,
                    token: null
                });
            }

        // TODO: add error handling logic
        case _authentication_constants.WF_ERROR_DEAUTHENTICATE_USER:
            {
                return state;
            }

        default:
            return state;
    }
};

// exports
exports.authenticationReducer = authenticationReducer;