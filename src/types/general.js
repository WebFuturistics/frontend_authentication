'use strict';

// @flow

// external imports
import type {Record} from 'immutable';
import type {OutputSelector} from 'reselect';

import type {GenericImmutableStateType, GenericReduxActionType} from '@webfuturistics/design_components/lib/types/redux';

// local imports

// types definition
export type AuthenticationStateType = {
    isChecking: boolean,
    isBeingAuthenticated: boolean,
    isSyncingWithLocalStorage: boolean,

    isAuthenticated: boolean | null,
    token: string | null
};

export type AuthenticationRecordStateType = Record<AuthenticationStateType>;
export type AuthenticationInitialRecordStateType = (state?: {[string]: mixed}) => AuthenticationRecordStateType;

export type AuthenticateUserActionPayloadType = {login: string, password: string, options: {[string]: any}};
export type SuccessAuthenticateUserActionPayloadType = {data: {authenticationToken: string}};

export type ActionPayloadType = string |
    GenericReduxActionType<SuccessAuthenticateUserActionPayloadType> |
    GenericReduxActionType<AuthenticateUserActionPayloadType>;

export type GeneralActionType = {type: string, payload?: ActionPayloadType}

export type GetAuthenticationStateSelectorType = (state: GenericImmutableStateType) => AuthenticationRecordStateType;

export type AuthenticationStateSelectorType = OutputSelector<GenericImmutableStateType, GetAuthenticationStateSelectorType, AuthenticationRecordStateType>;
export type AuthenticationTokenSelectorType = OutputSelector<GenericImmutableStateType, GetAuthenticationStateSelectorType, string>;
export type AuthenticationIsSyncingWithLocalStorageSelectorType = OutputSelector<GenericImmutableStateType, GetAuthenticationStateSelectorType, boolean>;
export type AuthenticationIsCheckingSelectorType = OutputSelector<GenericImmutableStateType, GetAuthenticationStateSelectorType, boolean>;
export type AuthenticationIsBeingAuthenticatedSelectorType = OutputSelector<GenericImmutableStateType, GetAuthenticationStateSelectorType, boolean>;
export type AuthenticationIsAuthenticatedSelectorType = OutputSelector<GenericImmutableStateType, GetAuthenticationStateSelectorType, boolean>;
export type AuthenticationIsBusySelectorType = OutputSelector<GenericImmutableStateType, GetAuthenticationStateSelectorType, boolean>;