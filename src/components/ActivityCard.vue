<template>
    <div class="border-t border-b border-gray-200 bg-white shadow-sm sm:rounded-lg sm:border w-full relative">

        <div class="flex items-center p-2 bg-slate-100">
            <div class="flex-shrink-0">
                <div>
                    <div class="h-14 w-14 rounded-full overflow-hidden">
                        <!-- <EnvelopeIcon v-if="activity.category == 'email'" />
                        <CalendarDaysIcon v-if="activity.category == 'event'" /> -->

                        <img class="h-full w-full" :src="getProfilePictureSrc(activity.people[0].profile_picture?.url)" alt="" v-if="activity.people.length">
                        <svg v-else
                            class="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                    </div>
                </div>
            </div>
            <div class="ml-3">
                <!-- <p class="text-sm font-medium text-gray-900">
                <a :href="post.author.href">{{ post.author.name }}</a>
                </p> -->
                <!-- <div class="flex space-x-1 text-sm text-gray-500">
                <time :datetime="post.datetime">{{ post.date }}</time>
                <span aria-hidden="true">&middot;</span>
                <span>{{ post.readingTime }} read</span>
                </div> -->

                <div v-if="activity.people.length">
                    <p class="text-sm font-medium text-gray-900">
                        <a href="#">{{ activity.people[0].name }}</a>
                    </p>
                    <p class="text-xs font-medium text-gray-500">
                        <a href="#">{{ activity.people[0].role }}</a>
                    </p>
                    <p class="text-xs font-small text-gray-500">
                        <a href="#">{{ activity.location }}</a>
                    </p>
                </div>

                <div class="flex flex-wrap items-center mt-2">
                    <!-- + https://www.creative-tim.com/twcomponents/component/tailwind-css-avatar-stack-by-material-tailwind -->
                    <div class="flex items-center -space-x-2">
                        <img v-for="(person, index) in activity.people" :key="index"
                        class="relative inline-block h-5 w-5 rounded-full border-2 border-white object-cover object-center hover:z-10 focus:z-10" :src="getProfilePictureSrc(person.profile_picture?.url)" alt="">
                    </div>
                    <div class="text-xs ml-1">
                        {{ getPeopleNames(activity.people) }}
                    </div>
                </div>
            </div>
        </div>
        <div class="m-2 p-2 max-h-52 overflow-auto bg-slate-100 rounded-md">
            <div class="flex space-x-1 text-xs text-gray-500 justify-between">
                <time :datetime="activity.date_of_activity">{{ $moment(activity.date_of_activity).format("dddd, MMMM D, YYYY [at] h:mm a Z") }}</time>
                <span>{{ $moment(activity.date_of_activity).fromNow() }}</span>
            </div>
            <div class="mt-1 block">
                <p class="text-sm font-semibold text-gray-900">{{ activity.subject }}</p>
                <p class="text-sm text-gray-500">{{ truncateString(activity.agenda_or_body, 40) }}</p>
            </div>
        </div>

    </div>
</template>

<script>
    import { EnvelopeIcon, CalendarDaysIcon } from '@heroicons/vue/20/solid'
    import { getProfilePictureSrc } from '../utilities/url_manipulation'

    export default {
        props: ['activity',],
        components: {
            EnvelopeIcon, CalendarDaysIcon,
        },

        data() {
            return {
                getProfilePictureSrc,
            }
        },

        // Methods are functions that mutate state and trigger updates.
        // They can be bound as event handlers in templates.
        methods: {
            getPeopleNames(people) {
                if(people.length > 2) {
                    return `${people.slice(0, 2).map((e) => { return e.name }).join(",")} and ${people.length} other people`;
                } else {
                    return people.map((e) => { return e.name }).join(",");
                }
            },
            truncateString(str, num) {
                // + https://stackoverflow.com/questions/1301512/truncate-a-string-straight-javascript
                if (str.length > num) {
                    return str.slice(0, num) + "...";
                } else {
                    return str;
                }
            }
        }
    }
</script>