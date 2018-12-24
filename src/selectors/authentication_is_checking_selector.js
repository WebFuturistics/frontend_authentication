'use strict';

// @flow

// external imports
import {createSelector} from 'reselect';

// local imports
import type {AuthenticationIsCheckingSelectorType, AuthenticationRecordStateType} from './../types/general';

import {authenticationStateSelector} from './authentication_state_selector';

// selector implementation
const authenticationIsCheckingSelector: AuthenticationIsCheckingSelectorType = createSelector(
    [authenticationStateSelector],
    (authenticationState: AuthenticationRecordStateType) => authenticationState.get('isChecking')
);

// exports
export {authenticationIsCheckingSelector};