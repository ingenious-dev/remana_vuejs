<template>
  <div id="orbit-container">
    <!-- <div id="orbit-center">
      <div class="h-full w-full flex items-center justify-center shadow-2xl">
        <img class="h-4 w-auto" src="/static/remana/icon-transparent.png" alt="" />
      </div>
    </div> -->
    <div id="orbit-center"
      :style="drawOrbitsData.orbit_center.styles">
      <div class="h-full w-full flex items-center justify-center shadow-2xl">
        <img class="h-4 w-auto" src="/static/remana/icon-transparent.png" alt="" />
      </div>
    </div>
    <div id="orbit-wrapper" ref="orbit_wrapper">
      <div v-for="(orbit_data, orbit_index) in drawOrbitsData.orbits" :key="orbit_index"
        class="orbit "
        :style="orbit_data.styles"
        :ref="`orbit_${orbit_index}`"
      >
        <div class="orbit-label text-xs text-gray-500" :style="orbit_data.label_styles">
          <!-- {{ orbit_index }} -->
          <!-- {{ orbit_data.orbit["label"] }} -->

          <time :datetime="orbit_data.orbit['label']" class="lg:hidden">{{ $moment(orbit_data.orbit['label']).format("MMM D") }}</time>
          <time :datetime="orbit_data.orbit['label']" class="hidden lg:inline">{{ $moment(orbit_data.orbit['label']).format("ddd, MMM D") }}</time>
        </div>

        <Popper
          v-for="(activity_data, activity_index) in orbit_data.activities_data" :key="activity_index"
          hover offsetDistance="30"
          @open:popper="increaseZIndex(orbit_index)"
          @close:popper="resetZIndex(orbit_index)"
          :style="{
            position: 'absolute',
            top: activity_data.styles.top,
            left: activity_data.styles.left,
          }">
          <!-- <button >Trigger element</button> -->
          <div class="activity flex justify-center items-center shadow-2xl"
            :style="{
              height: activity_data.styles.height,
              width: activity_data.styles.width,
              // background: activity_data.styles.background
            }"
            @click="onActivityClick(activity_data.activity.id)">
              <!-- {{ orbit_index }} -->

              <!-- <EnvelopeIcon class="size-6" v-if="activity_data.activity.category == 'email'" />
              <CalendarDaysIcon class="size-6" v-if="activity_data.activity.category == 'event'" /> -->

              <img class="h-full w-full" :src="getProfilePictureSrc(activity_data.activity.people[0].profile_picture?.url)" alt="" v-if="activity_data.activity.people.length">
              <svg v-else
                class="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>

          </div>
          
          <template #content>
            <!-- <div>This is the Popper content</div> -->
            
            <ActivityDebugCard
              :orbit_index="orbit_index"
              :orbit_data="orbit_data"
              :activity_index="activity_index"
              :activity_data="activity_data"
              class="min-w-80" v-if="orbit_data.debug_data" />

            <ActivityCard :activity="activity_data.activity" class="min-w-80" />
          </template>
        </Popper>

      </div>
    </div>
  </div>
</template>

