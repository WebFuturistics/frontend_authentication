'use strict';

// @flow

// external imports
import type {OutputSelector} from 'reselect';
import type {GenericImmutableStateType} from '@webfuturistics/design_components/lib/types/redux';

import {getValue} from '@webfuturistics/design_components/lib/registers/general_register';
import {createSelector} from 'reselect';

// local imports
import type {AuthenticationRecordStateType, GetAuthenticationStateSelectorType, AuthenticationStateSelectorType} from './../types/general';

// selector implementation

const getAuthenticationState: GetAuthenticationStateSelectorType = (state: GenericImmutableStateType) => {
    const reducerName: string = getValue('authenticationReducerName');
    return state.get(reducerName);
};

const authenticationStateSelector: AuthenticationStateSelectorType = createSelector(
    [getAuthenticationState],
    (authenticationState: AuthenticationRecordStateType): AuthenticationRecordStateType => authenticationState
);

// exports
export {authenticationStateSelector};
