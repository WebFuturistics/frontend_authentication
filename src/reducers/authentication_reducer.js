'use strict';

// @flow

// external imports
import {is} from 'ramda';
import {Record} from 'immutable';

// local imports
import type {
    AuthenticationStateType,
    AuthenticationRecordStateType,
    AuthenticationInitialRecordStateType,

    GeneralActionType,
} from './../types/general';

import {
    WF_REQUEST_LOAD_AUTHENTICATION_DATA_FROM_LOCAL_STORAGE,
    WF_SUCCESS_LOAD_AUTHENTICATION_DATA_FROM_LOCAL_STORAGE,
    WF_ERROR_LOAD_AUTHENTICATION_DATA_FROM_LOCAL_STORAGE,

    WF_REQUEST_CHECK_AUTHENTICATION_USER,
    WF_SUCCESS_CHECK_AUTHENTICATION_USER,
    WF_ERROR_CHECK_AUTHENTICATION_USER,

    WF_REQUEST_REMOVE_AUTHENTICATION_DATA_FROM_LOCAL_STORAGE,
    WF_SUCCESS_REMOVE_AUTHENTICATION_DATA_FROM_LOCAL_STORAGE,
    WF_ERROR_REMOVE_AUTHENTICATION_DATA_FROM_LOCAL_STORAGE,

    WF_REQUEST_AUTHENTICATE_USER,
    WF_SUCCESS_AUTHENTICATE_USER,
    WF_ERROR_AUTHENTICATE_USER,

    WF_REQUEST_SAVE_AUTHENTICATION_DATA_TO_LOCAL_STORAGE,
    WF_SUCCESS_SAVE_AUTHENTICATION_DATA_TO_LOCAL_STORAGE,
    WF_ERROR_SAVE_AUTHENTICATION_DATA_TO_LOCAL_STORAGE,

    WF_SUCCESS_DEAUTHENTICATE_USER,
    WF_ERROR_DEAUTHENTICATE_USER
} from './../constants/authentication_constants';

// reducer implementation
const initialState: AuthenticationStateType = {
    isChecking: false,
    isBeingAuthenticated: false,
    isSyncingWithLocalStorage: false,

    isAuthenticated: null,
    token: null
};

const initialStateRecord: AuthenticationInitialRecordStateType = Record(initialState);

const authenticationReducer = (state: AuthenticationRecordStateType = new initialStateRecord(), {type, payload}: GeneralActionType) => {
    switch (type) {
        case WF_REQUEST_LOAD_AUTHENTICATION_DATA_FROM_LOCAL_STORAGE:
        case WF_REQUEST_REMOVE_AUTHENTICATION_DATA_FROM_LOCAL_STORAGE:
        case WF_REQUEST_SAVE_AUTHENTICATION_DATA_TO_LOCAL_STORAGE: {
            return state.set('isSyncingWithLocalStorage', true);
        }

        case WF_SUCCESS_LOAD_AUTHENTICATION_DATA_FROM_LOCAL_STORAGE: {
            return state.merge({
                isSyncingWithLocalStorage: false,
                token: payload ? payload : state.get('token')
            });
        }

        case WF_SUCCESS_REMOVE_AUTHENTICATION_DATA_FROM_LOCAL_STORAGE:
        case WF_SUCCESS_SAVE_AUTHENTICATION_DATA_TO_LOCAL_STORAGE:{
            return state.set('isSyncingWithLocalStorage', false);
        }

        // TODO: add error handling logic
        case WF_ERROR_LOAD_AUTHENTICATION_DATA_FROM_LOCAL_STORAGE:
        case WF_ERROR_REMOVE_AUTHENTICATION_DATA_FROM_LOCAL_STORAGE:
        case WF_ERROR_SAVE_AUTHENTICATION_DATA_TO_LOCAL_STORAGE:{
            return state.set('isSyncingWithLocalStorage', false);
        }

        case WF_REQUEST_CHECK_AUTHENTICATION_USER: {
            return state.set('isChecking', false);
        }

        case WF_SUCCESS_CHECK_AUTHENTICATION_USER: {
            return state.merge({
                isChecking: false,
                isAuthenticated: true
            });
        }

        // TODO: add error handling logic
        case WF_ERROR_CHECK_AUTHENTICATION_USER: {
            return new initialStateRecord({
                isChecking: false,
                isAuthenticated: false
            });
        }

        case WF_REQUEST_AUTHENTICATE_USER: {
            return state.set('isBeingAuthenticated', true);
        }

        case WF_SUCCESS_AUTHENTICATE_USER: {
            if (is(Object, payload) && is(Object, payload.data)) {
                return state.merge({
                    isBeingAuthenticated: false,
                    isAuthenticated: true,
                    token: payload.data.authenticationToken,
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
        case WF_ERROR_AUTHENTICATE_USER: {
            return state.set('isBeingAuthenticated', false);
        }

        case WF_SUCCESS_DEAUTHENTICATE_USER: {
            return state.merge({
                isAuthenticated: false,
                token: null
            });
        }

        // TODO: add error handling logic
        case WF_ERROR_DEAUTHENTICATE_USER: {
            return state;
        }

        default:
            return state;
    }
};

// exports
export {authenticationReducer};