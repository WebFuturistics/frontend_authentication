'use strict';

// @flow

// external imports
import type {GenericReduxActionType} from '@webfuturistics/design_components/lib/types/redux';

import {is, isNil} from 'ramda';
import {takeEvery, call, put, select} from 'redux-saga/effects';

import {sendGetRequestToHapiAPICors, sendPostRequestToHapiAPICors} from '@webfuturistics/design_components/lib/helpers/web_api/fetch_helpers';
import {removeLocalStorageKey, getLocalStorageKey, setLocalStorageKey} from '@webfuturistics/design_components/lib/helpers/web_api/local_storage_helpers';

// local imports
import type {AuthenticateUserActionPayloadType} from './../types/general';

import {authenticationTokenSelector} from './../selectors/authentication_token_selector';
import {authenticationIsAuthenticatedSelector} from './../selectors/authentication_is_authenticated_selector';

import {
    WF_REQUEST_LOAD_AUTHENTICATION_DATA_FROM_LOCAL_STORAGE,
    WF_LOAD_AUTHENTICATION_DATA_FROM_LOCAL_STORAGE,
    WF_SUCCESS_LOAD_AUTHENTICATION_DATA_FROM_LOCAL_STORAGE,
    WF_ERROR_LOAD_AUTHENTICATION_DATA_FROM_LOCAL_STORAGE,

    WF_REQUEST_CHECK_AUTHENTICATION_USER,
    WF_CHECK_AUTHENTICATION_USER,
    WF_SUCCESS_CHECK_AUTHENTICATION_USER,
    WF_ERROR_CHECK_AUTHENTICATION_USER,

    WF_REQUEST_REMOVE_AUTHENTICATION_DATA_FROM_LOCAL_STORAGE,
    WF_REMOVE_AUTHENTICATION_DATA_FROM_LOCAL_STORAGE,
    WF_SUCCESS_REMOVE_AUTHENTICATION_DATA_FROM_LOCAL_STORAGE,
    WF_ERROR_REMOVE_AUTHENTICATION_DATA_FROM_LOCAL_STORAGE,

    WF_REQUEST_SAVE_AUTHENTICATION_DATA_TO_LOCAL_STORAGE,
    WF_SAVE_AUTHENTICATION_DATA_TO_LOCAL_STORAGE,
    WF_SUCCESS_SAVE_AUTHENTICATION_DATA_TO_LOCAL_STORAGE,
    WF_ERROR_SAVE_AUTHENTICATION_DATA_TO_LOCAL_STORAGE,

    WF_REQUEST_AUTHENTICATE_USER,
    WF_AUTHENTICATE_USER,
    WF_SUCCESS_AUTHENTICATE_USER,
    WF_ERROR_AUTHENTICATE_USER,

    WF_DEAUTHENTICATE_USER,
    WF_SUCCESS_DEAUTHENTICATE_USER,
    WF_ERROR_DEAUTHENTICATE_USER,

    WF_PREPARE_AUTHENTICATION_DATA
} from './../constants/authentication_constants';

// sagas implementation
function* loadAuthenticationDataFromLocalStorage(): Generator<any, any, any> {
    yield put({type: WF_REQUEST_LOAD_AUTHENTICATION_DATA_FROM_LOCAL_STORAGE});

    try {
        const authenticationToken: any = getLocalStorageKey('authentication_token');

        if (is(String, authenticationToken)) {
            yield put({type: WF_SUCCESS_LOAD_AUTHENTICATION_DATA_FROM_LOCAL_STORAGE, payload: authenticationToken});
        } else {
            yield put({type: WF_ERROR_LOAD_AUTHENTICATION_DATA_FROM_LOCAL_STORAGE, payload: new Error('Authentication token is empty')})
        }
    } catch(error) {
        yield put({type: WF_ERROR_LOAD_AUTHENTICATION_DATA_FROM_LOCAL_STORAGE, payload: error});
    }
}

function* checkAuthenticationUser(): Generator<any, any, any> {
    yield put({type: WF_REQUEST_CHECK_AUTHENTICATION_USER});
    const authenticationToken: string = yield select(authenticationTokenSelector);

    try {
        yield call(sendGetRequestToHapiAPICors, 'auth/check', [{'Authorization': authenticationToken}], null);
    } catch(error) {
        yield put({type: WF_ERROR_CHECK_AUTHENTICATION_USER, payload: error});
        return;
    }

    yield put({type: WF_SUCCESS_CHECK_AUTHENTICATION_USER});
}