<script>
  import Popper from "vue3-popper";
  import ActivityCard from "./ActivityCard.vue"
  import ActivityDebugCard from "./ActivityDebugCard.vue"
  import { EnvelopeIcon, CalendarDaysIcon } from '@heroicons/vue/20/solid'
  import { getProfilePictureSrc } from '../utilities/url_manipulation'

  const WHEEL_SENSITIVITY = 1;
  const SCROLL_THROLLING_INTERVAL = 100;

  export default {
    props: ['drawOrbitsData', 'changeDays', 'onActivityClick'],
    components: {
      Popper,
      EnvelopeIcon, CalendarDaysIcon,
      ActivityCard, ActivityDebugCard,
    },

    data() {
      return {
        lastCall: 0,
        // Use this to prevent orbit scroll so you scroll
        // through the content of the poppover instead
        allowOrbitScroll: true,

        touchPos: null,
        getProfilePictureSrc,
      }
    },

    // Methods are functions that mutate state and trigger updates.
    // They can be bound as event handlers in templates.
    methods: {
      increaseZIndex(index) {
        this.$refs[`orbit_${index}`][0].style.zIndex = '1000',
        this.allowOrbitScroll = false;
      },
      resetZIndex(index) {
        this.$refs[`orbit_${index}`][0].style.zIndex = 'unset';
        this.allowOrbitScroll = true;
      },
      handleWheelScroll(event) {
        // <<<<<<<<>>>>>>>
        // + https://chatgpt.com/share/677791e2-e588-8004-a41d-3245760a3749 (2. Throttling)
        const now = Date.now();
        // if (now - this.lastCall < 50) return; // Throttle to 50ms intervals
        if (now - this.lastCall < SCROLL_THROLLING_INTERVAL) return; // Throttle to 50ms intervals
        this.lastCall = now;
        // <<<<<<<<>>>>>>>

        event.preventDefault();

        // console.log(event);
        // console.log(event.deltaY);

        if(this.allowOrbitScroll) {

          if(event.deltaY > WHEEL_SENSITIVITY) {
            // console.log('bottom -> top');
            // SCROLLING DOWN
            
            const gesture = {
              direction: 'BOTTOM_TO_TOP',
            }
            this.changeDays(gesture);
          }

          if(event.deltaY < - WHEEL_SENSITIVITY) {
            // console.log('top -> bottom');
            // SCROLLING UP
            
            const gesture = {
              direction: 'TOP_TO_BOTTOM',
            }
            this.changeDays(gesture);
          }

        }
      },

      // detect wether the "old" touchPos is 
      // greater or smaller than the newTouchPos
      handleTouch(e) {
        // <<<<<<<<>>>>>>>
        // + https://chatgpt.com/share/677791e2-e588-8004-a41d-3245760a3749 (2. Throttling)
        const now = Date.now();
        // if (now - this.lastCall < 50) return; // Throttle to 50ms intervals
        if (now - this.lastCall < SCROLL_THROLLING_INTERVAL) return; // Throttle to 50ms intervals
        this.lastCall = now;
        // <<<<<<<<>>>>>>>
        
        // + https://stackoverflow.com/questions/36596562/detect-touch-scroll-up-or-down/68074918#68074918
        let newTouchPos = e.changedTouches[0].clientY;
        if(newTouchPos > this.touchPos) {
            // console.log("finger moving down");
            const gesture = {
              direction: 'TOP_TO_BOTTOM',
            }
            this.changeDays(gesture);
        }
        if(newTouchPos < this.touchPos) {
            // console.log("finger moving up");
            const gesture = {
              direction: 'BOTTOM_TO_TOP',
            }
            this.changeDays(gesture);
        }
      },
    },

    // Lifecycle hooks are called at different stages
    // of a component's lifecycle.
    // This function will be called when the component is mounted.
    mounted() {
      // console.log(`The initial count is ${this.count}.`)
      this.$refs.orbit_wrapper.onwheel = this.handleWheelScroll;

      // <<<<<<<>>>>>>>>
      // + https://stackoverflow.com/questions/36596562/detect-touch-scroll-up-or-down/68074918#68074918
      // store the touching position at the start of each touch
      this.$refs.orbit_wrapper.ontouchstart  = (e) => {
        this.touchPos = e.changedTouches[0].clientY;
      };
      this.$refs.orbit_wrapper.ontouchmove = this.handleTouch
      // <<<<<<<>>>>>>>>
    }
    
  }
</script>

<style>
  /* body {
      height: 100vh;
      margin: 0;
  } */

  #orbit-container {
      height: 100%;
      min-height: 50vh;
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
      background: white;
      border-radius: 50%;
  }

  #orbit-wrapper {
      height: 100%;
      width: 100%;
  }

  .orbit {
      position: absolute;
      /* bottom: 0%; */
      left: 50%;
      /* transform: translate(-50%); */
      
      /* border-left: 1px solid black;
      border-top: 1px solid black; */
      border-color: 'black';
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
    background: white;
    cursor: pointer;
    overflow: hidden;
  }

  .activity:hover {
    background: hsl(206, 86%, 90%);
  }
</style>


<!-- References -->
<!-- https://tailwind-ui-two.vercel.app/components/application-ui/forms/form-layouts#component-30dffb06e58cdbe872820ed3f943d85a -->