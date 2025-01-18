<template>
    <TitleDynamic :title="$t('SCHEDULE')" heading="h1" />
    <div>
        <AppSpan :text="$t('SCHEDULE_INTRO_ONE')" /> <br>
        <AppSpan :text="$t('SCHEDULE_INTRO_TWO')" />
        <div class="icon-container relative inline-block">
            <IconsSun class="icon absolute" />
        </div>
        <AppSpan :text="$t('SCHEDULE_INTRO_THREE')" />
        <div class="icon-container relative inline-block">
            <IconsRain class="icon absolute" />
        </div>
        <AppSpan :text="$t('SCHEDULE_INTRO_FOUR')" />
    </div>

    <div class="responsive-grid-custom flex flex-column gap-2">
        <div class="flex flex-column gap-1_5">
            <div class="flex justify-between">
                <TitleDynamic heading="h2" :title="`8 ${$t('AUGUST')} 2026`" />
                <div class="flex items-center">
                    <IconsRain class="icon-rain" />
                    <AppToggle :checked="checked" @click="onClick" />
                    <IconsSun />
                </div>
            </div>
            <div class="time-table flex flex-column gap-1">
                <AppTimeTable v-for="event in timeTableDayOne" :key="event.title" v-bind="event" />
            </div>
        </div>

        <hr>

        <div class="flex flex-column gap-1_5">
            <TitleDynamic class="title-second-day" heading="h2" :title="`9 ${$t('AUGUST')} 2026`" />
            <AppTimeTable v-for="event in timeTableDayTwo" :key="event.title" v-bind="event" />
        </div>
    </div>

</template>

<script setup lang="ts">
const timeTableDayOne = computed(() => {
    return [
        {
            time: '15:00 - 16:00',
            title: 'WELCOMING',
            description: 'WELCOMING_DESCRIPTION',
            location: checked.value ? 'Fumoir + Bistro 2, 3' : 'Park terrace'
        },
        {
            time: '16:00 - 17:00',
            title: 'CEREMONY',
            description: 'CEREMONY_DESCRIPTION',
            location: checked.value ? 'Ballroom' : 'Park'
        },
        {
            time: '17:00 - 19:00',
            title: 'RECEPTION',
            description: 'RECEPTION_DESCRIPTION',
            location: checked.value ? 'Fumoir + Bistro 2, 3' : 'Park terrace'
        },
        {
            time: '19:00 - 22:00',
            title: 'DINNER',
            description: 'DINNER_DESCRIPTION',
            location: checked.value ? 'Ballroom' : 'Patio'
        },
        {
            time: '22:00 - 03:00',
            title: 'PARTY',
            description: 'PARTY_DESCRIPTION',
            location: 'Fumoir + Bistro 2, 3 + red room'
        }
    ]
})

const timeTableDayTwo = [
    {
        time: '08:00 - 11:00',
        title: 'BREAKFAST',
        description: 'BREAKFAST_DESCRIPTION',
        location: 'Ballroom'
    },
    {
        time: '08:00 - 11:00',
        title: 'CHECKOUT',
        description: 'CHECKOUT_DESCRIPTION',
        location: 'Reception'
    }
]

const checked = ref(false)

function onClick(value: boolean) {
    checked.value = value
}
</script>

<style scoped>
.icon-container {
    width: 40px;
}

.icon-container .icon{
    bottom: -16px;
}

.icon-rain {
    transform: translateY(3px);
}


@media screen and (min-width: 768px) {
    .responsive-grid-custom {
        display: grid;
        grid-template-columns: 1fr 1px 1fr;
    }

    .title-second-day {
        height: 40px;
    }
}

@media screen and (min-width: 1024px) {
    .responsive-grid-custom {
        display: grid;
        grid-template-columns: 1fr 1px .5fr;
    }

    .time-table {
        display: grid;
        grid-template-columns: 1fr 1fr;
    }
}
</style>