'use strict';

// external imports

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.authenticationSaga = undefined;

var _ramda = require('ramda');

var _effects = require('redux-saga/effects');

var _fetch_helpers = require('@webfuturistics/design_components/lib/helpers/web_api/fetch_helpers');

var _local_storage_helpers = require('@webfuturistics/design_components/lib/helpers/web_api/local_storage_helpers');

var _authentication_token_selector = require('./../selectors/authentication_token_selector');

var _authentication_is_authenticated_selector = require('./../selectors/authentication_is_authenticated_selector');

var _authentication_constants = require('./../constants/authentication_constants');

// sagas implementation
function* loadAuthenticationDataFromLocalStorage() {
    yield (0, _effects.put)({ type: _authentication_constants.WF_REQUEST_LOAD_AUTHENTICATION_DATA_FROM_LOCAL_STORAGE });

    try {
        var authenticationToken = (0, _local_storage_helpers.getLocalStorageKey)('authentication_token');

        if ((0, _ramda.is)(String, authenticationToken)) {
            yield (0, _effects.put)({ type: _authentication_constants.WF_SUCCESS_LOAD_AUTHENTICATION_DATA_FROM_LOCAL_STORAGE, payload: authenticationToken });
        } else {
            yield (0, _effects.put)({ type: _authentication_constants.WF_ERROR_LOAD_AUTHENTICATION_DATA_FROM_LOCAL_STORAGE, payload: new Error('Authentication token is empty') });
        }
    } catch (error) {
        yield (0, _effects.put)({ type: _authentication_constants.WF_ERROR_LOAD_AUTHENTICATION_DATA_FROM_LOCAL_STORAGE, payload: error });
    }
}

// local imports


function* checkAuthenticationUser() {
    yield (0, _effects.put)({ type: _authentication_constants.WF_REQUEST_CHECK_AUTHENTICATION_USER });
    var authenticationToken = yield (0, _effects.select)(_authentication_token_selector.authenticationTokenSelector);

    try {
        yield (0, _effects.call)(_fetch_helpers.sendGetRequestToHapiAPICors, 'auth/check', [{ 'Authorization': authenticationToken }], null);
    } catch (error) {
        yield (0, _effects.put)({ type: _authentication_constants.WF_ERROR_CHECK_AUTHENTICATION_USER, payload: error });
        return;
    }

    yield (0, _effects.put)({ type: _authentication_constants.WF_SUCCESS_CHECK_AUTHENTICATION_USER });
}

function* removeAuthenticationDataFromLocalStorage() {
    yield (0, _effects.put)({ type: _authentication_constants.WF_REQUEST_REMOVE_AUTHENTICATION_DATA_FROM_LOCAL_STORAGE });

    try {
        (0, _local_storage_helpers.removeLocalStorageKey)('authentication_token');
        yield (0, _effects.put)({ type: _authentication_constants.WF_SUCCESS_REMOVE_AUTHENTICATION_DATA_FROM_LOCAL_STORAGE });
    } catch (error) {
        yield (0, _effects.put)({ type: _authentication_constants.WF_ERROR_REMOVE_AUTHENTICATION_DATA_FROM_LOCAL_STORAGE, payload: error });
    }
}

function* saveAuthenticationDataToLocalStorage() {
    yield (0, _effects.put)({ type: _authentication_constants.WF_REQUEST_SAVE_AUTHENTICATION_DATA_TO_LOCAL_STORAGE });

    var authenticationToken = yield (0, _effects.select)(_authentication_token_selector.authenticationTokenSelector);

    try {
        (0, _local_storage_helpers.setLocalStorageKey)('authentication_token', authenticationToken);
        yield (0, _effects.put)({ type: _authentication_constants.WF_SUCCESS_SAVE_AUTHENTICATION_DATA_TO_LOCAL_STORAGE });
    } catch (error) {
        yield (0, _effects.put)({ type: _authentication_constants.WF_ERROR_SAVE_AUTHENTICATION_DATA_TO_LOCAL_STORAGE, payload: error });
    }
}

