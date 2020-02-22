<template>
    <div class="home text-center">
        <h1>GPS</h1>
        <div v-for="[key, value] in Object.entries(coordinates)" :key="key">
            {{ key }}: {{ value }}
            <br>
        </div>
        <p v-if="isOnline">
            ONLINE
        </p>
        <p v-if="isOffline">
            OFFLINE
        </p>
    </div>
</template>

<script>
import format from 'date-fns/format';

export default {
    locationID: null,
    name: 'Home',
    data() {
        return {
            coordinates: {},
        };
    },
    created() {
        this.init();
    },
    beforeDestroy() {
        if (!this.$options.locationID) return;
        this.$clearLocationWatch(this.$options.locationID);
    },
    methods: {
        init() {
            const options = {};
            this.$getLocation(options).then(coordinates => {
                this.coordinates = coordinates;
                this.saveLocation(coordinates);
            });
            this.$options.locationID = this.$watchLocation(options).then(
                coordinates => {
                    this.coordinates = coordinates;
                    this.saveLocation(coordinates);
                }
            );
        },
        saveLocation(coordinates) {
            const { lat, lng } = coordinates;
            const today = new Date();
            const todayFormat = format(today, 'yyyy-MM-dd');
            const locations = this.$offlineStorage.get('locations') || {};

            if (locations[todayFormat] == null) {
                locations[todayFormat] = [];
            }

            const duplicate = locations[todayFormat].find(
                l => l.lat === lat && l.lng === lng
            );
            if (duplicate) {
                return;
            }

            const location = {
                ...coordinates,
                date: today,
            };
            locations[todayFormat].push(location);
            this.$offlineStorage.set('locations', locations);
        },
    },
};
</script>
