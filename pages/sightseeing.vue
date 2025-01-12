<template>
    <TitleDynamic :title="$t('SIGHTSEEING')" heading="h1" />
    <div>
        <AppParagraph :text="$t('STAYING_LONGER')" />
        <a class="link" href="tel:+31433690200" >+31 43 369 02 00</a>
    </div>

    <div class="flex flex-column gap-1_5">
        <TitleDynamic :title="$t('WHERE_TO')" heading="h2" />
        <div>
            <AppParagraph :text="$t('LIST_OF_PLACES')" />
            <ul class="list-inside">
                <li v-for="city of cities" :key="city.title">
                    <AppSpan :text="city.title" />
                </li>
            </ul>
        </div>

        <AppDescriptionWithImage :title="cities.maastricht.title" :img="cities.maastricht.img" :distance="cities.maastricht.distance">
            <AppParagraph :text="$t('MAASTRICHT_DESCRIPTION')" />
        </AppDescriptionWithImage>

        <AppDescriptionWithImage :title="cities.valkenburg.title" :img="cities.valkenburg.img" :distance="cities.valkenburg.distance">
            <AppParagraph :text="$t('VALKENBURG_DESCTIPTION')" />
            <ul class="list-inside">
                <li>
                    <AppSpan :text="$t('VALKENBURG_OPTION_1')" />
                    <ul class="list-inside pl-1">
                        <li><AppLink :text="$t('VALKENBURG_OPTION_1_A')" to="https://www.kasteelvalkenburg.nl/en/discover-our-locations/velvet-cave/" target="_blank" /></li>
                        <li><AppLink :text="$t('VALKENBURG_OPTION_1_B')" to="https://www.kasteelvalkenburg.nl/en/what-to-do/cave-climbing-tour/" target="_blank" /></li>
                    </ul>
                </li>
                <li><AppLink :text="$t('VALKENBURG_OPTION_2')" to="https://www.kasteelvalkenburg.nl/en/discover-our-locations/castle-ruins/" target="_blank" /></li>
                <li>
                    <AppLink :text="$t('VALKENBURG_OPTION_3')"  to="https://www.google.com/maps/place/Attractiepark+Kabelbaan+Valkenburg/@50.8589776,5.8257114,16.27z/data=!4m6!3m5!1s0x47c095533ed4dc59:0x630b6da583bccd7b!8m2!3d50.860058!4d5.833719!16s%2Fg%2F1yfdr06hj?entry=tts&g_ep=EgoyMDI1MDEwOC4wIPu8ASoASAFQAw%3D%3D" target="_blank" />
                    <ul class="list-inside pl-1">
                        <li><AppSpan :text="$t('VALKENBURG_OPTION_3_A')" /></li>
                        <li><AppLink :text="$t('VALKENBURG_OPTION_3_B')" to="https://kabelbaanvalkenburg.nl/attracties/rodelbaan/" target="_blank" /></li>
                    </ul>
                </li>
                <li><AppLink :text="$t('VALKENBURG_OPTION_4')" to="https://www.romeinsekatakomben.nl/" target="_blank" /></li>
                <li><AppSpan :text="$t('VALKENBURG_OPTION_5')" /></li>
                <li><AppSpan :text="$t('VALKENBURG_OPTION_6')" /></li>
            </ul>
        </AppDescriptionWithImage>

        <AppDescriptionWithImage :title="cities.denBosch.title" :img="cities.denBosch.img" :distance="cities.denBosch.distance">
            <AppParagraph :text="$t('DEN_BOSCH_DESCRIPTION_1')" />
            <AppParagraph :text="$t('DEN_BOSCH_DESCRIPTION_2')" />
            <AppLink text="Jan de Groot" to="https://www.google.com/maps/place/Banketbakkerij+Jan+de+Groot/@51.6902138,5.2940371,17z/data=!3m1!4b1!4m6!3m5!1s0x47c6ee8aa547950d:0x1116b304215810!8m2!3d51.6902138!4d5.296612!16s%2Fg%2F1tgz9l0q?entry=tts&g_ep=EgoyMDI1MDEwOC4wIPu8ASoASAFQAw%3D%3D" />
            <AppSpan text="." />
        </AppDescriptionWithImage>

        <AppDescriptionWithImage :title="cities.utrecht.title" :img="cities.utrecht.img" :distance="cities.utrecht.distance">
            <AppParagraph :text="$t('UTRECHT_DESCRIPTION_1')" />
            <AppParagraph :text="$t('UTRECHT_DESCRIPTION_2')" />
        </AppDescriptionWithImage>
    </div>

    <div class="flex flex-column gap-1_5">
        <TitleDynamic :title="$t('FOOD')" heading="h2" />

        <AppDescriptionWithImage :title="food.breakfast.title" :img="food.breakfast.img">
            <AppParagraph :text="$t('BREAKFAST_DESCRIPTION_SIGHTSEEING')" />
        </AppDescriptionWithImage>

        <AppDescriptionWithImage :title="food.lunch.title" :img="food.lunch.img">
            <AppParagraph :text="$t('LUNCH_DESCRIPTION_1')" />
            <AppParagraph :text="$t('LUNCH_DESCRIPTION_2')" />
        </AppDescriptionWithImage>

        <AppDescriptionWithImage :title="food.dinner.title" :img="food.dinner.img">
            <AppParagraph :text="$t('DINNER_DESCRIPTION_1')" />
            <AppParagraph :text="$t('DINNER_DESCRIPTION_2')" />
            <AppParagraph :text="$t('DINNER_DESCRIPTION_3')" />
        </AppDescriptionWithImage>

        <AppDescriptionWithImage :title="food.snacks.title" :img="food.snacks.img">
            <AppParagraph :text="$t('SNACKS_DESCRIPTION_1')" />
            <AppParagraph :text="$t('SNACKS_DESCRIPTION_2')" />
            <AppParagraph :text="$t('SNACKS_DESCRIPTION_3')" />
            <AppParagraph :text="$t('SNACKS_DESCRIPTION_4')" />
        </AppDescriptionWithImage>
    </div>

    <div class="flex flex-column gap-1_5">
        <TitleDynamic :title="$t('WEED')" heading="h2" />
        <AppParagraph :text="$t('WEED_DESCRIPTION')" />
    </div>
