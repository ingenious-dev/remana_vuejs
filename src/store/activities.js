import {
    fetchActivities,
    createActivity,
    getActivity,
    updateActivity,
    deleteActivity,
} from '../services/activities';

import store from '.';

const module = {
    state: () => ({
        count: 0,
        isLoading: false,
        next: null,
        previous: null,

        activities: [],
    }),
    mutations: {
        // increment (state) {
        //     // `state` is the local module state
        //     state.count++
        // },
        increment (state, payload) {
            state.count += payload.amount
        },
        setActivityIsLoading(state, payload) {
            state.isLoading = true;
        },
        clearActivityIsLoading(state, payload) {
            state.isLoading = false;
        },

        setPagination(state, payload) {
            state.count = payload.count;
            state.next = payload.next;
            state.previous = payload.previous;
        },
        addActivities(state, payload) {
            // state.activities = payload.activities

            const activities = payload.activities
            for (let index = 0; index < activities.length; index++) {
                const activity = activities[index];

                const ind = state.activities.findIndex((element) => element.id == activity.id)
                if(ind > -1) {
                    state.activities[ind] = activity
                } else {
                    state.activities.push(activity)
                }
                
            }
        },
        prependActivity(state, payload) {
            state.activities.unshift(payload);
        },
        updateActivity(state, payload) {
            const array = state.activities; // [2, 5, 9]

            // console.log(array);

            // const index = array.indexOf(5);
            const index = array.findIndex((element) => element.id === payload.id);
            state.activities[index] = payload;
        },
        removeActivity(state, payload) {
            const array = state.activities; // [2, 5, 9]

            // console.log(array);

            // const index = array.indexOf(5);
            const index = array.findIndex((element) => element.id === payload.id);
            if (index > -1) { // only splice array when item is found
                array.splice(index, 1); // 2nd parameter means remove one item only
            }

            // array = [2, 9]
            // console.log(array);

            state.activities = array;
        },
        clearActivities(state, payload) {
            state.activities = [];
        }
    },
    getters: {
        // doubleCount (state) {
        //     return state.count * 2
        // },
        activityIsLoading (state) {
            return state.isLoading
        },
        activityCount (state) {
            return state.count
        },
        activityNextPage (state) {
            return state.next
        },
        activityPreviousPage (state) {
            return state.previous
        },
        activities (state) {
            return state.activities
        },
    },
    actions: {
        setActivityIsLoading ({ commit, state }, payload) {
            commit('setActivityIsLoading')
        },
        clearActivityIsLoading ({ commit, state }, payload) {
            commit('clearActivityIsLoading')
        },
        fetchActivities ({ commit, state }, payload) {
            commit('setActivityIsLoading')
            // Make a request for a user with a given ID
            fetchActivities(payload)
                .then(function (data) {
                    // handle success
                    console.log(data);

                    commit('clearActivities')

                    commit('addActivities', {
                        // activities: data.results
                        activities: data
                    })

                    var next = null
                    if(data.next) {
                        next = new URLSearchParams(data.next).get('page')
                    }
                    var previous = null
                    if(data.previous) {
                        previous = new URLSearchParams(data.previous).get('page')
                    }
                    commit('setPagination', {
                        count: data.count,
                        next: next,
                        previous: previous,
                    })
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                    throw error;
                })
                .finally(function () {
                    // always executed
                    commit('clearActivityIsLoading')
                });
        },
        createActivity ({ commit, state }, payload) {   
            commit('setActivityIsLoading')         
            // Make a request for a user with a given ID
            createActivity(payload)
                .then(function (data) {
                    // handle success
                    console.log(data);
                    commit('prependActivity', data)
                    store.dispatch('showAlert', {title: 'Successfully created!', message: 'activity', status: 'success'})
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                    store.dispatch('showAlert', {title: 'Error!', message: 'activity', status: 'error'})
                    throw error;
                })
                .finally(function () {
                    // always executed
                    commit('clearActivityIsLoading')
                });
        },
        updateActivity ({ commit, state }, payload) {
            commit('setActivityIsLoading')
            // Make a request for a user with a given ID
            updateActivity(payload.id, payload.data)
                .then(function (data) {
                    // handle success
                    console.log(data);
                    commit('updateActivity', data)
                    store.dispatch('showAlert', {title: 'Successfully updated!', message: 'activity', status: 'success'})
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                    store.dispatch('showAlert', {title: 'Error!', message: 'activity', status: 'error'})
                    throw error;
                })
                .finally(function () {
                    // always executed
                    commit('clearActivityIsLoading')
                });
        },
        deleteActivity ({ commit, state }, payload) {            
            commit('setActivityIsLoading')
            // Make a request for a user with a given ID
            deleteActivity(payload.id)
                .then(function (data) {
                    // handle success
                    console.log(data);
                    commit('removeActivity', {id: payload.id})
                    store.dispatch('showAlert', {title: 'Successfully deleted!', message: 'activity', status: 'success'})
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                    store.dispatch('showAlert', {title: 'Error!', message: 'activity', status: 'error'})
                    throw error;
                })
                .finally(function () {
                    // always executed
                    commit('clearActivityIsLoading')
                });
        }
    }
}

export default module;