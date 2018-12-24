'use strict';

// @flow

// external imports
import {createSelector} from 'reselect';

// local imports
import type {AuthenticationIsBeingAuthenticatedSelectorType, AuthenticationRecordStateType} from './../types/general';

import {authenticationStateSelector} from './authentication_state_selector';

// selector implementation
const authenticationIsBeingAuthenticatedSelector: AuthenticationIsBeingAuthenticatedSelectorType = createSelector(
    [authenticationStateSelector],
    (authenticationState: AuthenticationRecordStateType) => authenticationState.get('isBeingAuthenticated')
);

// exports
export {authenticationIsBeingAuthenticatedSelector};