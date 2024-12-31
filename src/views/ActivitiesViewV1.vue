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
  <div class="flex flex-col md:flex-row">
    <div class="flex-auto">
      <div id="orbit-container">
        <div id="orbit-center"></div>
        <div id="orbit-wrapper" ref="orbit_wrapper"></div>
      </div>
    </div>
    <div class="w-full md:w-1/4">
      <div class="border-t border-b border-gray-200 bg-white shadow-sm sm:rounded-lg sm:border m-8">
        <div class="py-6 px-4 sm:px-6 lg:p-8">
          <ul role="list" class="divide-y divide-gray-200">
            <li class="flex py-4">
              <!-- <img class="h-10 w-10 rounded-full" :src="person.image" alt="" /> -->
              <div class="ml-3">
                <p class="text-sm font-medium text-gray-900">Start Date</p>
                <p class="text-sm text-gray-500">{{ getDateOnly(startDate) }}</p>
              </div>
            </li>
            <li class="flex py-4">
              <div class="ml-3">
                <p class="text-sm font-medium text-gray-900">End Date</p>
                <p class="text-sm text-gray-500">{{ getDateOnly(endDate) }}</p>
              </div>
            </li>
            <li class="flex py-4">
              <div class="ml-3">
                <p class="text-sm font-medium text-gray-900">No# of activities</p>
                <p class="text-sm text-gray-500">{{ activities.length }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { RouterLink, RouterView } from 'vue-router'
  import { ArrowLeftIcon, ArrowPathIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/20/solid'
  import { ConvertToCartesian } from '../utilities/ConvertToCartesian'

  const MIN_ORBIT_RADIUS = 130;
  const ACTIVITY_ANGLE_AREA = 180;
  const MIN_ACTIVITY_RADIUS = 20;
  const WHEEL_SENSITIVITY = 1;

  export default {
    components: {
      ArrowLeftIcon, ArrowPathIcon, ChevronLeftIcon, ChevronRightIcon,
    },

    data() {
      return {
        pageLimit: 10,
        keyword: '',
        dateRange: 7,
        startDate: new Date(),
        endDate: this.addDays(new Date(), 7),
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

        for (let day_index = 0; day_index < this.dateRange; day_index++) {
          
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

        this.activities.forEach(activity => {
          const activity_date = new Date(activity.date_of_activity)
          const activity_date_str = this.getDateOnly(activity_date)
          const data = {
            "subject": activity.subject,
            "category": activity.category,
          }

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

        return orbits;
      }
    },
    watch: {
      activities(newValue, oldValue) {
        if (newValue) {
          this.drawOrbits()
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
      getPrice(catalogue_entries) {
        if(!catalogue_entries){
          return 'N/A'
        }

        // sort by value
        catalogue_entries.sort((a, b) => a.unit_price - b.unit_price);
        const currency = catalogue_entries[0].currency
        const unit_price = catalogue_entries[0].active_sale?.unit_price ?? catalogue_entries[0].unit_price
        return `${currency} ${unit_price}`
      },
      getDateOnly(item) {
        return `${item.getFullYear()}-${item.getMonth() + 1}-${item.getDate()}`
      },
      drawOrbits() {
        const orbits = this.orbitsData

        // const orbit_center = document.getElementById('orbit-wrapper');
        const orbit_center = this.$refs.orbit_wrapper;
        orbit_center.innerHTML = "";
        
        const no_of_orbits = orbits.length;
        const hue_interval = 360 / no_of_orbits ? no_of_orbits : 1;
        const lightness_interval = 100 / no_of_orbits ? no_of_orbits : 1;
        for (let orbit_index = 0; orbit_index < no_of_orbits; orbit_index++) {
            const orbit = orbits[orbit_index];

            const radius_factor = orbit_index + 1;
            const orbit_height = (MIN_ORBIT_RADIUS * radius_factor) / 2;
            const orbit_width = MIN_ORBIT_RADIUS * radius_factor;
            const orbit_hsla = `hsla(${hue_interval * radius_factor}, 100%, 50%, 1)`
            // const orbit_hsla = `hsla(120, 100%, ${lightness_interval * radius_factor}%, 1)`
            // const orbit_hsla = `hsla(${getRandomInt(360)}, 100%, 50%, 1)`;
            const border_radius = orbit_height + (orbit_width - orbit_height) / 2;

            const orbit_node = document.createElement("div");
            orbit_node.classList.add("orbit");
            orbit_node.style.height = `${orbit_height}px`;
            orbit_node.style.width = `${orbit_width}px`;
            orbit_node.style.borderColor = orbit_hsla;
            orbit_node.style.borderRadius = `${border_radius}px ${border_radius}px 0 0`; // + https://www.geeksforgeeks.org/how-to-draw-a-semi-circle-using-html-and-css/
            orbit_node.style.zIndex = no_of_orbits - orbit_index;
            
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

                const activity_node = document.createElement("div");
                activity_node.classList.add("activity");
                activity_node.style.height = `${activity_radius * 2}px`;
                activity_node.style.width = `${activity_radius * 2}px`;
                activity_node.style.background = orbit_hsla;
                                    
                activity_node.style.top = `calc(100% - ${y_axis + activity_radius}px)`;
                activity_node.style.left = `calc(50% - ${x_axis + activity_radius}px)`;
                
                orbit_node.appendChild(activity_node);
            }

            
            const orbit_label = document.createElement("div");
            orbit_label.innerHTML = orbit["label"]
            orbit_label.classList.add("orbit-label");
            orbit_label.style.top = `${activity_radius}px`;
            orbit_node.appendChild(orbit_label);

            orbit_center.appendChild(orbit_node);

        }
          
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
          this.openPage()
        }

        if(event.deltaY < - WHEEL_SENSITIVITY) {
          console.log('top -> bottom');
          // SCROLLING UP
          // Get new records

          this.startDate = this.addDays(this.startDate, 1);
          this.endDate = this.addDays(this.startDate, this.dateRange);
          this.openPage()
        }
      },
    },

    // Lifecycle hooks are called at different stages
    // of a component's lifecycle.
    // This function will be called when the component is mounted.
    mounted() {
      // console.log(`The initial count is ${this.count}.`)
      this.openPage();
      this.$refs.orbit_wrapper.onwheel = this.changeDays
    }
  }
</script>

<style>
  /* body {
      height: 100vh;
      margin: 0;
  } */

  #orbit-container {
      height: 70vh;
      width: 100%;
      display: flex;
      align-items: end;
      justify-content: center;
      position: relative;
  }

  #orbit-center {
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);

      width: 30px;
      height: 30px;
      background: #cdf;
      border-radius: 50%;
  }

  #orbit-wrapper {
      height: 100%;
      width: 100%;
  }

  .orbit {
      position: absolute;
      bottom: 0%;
      left: 50%;
      transform: translate(-50%);
      
      /* border-radius: 50%; */
      /* border: 1px solid black; */
      border-left: 1px solid black;
      border-top: 1px solid black;
  }

  .orbit-label {
      position: absolute;
      top: 0%;
      left: 50%;
      transform: translate(-50%);
  }

  /* .orbit::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      border: 1px solid gray;
      z-index: -1;
  } */

  .activity {
      position: absolute;

      border-radius: 50%;
      height: 30px;
      width: 30px;
      background: blue;
      cursor: pointer;
  }
</style>

<!-- References -->
<!-- https://tailwind-ui-two.vercel.app/components/ecommerce/components/activity-lists#component-d8eb32559745988d0026cae377c493a0 -->
<!-- https://tailwind-ui-two.vercel.app/components/application-ui/navigation/pagination#component-0797a02a34692167c369d134e7a6f9c5 -->