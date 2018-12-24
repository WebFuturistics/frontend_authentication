'use strict';

// @flow

// external imports
import {createSelector} from 'reselect';

// local imports
import type {AuthenticationIsSyncingWithLocalStorageSelectorType, AuthenticationRecordStateType} from './../types/general';

import {authenticationStateSelector} from './authentication_state_selector';

// selector implementation
const authenticationIsSyncingWithLocalStorageSelector: AuthenticationIsSyncingWithLocalStorageSelectorType = createSelector(
    [authenticationStateSelector],
    (authenticationState: AuthenticationRecordStateType) => authenticationState.get('isSyncingWithLocalStorage')
);

// exports
export {authenticationIsSyncingWithLocalStorageSelector};