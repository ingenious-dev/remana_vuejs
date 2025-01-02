import axios, {isCancel, AxiosError} from 'axios';

import { axios_error_message } from '../utilities/axios_helper';
import http_client from '../network/http_client';
import { AUTHENTICATION_CANNONICAL, GOOGLE_OAUTH_CANNONICAL } from '../network/network_info';

async function login(data) {
    try {
        const response = await axios.post(`${AUTHENTICATION_CANNONICAL}/auth/login`, data);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error(axios_error_message(error));
    }
}

async function renewLogin() {
    try {
        const response = await http_client().get(`${AUTHENTICATION_CANNONICAL}/auth/me`);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error(axios_error_message(error));
    }
}

async function register(data) {
    try {
        const response = await axios.post(`${AUTHENTICATION_CANNONICAL}/auth/signup`, data, {
            headers: {'content-type': 'application/x-www-form-urlencoded'}
        });
        console.log(response);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error(axios_error_message(error));
    }
}

// <<<<<<<<<<>>>>>>>>>>
// Specifically for XANO
async function continueWithGoogleInit({redirect_uri}) {
    var query = redirect_uri == null ? '' : `redirect_uri=${redirect_uri}`;
    query = `?${query}`;

    try {
        const response = await axios.get(`${GOOGLE_OAUTH_CANNONICAL}/oauth/google/init${query}`);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error(axios_error_message(error));
    }
}

async function continueWithGoogleDeprecated({code, redirect_uri}) {
    var query = code == null ? '' : `code=${code}`;
    query += redirect_uri == null ? '' : `&redirect_uri=${redirect_uri}`;
    query = `?${query}`;

    // + https://developers.google.com/identity/sign-in/web/server-side-flow#step_6_send_the_authorization_code_to_the_server
    try {
        const response = await axios.get(`${GOOGLE_OAUTH_CANNONICAL}/oauth/google/continue${query}`);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error(axios_error_message(error));
    }
}
// <<<<<<<<<<>>>>>>>>>>

async function continueWithGoogle(data) {
    try {
        const response = await axios.post(`${GOOGLE_OAUTH_CANNONICAL}/oauth/google/continue`, data);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error(axios_error_message(error));
    }
}

async function updateUser(data) {
    try {
        const response = await http_client().patch(`${AUTHENTICATION_CANNONICAL}/auth/me`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        console.log(response);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error(axios_error_message(error));
    }
}

export {
    login,
    renewLogin,
    register,

    continueWithGoogleInit,
    continueWithGoogleDeprecated,
    continueWithGoogle,

    updateUser,
};