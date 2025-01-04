<!--
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
-->
<template>
  <div class="bg-slate-50">
    <div class="mx-auto max-w-2xl py-4 px-4 sm:py-4 sm:px-6 lg:max-w-7xl lg:px-8">
      
      <div class="lg:flex lg:items-center lg:justify-between mb-4 md:mb-5">
        <div>
          <!-- <h3 class="text-sm font-semibold leading-6 text-gray-900">Search your persons</h3>
          <p class="mt-2 text-sm leading-6 text-gray-600">A keyword search will run on person subject to help you find them.</p> -->
        </div>
        <form class="mt-6 sm:flex sm:max-w-md lg:mt-0" @submit.prevent="openPage()">
          <label for="keyword" class="sr-only">Keyword</label>
          <input type="keyword" name="keyword" id="keyword" autocomplete="keyword" class="w-full min-w-0 appearance-none rounded-md border-gray-300 bg-white px-[calc(theme(spacing.3)-1px)] py-[calc(theme(spacing[1.5])-1px)] text-base leading-7 text-gray-900 placeholder-gray-400 shadow-sm focus:border-indigo-600 focus:ring-indigo-600 sm:w-56 sm:text-sm sm:leading-6" placeholder="Enter name"
            v-model="keyword" />
          <div class="mt-4 rounded-md sm:mt-0 sm:ml-4 sm:flex-shrink-0">
            <button type="submit" class="flex w-full items-center justify-center rounded-md bg-indigo-600 py-1.5 px-3 text-base font-semibold leading-7 text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:text-sm sm:leading-6">Search</button>
          </div>
        </form>
      </div>

      <div class="text-center mt-6" v-if="personIsLoading">
        <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
          <ArrowPathIcon class="h-6 w-6 text-green-600 animate-spin" aria-hidden="true" />
        </div>
        <div class="mt-3 text-center sm:mt-5">
          <div as="h3" class="text-lg font-medium leading-6 text-gray-900">Getting People</div>
          <!-- <div class="mt-2">
            <p class="text-sm text-gray-500">KIndly wait while we process your profile. <br> This should take a second</p>
          </div> -->
        </div>
      </div>
      <ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" v-else-if="hasPersons">

        <PersonCard v-for="person in persons" :key="person.id" :person="person" :onEdit="openSideBar" />

      </ul>
      <div class="text-center mt-6" v-else-if="keyword || filters">
        <svg class="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
        </svg>

        <h3 class="mt-2 text-sm font-medium text-gray-900">No search results</h3>
        <p class="mt-1 text-sm text-gray-500">There are no people for your search.</p>
        <p class="mt-1 text-sm text-gray-500">"{{keyword}}"</p>
        <div class="mt-6">
          <button type="button" class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            @click="clearSearch">
            <XMarkIcon class="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Clear search
          </button>
        </div>
      </div>
      <div class="text-center mt-6" v-else>
        <svg class="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
        </svg>


        <h3 class="mt-2 text-sm font-medium text-gray-900">No people</h3>
        <p class="mt-1 text-sm text-gray-500">The people will be listed when available. <br> See you soon</p>
        <!-- <div class="mt-6">
          <button type="button" class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            @click="openStores">
            <ArrowLeftIcon class="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Go back to people
          </button>
        </div> -->
      </div>

    </div>
  </div>
  <div class="fixed bottom-5 right-5">
    <button type="button" class="inline-flex items-center rounded-full border border-transparent bg-indigo-600 p-3 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      @click="openSideBar()">
      <PlusIconOutline class="h-6 w-6" aria-hidden="true" />
    </button>
  </div>

  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-10" @close="open = false">
      <div class="fixed inset-0" />

      <div class="fixed inset-0 overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
          <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
            <TransitionChild as="template" enter="transform transition ease-in-out duration-500 sm:duration-700" enter-from="translate-x-full" enter-to="translate-x-0" leave="transform transition ease-in-out duration-500 sm:duration-700" leave-from="translate-x-0" leave-to="translate-x-full">
              <DialogPanel class="pointer-events-auto w-screen max-w-md">
                <form class="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl" @submit.prevent="checkForm()">
                  <div class="h-0 flex-1 overflow-y-auto">
                    <div class="bg-indigo-700 py-6 px-4 sm:px-6">
                      <div class="flex items-center justify-between">
                        <DialogTitle class="text-lg font-medium text-white">{{ this.selectedId ? "Edit" : "New" }} Person</DialogTitle>
                        <div class="ml-3 flex h-7 items-center">
                          <button type="button" class="rounded-md bg-indigo-700 text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white" @click="open = false">
                            <span class="sr-only">Close panel</span>
                            <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                      <div class="mt-1">
                        <p class="text-sm text-indigo-300">Fill in the information below to {{ this.selectedId ? "update" : "create" }} your new person.</p>
                      </div>
                    </div>
                    <div class="flex flex-1 flex-col justify-between">
                      <div class="divide-y divide-gray-200 px-4 sm:px-6">
                        <div class="space-y-6 pt-6 pb-5">

                          <div>
                            <label for="person-name" class="block text-sm font-medium text-gray-900">Name</label>
                            <div class="mt-1">
                              <input
                                type="text"
                                name="person-name"
                                id="person-name"
                                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                v-model="name" required />
                            </div>
                          </div>
                          <div>
                            <label for="person-role" class="block text-sm font-medium text-gray-900">Role</label>
                            <div class="mt-1">
                              <input
                                type="text"
                                name="person-role"
                                id="person-role"
                                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                v-model="role" required />
                            </div>
                          </div>
                          <div>
                            <label for="person-email" class="block text-sm font-medium text-gray-900">Email</label>
                            <div class="mt-1">
                              <input
                                type="email"
                                name="person-email"
                                id="person-email"
                                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                v-model="email" />
                            </div>
                          </div>
                          <div>
                            <label for="person-phone_number" class="block text-sm font-medium text-gray-900">Phone Number</label>
                            <div class="mt-1">
                              <!-- <input
                                type="text"
                                name="person-phone_number"
                                id="person-phone_number"
                                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                v-model="phone_number" required /> -->
                              <MazPhoneNumberInput
                                v-model="phone_number"
                                v-model:country-code="countryCode"
                                show-code-on-list
                                :preferred-countries="['KE', 'FR', 'BE', 'DE', 'US', 'GB']"
                                />
                            </div>
                          </div>
                          <div>
                            <label for="photo" class="block text-sm font-medium text-gray-700">Profile picture</label>
                            <div class="mt-1 flex items-center">
                              <span class="h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                                <svg v-if="!profilePictureSrc"
                                  class="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                                <img v-if="profilePictureSrc" class="h-full w-full" :src="profilePictureSrc" alt="">
                              </span>
                              <label for="profile_picture" class="relative">
                                <button type="button" class="ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Change</button>
                                <input id="profile_picture" name="profile_picture" type="file" class="absolute top-0 left-0 h-full w-full cursor-pointer opacity-0" accept=".png, .jpg, .jpeg" ref="profile_picture_input" @change="updatePreview" />
                              </label>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-shrink-0 justify-between px-4 py-4">
                    <div>
                      <button
                        type="button"
                        class="ml-4 inline-flex justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                        @click="openModal = true" v-if="selectedId">Delete</button>
                    </div>
                    <div class="flex flex-shrink-0 justify-end">
                      <button type="button" class="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" @click="open = false">Cancel</button>
                      <button
                        type="submit"
                        class="ml-4 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >Save</button>
                    </div>
                  </div>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>

  <TransitionRoot as="template" :show="openModal">
    <Dialog as="div" class="relative z-10" @close="openModal = false">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
              <div class="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
                <button type="button" class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" @click="openModal = false">
                  <span class="sr-only">Close</span>
                  <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div class="sm:flex sm:items-start">
                <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <ExclamationTriangleIcon class="h-6 w-6 text-red-600" aria-hidden="true" />
                </div>
                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">Delete Person</DialogTitle>
                  <div class="mt-2">
                    <p class="text-sm text-gray-500">Are you sure you want to delete the person? All of your data will be permanently removed from our servers forever. This action cannot be undone.</p>
                  </div>
                </div>
              </div>
              <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button type="button" class="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm" @click="deletePerson()">Delete</button>
                <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm" @click="openModal = false">Cancel</button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>

  <TransitionRoot as="template" :show="openModalError">
    <Dialog as="div" class="relative z-10" @close="openModalError = false">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
              <div class="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
                <button type="button" class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" @click="openModalError = false">
                  <span class="sr-only">Close</span>
                  <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div class="sm:flex sm:items-start">
                <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <ExclamationTriangleIcon class="h-6 w-6 text-red-600" aria-hidden="true" />
                </div>
                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">Error</DialogTitle>
                  <div class="mt-2">
                    <!-- <p class="text-sm text-gray-500">{{ modalErrorMessage }}</p> -->

                    <p v-if="errors.length">
                      <b>Please correct the following error(s):</b>
                      <ul>
                        <li v-for="error in errors" :key="error">{{ error }}</li>
                      </ul>
                    </p>
                  </div>
                </div>
              </div>
              <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <!-- <button type="button" class="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm" @click="setStatus()">Try Again</button> -->
                <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm" @click="openModalError = false">Ok</button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>

