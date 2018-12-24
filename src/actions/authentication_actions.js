'use strict';

// @flow

// external imports
import type {GenericReduxActionType} from '@webfuturistics/design_components/lib/types/redux';

// local imports
import type {AuthenticateUserActionPayloadType} from './../types/general';

import {
    WF_LOAD_AUTHENTICATION_DATA_FROM_LOCAL_STORAGE,
    WF_CHECK_AUTHENTICATION_USER,
    WF_REMOVE_AUTHENTICATION_DATA_FROM_LOCAL_STORAGE,
    WF_AUTHENTICATE_USER,
    WF_SAVE_AUTHENTICATION_DATA_TO_LOCAL_STORAGE,
    WF_DEAUTHENTICATE_USER,
    WF_PREPARE_AUTHENTICATION_DATA
} from './../constants/authentication_constants';

// actions implementation
export const loadAuthenticationDataFromLocalStorage = (): GenericReduxActionType<any> => ({
    type: WF_LOAD_AUTHENTICATION_DATA_FROM_LOCAL_STORAGE
});

export const checkAuthenticationUser = (): GenericReduxActionType<any> => ({
    type: WF_CHECK_AUTHENTICATION_USER
});

export const removeAuthenticationDataFromLocalStorage = (): GenericReduxActionType<any> => ({
    type: WF_REMOVE_AUTHENTICATION_DATA_FROM_LOCAL_STORAGE
});

export const authenticateUser = (login: string, password: string): GenericReduxActionType<AuthenticateUserActionPayloadType> => ({
    type: WF_AUTHENTICATE_USER,
    payload: {login, password},
});

export const saveAuthenticationDataToLocalStorage = (): GenericReduxActionType<any> => ({
    type: WF_SAVE_AUTHENTICATION_DATA_TO_LOCAL_STORAGE
});

export const deauthenticateUser = (): GenericReduxActionType<any> => ({
    type: WF_DEAUTHENTICATE_USER
});

export const prepareAuthenticationData = (): GenericReduxActionType<any> => ({
    type: WF_PREPARE_AUTHENTICATION_DATA
});