function* authenticateUser(action) {
    yield (0, _effects.put)({ type: _authentication_constants.WF_REQUEST_AUTHENTICATE_USER });

    var responseData = void 0;

    // prepare data
    if ((0, _ramda.isNil)(action.payload)) {
        yield (0, _effects.put)({ type: _authentication_constants.WF_ERROR_AUTHENTICATE_USER, payload: new Error('Password or login are not specified') });
        return;
    }

    var _action$payload = action.payload,
        login = _action$payload.login,
        password = _action$payload.password,
        options = _action$payload.options;


    try {
        responseData = yield (0, _effects.call)(_fetch_helpers.sendPostRequestToHapiAPICors, 'auth/login', [], Object.assign({
            email: login,
            password: password
        }, options));
    } catch (error) {
        yield (0, _effects.put)({ type: _authentication_constants.WF_ERROR_AUTHENTICATE_USER, payload: error });
        return;
    }

    yield (0, _effects.put)({ type: _authentication_constants.WF_SUCCESS_AUTHENTICATE_USER, payload: responseData.data });
    yield (0, _effects.put)({ type: _authentication_constants.WF_SAVE_AUTHENTICATION_DATA_TO_LOCAL_STORAGE });
}

function* deauthenticateUser() {
    var authenticationToken = yield (0, _effects.select)(_authentication_token_selector.authenticationTokenSelector);

    try {
        yield (0, _effects.call)(_fetch_helpers.sendGetRequestToHapiAPICors, 'auth/logout', [{ 'Authorization': authenticationToken }]);
    } catch (error) {
        yield (0, _effects.put)({ type: _authentication_constants.WF_ERROR_DEAUTHENTICATE_USER, payload: error });
    }

    yield (0, _effects.put)({ type: _authentication_constants.WF_REMOVE_AUTHENTICATION_DATA_FROM_LOCAL_STORAGE });
    yield (0, _effects.put)({ type: _authentication_constants.WF_SUCCESS_DEAUTHENTICATE_USER });
}

function* prepareAuthenticationData() {
    yield* loadAuthenticationDataFromLocalStorage();
    var authenticationToken = yield (0, _effects.select)(_authentication_token_selector.authenticationTokenSelector);

    if ((0, _ramda.isNil)(authenticationToken)) {
        yield (0, _effects.put)({ type: _authentication_constants.WF_SUCCESS_DEAUTHENTICATE_USER });
    } else {
        yield* checkAuthenticationUser();
        var isAuthenticated = yield (0, _effects.select)(_authentication_is_authenticated_selector.authenticationIsAuthenticatedSelector);

        if (!isAuthenticated) {
            yield (0, _effects.put)({ type: _authentication_constants.WF_DEAUTHENTICATE_USER });
        }
    }
}

function* authenticationSaga() {
    yield (0, _effects.takeEvery)(_authentication_constants.WF_LOAD_AUTHENTICATION_DATA_FROM_LOCAL_STORAGE, loadAuthenticationDataFromLocalStorage);
    yield (0, _effects.takeEvery)(_authentication_constants.WF_CHECK_AUTHENTICATION_USER, checkAuthenticationUser);
    yield (0, _effects.takeEvery)(_authentication_constants.WF_REMOVE_AUTHENTICATION_DATA_FROM_LOCAL_STORAGE, removeAuthenticationDataFromLocalStorage);
    yield (0, _effects.takeEvery)(_authentication_constants.WF_AUTHENTICATE_USER, authenticateUser);
    yield (0, _effects.takeEvery)(_authentication_constants.WF_SAVE_AUTHENTICATION_DATA_TO_LOCAL_STORAGE, saveAuthenticationDataToLocalStorage);
    yield (0, _effects.takeEvery)(_authentication_constants.WF_DEAUTHENTICATE_USER, deauthenticateUser);
    yield (0, _effects.takeEvery)(_authentication_constants.WF_PREPARE_AUTHENTICATION_DATA, prepareAuthenticationData);
}

// exports
exports.authenticationSaga = authenticationSaga;