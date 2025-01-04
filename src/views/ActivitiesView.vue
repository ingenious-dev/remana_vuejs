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
  <div class="h-screen bg-slate-900 relative p-8">
    <!-- Mobile menu and search (lg-) -->
    <div class="flex flex-1 items-center absolute top-5 left-5 z-10">
      <button type="button" class="-ml-2 rounded-md bg-white p-2 text-gray-400" @click="openAction = true">
        <span class="sr-only">Open menu</span>
        <Bars3Icon class="h-6 w-6" aria-hidden="true" />
      </button>
    </div>

    <div class="h-full relative">
      <div class="absolute top-0 right-0">
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
      <div class="h-full w-full" ref="orbit_navigation" id="orbit-navigation">
        <OrbitNavigation
          :drawOrbitsData="drawOrbitsData"
          :changeDays="changeDays"
          :onActivityClick="(activity_id) => openSideBar(activity_id)" />
      </div>
    </div>
  </div>

  <div class="fixed bottom-5 right-5">
    <button type="button" class="inline-flex items-center rounded-full border border-transparent bg-indigo-600 p-3 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      @click="openSideBar()">
      <PlusIconOutline class="h-6 w-6" aria-hidden="true" />
    </button>
  </div>

  <TransitionRoot as="template" :show="openAction">
    <Dialog as="div" class="relative z-10" @close="openAction = false">
      <TransitionChild as="template" enter="ease-in-out duration-500" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in-out duration-500" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
          <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <TransitionChild as="template" enter="transform transition ease-in-out duration-500 sm:duration-700" enter-from="translate-x-full" enter-to="translate-x-0" leave="transform transition ease-in-out duration-500 sm:duration-700" leave-from="translate-x-0" leave-to="translate-x-full">
              <DialogPanel class="pointer-events-auto relative w-96">
                <TransitionChild as="template" enter="ease-in-out duration-500" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in-out duration-500" leave-from="opacity-100" leave-to="opacity-0">
                  <div class="absolute top-0 left-0 -ml-8 flex pt-4 pr-2 sm:-ml-10 sm:pr-4">
                    <button type="button" class="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white" @click="openAction = false">
                      <span class="sr-only">Close panel</span>
                      <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </TransitionChild>
                <div class="h-full overflow-y-auto bg-white p-8">
                  <div class="space-y-6 pb-16">
                    <div>
                      <div class="block w-full overflow-hidden rounded-lg">
                        <img src="/static/remana/landscape-transparent.png" alt="" class="object-contain" />
                      </div>
                    </div>
                    <div>
                      <h3 class="font-medium text-gray-900">Activity Details</h3>
                      <dl class="mt-2 divide-y divide-gray-200 border-t border-b border-gray-200">
                        <div class="flex justify-between py-3 text-sm font-medium">
                          <dt class="text-gray-500">Start Date</dt>
                          <dd class="text-gray-900">{{ $moment(startDate).format("dddd, MMMM Do YYYY") }}</dd>
                        </div>
                        <div class="flex justify-between py-3 text-sm font-medium">
                          <dt class="text-gray-500">End Date</dt>
                          <dd class="text-gray-900">{{ $moment(endDate).format("dddd, MMMM Do YYYY") }}</dd>
                        </div>
                        <div class="flex justify-between py-3 text-sm font-medium">
                          <dt class="text-gray-500">Activity Count</dt>
                          <dd class="text-gray-900">{{ activities.length }}</dd>
                        </div>
                      </dl>
                    </div>
                    <!-- <div class="flex">
                      <button type="button" class="flex-1 rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      @click="openSideBar()">Add an activity</button>
                      <button type="button" class="ml-3 flex-1 rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Delete</button>
                    </div> -->
                    <div>
                      <h3 class="font-medium text-gray-900">Navigation</h3>
                      <ul role="list" class="mt-2 divide-y divide-gray-200 border-t border-b border-gray-200">
                        <li class="flex items-center justify-between py-3">
                          <RouterLink :to="{name: 'home'}" type="button" class="rounded-md bg-white text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Home<span class="sr-only"> Home</span></RouterLink>
                        </li>
                        <li class="flex items-center justify-between py-3">
                          <RouterLink :to="{name: 'activities'}" type="button" class="rounded-md bg-white text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Activities<span class="sr-only"> Activities</span></RouterLink>
                        </li>
                        <li class="flex items-center justify-between py-3">
                          <RouterLink :to="{name: 'search'}" type="button" class="rounded-md bg-white text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Search<span class="sr-only"> Search</span></RouterLink>
                        </li>
                        <li class="flex items-center justify-between py-3">
                          <RouterLink :to="{name: 'people'}" type="button" class="rounded-md bg-white text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">People<span class="sr-only"> People</span></RouterLink>
                        </li>
                        <li class="flex items-center justify-between py-3">
                          <RouterLink :to="{name: 'profile'}" type="button" class="rounded-md bg-white text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Your account<span class="sr-only"> Your account</span></RouterLink>
                        </li>
                        <li class="flex items-center justify-between py-3">
                          <button type="button" class="rounded-md bg-white text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            @click.prevent="logout">Sign out<span class="sr-only"> Sign out</span></button>
                        </li>
                      </ul>
                    </div>
                    
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>

  <ActivityFormSlideOver :selectedId="selectedId" :closeSlideOver="closeSideBar" :openSlideOver="open" />

