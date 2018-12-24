'use strict';

// @flow

// external imports
import {any} from 'ramda';
import {createSelector} from 'reselect';

// local imports
import type {AuthenticationIsBusySelectorType} from './../types/general';

import {authenticationIsCheckingSelector} from './authentication_is_checking_selector';
import {authenticationIsBeingAuthenticatedSelector} from './authentication_is_being_authenticated_selector';
import {authenticationIsSyncingWithLocalStorageSelector} from './authentication_is_syncing_with_local_storage_selector';
import {authenticationIsAuthenticatedSelector} from './authentication_is_authenticated_selector';

// selector implementation
const authenticationIsBusySelector: AuthenticationIsBusySelectorType = createSelector(
    [
        authenticationIsCheckingSelector,
        authenticationIsBeingAuthenticatedSelector,
        authenticationIsSyncingWithLocalStorageSelector,
        authenticationIsAuthenticatedSelector
    ],
    (
        authenticationIsChecking: boolean,
        authenticationIsBeingAuthenticated: boolean,
        authenticationIsSyncingWithLocalStorage: boolean,
        authenticationIsAuthenticated: boolean,
    ) => any((flag: boolean) => flag === true, [
        authenticationIsChecking,
        authenticationIsBeingAuthenticated,
        authenticationIsSyncingWithLocalStorage,
        authenticationIsAuthenticated
    ])
);

// exports
export {authenticationIsBusySelector};