// import { createApp } from 'vue'
import { createStore } from 'vuex'

// Create a new store instance.
// const store = createStore({
//   state () {
//     return {
//       count: 0
//     }
//   },
//   mutations: {
//     increment (state) {
//       state.count++
//     }
//   }
// })

// const app = createApp({ /* your root component */ })

// Install the store instance as a plugin
// app.use(store)

import auth from './auth';
import activities from './activities';
import persons from './persons';

import alert from './alert';

const store = createStore({
    modules: {
        // a: moduleA,
        // b: moduleB,
        auth: auth,
        activities: activities,
        persons: persons,

        alert: alert,
    }
})

export default store