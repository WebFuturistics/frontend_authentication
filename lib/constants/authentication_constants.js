'use strict';

// exports

Object.defineProperty(exports, "__esModule", {
  value: true
});


var WF_REQUEST_LOAD_AUTHENTICATION_DATA_FROM_LOCAL_STORAGE = exports.WF_REQUEST_LOAD_AUTHENTICATION_DATA_FROM_LOCAL_STORAGE = 'WF_REQUEST_LOAD_AUTHENTICATION_DATA_FROM_LOCAL_STORAGE';
var WF_LOAD_AUTHENTICATION_DATA_FROM_LOCAL_STORAGE = exports.WF_LOAD_AUTHENTICATION_DATA_FROM_LOCAL_STORAGE = 'WF_LOAD_AUTHENTICATION_DATA_FROM_LOCAL_STORAGE';
var WF_SUCCESS_LOAD_AUTHENTICATION_DATA_FROM_LOCAL_STORAGE = exports.WF_SUCCESS_LOAD_AUTHENTICATION_DATA_FROM_LOCAL_STORAGE = 'WF_SUCCESS_LOAD_AUTHENTICATION_DATA_FROM_LOCAL_STORAGE';
var WF_ERROR_LOAD_AUTHENTICATION_DATA_FROM_LOCAL_STORAGE = exports.WF_ERROR_LOAD_AUTHENTICATION_DATA_FROM_LOCAL_STORAGE = 'WF_ERROR_LOAD_AUTHENTICATION_DATA_FROM_LOCAL_STORAGE';

var WF_REQUEST_CHECK_AUTHENTICATION_USER = exports.WF_REQUEST_CHECK_AUTHENTICATION_USER = 'WF_REQUEST_CHECK_AUTHENTICATION_USER';
var WF_CHECK_AUTHENTICATION_USER = exports.WF_CHECK_AUTHENTICATION_USER = 'WF_CHECK_AUTHENTICATION_USER';
var WF_SUCCESS_CHECK_AUTHENTICATION_USER = exports.WF_SUCCESS_CHECK_AUTHENTICATION_USER = 'WF_SUCCESS_CHECK_AUTHENTICATION_USER';
var WF_ERROR_CHECK_AUTHENTICATION_USER = exports.WF_ERROR_CHECK_AUTHENTICATION_USER = 'WF_ERROR_CHECK_AUTHENTICATION_USER';

var WF_REQUEST_REMOVE_AUTHENTICATION_DATA_FROM_LOCAL_STORAGE = exports.WF_REQUEST_REMOVE_AUTHENTICATION_DATA_FROM_LOCAL_STORAGE = 'WF_REQUEST_REMOVE_AUTHENTICATION_DATA_FROM_LOCAL_STORAGE';
var WF_REMOVE_AUTHENTICATION_DATA_FROM_LOCAL_STORAGE = exports.WF_REMOVE_AUTHENTICATION_DATA_FROM_LOCAL_STORAGE = 'WF_REMOVE_AUTHENTICATION_DATA_FROM_LOCAL_STORAGE';
var WF_SUCCESS_REMOVE_AUTHENTICATION_DATA_FROM_LOCAL_STORAGE = exports.WF_SUCCESS_REMOVE_AUTHENTICATION_DATA_FROM_LOCAL_STORAGE = 'WF_SUCCESS_REMOVE_AUTHENTICATION_DATA_FROM_LOCAL_STORAGE';
var WF_ERROR_REMOVE_AUTHENTICATION_DATA_FROM_LOCAL_STORAGE = exports.WF_ERROR_REMOVE_AUTHENTICATION_DATA_FROM_LOCAL_STORAGE = 'WF_ERROR_REMOVE_AUTHENTICATION_DATA_FROM_LOCAL_STORAGE';

var WF_REQUEST_AUTHENTICATE_USER = exports.WF_REQUEST_AUTHENTICATE_USER = 'WF_REQUEST_AUTHENTICATE_USER';
var WF_AUTHENTICATE_USER = exports.WF_AUTHENTICATE_USER = 'WF_AUTHENTICATE_USER';
var WF_SUCCESS_AUTHENTICATE_USER = exports.WF_SUCCESS_AUTHENTICATE_USER = 'WF_SUCCESS_AUTHENTICATE_USER';
var WF_ERROR_AUTHENTICATE_USER = exports.WF_ERROR_AUTHENTICATE_USER = 'WF_ERROR_AUTHENTICATE_USER';

var WF_REQUEST_SAVE_AUTHENTICATION_DATA_TO_LOCAL_STORAGE = exports.WF_REQUEST_SAVE_AUTHENTICATION_DATA_TO_LOCAL_STORAGE = 'WF_REQUEST_SAVE_AUTHENTICATION_DATA_TO_LOCAL_STORAGE';
var WF_SAVE_AUTHENTICATION_DATA_TO_LOCAL_STORAGE = exports.WF_SAVE_AUTHENTICATION_DATA_TO_LOCAL_STORAGE = 'WF_SAVE_AUTHENTICATION_DATA_TO_LOCAL_STORAGE';
var WF_SUCCESS_SAVE_AUTHENTICATION_DATA_TO_LOCAL_STORAGE = exports.WF_SUCCESS_SAVE_AUTHENTICATION_DATA_TO_LOCAL_STORAGE = 'WF_SUCCESS_SAVE_AUTHENTICATION_DATA_TO_LOCAL_STORAGE';
var WF_ERROR_SAVE_AUTHENTICATION_DATA_TO_LOCAL_STORAGE = exports.WF_ERROR_SAVE_AUTHENTICATION_DATA_TO_LOCAL_STORAGE = 'WF_ERROR_SAVE_AUTHENTICATION_DATA_TO_LOCAL_STORAGE';

var WF_DEAUTHENTICATE_USER = exports.WF_DEAUTHENTICATE_USER = 'WF_DEAUTHENTICATE_USER';
var WF_SUCCESS_DEAUTHENTICATE_USER = exports.WF_SUCCESS_DEAUTHENTICATE_USER = 'WF_SUCCESS_DEAUTHENTICATE_USER';
var WF_ERROR_DEAUTHENTICATE_USER = exports.WF_ERROR_DEAUTHENTICATE_USER = 'WF_ERROR_DEAUTHENTICATE_USER';

var WF_PREPARE_AUTHENTICATION_DATA = exports.WF_PREPARE_AUTHENTICATION_DATA = 'WF_PREPARE_AUTHENTICATION_DATA';