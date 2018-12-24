'use strict';

// @flow

// external imports
import type {OutputSelector} from 'reselect';

import {createSelector} from 'reselect';

// local imports
import type {AuthenticationTokenSelectorType, AuthenticationRecordStateType} from './../types/general';

import {authenticationStateSelector} from './authentication_state_selector';

// selector implementation
const authenticationTokenSelector: AuthenticationTokenSelectorType = createSelector(
    [authenticationStateSelector],
    (authenticationState: AuthenticationRecordStateType) => authenticationState.get('token')
);

// exports
export {authenticationTokenSelector};

