import {
    fetchPersons,
    createPerson,
    getPerson,
    updatePerson,
    deletePerson,
} from '../services/persons';

import store from '.';

const module = {
    state: () => ({
        count: 0,
        isLoading: false,
        next: null,
        previous: null,

        persons: [],
    }),
    mutations: {
        // increment (state) {
        //     // `state` is the local module state
        //     state.count++
        // },
        increment (state, payload) {
            state.count += payload.amount
        },
        setPersonIsLoading(state, payload) {
            state.isLoading = true;
        },
        clearPersonIsLoading(state, payload) {
            state.isLoading = false;
        },

        setPagination(state, payload) {
            state.count = payload.count;
            state.next = payload.next;
            state.previous = payload.previous;
        },
        addPersons(state, payload) {
            // state.persons = payload.persons

            const persons = payload.persons
            for (let index = 0; index < persons.length; index++) {
                const person = persons[index];

                const ind = state.persons.findIndex((element) => element.id == person.id)
                if(ind > -1) {
                    state.persons[ind] = person
                } else {
                    state.persons.push(person)
                }
                
            }
        },
        prependPerson(state, payload) {
            state.persons.unshift(payload);
        },
        updatePerson(state, payload) {
            const array = state.persons; // [2, 5, 9]

            // console.log(array);

            // const index = array.indexOf(5);
            const index = array.findIndex((element) => element.id === payload.id);
            state.persons[index] = payload;
        },
        removePerson(state, payload) {
            const array = state.persons; // [2, 5, 9]

            // console.log(array);

            // const index = array.indexOf(5);
            const index = array.findIndex((element) => element.id === payload.id);
            if (index > -1) { // only splice array when item is found
                array.splice(index, 1); // 2nd parameter means remove one item only
            }

            // array = [2, 9]
            // console.log(array);

            state.persons = array;
        },
        clearPersons(state, payload) {
            state.persons = [];
        }
    },
    getters: {
        // doubleCount (state) {
        //     return state.count * 2
        // },
        personIsLoading (state) {
            return state.isLoading
        },
        personCount (state) {
            return state.count
        },
        personNextPage (state) {
            return state.next
        },
        personPreviousPage (state) {
            return state.previous
        },
        persons (state) {
            return state.persons
        },
    },
    actions: {
        setPersonIsLoading ({ commit, state }, payload) {
            commit('setPersonIsLoading')
        },
        clearPersonIsLoading ({ commit, state }, payload) {
            commit('clearPersonIsLoading')
        },
        fetchPersons ({ commit, state }, payload) {
            commit('setPersonIsLoading')
            // Make a request for a user with a given ID
            fetchPersons(payload)
                .then(function (data) {
                    // handle success
                    // console.log(data);

                    commit('clearPersons')
                    commit('addPersons', {
                        // persons: data.results
                        persons: data
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
                    commit('clearPersonIsLoading')
                });
        },
        createPerson ({ commit, state }, payload) {   
            commit('setPersonIsLoading')         
            // Make a request for a user with a given ID
            createPerson(payload)
                .then(function (data) {
                    // handle success
                    // console.log(data);

                    commit('prependPerson', data)
                    store.dispatch('showAlert', {title: 'Successfully created!', message: 'person', status: 'success'})
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                    store.dispatch('showAlert', {title: 'Error!', message: 'person', status: 'error'})
                    throw error;
                })
                .finally(function () {
                    // always executed
                    commit('clearPersonIsLoading')
                });
        },
        updatePerson ({ commit, state }, payload) {
            commit('setPersonIsLoading')
            // Make a request for a user with a given ID
            updatePerson(payload.id, payload.data)
                .then(function (data) {
                    // handle success
                    // console.log(data);

                    commit('updatePerson', data)
                    store.dispatch('showAlert', {title: 'Successfully updated!', message: 'person', status: 'success'})
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                    store.dispatch('showAlert', {title: 'Error!', message: 'person', status: 'error'})
                    throw error;
                })
                .finally(function () {
                    // always executed
                    commit('clearPersonIsLoading')
                });
        },
        deletePerson ({ commit, state }, payload) {            
            commit('setPersonIsLoading')
            // Make a request for a user with a given ID
            deletePerson(payload.id)
                .then(function (data) {
                    // handle success
                    // console.log(data);
                    
                    commit('removePerson', {id: payload.id})
                    store.dispatch('showAlert', {title: 'Successfully deleted!', message: 'person', status: 'success'})
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                    store.dispatch('showAlert', {title: 'Error!', message: 'person', status: 'error'})
                    throw error;
                })
                .finally(function () {
                    // always executed
                    commit('clearPersonIsLoading')
                });
        }
    }
}

export default module;