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
  <div class="bg-white">
    <div class="mx-auto max-w-2xl py-4 px-4 sm:py-4 sm:px-6 lg:max-w-7xl lg:px-8">
      
      <div class="bg-white">
        <div class="py-6 px-4 sm:px-6 lg:p-4">
          <div class="flex flex-col md:flex-row gap-4">

            <ul role="list" class="flex-auto flex justify-between md:justify-around">
              <li class="flex text-center">
                <!-- <img class="h-10 w-10 rounded-full" :src="person.image" alt="" /> -->
                <div class="ml-3">
                  <p class="text-sm text-gray-500">
                    <span class="lg:hidden">{{ $moment(startDate).format("MMM D YYYY") }}</span>
                    <span class="hidden lg:inline">{{ $moment(startDate).format("dddd, MMMM Do YYYY") }}</span>
                  </p>
                  <p class="text-xs font-medium text-gray-900 mt-1">Start Date</p>
                </div>
              </li>
              <li class="flex">
                <div class="ml-3 text-center">
                  <p class="text-sm text-gray-500">
                    <span class="lg:hidden">{{ $moment(endDate).format("MMM D YYYY") }}</span>
                    <span class="hidden lg:inline">{{ $moment(endDate).format("dddd, MMMM Do YYYY") }}</span>
                  </p>
                  <p class="text-xs font-medium text-gray-900 mt-1">End Date</p>
                </div>
              </li>
              <li class="flex text-center">
                <div class="ml-3">
                  <p class="text-sm text-gray-500">
                    {{ activities.length }}
                  </p>
                  <p class="text-xs font-medium text-gray-900 mt-1">Activity Count</p>
                </div>
              </li>
            </ul>
            <div class="">
              <button
                type="button"
                class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 w-full"
                @click="openSideBar()"
                >Add an activity</button>
            </div>

          </div>
        </div>
      </div>

      <div class="bg-slate-50 shadow-sm sm:rounded-lg mt-4 relative">
        <div class="absolute top-0 left-0">
          <div class="text-center flex items-center gap-4 p-2" v-if="activityIsLoading">
            <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <ArrowPathIcon class="h-6 w-6 text-green-600 animate-spin" aria-hidden="true" />
            </div>
            <!-- <div class="text-center">
              <div as="h3" class="text-lg font-medium leading-6 text-gray-900">Getting Activities</div>
              <div class="mt-2">
                <p class="text-sm text-gray-500">Kindly wait while we get activities. <br> This should take a second</p>
              </div>
            </div> -->
          </div>
        </div>
        <div class="h-[60vh] md:h-[65vh] p-4">
          <div class="h-full w-full" ref="orbit_navigation">
            <OrbitNavigation
              :drawOrbitsData="drawOrbitsData"
              :changeDays="changeDays"
              :onActivityClick="(activity_id) => openSideBar(activity_id)" />
          </div>
        </div>
        
      </div>

    </div>
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
                        <DialogTitle class="text-lg font-medium text-white">{{ newOrEdit }} Activity</DialogTitle>
                        <div class="ml-3 flex h-7 items-center">
                          <button type="button" class="rounded-md bg-indigo-700 text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white" @click="open = false">
                            <span class="sr-only">Close panel</span>
                            <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                      <div class="mt-1">
                        <p class="text-sm text-indigo-300">Fill in the information below to {{ newOrEdit }} your new activity.</p>
                      </div>
                    </div>
                    <div class="flex flex-1 flex-col justify-between">
                      <div class="divide-y divide-gray-200 px-4 sm:px-6">
                        <div class="space-y-6 pt-6 pb-5">
                          <div>
                            <label for="category" class="block text-sm font-medium text-gray-700">Category</label>
                            <div class="mt-1">
                              <select id="category" name="category" autocomplete="category-name" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                v-model="category" required>
                                <option value="event">Event</option>
                                <option value="email">Email</option>
                              </select>
                            </div>
                          </div>

                          <div class="space-y-6" v-if="category">
                            <div>
                              <label for="activity-date_of_activity" class="text-sm font-medium text-gray-900 flex justify-between">
                                Date
                                <span class="text-gray-500 text-sm">{{ date_of_activity }}</span>
                              </label>
                              <div class="mt-1">
                                <vue-tailwind-datepicker
                                  v-model="selectedDates"
                                  as-single
                                  :formatter="{
                                    date: 'DD MMM YYYY',
                                    month: 'MMM',
                                  }"
                                  input-classes="block mt-2 text-sm font-medium text-black"
                                  :disable-date="dDate" />

                              </div>
                            </div>

                            <div>
                              <label for="activity-subject" class="block text-sm font-medium text-gray-900">Subject</label>
                              <div class="mt-1">
                                <input
                                type="text"
                                name="activity-subject"
                                id="activity-subject"
                                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                v-model="subject" required />
                              </div>
                            </div>
                            
                            <div>
                              <label for="agenda_or_body" class="block text-sm font-medium text-gray-900">
                                {{ category == 'event' ? 'Agenda' : 'Body' }}
                              </label>
                              <div class="mt-1">
                                <textarea id="agenda_or_body" name="agenda_or_body" rows="4" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                  v-model="agenda_or_body" required />
                              </div>
                            </div>

                            <div>
                              <label for="activity-location" class="block text-sm font-medium text-gray-900">Location</label>
                              <div class="mt-1">
                                <input
                                type="text"
                                name="activity-location"
                                id="activity-location"
                                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                v-model="location" required />
                              </div>
                            </div>

                            <!-- <div>
                              <label for="participants_event_users" class="block text-sm font-medium text-gray-700">Participant Users</label>
                              <div class="mt-1">
                                <select id="participants_event_users" name="participants_event_users" autocomplete="participants_event_users-name" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                  v-model="participants_event_users" required>
                                  <option value="event">Event</option>
                                  <option value="email">Email</option>
                                </select>
                              </div>
                            </div>

                            <div v-if="category == 'email'">
                              <label for="activity-participants_emails" class="block text-sm font-medium text-gray-900">Participant Emails</label>
                              <div class="mt-1">
                                <input
                                type="text"
                                name="activity-participants_emails"
                                id="activity-participants_emails"
                                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                v-model="participants_emails" required />
                              </div>
                            </div> -->

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
                    <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">Delete Activity</DialogTitle>
                    <div class="mt-2">
                      <p class="text-sm text-gray-500">Are you sure you want to delete the activity? All of your data will be permanently removed from our servers forever. This action cannot be undone.</p>
                    </div>
                  </div>
                </div>
                <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button type="button" class="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm" @click="deleteActivity()">Delete</button>
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
  import { ConvertToCartesian } from '../utilities/ConvertToCartesian'
  import OrbitNavigation from '../components/OrbitNavigation.vue'

  import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
  import { XMarkIcon } from '@heroicons/vue/24/outline'
  import { LinkIcon, PlusIcon, QuestionMarkCircleIcon } from '@heroicons/vue/20/solid'
  import { Switch, SwitchDescription, SwitchGroup, SwitchLabel } from '@headlessui/vue'
  import { ExclamationTriangleIcon } from '@heroicons/vue/24/outline'
  import VueTailwindDatepicker from "vue-tailwind-datepicker";
  import _ from 'lodash-es'

  // const MIN_ORBIT_RADIUS = 130; // See below for dynamic setting
  const ACTIVITY_ANGLE_AREA = 180;
  const MIN_ACTIVITY_RADIUS = 20;
  const WHEEL_SENSITIVITY = 1;

  export default {
    components: {
      ArrowLeftIcon, ArrowPathIcon, ChevronLeftIcon, ChevronRightIcon,
      OrbitNavigation,

      Dialog,
      DialogPanel,
      DialogTitle,
      TransitionChild,
      TransitionRoot,
      XMarkIcon,
      LinkIcon,
      PlusIcon,
      QuestionMarkCircleIcon,

      Switch,
      SwitchDescription,
      SwitchGroup,
      SwitchLabel,

      ExclamationTriangleIcon,
      VueTailwindDatepicker
    },

    data() {
      return {
        pageLimit: 10,
        keyword: '',
        dateRange: 7,
        startDate: this.subtractDays(new Date(), 7),
        endDate: new Date(),

        open: false,
        selectedId: null,
        errors: [],
        category: '',
        subject: '',
        agenda_or_body: '',
        date_of_activity: '',
        location: '',
        participants_event_users: [],
        participants_emails: [],

        selectedDates: [],

        openModal: false,
        openModalError: false,
        modalErrorMessage: '',
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
      currentActivity() {
        return this.activities.find(element => element.id === this.selectedId);
      },
      hasActivities() {
        // `this` points to the component instance
        // return this.$store.state.stores;
        return this.$store.getters.activities.length;
      },
      orbitsData() {
        var orbits = []

        if(this.user?.display_empty_spaces) {
          for (let day_index = 1; day_index <= this.dateRange; day_index++) {
            
            const date = this.addDays(this.startDate, day_index);
            const activity_date_str = this.getDateOnly(date)
            const index = orbits.findIndex((x) => x.date === activity_date_str);
            if(index < 0) {
              orbits.push({
                "label": activity_date_str,
                "date": activity_date_str,
                "activities": [],
              })
            }
          }
        }

        this.activities.forEach(activity => {
          const activity_date = new Date(activity.date_of_activity)
          const activity_date_str = this.getDateOnly(activity_date)
          // const data = {
          //   "subject": activity.subject,
          //   "category": activity.category,
          // }
          const data = activity;

          const index = orbits.findIndex((x) => x.date === activity_date_str);
          if(index < 0) {
            orbits.push({
            "label": activity_date_str,
            "date": activity_date_str,
            "activities": [data],
          })
          } else {
            orbits[index]["activities"].push(data)
          }
        });

        // sort by date
        orbits.sort((a, b) => {
          const nameA = a.date.toUpperCase(); // ignore upper and lowercase
          const nameB = b.date.toUpperCase(); // ignore upper and lowercase
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }

          // names must be equal
          return 0;
        });

        return orbits;
      },
      drawOrbitsData() {
        var renderData = []
        const orbits = this.orbitsData
        
        const no_of_orbits = orbits.length;
        const MIN_ORBIT_RADIUS = this.$refs.orbit_navigation
        ? (2 * Math.min(this.$refs.orbit_navigation.offsetHeight, this.$refs.orbit_navigation.offsetWidth)) / no_of_orbits
        : 130;

        // const hue_interval = 360 / no_of_orbits ? no_of_orbits : 1;
        const lightness_interval = 100 / no_of_orbits ? no_of_orbits : 1;
        for (let orbit_index = 0; orbit_index < no_of_orbits; orbit_index++) {
          const orbit = orbits[orbit_index];
          var orbit_data = {
            "styles": null,
            "activities_data": [],
            "orbit": orbit,
          }

          const radius_factor = orbit_index + 1;
          const orbit_height = (MIN_ORBIT_RADIUS * radius_factor) / 2;
          const orbit_width = MIN_ORBIT_RADIUS * radius_factor;
          // const orbit_hsla = `hsla(${hue_interval * radius_factor}, 100%, 50%, 1)`
          // const orbit_hsla = `hsla(120, 0, ${lightness_interval * radius_factor}%, 1)`
          const orbit_hsla = `hsla(206, 86, ${lightness_interval * radius_factor}%, 1)` // using remana colors
          // const orbit_hsla = `hsla(${getRandomInt(360)}, 100%, 50%, 1)`;
          const border_radius = orbit_height + (orbit_width - orbit_height) / 2;

          orbit_data["styles"] = {
            "height": `${orbit_height}px`,
            "width": `${orbit_width}px`,
            "borderColor": orbit_hsla,
            "borderRadius": `${border_radius}px ${border_radius}px 0 0`, // + https://www.geeksforgeeks.org/how-to-draw-a-semi-circle-using-html-and-css/
          }
          
          const activities = orbit["activities"];
          const no_of_activities = activities.length;
          const no_of_gaps = no_of_activities + 1;
          const angle_interval = ACTIVITY_ANGLE_AREA / no_of_gaps;

          const activity_radius_factor = orbit_index + 1;
          var activity_radius = MIN_ACTIVITY_RADIUS * activity_radius_factor * (1.2 / (orbit_index + 1));

          for (let activity_index = 0; activity_index < no_of_activities; activity_index++) {
            const activity = activities[activity_index];

            // let polar=[1.4142, 45 ];
            const radius = orbit_height;
            const degrees = angle_interval * (activity_index + 1)
            let polar=[radius, degrees];
            const cartesian = ConvertToCartesian(polar);
            const y_axis = Math.floor(cartesian[1])
            const x_axis = Math.floor(cartesian[0])

            orbit_data["activities_data"].push({
              "styles": {
                "height": `${activity_radius * 2}px`,
                "width": `${activity_radius * 2}px`,
                "background": orbit_hsla,

                "top": `calc(100% - ${y_axis + activity_radius}px)`, // + https://www.geeksforgeeks.org/how-to-draw-a-semi-circle-using-html-and-css/
                "left": `calc(50% - ${x_axis + activity_radius}px)`,
              },
              "activity": activity,
            })
          }

          orbit_data["label_styles"] = {
            "top": `${activity_radius}px`, 
          },

          renderData.push(orbit_data)
        }

        renderData.reverse() // helps with 'z-index'  of orbits

        return renderData;
      },

      newOrEdit() {
        return this.selectedId ? 'Edit' : 'New';
      },
      user() {
        // `this` points to the component instance
        // return this.$store.state.products;
        return this.$store.getters.user;
      },
    },

    watch: {
      // whenever question changes, this function will run
      selectedDates(newValue, oldValue) {
        console.log(newValue)
        if(newValue.length) {
          this.date_of_activity = this.$moment(newValue[0]).format("YYYY-MM-DD");;
        }
      }
    },

    // Methods are functions that mutate state and trigger updates.
    // They can be bound as event handlers in templates.
    methods: {
      openPage(page) {
        this.$store.dispatch('fetchActivities', {
          'keyword': this.keyword,
          'start': this.getDateOnly(this.startDate),
          'end': this.getDateOnly(this.endDate),
          'limit': this.pageLimit,
          'page': page
        });
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
      changeDays(event) {
        // console.log(event);
        console.log(event.deltaY);

        event.preventDefault();

        if(event.deltaY > WHEEL_SENSITIVITY) {
          console.log('bottom -> top');
          // SCROLLING DOWN
          // Get older records

          this.startDate = this.subtractDays(this.startDate, 1);
          this.endDate = this.addDays(this.startDate, this.dateRange);
          // this.openPage()
          this.debouncedOpenPage()
        }

        if(event.deltaY < - WHEEL_SENSITIVITY) {
          console.log('top -> bottom');
          // SCROLLING UP
          // Get new records

          this.startDate = this.addDays(this.startDate, 1);
          this.endDate = this.addDays(this.startDate, this.dateRange);
          // this.openPage()
          this.debouncedOpenPage()
        }
      },
      
      openSideBar(id) {
        this.selectedId = id;
        if(id) {
          this.setForm(this.currentActivity)
        } else {
          this.setForm({})
        }
        this.open = true
      },
      closeSideBar(id) {
        this.open = false
      },
      setForm(item) {
        this.category = item.category;
        this.subject = item.subject;
        this.agenda_or_body = item.agenda_or_body;
        this.date_of_activity = item.date_of_activity;
        this.location = item.location;
        this.participants_event_users = item.participants_event_users;
        this.participants_emails = item.participants_emails;

        this.selectedDates = [item.date_of_activity];
      },
      async save() {
        const data = {
          category: this.category,
          subject: this.subject,
          agenda_or_body: this.agenda_or_body,
          date_of_activity: this.date_of_activity,
          location: this.location,
          participants_event_users: this.participants_event_users,
          participants_emails: this.participants_emails,
        }
        
        if(this.selectedId) {
          await this.$store.dispatch('updateActivity', {id: this.selectedId, data: data});
        } else {
          await this.$store.dispatch('createActivity', data);
          this.closeSideBar();
        }
      },
      async deleteActivity() {
        await this.$store.dispatch('deleteActivity', {id: this.selectedId});
        this.openModal = false;
      },
      // TODO https://v2.vuejs.org/v2/cookbook/form-validation#Base-Example
      checkForm (e) {
        this.errors = [];

        if (!this.date_of_activity) {
          this.errors.push('Date required.');
        }
        
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
    },

    created() {
      // + https://vuejs.org/guide/essentials/reactivity-fundamentals.html#stateful-methods
      // each instance now has its own copy of debounced handler
      this.debouncedOpenPage = _.debounce(this.openPage, 500)
    },

    // Lifecycle hooks are called at different stages
    // of a component's lifecycle.
    // This function will be called when the component is mounted.
    mounted() {
      // console.log(`The initial count is ${this.count}.`)
      this.openPage();
    },
    unmounted() {
      // also a good idea to cancel the timer
      // when the component is removed
      this.debouncedOpenPage.cancel()
    },
  }
</script>

<!-- References -->
<!-- https://tailwind-ui-two.vercel.app/components/ecommerce/components/activity-lists#component-d8eb32559745988d0026cae377c493a0 -->
<!-- https://tailwind-ui-two.vercel.app/components/application-ui/navigation/pagination#component-0797a02a34692167c369d134e7a6f9c5 -->