function* removeAuthenticationDataFromLocalStorage(): Generator<any, any, any> {
    yield put({type: WF_REQUEST_REMOVE_AUTHENTICATION_DATA_FROM_LOCAL_STORAGE});

    try {
        removeLocalStorageKey('authentication_token');
        yield put({type: WF_SUCCESS_REMOVE_AUTHENTICATION_DATA_FROM_LOCAL_STORAGE});
    } catch(error) {
        yield put({type: WF_ERROR_REMOVE_AUTHENTICATION_DATA_FROM_LOCAL_STORAGE, payload: error});
    }
}

function* saveAuthenticationDataToLocalStorage(): Generator<any, any, any> {
    yield put({type: WF_REQUEST_SAVE_AUTHENTICATION_DATA_TO_LOCAL_STORAGE});

    const authenticationToken: string = yield select(authenticationTokenSelector);

    try {
        setLocalStorageKey('authentication_token', authenticationToken);
        yield put({type: WF_SUCCESS_SAVE_AUTHENTICATION_DATA_TO_LOCAL_STORAGE});
    } catch(error) {
        yield put({type: WF_ERROR_SAVE_AUTHENTICATION_DATA_TO_LOCAL_STORAGE, payload: error});
    }
}

function* authenticateUser(action: GenericReduxActionType<AuthenticateUserActionPayloadType>): Generator<any, any, any> {
    yield put({type: WF_REQUEST_AUTHENTICATE_USER});

    let responseData;

    // prepare data
    if (isNil(action.payload)) {
        yield put({type: WF_ERROR_AUTHENTICATE_USER, payload: new Error('Password or login are not specified')});
        return;
    }

    const {login, password, ...options} = action.payload;

    try {
        responseData = yield call(sendPostRequestToHapiAPICors, 'auth/login', [], {
            email: login,
            password,
            ...options
        });
    } catch(error) {
        yield put({type: WF_ERROR_AUTHENTICATE_USER, payload: error});
        return;
    }

    yield put({type: WF_SUCCESS_AUTHENTICATE_USER, payload: responseData.data});
    yield put({type: WF_SAVE_AUTHENTICATION_DATA_TO_LOCAL_STORAGE});
}

function* deauthenticateUser(): Generator<any, any, any> {
    const authenticationToken: string = yield select(authenticationTokenSelector);

    try {
        yield call(sendGetRequestToHapiAPICors, 'auth/logout', [{'Authorization': authenticationToken}]);
    } catch(error) {
        yield put({type: WF_ERROR_DEAUTHENTICATE_USER, payload: error});
    }

    yield put({type: WF_REMOVE_AUTHENTICATION_DATA_FROM_LOCAL_STORAGE});
    yield put({type: WF_SUCCESS_DEAUTHENTICATE_USER});
}

function* prepareAuthenticationData(): Generator<any, any, any> {
    yield* loadAuthenticationDataFromLocalStorage();
    const authenticationToken: string = yield select(authenticationTokenSelector);

    if (isNil(authenticationToken)) {
        yield put({type: WF_SUCCESS_DEAUTHENTICATE_USER});
    } else {
        yield* checkAuthenticationUser();
        const isAuthenticated: boolean = yield select(authenticationIsAuthenticatedSelector);

        if (!isAuthenticated) {
            yield put({type: WF_DEAUTHENTICATE_USER});
        }
    }
}

function* authenticationSaga(): Generator<any, any, any> {
    yield takeEvery(WF_LOAD_AUTHENTICATION_DATA_FROM_LOCAL_STORAGE, loadAuthenticationDataFromLocalStorage);
    yield takeEvery(WF_CHECK_AUTHENTICATION_USER, checkAuthenticationUser);
    yield takeEvery(WF_REMOVE_AUTHENTICATION_DATA_FROM_LOCAL_STORAGE, removeAuthenticationDataFromLocalStorage);
    yield takeEvery(WF_AUTHENTICATE_USER, authenticateUser);
    yield takeEvery(WF_SAVE_AUTHENTICATION_DATA_TO_LOCAL_STORAGE, saveAuthenticationDataToLocalStorage);
    yield takeEvery(WF_DEAUTHENTICATE_USER, deauthenticateUser);
    yield takeEvery(WF_PREPARE_AUTHENTICATION_DATA, prepareAuthenticationData);
}

// exports
export {authenticationSaga};