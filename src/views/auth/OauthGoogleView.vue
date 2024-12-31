<!-- + https://developers.googleblog.com/en/discontinuing-google-sign-in-javascript-platform-library-for-web/ -->

<!--
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
-->
<template>
  <!--
    This example requires updating your template:

    ```
    <html class="h-full bg-white">
    <body class="h-full">
    ```
  -->
  <div class="flex min-h-full md:h-screen">
    <div class="h-full overflow-auto flex-1 ">
      <div class="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div class="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <img class="h-12 w-auto" src="/static/remana/landscape-transparent.png" alt="Remana Logo" />
            <h2 class="mt-6 text-3xl font-bold tracking-tight text-gray-900">Continue with google</h2>
            <p class="mt-2 text-sm text-gray-600">
              <!-- Or -->
              <!-- {{ ' ' }}
              <RouterLink :to="{ name: 'register' }" class="font-medium text-indigo-600 hover:text-indigo-500">create an account</RouterLink> -->
            </p>
          </div>

          <div class="mt-8">

            <div class="mt-6" v-if="authIsLoading">
              <div class="space-y-6">

                <div class="flex items-center py-2" v-if="authIsLoading">
                  <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-grey" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span class="px-2 text-gray-500">Please wait...</span>
                </div>

              </div>
            </div>

            <div class="mt-6" v-else>
              <div class="space-y-6">

                <div class="relative flex justify-center text-sm text-center">
                  <span class="bg-white px-2 text-gray-500">
                    {{ authError }}
                  </span>
                </div>

                <div>
                    <RouterLink :to="{ name: 'login' }" replace
                      type="submit"
                      class="flex w-full justify-center rounded-md border border-indigo-300 bg-white py-2 px-4 text-sm font-medium text-indigo-600 shadow-sm hover:bg-indigo-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      href="/login">Go back to sign in page</RouterLink>
                  </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="relative hidden w-0 flex-1 lg:block">
      <img class="absolute inset-0 h-full w-full object-cover" src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80" alt="" />
    </div>
  </div>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'

export default {
  components: {
    RouterLink
  },
  // Properties returned from data() become reactive state
  // and will be exposed on `this`.
  data() {
    return {
      message: '',
    }
  },

  computed: {
    authIsLoading() {
      return this.$store.getters.authIsLoading;
    },
    authError() {
      return this.$store.getters.authError;
    },
    token() {
      // `this` points to the component instance
      // return this.$store.state.token;
      return this.$store.getters.token;
    },
  },

  watch: {
    // whenever question changes, this function will run
    token(newValue, oldValue) {
      console.log(newValue)
      // this.$router.push({ path: '/', replace: true })
      // this.$router.push({ name: 'home', replace: true })
      this.$router.push({ name: 'activities', replace: true })
    }
  },

  // Methods are functions that mutate state and trigger updates.
  // They can be bound as event handlers in templates.
  methods: {

    handleCredentialResponse() {
      this.$store.commit('setAuthIsLoading')        

      const resp = this.$route.query;

      if(!resp.code) {
        this.$store.commit('setAuthError', {
          error: "Problem loging in with google. Code is missing from URL"
        })
        this.$store.commit('clearAuthIsLoading')
        return;
      }

      // Authenticate with server
      this.authenticateWithServer(resp)
        // Change user's profile information
        .then(function (value) {
          if(value) {
            this.$store.commit('setToken', {
              token: value.token
            })
          }
        })
        .catch(function(error) {
          this.$store.dispatch('showAlert', {title: 'Error!', message: error, status: 'error'})
        }.bind(this));
    },

    async authenticateWithServer(resp) {
      // GET Request with id_token query parameter but using veux to handle business logic

      const data = {
        code: resp.code,
      }
      
      this.$store.dispatch('continueWithGoogle', data);
    },

    signIn() {
      // Get `GoogleAuth` instance
      var auth2 = gapi.auth2.getAuthInstance();

      // Sign-In
      auth2.signIn()
        .then(this.authenticateWithServer)
        // .then(changeProfile, function() {
        //   this.$store.dispatch('showAlert', {title: 'Error!', 'Authentication failed.': error, status: 'error'})
        // })
        .catch(function(error) {
          this.$store.dispatch('showAlert', {title: 'Error!', message: error, status: 'error'})
        });
    }
  },

  // Lifecycle hooks are called at different stages
  // of a component's lifecycle.
  // This function will be called when the component is mounted.
  mounted() {
    this.handleCredentialResponse();
  }
}
</script>
  