</template>

<script>
  import { RouterLink, RouterView } from 'vue-router'
  import { ArrowLeftIcon, ArrowPathIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/20/solid'
  import { ConvertToCartesian } from '../utilities/ConvertToCartesian'
  import OrbitNavigation from '../components/OrbitNavigation.vue'
  import ActivityFormSlideOver from "../components/ActivityFormSlideOver.vue"

  import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
  import { XMarkIcon } from '@heroicons/vue/24/outline'
  import _ from 'lodash-es'
  import { Bars3Icon } from '@heroicons/vue/24/outline'
  import { PlusIcon as PlusIconOutline } from '@heroicons/vue/24/outline'

  // const MIN_ORBIT_RADIUS = 130; // See below (getMinOrbitRadius) for dynamic setting
  // const ACTIVITY_ANGLE_AREA = 180;
  const MIN_ACTIVITY_RADIUS = 20;

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

      Bars3Icon,
      PlusIconOutline,
      ActivityFormSlideOver,
    },

    data() {
      return {
        IS_DEBUG: import.meta.env.VITE_IS_DEBUG,

        pageLimit: 10,
        keyword: '',
        dateRange: 7,
        startDate: this.subtractDays(new Date(), 7),
        endDate: new Date(),
        orbitRadiusTimer: null,
        MAX_ORBIT_RADIUS: null,
        ORBIT_SHAPE: "",
        ACTIVITY_ANGLE_AREA: null,

        openAction: false,
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
        const orbitCenterRenderData = {
          styles: this.ORBIT_SHAPE == "SEMI_CIRCLE"
          ? {
            "bottom": "0",
            "left": "50%",
            "transform": "translateX(-50%)",
          }
          : {
            "top": "50%",
            "left": "50%",
            "transform": "translate(-50%, -50%)",
          }
        }

        var orbitsRenderData = []
        const orbits = this.orbitsData
        
        const no_of_orbits = orbits.length;
        // + https://chatgpt.com/share/67728637-d634-8004-97c0-e0b78ed1def3
        const MIN_ORBIT_RADIUS = (2 * this.MAX_ORBIT_RADIUS) / no_of_orbits;

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
          const orbit_radius = (MIN_ORBIT_RADIUS * radius_factor) / 2;
          // const orbit_height = orbit_radius / 2;
          const orbit_height = this.ORBIT_SHAPE == "SEMI_CIRCLE"
          ? orbit_radius
          : orbit_radius * 2;
          const orbit_width = orbit_radius * 2;
          // const orbit_hsl = `hsl(${hue_interval * radius_factor}, 100%, 50%)`
          // const orbit_hsl = `hsl(120, 0%, ${lightness_interval * radius_factor}%)`
          const orbit_hsl = `hsl(206, 86%, ${lightness_interval * radius_factor}%)` // using remana colors
          // const orbit_hsl = `hsl(${getRandomInt(360)}, 100%, 50%)`;
          const border_radius = orbit_height + (orbit_width - orbit_height) / 2;

          if(this.ORBIT_SHAPE == "SEMI_CIRCLE") {
            orbit_data["styles"] = {
              "bottom": "0",
              "transform": "translate(-50%)",

              "height": `${orbit_height}px`,
              "width": `${orbit_width}px`,
              "borderLeft": `1px solid ${orbit_hsl}`,
              "borderTop": `1px solid ${orbit_hsl}`,
              "borderRadius": `${border_radius}px ${border_radius}px 0 0`, // + https://www.geeksforgeeks.org/how-to-draw-a-semi-circle-using-html-and-css/
            }
          } else {
            orbit_data["styles"] = {
              "top": "50%",
              "transform": "translate(-50%, -50%)",

              "height": `${orbit_height}px`,
              "width": `${orbit_width}px`,
              "borderLeft": `1px solid ${orbit_hsl}`,
              "borderTop": `1px solid ${orbit_hsl}`,
              "borderRight": `1px solid ${orbit_hsl}`,
              "borderBottom": `1px solid ${orbit_hsl}`,
              "borderRadius": "50%",
            }
          }
          
          const activities = orbit["activities"];
          const no_of_activities = activities.length;
          const no_of_gaps = no_of_activities + 1;
          // const angle_interval = this.ACTIVITY_ANGLE_AREA / no_of_gaps;
          const angle_interval = this.ORBIT_SHAPE == "SEMI_CIRCLE"
          ?  this.ACTIVITY_ANGLE_AREA / no_of_gaps
          :  this.ACTIVITY_ANGLE_AREA / no_of_activities

          const activity_radius_factor = orbit_index + 1;
          var activity_radius = MIN_ACTIVITY_RADIUS * activity_radius_factor * (1.2 / (orbit_index + 1));

          for (let activity_index = 0; activity_index < no_of_activities; activity_index++) {
            const activity = activities[activity_index];

            // let polar=[1.4142, 45 ];
            const radius = orbit_radius;
            const degrees = angle_interval * (activity_index + 1)
            let polar=[radius, degrees];
            const cartesian = ConvertToCartesian(polar);
            const y_axis = Math.floor(cartesian[1])
            const x_axis = Math.floor(cartesian[0])

            const activity_data = {
              "styles": {
                "height": `${activity_radius * 2}px`,
                "width": `${activity_radius * 2}px`,
                "background": orbit_hsl,

                // "top": `calc(100% - ${y_axis + activity_radius}px)`,
                "left": `calc(50% - ${x_axis + activity_radius}px)`,
              },
              "activity": activity,
            }

            if(this.ORBIT_SHAPE == "SEMI_CIRCLE") {
              activity_data["styles"]["top"] = `calc(100% - ${y_axis + activity_radius}px)`
            } else {
              activity_data["styles"]["top"] = `calc(50% - ${y_axis + activity_radius}px)`
            }

            if(this.IS_DEBUG == "true") {
              activity_data["debug_data"] = {
                "angle_interval": angle_interval,
                "degrees": degrees,
                "x_axis": x_axis,
                "y_axis": y_axis,
              }
            }

            orbit_data["activities_data"].push(activity_data)
          }

          orbit_data["label_styles"] = {
            "top": `${activity_radius}px`,
          }
          if(this.IS_DEBUG == "true") {
            orbit_data["debug_data"] = {
              "orbit_radius": orbit_radius,
            }
          }

          orbitsRenderData.push(orbit_data)
        }

        orbitsRenderData.reverse() // helps with 'z-index'  of orbits

        return {
          orbit_center: orbitCenterRenderData,
          orbits: orbitsRenderData,
        };
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
      logout() {
        this.$store.dispatch('logout');

        // named route with params to let the router build the url
        this.$router.push({ name: 'home'})
      },
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
      changeDays(gesture) {
        switch (gesture.direction) {
          case 'TOP_TO_BOTTOM':
            // Get new records

            this.startDate = this.addDays(this.startDate, 1);
            this.endDate = this.addDays(this.startDate, this.dateRange);
            // this.openPage()
            this.debouncedOpenPage()
            break;

          case 'BOTTOM_TO_TOP':
            // Get older records

            this.startDate = this.subtractDays(this.startDate, 1);
            this.endDate = this.addDays(this.startDate, this.dateRange);
            // this.openPage()
            this.debouncedOpenPage()
            break;
        
          default:
            break;
        }
      },
      setCirleProperties() {
        // this.MAX_ORBIT_RADIUS = Math.min(this.$refs.orbit_navigation.offsetHeight, this.$refs.orbit_navigation.offsetWidth / 2);
        if(this.$refs.orbit_navigation.offsetHeight < this.$refs.orbit_navigation.offsetWidth / 2) {
          this.MAX_ORBIT_RADIUS = this.$refs.orbit_navigation.offsetHeight;
          this.ACTIVITY_ANGLE_AREA = 180;
          this.ORBIT_SHAPE = "SEMI_CIRCLE";
        } else {
          this.MAX_ORBIT_RADIUS = Math.min(this.$refs.orbit_navigation.offsetHeight / 2, this.$refs.orbit_navigation.offsetWidth / 2);
          this.ACTIVITY_ANGLE_AREA = 360;
          this.ORBIT_SHAPE = "FULL_CIRCLE";
        }
      },
      
      openActionBar(id) {
        this.openAction = true
      },
      closeActionBar(id) {
        this.openAction = false
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

    created() {
      // + https://vuejs.org/guide/essentials/reactivity-fundamentals.html#stateful-methods
      // each instance now has its own copy of debounced handler
      this.debouncedOpenPage = _.debounce(this.openPage, 500)

      // + https://stackoverflow.com/questions/49380830/vue-js-how-to-get-window-size-whenever-it-changes/49381030#49381030
      window.addEventListener("resize", this.setCirleProperties);
    },

    // Lifecycle hooks are called at different stages
    // of a component's lifecycle.
    // This function will be called when the component is mounted.
    mounted() {
      // console.log(`The initial count is ${this.count}.`)
      this.openPage();

      this.orbitRadiusTimer = setInterval(() => {
        if(this.$refs.orbit_navigation) {
          this.setCirleProperties();

          clearInterval(this.orbitRadiusTimer)
        }
      }, 100);

      if(!this.user) {
        this.$store.dispatch('renewLogin');
      }

    },
    unmounted() {
      // also a good idea to cancel the timer
      // when the component is removed
      this.debouncedOpenPage.cancel()
    },
  }
</script>

<!-- References -->
<!-- https://tailwind-ui-two.vercel.app/components/application-ui/overlays/slide-overs#component-62a04be4dcfb133783a1a2b1774a73fa -->