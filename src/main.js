import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'
import moment from 'moment';

// + https://maz-ui.com/guide/getting-started#vue-js
import 'maz-ui/styles' // or import 'maz-ui/css/main.css'
import './style.css'

// createApp(App).mount('#app')

const app = createApp(App)

app.use(router)

app.use(store)

// + https://stackoverflow.com/questions/34308004/moment-js-with-vuejs/68252543#68252543
app.config.globalProperties.$moment = moment

app.mount('#app')

