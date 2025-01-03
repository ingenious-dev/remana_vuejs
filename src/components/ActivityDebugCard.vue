<template>
    <div class="border-t border-b border-gray-200 bg-white shadow-sm sm:rounded-lg sm:border w-full relative">

        <div class="p-2">
            <div class="flex justify-between">
                <span>Orbit Index</span>
                <span>{{ orbit_index }}</span>
            </div>
            <div class="flex justify-between">
                <span>Orbit Radius</span>
                <span>{{ orbit_data.debug_data.orbit_radius }}</span>
            </div>
            <div class="flex justify-between">
                <span>Orbit Acitivities</span>
                <span>{{ orbit_data.activities_data.length }}</span>
            </div>
              <hr>
            <div class="flex justify-between">
                <span>Index</span>
                <span>{{ activity_index }}</span>
            </div>
            <div class="flex justify-between">
                <span>Angle Interval</span>
                <span>{{ activity_data.debug_data.angle_interval }}</span>
            </div>
            <div class="flex justify-between">
                <span>Angle</span>
                <span>{{ activity_data.debug_data.degrees }}</span>
            </div>
            <div class="flex justify-between">
                <span>X</span>
                <span>{{ activity_data.debug_data.x_axis }}</span>
            </div>
            <div class="flex justify-between">
                <span>Y</span>
                <span>{{ activity_data.debug_data.y_axis }}</span>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        props: ['orbit_index', 'orbit_data', 'activity_index', 'activity_data'],
    }
</script>