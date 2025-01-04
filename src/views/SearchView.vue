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
          <!-- <h3 class="text-sm font-semibold leading-6 text-gray-900">Search your activities</h3> -->
          <!-- <p class="mt-2 text-sm leading-6 text-gray-600">A keyword search will run on activity subject to help you find them.</p> -->
          <button type="button" class="hidden md:inline-flex items-center rounded-full border border-transparent bg-indigo-600 p-3 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            @click="openSideBar()">
            <PlusIconOutline class="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
        <form class="mt-0 md:mt-6 sm:flex sm:max-w-md lg:mt-0" @submit.prevent="openPage()">
          <label for="keyword" class="sr-only">Keyword</label>
          <input type="name" name="keyword" id="keyword" autocomplete="keyword" class="w-full min-w-0 appearance-none rounded-md border-gray-300 bg-white px-[calc(theme(spacing.3)-1px)] py-[calc(theme(spacing[1.5])-1px)] text-base leading-7 text-gray-900 placeholder-gray-400 shadow-sm focus:border-indigo-600 focus:ring-indigo-600 sm:w-56 sm:text-sm sm:leading-6" placeholder="Enter keyword"
            v-model="keyword" />
          <div class="mt-4 rounded-md sm:mt-0 sm:ml-4 sm:flex-shrink-0">
            <button type="submit" class="flex w-full items-center justify-center rounded-md bg-indigo-600 py-1.5 px-3 text-base font-semibold leading-7 text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:text-sm sm:leading-6">Search</button>
          </div>
        </form>
      </div>

      <div class="text-center mt-6" v-if="activityIsLoading">
        <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
          <ArrowPathIcon class="h-6 w-6 text-green-600 animate-spin" aria-hidden="true" />
        </div>
        <div class="mt-3 text-center sm:mt-5">
          <div as="h3" class="text-lg font-medium leading-6 text-gray-900">Getting Activities</div>
          <!-- <div class="mt-2">
            <p class="text-sm text-gray-500">KIndly wait while we process your profile. <br> This should take a second</p>
          </div> -->
        </div>
      </div>
      <ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" v-else-if="hasActivities">
        
        <div v-for="activity in activities" :key="activity.id"
          @click="openSideBar(activity.id)" class="col-span-1 cursor-pointer">
          <ActivityCard :activity="activity" />
        </div>

      </ul>
      <div class="text-center mt-6" v-else-if="keyword || filters">
        <svg class="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
        </svg>



        <h3 class="mt-2 text-sm font-medium text-gray-900">No search results</h3>
        <p class="mt-1 text-sm text-gray-500">There are no activities for your search.</p>
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
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z" />
        </svg>

        <h3 class="mt-2 text-sm font-medium text-gray-900">No activities</h3>
        <p class="mt-1 text-sm text-gray-500">The activities will be listed when available. <br> See you soon</p>
        <!-- <div class="mt-6">
          <button type="button" class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            @click="openStores">
            <ArrowLeftIcon class="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Go back to activities
          </button>
        </div> -->
      </div>

    </div>
  </div>
  <div class="fixed bottom-5 right-5 md:hidden">
    <button type="button" class="inline-flex items-center rounded-full border border-transparent bg-indigo-600 p-3 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      @click="openSideBar()">
      <PlusIconOutline class="h-6 w-6" aria-hidden="true" />
    </button>
  </div>

  <ActivityFormSlideOver :selectedId="selectedId" :closeSlideOver="closeSideBar" :openSlideOver="open" />

</template>

<script>
  import { RouterLink, RouterView } from 'vue-router'
  import { ArrowLeftIcon, ArrowPathIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/20/solid'
  import ActivityCard from "../components/ActivityCard.vue"
  import ActivityFormSlideOver from "../components/ActivityFormSlideOver.vue"

  import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
  import { PlusIcon as PlusIconOutline } from '@heroicons/vue/24/outline'

  export default {
    components: {
      ArrowLeftIcon, ArrowPathIcon, ChevronLeftIcon, ChevronRightIcon,

      Dialog,
      DialogPanel,
      DialogTitle,
      TransitionChild,
      TransitionRoot,

      ActivityFormSlideOver,

      ActivityCard,
      PlusIconOutline,
    },

    data() {
      return {
        pageLimit: 10,
        keyword: '',

        open: false,
        selectedId: null,
      }
    },

    computed: {
      activityIsLoading() {
        return this.$store.getters.activityIsLoading;
      },
      activityCount() {
        return this.$store.getters.activityCount;
      },
      activityNextPage() {
        return this.$store.getters.activityNextPage;
      },
      activityPreviousPage() {
        return this.$store.getters.activityPreviousPage;
      },
      activities() {
        // `this` points to the component instance
        // return this.$store.state.activities;
        return this.$store.getters.activities;
      },
      hasActivities() {
        // `this` points to the component instance
        // return this.$store.state.stores;
        return this.$store.getters.activities.length;
      },
    },

    // Methods are functions that mutate state and trigger updates.
    // They can be bound as event handlers in templates.
    methods: {
      openPage(page) {
        this.$store.dispatch('fetchActivities', {
          'keyword': this.keyword,
          'limit': this.pageLimit,
          'page': page
        });
      },
      clearSearch() {
        this.keyword = null
        this.openPage(null)
      },
      
      openSideBar(id) {
        this.selectedId = id;
        this.open = true
      },
      closeSideBar() {
        this.selectedId = null;
        this.open = false
      },
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
<!-- https://tailwind-ui-two.vercel.app/components/ecommerce/components/activity-lists#component-d8eb32559745988d0026cae377c493a0 -->
<!-- https://tailwind-ui-two.vercel.app/components/application-ui/navigation/pagination#component-0797a02a34692167c369d134e7a6f9c5 -->
<!-- https://tailwind-ui-two.vercel.app/components/application-ui/lists/grid-lists#component-ce021f02f586e0e6a5f8de2ca2ee537b -->
<!-- https://tailwind-ui-two.vercel.app/components/marketing/sections/footers#component-b2c41f4521a0b989aa8e3c0d6ee400c9 -->