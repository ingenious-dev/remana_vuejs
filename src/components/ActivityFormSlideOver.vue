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
                            <div class="h-0 flex-1 flex flex-col overflow-y-auto">

                                <div class="relative border-b border-gray-200 pb-5 sm:pb-0 pt-6 px-4 sm:px-6">
                                    <div class="md:flex md:items-center md:justify-between">
                                        <!-- <h3 class="text-lg font-medium leading-6 text-gray-900">Candidates</h3> -->
                                        <p class="text-sm text-gray-900">Fill in the information below to {{ this.selectedId ? "update" : "create" }} your new activity.</p>
                                        <!-- <div class="mt-3 flex md:absolute md:top-3 md:right-0 md:mt-0">
                                            <button type="button" class="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Share</button>
                                            <button type="button" class="ml-3 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Create</button>
                                        </div> -->
                                    </div>
                                    <div class="mt-4 flex justify-between">
                                        <div class="sm:hidden">
                                            <label for="current-tab" class="sr-only">Select a tab</label>
                                            <select id="current-tab" name="current-tab"
                                                class="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                v-model="selectedTab">
                                                <option v-for="tab in tabs" :key="tab">{{ tab }}</option>
                                            </select>
                                        </div>
                                        <div class="hidden sm:block">
                                            <nav class="-mb-px flex space-x-8">
                                            <a v-for="tab in tabs" :key="tab" href="#"
                                                :class="[tab == selectedTab ?
                                                'border-indigo-500 text-indigo-600'
                                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300', 'whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm']"
                                                :aria-current="tab ? 'page' : undefined"
                                                @click="(e) => { e.preventDefault(); selectedTab = tab; }">{{ tab }}</a>
                                            </nav>
                                        </div>
                                        <div class="ml-3 flex h-7 items-center">
                                            <button type="button" class="rounded-md bg-indigo-700 text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white" @click="closeSideBar">
                                                <span class="sr-only">Close panel</span>
                                                <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div class="flex flex-1 flex-col justify-between">
                                    <div class="divide-y divide-gray-200 px-4 sm:px-6 h-full" v-if="selectedTab == 'Activity'">
                                        <div class="space-y-6 pt-6 pb-5 h-full overflow-y-auto">
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

                                            </div>
                                        </div>
                                    </div>
                                    <div class="divide-y divide-gray-200 px-4 sm:px-6 h-full" v-if="selectedTab == 'Details'">
                                        <div class="space-y-6 pt-6 pb-5 h-full">
                                            <div class="h-full flex flex-col">
                                                <label for="agenda_or_body" class="block text-sm font-medium text-gray-900">
                                                    {{ catagoryString }}
                                                </label>
                                                <div class="mt-1 flex-1">
                                                    <textarea id="agenda_or_body" name="agenda_or_body" rows="4"
                                                        class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-full"
                                                        v-model="agenda_or_body" required />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="divide-y divide-gray-200 px-4 sm:px-6 h-full" v-if="selectedTab == 'People'">
                                        <div class="space-y-6 pt-6 pb-5 h-full flex flex-col">

                                            <!-- + https://vue-multiselect.js.org/#sub-asynchronous-select -->
                                            <div>
                                                <label class="typo__label" for="ajax">Select people</label>
                                                <multiselect v-model="selectedPeople"
                                                    id="ajax" label="name" track-by="id" placeholder="Type to search" open-direction="bottom"
                                                    :options="peopleOptions" :multiple="true"
                                                    :searchable="true" :loading="isLoading"
                                                    :internal-search="false" :clear-on-select="true"
                                                    :close-on-select="false" :options-limit="300"
                                                    :limit="3" :limit-text="limitText"
                                                    :max-height="600" :show-no-results="false"
                                                    :hide-selected="true" @search-change="asyncFind" >
                                                    <template #tag="{ option, remove }">
                                                        <span class="custom__tag">
                                                            <span>{{ option.name }}</span>
                                                            <span class="custom__remove" @click="remove(option)">❌</span>
                                                        </span>
                                                    </template>
                                                    <template #clear="props">
                                                        <div class="multiselect__clear"
                                                            v-if="selectedPeople.length"
                                                            @mousedown.prevent.stop="clearAll(props.search)"></div>
                                                    </template>
                                                    <template #noResult>
                                                        <span>Oops! No elements found. Consider changing the search query.</span>
                                                    </template>
                                                </multiselect>
                                                <!-- <pre class="language-json"><code>{{ selectedPeople }}</code></pre> -->
                                            </div>

                                            <div class="flex-1">
                                                <ul role="list" class="divide-y divide-gray-200"
                                                    v-if="selectedPeople.length">
                                                    <li v-for="person in selectedPeople" :key="person.id">
                                                        <div class="group relative flex items-center py-6 px-5">
                                                            <a href="#" class="-m-1 block flex-1 p-1">
                                                                <div class="absolute inset-0 group-hover:bg-gray-50" aria-hidden="true" />
                                                                <div class="relative flex min-w-0 flex-1 items-center">
                                                                    <span class="relative inline-block flex-shrink-0">
                                                                        <img class="h-10 w-10 rounded-full" :src="getProfilePictureSrc(person.profile_picture?.url)" alt="" />
                                                                        <!-- <span :class="[person.status === 'online' ? 'bg-green-400' : 'bg-gray-300', 'absolute top-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white']" aria-hidden="true" /> -->
                                                                    </span>
                                                                    <div class="ml-4 truncate">
                                                                        <p class="truncate text-sm font-medium text-gray-900">{{ person.name }}</p>
                                                                        <p class="truncate text-sm text-gray-500">{{ person.email }}</p>
                                                                    </div>
                                                                </div>
                                                            </a>
                                                            <button type="button" class="ml-6 rounded-md bg-white text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 z-10"
                                                                @click="removePerson(person.id)">Remove<span class="sr-only"> {{ person.name }}</span></button>
                                                        </div>
                                                    </li>
                                                </ul>
                                                <div class="text-center mt-6" v-else>
                                                    <svg class="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                                                    </svg>

                                                    <h3 class="mt-2 text-sm font-medium text-gray-900">No people</h3>
                                                    <p class="mt-1 text-sm text-gray-500">The people will be listed when selected.</p>
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
    import Multiselect from 'vue-multiselect'
    import { fetchPersons } from '../services/persons'
    import { getProfilePictureSrc } from '../utilities/url_manipulation'

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
            Multiselect,
        },

        data() {
            return {
                tabs: [
                    "Activity", "Details", "People",
                ],
                selectedTab: "Activity",

                // open: false,
                // selectedId: null,
                deleteId: null,
                errors: [],
                category: '',
                subject: '',
                agenda_or_body: '',
                date_of_activity: '',
                location: '',
                // participants_event_users: [],
                // participants_emails: [],

                selectedDates: [],
                
                selectedPeople: [],
                peopleOptions: [],
                isLoading: false,

                openModal: false,
                openModalError: false,
                modalErrorMessage: '',

                getProfilePictureSrc,
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

            catagoryString() {
                return this.category == 'event' ? 'Agenda' : 'Body'
            }
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
                
                this.selectedPeople = newValue?.people ?? []
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
                this.selectedTab = "Activity"
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
                // this.participants_event_users = item.participants_event_users;
                // this.participants_emails = item.participants_emails;

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
                    people: this.selectedPeople.map((e) => { return e.id; }),
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

                if (!this.category) {
                    this.errors.push('Catagory required.');
                }
                if (!this.subject) {
                    this.errors.push('Subject required.');
                }
                if (!this.agenda_or_body) {
                    this.errors.push(`${this.catagoryString} required.`);
                }
                if (!this.date_of_activity) {
                    this.errors.push('Date required.');
                }
                if (!this.location) {
                    this.errors.push('Location required.');
                }
                if (!this.selectedPeople.length) {
                    this.errors.push('People required.');
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

            limitText (count) {
                return `and ${count} other people`
            },
            asyncFind (query) {
                // console.log(query)
                this.isLoading = true
                fetchPersons({keyword: query})
                    .then(response => {
                        this.peopleOptions = response
                    })
                    .catch(error => {
                        this.$store.dispatch('showAlert', {title: 'Error!', message: error.message, status: 'error'})
                    })
                    .finally(() => {
                        this.isLoading = false
                    })
            },
            clearAll () {
                this.selectedPeople = []
            },
            removePerson(id) {
                const array = this.selectedPeople;
                // + https://stackoverflow.com/questions/5767325/how-can-i-remove-a-specific-item-from-an-array-in-javascript/5767357#5767357
                const index = array.findIndex((x) => x.id === id);
                if (index > -1) { // only splice array when item is found
                    array.splice(index, 1); // 2nd parameter means remove one item only
                }
                this.selectedPeople = array;
            }
        },

        // Lifecycle hooks are called at different stages
        // of a component's lifecycle.
        // This function will be called when the component is mounted.
        mounted() {
            this.asyncFind();
        }
    }
</script>

<!-- Add Multiselect CSS. Can be added as a static asset or inside a component. -->
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<!-- References -->
<!-- https://tailwind-ui-two.vercel.app/components/application-ui/headings/section-headings#component-3783741bf2b1859f7a43f4a191f22acc -->
<!-- https://vue-multiselect.js.org/#sub-asynchronous-select -->
<!-- https://tailwind-ui-two.vercel.app/components/application-ui/overlays/slide-overs#component-e925f5b20e7d4110cc16920f1cf1a6fc -->