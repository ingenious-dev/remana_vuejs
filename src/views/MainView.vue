<!--
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
-->
<template>
  <div class="bg-white">
    <!-- Mobile menu -->
    <TransitionRoot as="template" :show="mobileMenuOpen">
      <Dialog as="div" class="relative z-40 lg:hidden" @close="mobileMenuOpen = false">
        <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div class="fixed inset-0 z-40 flex">
          <TransitionChild as="template" enter="transition ease-in-out duration-300 transform" enter-from="-translate-x-full" enter-to="translate-x-0" leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0" leave-to="-translate-x-full">
            <DialogPanel class="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
              <div class="flex px-4 pt-5 pb-2">
                <button type="button" class="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400" @click="mobileMenuOpen = false">
                  <span class="sr-only">Close menu</span>
                  <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              <!-- Links -->
              <TabGroup as="div" class="mt-2">
                <div class="border-b border-gray-200">
                  <TabList class="-mb-px flex space-x-8 px-4">
                    <Tab as="template" v-for="category in navigation.categories" :key="category.name" v-slot="{ selected }">
                      <button :class="[selected ? 'text-indigo-600 border-indigo-600' : 'text-gray-900 border-transparent', 'flex-1 whitespace-nowrap border-b-2 py-4 px-1 text-base font-medium']">{{ category.name }}</button>
                    </Tab>
                  </TabList>
                </div>
                <TabPanels as="template">
                  <TabPanel v-for="(category, categoryIdx) in navigation.categories" :key="category.name" class="space-y-12 px-4 pt-10 pb-6">
                    <div class="grid grid-cols-1 items-start gap-y-10 gap-x-6">
                      <div class="grid grid-cols-1 gap-y-10 gap-x-6">
                        <div>
                          <p :id="`mobile-featured-heading-${categoryIdx}`" class="font-medium text-gray-900">Featured</p>
                          <ul role="list" :aria-labelledby="`mobile-featured-heading-${categoryIdx}`" class="mt-6 space-y-6">
                            <li v-for="item in category.featured" :key="item.name" class="flex">
                              <a :href="item.href" class="text-gray-500">{{ item.name }}</a>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <p id="mobile-categories-heading" class="font-medium text-gray-900">Categories</p>
                          <ul role="list" aria-labelledby="mobile-categories-heading" class="mt-6 space-y-6">
                            <li v-for="item in category.categories" :key="item.name" class="flex">
                              <a :href="item.href" class="text-gray-500">{{ item.name }}</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div class="grid grid-cols-1 gap-y-10 gap-x-6">
                        <div>
                          <p id="mobile-collection-heading" class="font-medium text-gray-900">Collection</p>
                          <ul role="list" aria-labelledby="mobile-collection-heading" class="mt-6 space-y-6">
                            <li v-for="item in category.collection" :key="item.name" class="flex">
                              <a :href="item.href" class="text-gray-500">{{ item.name }}</a>
                            </li>
                          </ul>
                        </div>

                        <div>
                          <p id="mobile-brand-heading" class="font-medium text-gray-900">Brands</p>
                          <ul role="list" aria-labelledby="mobile-brand-heading" class="mt-6 space-y-6">
                            <li v-for="item in category.brands" :key="item.name" class="flex">
                              <a :href="item.href" class="text-gray-500">{{ item.name }}</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </TabPanel>
                </TabPanels>
              </TabGroup>

              <div class="space-y-6 border-t border-gray-200 py-6 px-4">
                <div v-for="page in navigation.pages" :key="page.name" class="flow-root">
                  <RouterLink :to="page.href" class="-m-2 block p-2 font-medium text-gray-900">{{ page.name }}</RouterLink>
                </div>
              </div>

              <div class="space-y-6 border-t border-gray-200 py-6 px-4" v-if="token">
                <div class="flow-root">
                  <a href="#" @click.prevent="logout" class="-m-2 block p-2 font-medium text-gray-900">Sign out</a>
                </div>
              </div>
              <div class="space-y-6 border-t border-gray-200 py-6 px-4" v-else>
                <div class="flow-root">
                  <RouterLink :to="{name: 'register'}" class="-m-2 block p-2 font-medium text-gray-900">Create an account</RouterLink>
                </div>
                <div class="flow-root">
                  <RouterLink :to="{name: 'login'}" class="-m-2 block p-2 font-medium text-gray-900">Sign in</RouterLink>
                </div>
              </div>

              <div class="space-y-6 border-t border-gray-200 py-6 px-4">
                <!-- Currency selector -->
                <!-- <form>
                  <div class="inline-block">
                    <label for="mobile-currency" class="sr-only">Currency</label>
                    <div class="group relative -ml-2 rounded-md border-transparent focus-within:ring-2 focus-within:ring-white">
                      <select id="mobile-currency" name="currency" class="flex items-center rounded-md border-transparent bg-none py-0.5 pl-2 pr-5 text-sm font-medium text-gray-700 focus:border-transparent focus:outline-none focus:ring-0 group-hover:text-gray-800">
                        <option v-for="currency in currencies" :key="currency">{{ currency }}</option>
                      </select>
                      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center">
                        <ChevronDownIcon class="h-5 w-5 text-gray-500" aria-hidden="true" />
                      </div>
                    </div>
                  </div>
                </form> -->
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>

    <header class="relative z-10">
      <nav aria-label="Top">
        <!-- Top navigation -->
        <div class="bg-sky-900">
          <div class="mx-auto flex h-10 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <!-- Currency selector -->
            <form class="hidden lg:block lg:flex-1">
              <!-- <div class="flex">
                <label for="desktop-currency" class="sr-only">Currency</label>
                <div class="group relative -ml-2 rounded-md border-transparent bg-gray-900 focus-within:ring-2 focus-within:ring-white">
                  <select id="desktop-currency" name="currency" class="flex items-center rounded-md border-transparent bg-gray-900 bg-none py-0.5 pl-2 pr-5 text-sm font-medium text-white focus:border-transparent focus:outline-none focus:ring-0 group-hover:text-gray-100">
                    <option v-for="currency in currencies" :key="currency">{{ currency }}</option>
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center">
                    <ChevronDownIcon class="h-5 w-5 text-gray-300" aria-hidden="true" />
                  </div>
                </div>
              </div> -->
            </form>

            <p class="flex-1 text-center text-sm font-medium text-white lg:flex-none">
              Powered by {{ BACKEND_TECHNOLOGY }}
            </p>

            <div class="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6" v-if="token">
              <a href="#" @click.prevent="logout" class="text-sm font-medium text-white hover:text-gray-100">Sign out</a>
            </div>
            <div class="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6" v-else>
              <RouterLink :to="{name: 'register'}" class="text-sm font-medium text-white hover:text-gray-100">Create an account</RouterLink>
              <span class="h-6 w-px bg-gray-600" aria-hidden="true" />
              <RouterLink :to="{name: 'login'}" class="text-sm font-medium text-white hover:text-gray-100">Sign in</RouterLink>
            </div>
          </div>
        </div>

        <!-- Secondary navigation -->
        <div class="bg-white">
          <div class="border-b border-gray-200">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div class="flex h-16 items-center justify-between">
                <!-- Logo (lg+) -->
                <div class="hidden lg:flex lg:items-center">
                  <RouterLink :to="{ name: 'home' }">
                    <span class="sr-only">Remana Logo</span>
                    <!-- <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" /> -->
                    <img class="h-8 w-auto" src="/static/remana/landscape-transparent.png" alt="" />
                  </RouterLink>
                </div>

                <div class="hidden h-full lg:flex">
                  <!-- Mega menus -->
                  <PopoverGroup class="ml-8">
                    <div class="flex h-full justify-center space-x-8">
                      <a v-for="page in navigation.pages" :key="page.name" :href="page.href" class="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800">{{ page.name }}</a>
                    </div>
                  </PopoverGroup>
                </div>

                <!-- Mobile menu and search (lg-) -->
                <div class="flex flex-1 items-center lg:hidden">
                  <button type="button" class="-ml-2 rounded-md bg-white p-2 text-gray-400" @click="mobileMenuOpen = true">
                    <span class="sr-only">Open menu</span>
                    <Bars3Icon class="h-6 w-6" aria-hidden="true" />
                  </button>

                  <!-- Search -->
                  <RouterLink :to="{name: 'search'}" class="ml-2 p-2 text-gray-400 hover:text-gray-500">
                    <span class="sr-only">Search</span>
                    <MagnifyingGlassIcon class="h-6 w-6" aria-hidden="true" />
                  </RouterLink>
                </div>

                <!-- Logo (lg-) -->
                <RouterLink :to="{name: 'home'}" class="lg:hidden">
                  <span class="sr-only">Remana Logo</span>
                  <!-- <img src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" class="h-8 w-auto" /> -->
                  <img src="/static/remana/landscape-transparent.png" alt="" class="h-8 w-auto" />
                </RouterLink>

                <div class="flex flex-1 items-center justify-end">
                  <div class="flex items-center lg:ml-8">
                    <div class="flex space-x-8">
                      <div class="hidden lg:flex">
                        <RouterLink :to="{name: 'search'}" href="#" class="-m-2 p-2 text-gray-400 hover:text-gray-500">
                          <span class="sr-only">Search</span>
                          <MagnifyingGlassIcon class="h-6 w-6" aria-hidden="true" />
                        </RouterLink>
                      </div>

                      <div class="flex" v-if="token">
                        <RouterLink :to="{name: 'profile'}" class="-m-2 p-2 text-gray-400 hover:text-gray-500">
                          <span class="sr-only">Account</span>
                          <UserIcon class="h-6 w-6" aria-hidden="true" />
                        </RouterLink>
                      </div>
                    </div>

                    <span class="mx-4 h-6 w-px bg-gray-200 lg:mx-6" aria-hidden="true" />

                    <!-- <div class="flow-root">
                      <a href="#" class="group -m-2 flex items-center p-2" @click="openCart">
                        <ShoppingCartIcon class="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                        <span class="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">1</span>
                        <span class="sr-only">items in cart, view bag</span>
                      </a>
                    </div> -->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>

    <main>
      <RouterView />
    </main>

  </div>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue'
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
import { Bars3Icon, MagnifyingGlassIcon, ShoppingCartIcon, UserIcon, XMarkIcon, CheckIcon, ArrowPathIcon } from '@heroicons/vue/24/outline'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'

