<template>
    <TransitionRoot as="template" :show="open">
        <Dialog as="div" class="relative z-10" @close="closeSideBar">
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
                                <button type="button" class="rounded-md bg-indigo-700 text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white" @click="closeSideBar">
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
                            <button type="button" class="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" @click="closeSideBar">Cancel</button>
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

    import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
    import { XMarkIcon } from '@heroicons/vue/24/outline'
    import { LinkIcon, PlusIcon, QuestionMarkCircleIcon } from '@heroicons/vue/20/solid'
    import { Switch, SwitchDescription, SwitchGroup, SwitchLabel } from '@headlessui/vue'
    import { ExclamationTriangleIcon } from '@heroicons/vue/24/outline'
    import VueTailwindDatepicker from "vue-tailwind-datepicker";
    import _ from 'lodash-es'
    import { Bars3Icon } from '@heroicons/vue/24/outline'

    export default {
        props: ['selectedId', 'closeSlideOver', 'openSlideOver'],
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

            Switch,
            SwitchDescription,
            SwitchGroup,
            SwitchLabel,

            ExclamationTriangleIcon,
            VueTailwindDatepicker,

            Bars3Icon,
        },

        data() {
            return {
                // open: false,
                // selectedId: null,
                deleteId: null,
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
            open() {
                return this.openSlideOver;
            },
            activityIsLoading() {
                return this.$store.getters.activityIsLoading;
            },
            activities() {
                // `this` points to the component instance
                // return this.$store.state.activities;
                return this.$store.getters.activities;
            },
            currentActivity() {
                return this.activities.find(element => element.id === this.selectedId);
            },

            newOrEdit() {
                return this.selectedId ? 'Edit' : 'New';
            },
        },

        watch: {
            // whenever question changes, this function will run
            selectedDates(newValue, oldValue) {
                // console.log(newValue)
                if(newValue.length) {
                this.date_of_activity = this.$moment(newValue[0]).format("YYYY-MM-DD");
                }
            },
            currentActivity(newValue, oldValue) {
                // console.log(newValue)
                this.openSideBar(this.selectedId)

                // <<<<<<>>>>>
                // Since 'closeSideBar' is called when Activity Slideover
                // is closed when the delete confirmation button is pressed
                // on the delete modal, 'deleteId' will be used since 'closeSideBar'
                // should ideally have unset 'selectedId'. The check for 'newValue'
                // here guarantee 'deleteId' will not be null which is why were are
                // not using 'deleteId' in the first place because itself will be null
                // at the time of clicking the delete confirm button.
                if(newValue) {
                    this.deleteId = this.selectedId;
                }
                // <<<<<<>>>>>
            },
        },

        // Methods are functions that mutate state and trigger updates.
        // They can be bound as event handlers in templates.
        methods: {
            openSideBar(id) {
                // this.selectedId = id;
                if(id) {
                    this.setForm(this.currentActivity)
                } else {
                    this.setForm({})
                }
                // this.open = true
            },
            closeSideBar(id) {
                // this.open = false
                this.closeSlideOver()
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
                    // participants_event_users: this.participants_event_users,
                    // participants_emails: this.participants_emails,
                }
                
                if(this.selectedId) {
                    await this.$store.dispatch('updateActivity', {id: this.selectedId, data: data});
                } else {
                    await this.$store.dispatch('createActivity', data);
                    this.closeSideBar();
                }
            },
            async deleteActivity() {
                await this.$store.dispatch('deleteActivity', {id: this.deleteId});
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
    }
</script>