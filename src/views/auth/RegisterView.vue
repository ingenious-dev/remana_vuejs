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
    <div class="h-full overflow-auto flex-1">
      <div class="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 h-full overflow-auto">
        <div class="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <img class="h-12 w-auto" src="/static/remana/landscape-transparent.png" alt="Remana Logo" />
            <h2 class="mt-6 text-3xl font-bold tracking-tight text-gray-900">Create your account</h2>
            <p class="mt-2 text-sm text-gray-600">
              Or
              {{ ' ' }}
              <RouterLink :to="{ name: 'login' }" class="font-medium text-indigo-600 hover:text-indigo-500">sign in</RouterLink>
            </p>
          </div>

          <div class="mt-8">
            <div v-if="BACKEND_TECHNOLOGY != 'XANO'">
              <div>
                <p class="text-sm font-medium text-gray-700">Sign up with</p>

                <!-- <div class="mt-1 grid grid-cols-3 gap-3">
                  <div>
                    <a href="#" class="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50">
                      <span class="sr-only">Sign in with Facebook</span>
                      <svg class="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" clip-rule="evenodd" />
                      </svg>
                    </a>
                  </div>

                  <div>
                    <a href="#" class="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50">
                      <span class="sr-only">Sign in with Twitter</span>
                      <svg class="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                  </div>

                  <div>
                    <a href="#" class="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50">
                      <span class="sr-only">Sign in with GitHub</span>
                      <svg class="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clip-rule="evenodd" />
                      </svg>
                    </a>
                  </div>
                </div> -->
                <div class="mt-1 grid grid-cols-2 gap-3">
                  <!-- <div>
                    <RouterLink :to="{name: 'register-with-phone'}" class="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50">
                      <span class="sr-only">Sign up with Phone</span>
                      <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                      </svg>

                    </RouterLink>
                  </div> -->

                  <!-- <div>
                    <RouterLink :to="{name: 'register'}" class="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50">
                      <span class="sr-only">Sign in with Ingenious</span>
                      <svg class="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </RouterLink>
                  </div> -->

                  <!-- OPTION 3 -->
                  <!-- See 'src\views\auth\LoginView.vue' for note on other options -->
                  <!-- + https://developers.google.com/identity/gsi/web/guides/use-one-tap-js-api -->
                  <!-- + https://developers.google.com/identity/gsi/web/guides/display-button -->
                  <div class="col-span-3">
                    <div id="google_btn"></div>
                  </div>

                </div>
              </div>

              <div class="relative mt-6">
                <div class="absolute inset-0 flex items-center" aria-hidden="true">
                  <div class="w-full border-t border-gray-300" />
                </div>
                <div class="relative flex justify-center text-sm">
                  <span class="bg-white px-2 text-gray-500">Or continue with</span>
                </div>
              </div>
            </div>

            <div class="mt-6">
              <form action="#" method="POST" class="space-y-6"  @submit.prevent="save()">
                <div>
                  <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
                  <div class="mt-1">
                    <input id="email" name="email" type="email" autocomplete="email" required="" class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      v-model="email" />
                  </div>
                </div>

                <div>
                  <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
                  <div class="mt-1">
                    <input id="name" name="name" type="text" autocomplete="name" required="" class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      v-model="name" />
                  </div>
                </div>

                <div class="space-y-1">
                  <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                  <div class="mt-1">
                    <input id="password" name="password" type="password" autocomplete="current-password" required="" class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      v-model="password"/>
                  </div>
                </div>

                <div class="space-y-1">
                  <label for="password2" class="block text-sm font-medium text-gray-700">Confirm password</label>
                  <div class="mt-1">
                    <input id="password2" name="password2" type="password" autocomplete="current-password2" required="" class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      v-model="password2"/>
                  </div>
                </div>

                <!-- <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                    <label for="remember-me" class="ml-2 block text-sm text-gray-900">Remember me</label>
                  </div>

                  <div class="text-sm">
                    <a href="" class="font-medium text-indigo-600 hover:text-indigo-500" @click.prevent="openForgotPassword">Forgot your password?</a>
                  </div>
                </div> -->

                <div>
                  <button type="submit" class="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  :disabled="authIsLoading">
                    <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                      v-if="authIsLoading">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sign up</button>
                </div>
              </form>
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
import {
  Dialog,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  TransitionChild,
  TransitionRoot,
  DialogTitle
} from '@headlessui/vue'
import { ChatBubbleBottomCenterTextIcon } from '@heroicons/vue/24/outline'

export default {
  components: {
    RouterLink,

    Dialog,
    DialogPanel,
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel,
    Tab,
    TabGroup,
    TabList,
    TabPanel,
    TabPanels,
    TransitionChild,
    TransitionRoot,
    DialogTitle,

    ChatBubbleBottomCenterTextIcon,
  },
  // Properties returned from data() become reactive state
  // and will be exposed on `this`.
  data() {
    return {
      email: '',
      name: '',
      password: '',
      password2: '',
      BACKEND_TECHNOLOGY: import.meta.env.VITE_BACKEND_TECHNOLOGY
    }
  },

  computed: {
    authIsLoading() {
      return this.$store.getters.authIsLoading;
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
      // console.log(newValue)
      
      // this.$router.push({ path: '/', replace: true })
      // this.$router.push({ name: 'login', replace: true })
      this.$router.push({ name: 'home', replace: true })
      this.$router.push({ name: 'activities', replace: true })

      this.$store.dispatch('showAlert', {title: 'Account created', message: 'You can now sign into your account', status: 'success'})
    }
  },

  // Methods are functions that mutate state and trigger updates.
  // They can be bound as event handlers in templates.
  methods: {

    async save() {
      if(this.password != this.password2) {
        this.$store.dispatch('showAlert', {title: 'Passwords must match', message: 'The passwords are different', status: 'error'})
        return;
      }

      const data = {
        email: this.email,
        name: this.name,
        password: this.password,
      }
      
      await this.$store.dispatch('register', data);
    },

    handleCredentialResponse(resp) {
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
        id_token: resp.credential,
      }
      
      this.$store.dispatch('continueWithGoogle', data);
    },

    initializeGoogle() {
      // + https://developers.google.com/identity/gsi/web/guides/use-one-tap-js-api
      // + https://developers.google.com/identity/gsi/web/guides/display-button
      google.accounts.id.initialize({
        client_id: '73323644785-9hmosrpadbm6cn5cjkb9dm750vi9do4v.apps.googleusercontent.com',
        callback: this.handleCredentialResponse
      });
      const parent = document.getElementById('google_btn');
      google.accounts.id.renderButton(parent, {
        type: "standard",
        shape: "rectangular",
        theme: "outline",
        text: "continue_with",
        size: "large",
        logo_alignment: "left",
      });
      // google.accounts.id.prompt();
    }
  },

  // Lifecycle hooks are called at different stages
  // of a component's lifecycle.
  // This function will be called when the component is mounted.
  mounted() {
    this.initializeGoogle()
  }
}
</script>

<!-- References -->
<!-- + https://tailwind-ui-two.vercel.app/components/application-ui/forms/sign-in-forms#component-fef1d7e9849359af76d4d6ead796938b -->