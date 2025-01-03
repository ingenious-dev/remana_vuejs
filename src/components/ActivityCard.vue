<template>
    <div class="border-t border-b border-gray-200 bg-white shadow-sm sm:rounded-lg sm:border w-full relative">

        <div class="flex items-center p-2 bg-slate-50">
            <div class="flex-shrink-0">
                <div>
                    <div class="h-10 w-10 rounded-full">
                        <EnvelopeIcon v-if="activity.category == 'email'" />
                        <CalendarDaysIcon v-if="activity.category == 'event'" />
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
                <div class="flex space-x-1 text-sm text-gray-500">
                {{ activity.location }}
                </div>
            </div>
        </div>
        <div class="m-2 max-h-52 overflow-auto">
            <div class="flex space-x-1 text-sm text-gray-500 justify-between">
                <time :datetime="activity.date_of_activity">{{ activity.date_of_activity }}</time>
                <span>{{ $moment(activity.date_of_activity).fromNow() }}</span>
            </div>
            <div class="mt-3 block">
                <p class="text-xl font-semibold text-gray-900">{{ activity.subject }}</p>
                <p class="text-base text-gray-500">{{ activity.agenda_or_body }}</p>
            </div>
        </div>

    </div>
</template>

<script>
    import { EnvelopeIcon, CalendarDaysIcon } from '@heroicons/vue/20/solid'
    
    export default {
        props: ['activity',],
        components: {
            EnvelopeIcon, CalendarDaysIcon,
        },
    }
</script>