export default {
  components: {
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

    Bars3Icon, MagnifyingGlassIcon, ShoppingCartIcon, UserIcon, XMarkIcon, CheckIcon, ArrowPathIcon,
    ChevronDownIcon,
  },

  data() {
    return {
      currencies: ['CAD', 'USD', 'AUD', 'EUR', 'GBP'],
      navigation: {
        pages: [
          // { name: 'Company', href: '#' },
          { name: 'Activities', href: '/activities' },
          { name: 'Search', href: '/search' },
        ],
      },

      mobileMenuOpen: false,
      BACKEND_TECHNOLOGY: import.meta.env.VITE_BACKEND_TECHNOLOGY
    }
  },

  computed: {
    token() {
      // `this` points to the component instance
      // return this.$store.state.products;
      return this.$store.getters.token;
    },
  },

  watch: {
    // whenever question changes, this function will run
    token(newValue, oldValue) {
      console.log(newValue)

      if(!newValue) {
        this.$router.push({name: 'home'});
      }
    }
  },

  methods: {
    logout() {
      this.$store.dispatch('logout');

      // named route with params to let the router build the url
      this.$router.push({ name: 'home'})
    },
    setCurrentStore() {
      // console.log(`The initial count is ${this.count}.`)
      this.$store.dispatch('setCurrentStore', {
        'store_id': this.$route.params.store_id,
      });
    }
  },

  // Lifecycle hooks are called at different stages
  // of a component's lifecycle.
  // This function will be called when the component is mounted.
  mounted() {
    if(this.token) {
      this.$store.dispatch('renewLogin');
    } 
  }

}
</script>

<!-- References -->
<!-- https://tailwind-ui-two.vercel.app/components/application-ui/overlays/modals#component-31555aec01de5027d6696629eb60f673 -->