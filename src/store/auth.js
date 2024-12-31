import {
    login,
    renewLogin,
    register,

    continueWithGoogle,

    updateUser,
} from '../services/auth';

import store from '.';

const module = {
    state: () => ({
        count: 0,
        isLoading: false,
        error: "",
        token: localStorage.getItem('token'),
        user: null
    }),
    mutations: {
        // increment (state) {
        //     // `state` is the local module state
        //     state.count++
        // },
        increment (state, payload) {
            state.count += payload.amount
        },
        setAuthIsLoading(state, payload) {
            state.isLoading = true;
        },
        clearAuthIsLoading(state, payload) {
            state.isLoading = false;
        },
        setAuthError(state, payload) {
            state.error = payload.error;
        },
        clearAuthError(state, payload) {
            state.error = false;
        },
        setToken(state, payload) {
            if(payload.token) {
                localStorage.setItem("token", payload.token);
            }
            state.token = payload.token
        },
        setUser(state, payload) {
            state.user = payload.user
        },
        clearToken(state) {
            localStorage.removeItem("token");
            state.token = null
        },
        clearUser(state) {
            state.user = null
        },
    },
    getters: {
        // doubleCount (state) {
        //     return state.count * 2
        // },
        authIsLoading (state) {
            return state.isLoading
        },
        authError (state) {
            return state.error
        },
        token (state) {
            return state.token
        },
        user (state) {
            return state.user
        },
    },
    actions: {
        setAuthIsLoading ({ commit, state }, payload) {
            commit('setAuthIsLoading')
        },
        clearAuthIsLoading ({ commit, state }, payload) {
            commit('clearAuthIsLoading')
        },

        login ({ commit, state }, payload) {   
            commit('setAuthIsLoading')         
            // Make a request for a user with a given ID
            login(payload)
                .then(function (data) {
                    // handle success
                    console.log(data);
                    commit('setToken', {
                        token: data.authToken
                    })
                    // ! TO BE DONE - get user details now?
                    // commit('setUser', {
                    //     user: data.user
                    // })
                    store.dispatch('showAlert', {title: 'Login successful', message: 'You have loggged into the account', status: 'success'})
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                    store.dispatch('showAlert', {title: 'Error!', message: error.message, status: 'error'})
                    throw error;
                })
                .finally(function () {
                    // always executed
                    commit('clearAuthIsLoading')
                });
        },
        renewLogin ({ commit, state }, payload) {
            commit('setAuthIsLoading')
            // Make a request for a user with a given ID
            renewLogin(payload)
                .then(function (data) {
                    // handle success
                    console.log(data);

                    commit('setUser', {
                        user: data
                    })
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                    store.dispatch('showAlert', {title: 'Error!', message: error.message, status: 'error'})
                    throw error;
                })
                .finally(function () {
                    // always executed
                    commit('clearAuthIsLoading')
                });
        },
        register ({ commit, state }, payload) {   
            commit('setAuthIsLoading')         
            // Make a request for a user with a given ID
            register(payload)
                .then(function (data) {
                    // handle success
                    // console.log(data);
                    commit('setToken', {
                        token: data.authToken
                    })
                    // ! TO BE DONE - get user details now?
                    // commit('setUser', {
                    //     user: data.user
                    // })
                    store.dispatch('showAlert', {title: 'Successfully created!', message: 'login', status: 'success'})

                    updateUser({
                        "action": "welcome",
                    })
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                    store.dispatch('showAlert', {title: 'Error!', message: error.message, status: 'error'})
                    throw error;
                })
                .finally(function () {
                    // always executed
                    commit('clearAuthIsLoading')
                });
        },
        logout ({ commit, state }, payload) {            
            commit('clearToken')
        },

        continueWithGoogle ({ commit, state }, payload) {   
            commit('setAuthIsLoading')         
            commit('clearAuthError')
            // Make a request for a user with a given ID
            continueWithGoogle(payload)
                .then(function (data) {
                    // handle success
                    console.log(data);
                    commit('setToken', {
                        token: data.token
                    })
                    // ! TO BE DONE - get user details now?
                    // commit('setUser', {
                    //     user: data.user
                    // })
                    store.dispatch('showAlert', {title: 'Login successful', message: 'You have loggged into the account', status: 'success'})
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                    store.dispatch('showAlert', {title: 'Error!', message: error.message, status: 'error'})
                    commit('setAuthError', {error: error.message})
                    throw error;
                })
                .finally(function () {
                    // always executed
                    commit('clearAuthIsLoading')
                });
        },
        
        updateUser ({ commit, state }, payload) {   
            commit('setAuthIsLoading')         
            // Make a request for a user with a given ID
            updateUser(payload)
                .then(function (data) {
                    // handle success
                    console.log(data);
                    commit('setUser', {
                        user: data
                    })
                    store.dispatch('showAlert', {title: 'Profile updated', message: 'You have updated your profile', status: 'success'})
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                    store.dispatch('showAlert', {title: 'Error!', message: error.message, status: 'error'})
                    throw error;
                })
                .finally(function () {
                    // always executed
                    commit('clearAuthIsLoading')
                });
        },
    }
}

export default module;