</template>

<script>
  import { RouterLink, RouterView } from 'vue-router'
  import { ArrowLeftIcon, ArrowPathIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/20/solid'
  import PersonCard from "../components/PersonCard.vue"

  import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
  import { XMarkIcon } from '@heroicons/vue/24/outline'
  import { LinkIcon, PlusIcon, QuestionMarkCircleIcon } from '@heroicons/vue/20/solid'
  import { ExclamationTriangleIcon } from '@heroicons/vue/24/outline'
  import { PlusIcon as PlusIconOutline } from '@heroicons/vue/24/outline'
  import MazPhoneNumberInput from 'maz-ui/components/MazPhoneNumberInput'
  import { API_V1_CANNONICAL } from '../network/network_info';

  export default {
    components: {
      ArrowLeftIcon, ArrowPathIcon, ChevronLeftIcon, ChevronRightIcon,

      Dialog,
      DialogPanel,
      DialogTitle,
      TransitionChild,
      TransitionRoot,
      XMarkIcon,
      LinkIcon,
      PlusIcon,
      QuestionMarkCircleIcon,

      ExclamationTriangleIcon,
      PersonCard,
      PlusIconOutline,
      MazPhoneNumberInput,
    },

    data() {
      return {
        pageLimit: 10,
        keyword: '',
        dateRange: 7,
        // startDate: this.subtractDays(new Date(), 7),
        // endDate: new Date(),

        countryCode: 'KE',

        open: false,
        selectedId: null,
        errors: [],
        name: '',
        subject: '',
        role: '',
        email: '',
        phone_number: '',
        profilePictureSrc: null,

        openModal: false,
        openModalError: false,
        modalErrorMessage: '',
      }
    },

    computed: {
      personIsLoading() {
        return this.$store.getters.personIsLoading;
      },
      personCount() {
        return this.$store.getters.personCount;
      },
      personNextPage() {
        return this.$store.getters.personNextPage;
      },
      personPreviousPage() {
        return this.$store.getters.personPreviousPage;
      },
      persons() {
        // `this` points to the component instance
        // return this.$store.state.persons;
        return this.$store.getters.persons;
      },
      currentPerson() {
        return this.persons.find(element => element.id === this.selectedId);
      },
      hasPersons() {
        // `this` points to the component instance
        // return this.$store.state.stores;
        return this.$store.getters.persons.length;
      },

      user() {
        // `this` points to the component instance
        // return this.$store.state.products;
        return this.$store.getters.user;
      },
    },

    // Methods are functions that mutate state and trigger updates.
    // They can be bound as event handlers in templates.
    methods: {
      openPage(page) {
        this.$store.dispatch('fetchPersons', {
          'keyword': this.keyword,
          // 'start': this.getDateOnly(this.startDate),
          // 'end': this.getDateOnly(this.endDate),
          'limit': this.pageLimit,
          'page': page
        });
      },
      clearSearch() {
        this.keyword = null
        this.openPage(null)
      },
      getDateOnly(item) {
        return `${item.getFullYear()}-${item.getMonth() + 1}-${item.getDate()}`
      },
      subtractDays(date, days) {
        var date_copy = new Date(date.valueOf());
        date_copy.setDate(date_copy.getDate() - days);
        return date_copy;
      },
      addDays(date, days) {
        var date_copy = new Date(date.valueOf());
        date_copy.setDate(date_copy.getDate() + days);
        return date_copy;
      },
      
      openSideBar(id) {
        this.selectedId = id;
        if(id) {
          this.setForm(this.currentPerson)
        } else {
          this.setForm({})
        }
        this.open = true
      },
      closeSideBar(id) {
        this.open = false
      },
      setForm(item) {
        this.name = item.name;
        this.role = item.role;
        this.email = item.email ?? "";
        this.phone_number = item.phone_number;

        const url = item.profile_picture?.url
        if(url) {
          this.profilePictureSrc = url.includes("http") ? url : `${API_V1_CANNONICAL}${url}`
        } else {
          this.profilePictureSrc = null;
        }
      },
      async save() {
        // const data = {
        //   name: this.name,
        //   role: this.role,
        //   email: this.email,
        //   phone_number: this.phone_number,
        // }
        
        // if(this.selectedId) {
        //   await this.$store.dispatch('updatePerson', {id: this.selectedId, data: data});
        // } else {
        //   await this.$store.dispatch('createPerson', data);
        //   this.closeSideBar();
        // }

        // OPTION 2 - supports file upload
        // TODO https://stackoverflow.com/questions/43013858/how-to-post-a-file-from-a-form-with-axios/43014086#43014086
        var formData = new FormData();
        // var imagefile = form.querySelector('[name="profile_picture"]');
        var imagefile = this.$refs.profile_picture_input;
        if(imagefile.files.length) {
          // <<<<<<<<>>>>>>>>
          // formData.append("profile_picture", imagefile.files[0]);
          formData.append("profile_picture_input", imagefile.files[0]); // Unifying to the XANO Backend
          // <<<<<<<<>>>>>>>>
        }
        formData.append('name', this.name);
        formData.append('role', this.role);
        formData.append('email', this.email);
        formData.append('phone_number', this.phone_number);

        if(this.selectedId) {
          await this.$store.dispatch('updatePerson', {id: this.selectedId, data: formData});
        } else {
          await this.$store.dispatch('createPerson', formData);
          this.closeSideBar();
        }
      },
      async deletePerson() {
        await this.$store.dispatch('deletePerson', {id: this.selectedId});
        this.openModal = false;
      },
      // TODO https://v2.vuejs.org/v2/cookbook/form-validation#Base-Example
      checkForm (e) {
        this.errors = [];

        // if(!this.phone_number) {
        //   // this.alertStore.showAlert({title: 'Phone number required', message: 'Please enter your mobile number', status: 'error'})
        //   // return;
        //   this.errors.push('Please enter your mobile number');
        // }
        
        if(this.errors.length) {
          // e.preventDefault();

          this.openModalError = true;
          // this.modalErrorMessage = 'Chat socket closed unexpectedly'
        } else {
          this.save()
        }
      },

      // + https://vue-tailwind-datepicker.com/props.html#disable-date
      dDate(date) {
        // return date < new Date() || date > new Date(2023, 0, 8)

        // Is this a bug? why does select a valid date undo the effect of this function
        // unless you use the clear button then the expected behavior is restored?

        // OPTION 1 - disable days before today
        // const yesterday = this.$moment().subtract(1, 'd'); // + https://momentjs.com/docs/#/manipulating/subtract/
        // if(this.$moment(date).isSameOrBefore(yesterday)) {
        //   return true;
        // }

        // OPTION 1 - allow all
        return false;
      },
      updatePreview(evt) {
        const [file] = evt.target.files
        if (file) {
          this.profilePictureSrc = URL.createObjectURL(file)
        } else {
          this.profilePictureSrc = null
        }
      }
    },

    // Lifecycle hooks are called at different stages
    // of a component's lifecycle.
    // This function will be called when the component is mounted.
    mounted() {
      // console.log(`The initial count is ${this.count}.`)
      this.openPage();
    },
  }
</script>

<!-- References -->
<!-- https://tailwind-ui-two.vercel.app/components/application-ui/lists/grid-lists#component-5d72b187beb968e12db89fe49f272b18 -->
<!-- https://tailwind-ui-two.vercel.app/components/marketing/sections/footers#component-b2c41f4521a0b989aa8e3c0d6ee400c9 -->