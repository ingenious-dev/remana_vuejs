import {
    login,
    renewLogin,
    register,

    continueWithGoogleDeprecated,
    continueWithGoogle,

    updateUser,
} from '../services/auth';

import store from '.';
import router from '../router'

const LOGIN_TIMEOUT_SECONDS = parseInt(import.meta.env.VITE_LOGIN_TIMEOUT_SECONDS ?? "3600");

const module = {
    state: () => ({
        count: 0,
        isLoading: false,
        error: "",
        token: localStorage.getItem('token'),
        user: null,
        loginTimer: null,
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
                localStorage.setItem("lastLoginDate", Date.now().toString());
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
        setLoginTimer(state, payload) {
            state.loginTimer = payload.loginTimer
        },
        clearLoginTimer(state) {
            if(state.loginTimer) {
                clearInterval(state.loginTimer)
            }
            state.loginTimer = null
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

        login ({ dispatch, commit, state }, payload) {
            commit('setAuthIsLoading')         
            // Make a request for a user with a given ID
            login(payload)
                .then(function (data) {
                    // handle success
                    // console.log(data);

                    commit('setToken', {
                        token: data.authToken
                    })
                    dispatch('startLoginTimer');
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
        renewLogin ({ dispatch, commit, state }, payload) {
            dispatch('startLoginTimer');

            commit('setAuthIsLoading')
            // Make a request for a user with a given ID
            renewLogin(payload)
                .then(function (data) {
                    // handle success
                    // console.log(data);

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
        register ({ dispatch, commit, state }, payload) {
            commit('setAuthIsLoading')         
            // Make a request for a user with a given ID
            register(payload)
                .then(function (data) {
                    // handle success
                    // console.log(data);

                    commit('setToken', {
                        token: data.authToken
                    })
                    dispatch('startLoginTimer');
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

        continueWithGoogleDeprecated ({ dispatch, commit, state }, payload) {   
            commit('setAuthIsLoading')         
            commit('clearAuthError')
            // Make a request for a user with a given ID
            continueWithGoogleDeprecated(payload)
                .then(function (data) {
                    // handle success
                    // console.log(data);

                    commit('setToken', {
                        token: data.token
                    })
                    dispatch('startLoginTimer');
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

        continueWithGoogle ({ dispatch, commit, state }, payload) {
            commit('setAuthIsLoading')         
            commit('clearAuthError')
            // Make a request for a user with a given ID
            continueWithGoogle(payload)
                .then(function (data) {
                    // handle success
                    // console.log(data);

                    commit('setToken', {
                        token: data.token
                    })
                    dispatch('startLoginTimer');
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
                    // console.log(data);

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

        startLoginTimer ({ dispatch, commit, state }, payload) {   
            commit('clearLoginTimer')
            
            const interval = setInterval(() => {
                // console.log('Tiktok')
                
                const lastLoginDateStr = localStorage.getItem("lastLoginDate")
                if(lastLoginDateStr) {
                    const now = Date.now();
                    // + https://stackoverflow.com/questions/4631928/convert-utc-epoch-to-local-date/22237139#22237139
                    const lastLoginDate = new Date(parseInt(lastLoginDateStr))
                    if(now - lastLoginDate > LOGIN_TIMEOUT_SECONDS * 1000) {
                        store.dispatch('showAlert', {title: 'Session has ended', message: 'Login session has ended, kindly login again', status: 'error'})

                        dispatch('logout');
                        router.push({ name: 'home'})

                        commit('clearLoginTimer')
                    }
                }
            }, 1000);

            commit('setLoginTimer', {
                loginTimer: interval,
            })
        }
    }
}

export default module;