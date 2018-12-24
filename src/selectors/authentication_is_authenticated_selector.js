'use strict';

// @flow

// external imports
import {createSelector} from 'reselect';

// local imports
import type {AuthenticationIsAuthenticatedSelectorType, AuthenticationRecordStateType} from './../types/general';

import {authenticationStateSelector} from './authentication_state_selector';

// selector implementation
const authenticationIsAuthenticatedSelector: AuthenticationIsAuthenticatedSelectorType = createSelector(
    [authenticationStateSelector],
    (authenticationState: AuthenticationRecordStateType) => authenticationState.get('isAuthenticated')
);

// exports
export {authenticationIsAuthenticatedSelector};