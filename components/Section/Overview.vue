<template>
    <div class="flex flex-column items-center gap-1_5">
        <div>
            <TitleDynamic title="Amount coming" heading="h2" />
            <Doughnut :data="dataComing" :options="optionsDoughnut" />
        </div>

        <div>
            <TitleDynamic title="Demographic" heading="h2" />
            <Bar :data="dataDemograhpic" :options="optionsBar" />
        </div>

        <div>
            <TitleDynamic title="Rooms available" heading="h2" />
            <Doughnut :data="dataRooms" :options="optionsDoughnut" />
        </div>

        <AppButton text="Download guestlist" @click="downloadExcel" />
    </div>
</template>

<script setup lang="ts">
import { Bar, Doughnut } from 'vue-chartjs';
import { Chart, ArcElement } from 'chart.js'

const { data: insights, refresh: refresPage } = await useFetch<{coming: number, notComing: number, notAnswered: number, adults: number, children: number, roomsBooked: number, roomsAvailable: number}>('/api/insights', {
    method: 'get',
    headers: useRequestHeaders(['cookie'])
})

Chart.register(ArcElement);

const dataComing = computed(() => { 
    return {
        labels: [
            'Coming',
            'Not coming',
            'Not answered'
        ],
        datasets: [{
            data: [insights.value?.coming, insights.value?.notComing, insights.value?.notAnswered],
            backgroundColor: [
            '#03d040',
            'rgb(255, 99, 132)',
            'rgb(255, 205, 86)'
            ],
            hoverOffset: 4
        }]
    }}
)

const optionsBar = {
    responsive: true,
    plugins: {
        legend: {
            display: false
        }
    }
};

const dataDemograhpic = computed(() => {
    return {
        labels: [
            'Adults',
            'Children',
        ],
        datasets: [{
            data: [insights.value?.adults, insights.value?.children],
            backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
            ],
            hoverOffset: 4
        }]
    }
})


const dataRooms = computed(() => {
    return {
        labels: [
            'Available',
            'Booked',
        ],
        datasets: [{
            data: [insights.value?.roomsAvailable, insights.value?.roomsBooked],
            backgroundColor: [
            'rgb(54, 162, 235)',
            'rgb(255, 99, 132)',
            'rgb(255, 205, 86)'
            ],
            hoverOffset: 4
        }]
    };
})

const optionsDoughnut = {
    responsive: true,
};

async function downloadExcel() {
    const result = await $fetch('/api/booking-guests', {
        method: 'GET'
    })

    let csv = 'First names,Last names,Adult,Room name,Add childbed,They get free room,Important info\n';
    result.forEach((row) => {
            csv += row.join(',');
            csv += "\n";
    });
 
    const anchor = document.createElement('a');
    anchor.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
    anchor.target = '_blank';
    anchor.download = 'guest-list.csv';
    anchor.click();
}
</script>