<template>
  <div id="orbit-container">
    <div id="orbit-center">
      <div class="h-full w-full flex items-center justify-center shadow-2xl">
        <img class="h-4 w-auto" src="/static/remana/icon-transparent.png" alt="" />
      </div>
    </div>
    <div id="orbit-wrapper" ref="orbit_wrapper">
      <div v-for="(orbit_data, orbit_index) in drawOrbitsData" :key="orbit_index"
        class="orbit"
        :style="orbit_data.styles"
        :ref="`orbit_${orbit_index}`"
      >
        <div class="orbit-label text-xs text-gray-500" :style="orbit_data.label_styles">
          <!-- {{ orbit_data.orbit["label"] }} -->
          <time :datetime="orbit_data.orbit['label']">{{ $moment(orbit_data.orbit['label']).format("ddd, MMM D") }}</time>
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
              <EnvelopeIcon class="size-6" v-if="activity_data.activity.category == 'email'" />
              <CalendarDaysIcon class="size-6" v-if="activity_data.activity.category == 'event'" />
          </div>
          
          <template #content>
            <!-- <div>This is the Popper content</div> -->
            <ActivityCard :activity="activity_data.activity" class="md:w-72" />
          </template>
        </Popper>

      </div>
    </div>
  </div>
</template>

<script>
  import Popper from "vue3-popper";
  import ActivityCard from "./ActivityCard.vue"
  import { EnvelopeIcon, CalendarDaysIcon } from '@heroicons/vue/20/solid'

  export default {
    props: ['drawOrbitsData', 'changeDays', 'onActivityClick'],
    components: {
      Popper,
      EnvelopeIcon, CalendarDaysIcon,
      ActivityCard
    },

    data() {
      return {
        // Use this to prevent orbit scroll so you scroll
        // through the content of the poppover instead
        allowOrbitScroll: true
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
        if(this.allowOrbitScroll) {
          this.changeDays(event);
        }
      }
    },

    // Lifecycle hooks are called at different stages
    // of a component's lifecycle.
    // This function will be called when the component is mounted.
    mounted() {
      // console.log(`The initial count is ${this.count}.`)
      this.$refs.orbit_wrapper.onwheel = this.handleWheelScroll;
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
    background: white;
    cursor: pointer;
  }
</style>


<!-- References -->
<!-- https://tailwind-ui-two.vercel.app/components/application-ui/forms/form-layouts#component-30dffb06e58cdbe872820ed3f943d85a -->