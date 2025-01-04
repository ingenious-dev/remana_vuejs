<template>
    <li class="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow">
      <div class="flex flex-1 flex-col p-8 cursor-pointer" @click="onEdit(person.id)">
        <img class="mx-auto h-32 w-32 flex-shrink-0 rounded-full" :src="profilePictureSrc" alt="" v-if="profilePictureSrc" />
        <svg v-else
          class="mx-auto h-32 w-32 flex-shrink-0 rounded-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
        <h3 class="mt-6 text-sm font-medium text-gray-900">{{ person.name }}</h3>
        <dl class="mt-1 flex flex-grow flex-col justify-between">
          <!-- <dt class="sr-only">Title</dt>
          <dd class="text-sm text-gray-500">{{ person.title }}</dd> -->
          <dt class="sr-only">Role</dt>
          <dd class="mt-3">
            <span class="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">{{ person.role }}</span>
          </dd>
        </dl>
      </div>
      <div>
        <div class="-mt-px flex divide-x divide-gray-200">
          <div class="flex w-0 flex-1 cursor-pointer" v-if="person.email">
            <a :href="`mailto:${person.email}`" class="relative -mr-px inline-flex w-0 flex-1 items-center justify-center rounded-bl-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500">
              <EnvelopeIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
              <span class="ml-3">Email</span>
            </a>
          </div>
          <div class="-ml-px flex w-0 flex-1 cursor-pointer" v-if="person.phone_number">
            <a :href="`tel:${person.phone_number}`" class="relative inline-flex w-0 flex-1 items-center justify-center rounded-br-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500">
              <PhoneIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
              <span class="ml-3">Call</span>
            </a>
          </div>
        </div>
      </div>
    </li>
</template>

<script>
    import { EnvelopeIcon, PhoneIcon } from '@heroicons/vue/20/solid'
    import { API_V1_CANNONICAL } from '../network/network_info';
    
    export default {
      props: ['person', 'onEdit'],
      components: {
          EnvelopeIcon, PhoneIcon,
      },
      computed: {
        profilePictureSrc() {
          // `this` points to the component instance
          // return this.$store.state.products;
          const url = this.person.profile_picture?.url
          if(url) {
            return url.includes("http") ? url : `${API_V1_CANNONICAL}${url}`
          }
        },
      },
    }
</script>

<!-- References -->
<!-- https://tailwind-ui-two.vercel.app/components/application-ui/lists/grid-lists#component-5d72b187beb968e12db89fe49f272b18 -->