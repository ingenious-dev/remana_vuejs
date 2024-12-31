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
  <div class="bg-white">
    <div class="mx-auto max-w-lg py-16 px-4 sm:py-12 sm:px-6 lg:px-8">

      <form class="space-y-8 divide-y divide-gray-200" @submit.prevent="checkForm()">
        <div class="space-y-8 divide-y divide-gray-200">
          <div>
            <div>
              <h3 class="text-lg font-medium leading-6 text-gray-900">Profile</h3>
              <p class="mt-1 text-sm text-gray-500">This information will be displayed publicly so be careful what you share.</p>
            </div>
    
            <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <!-- Changing the email is probably more elaborate than this -->
              <!-- <div class="sm:col-span-4">
                <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                <div class="mt-1">
                  <input id="email" name="email" type="email" autocomplete="email" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  v-model="email" required />
                </div>
              </div> -->

              <div class="sm:col-span-6">
                <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
                <div class="mt-1">
                  <input id="text" name="name" type="name" autocomplete="name" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  v-model="name" required />
                </div>
              </div>

              <div class="sm:col-span-6">
                <label for="bio" class="block text-sm font-medium text-gray-700">Bio</label>
                <div class="mt-1">
                  <textarea id="bio" name="bio" rows="3" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  v-model="bio" />
                </div>
                <p class="mt-2 text-sm text-gray-500">Write a few sentences about yourself.</p>
              </div>

              <div class="sm:col-span-6">
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
                    <input id="profile_picture" name="profile_picture" type="file" class="absolute top-0 left-0 h-full w-full cursor-pointer opacity-0" accept=".png, .jpg, .jpeg" ref="profile_picture_input" />
                  </label>
                </div>
              </div>
    
            </div>
          </div>
    
          <div class="pt-8">
            <div>
              <h3 class="text-lg font-medium leading-6 text-gray-900">Preferences</h3>
              <p class="mt-1 text-sm text-gray-500">User preference settings.</p>
            </div>
            <div class="mt-6">
              <fieldset>
                <legend class="sr-only">By Email</legend>
                <div class="text-base font-medium text-gray-900" aria-hidden="true">By Email</div>
                <div class="mt-4 space-y-4">
                  <div class="relative flex items-start">
                    <div class="flex h-5 items-center">
                      <input id="display_empty_spaces" name="display_empty_spaces" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      v-model="display_empty_spaces" />
                    </div>
                    <div class="ml-3 text-sm">
                      <label for="display_empty_spaces" class="font-medium text-gray-700">Empty Spaces</label>
                      <p class="text-gray-500">Enable or disable the display of empty spaces in the activity list.</p>
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>
    
        <div class="pt-5">
          <div class="flex justify-end">
            <!-- <button type="button" class="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Cancel</button> -->
            <button type="submit" class="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Save</button>
          </div>
        </div>
      </form>

    </div>
  </div>
</template>

<script>
import { API_V1_CANNONICAL } from '../../network/network_info';

    export default {

        data() {
            return {
                files: [
                    {
                        title: 'IMG_4985.HEIC',
                        size: '3.9 MB',
                        source:
                        'https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80',
                    },
                    // More files...
                ],
                selectedId: null,
                errors: [],
                email: '',
                name: '',
                profile_picture: '',
                bio: '',
                display_empty_spaces: false,

                profilePictureSrc: null,
            }
        },

        computed: {
            user() {
              // `this` points to the component instance
              // return this.$store.state.products;
              return this.$store.getters.user;
            },
        },
        watch: {
          // whenever question changes, this function will run
          user(newUser, oldUser) {
            if (newUser) {
              this.setForm(newUser)
              const url = newUser.profile_picture?.url
              if(url) {
                this.profilePictureSrc = url.includes("http") ? url : `${API_V1_CANNONICAL}${url}`
                console.log(this.profilePictureSrc)
              }
            }
          }
        },

        // Methods are functions that mutate state and trigger updates.
        // They can be bound as event handlers in templates.
        methods: {
            setForm(item) {
                this.email = item.email;
                this.name = item.name;
                // this.profile_picture = item.profile_picture;
                this.bio = item.bio;
                this.display_empty_spaces = item.display_empty_spaces;
            },
            async save() {
                // OPTION 1 - does not support file upload
                // const data = {
                //     // email: this.email,
                //     name: this.name,
                //     profile_picture: this.profile_picture,
                //     bio: this.bio,
                //     display_empty_spaces: this.display_empty_spaces,
                // }
                // await this.$store.dispatch('updateUser', data);

                // OPTION 2 - supports file upload
                // TODO https://stackoverflow.com/questions/43013858/how-to-post-a-file-from-a-form-with-axios/43014086#43014086
                var formData = new FormData();
                // var imagefile = form.querySelector('[name="profile_picture"]');
                var imagefile = this.$refs.profile_picture_input;
                if(imagefile.files.length) {
                  formData.append("profile_picture", imagefile.files[0]);
                }
                formData.append('name', this.name);
                formData.append('bio', this.bio);
                formData.append('display_empty_spaces', this.display_empty_spaces);

                await this.$store.dispatch('updateUser', formData);
            },
            // TODO https://v2.vuejs.org/v2/cookbook/form-validation#Base-Example
            checkForm (e) {
                this.errors = [];

                // if (!this.bio) {
                //   this.errors.push('Date required.');
                // }
                
                if(this.errors.length) {
                // e.preventDefault();

                this.openModalError = true;
                // this.modalErrorMessage = 'Chat socket closed unexpectedly'
                } else {
                  this.save()
                }
                
            },
        },

        // Lifecycle hooks are called at different stages
        // of a component's lifecycle.
        // This function will be called when the component is mounted.
        mounted() {
            // console.log(`The initial count is ${this.count}.`)
            if(this.user) {
              this.setForm(this.user);
              const url = this.user.profile_picture?.url
              if(url) {
                this.profilePictureSrc = url.includes("http") ? url : `${API_V1_CANNONICAL}${url}`
              }
            }

            const imgInp = this.$refs.profile_picture_input;
            imgInp.onchange = evt => {
              const [file] = imgInp.files
              if (file) {
                this.profilePictureSrc = URL.createObjectURL(file)
              } else {
                this.profilePictureSrc = null
              }
            }
        }
    }
</script>

<!-- References -->
<!-- https://tailwind-ui-two.vercel.app/components/application-ui/forms/form-layouts#component-30dffb06e58cdbe872820ed3f943d85a -->
<!-- https://tailwind-ui-two.vercel.app/components/application-ui/page-examples/settings-screens#component-c29fe3f9f780c97a58f08453fc6bbec8 -->