</template>

<script setup lang="ts">
// Cities
import maastrichtSrc from '~/assets/img/maastricht.jpeg'
import valkenburgSrc from '~/assets/img/valkenburg.jpg'
import denBoschSrc from '~/assets/img/den-bosch.jpg'
import utrechtSrc from '~/assets/img/utrecht.jpg'
//Food
import breakfastSrc from '~/assets/img/hagelslag.jpg'
import lunchSrc from '~/assets/img/bitterganituur.jpg'
import dinnerSrc from '~/assets/img/satesaus.jpg'
import snacksSrc from '~/assets/img/poffertjes.jpg'

const cities = {
    maastricht: {
        title: 'Maastricht',
        img: {
            src: maastrichtSrc,
            alt: 'Maastricht city',
            height: 4783,
            width: 2559,
            heightMobile: 174,
            heightTablet: 500,
        },
        distance: 'MAASSTRICHT_DISTANCE'
    },
    valkenburg: {
        title: 'Valkenburg',
        img: {
            src: valkenburgSrc,
            alt: 'Valkenburg city',
            height: 1400,
            width: 933,
            heightMobile: 217,
            heightTablet: 500,
        },
        distance: 'VALKENBURG_DISTANCE'
    },
    denBosch: {
        title: 'Den Bosch',
        img: {
            src: denBoschSrc,
            alt: 'Den Bosch city',
            height: 1456,
            width: 971,
            heightMobile: 217,
            heightTablet: 500,
        },
        distance: 'DEN_BOSCH_DISTANCE'
    },
    utrecht: {
        title: 'Utrecht',
        img: {
            src: utrechtSrc,
            alt: 'Utrecht city',
            height: 4928,
            width: 3624,
            heightMobile: 215,
            heightTablet: 500,
        },
        distance: 'UTRECHT_DISTANCE'
    }
}

const food = {
    breakfast: {
        title: 'BREAKFAST',
        img: {
            src: breakfastSrc,
            alt: 'Chocolade hageslag op brood',
            height: 4783,
            width: 2559,
            heightMobile: 217,
            heightTablet: 500,
        },
    },
    lunch: {
        title: 'LUNCH',
        img: {
            src: lunchSrc,
            alt: 'Bittergarnituur',
            height: 1400,
            width: 933,
            heightMobile: 183,
            heightTablet: 500,
        },
    },
    dinner: {
        title: 'DINNER',
        img: {
            src: dinnerSrc,
            alt: 'Friet met satesaus',
            height: 1456,
            width: 971,
            heightMobile: 183,
            heightTablet: 500,
        },
    },
    snacks: {
        title: 'SNACKS',
        img: {
            src: snacksSrc,
            alt: 'Poffertjes',
            height: 4928,
            width: 3624,
            heightMobile: 217,
            heightTablet: 500,
        },
    }
}
</script>

<style scoped>
.link {
    color: var(--gray-darkest);
    background-color: transparent;
    border: none;
    text-align: left;

    cursor: pointer;
}
</style>