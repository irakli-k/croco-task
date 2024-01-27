<template>
    <div class="slider-view">
        <view-header>
            <template v-slot:append>
                <search-input v-model="searchPhrase"></search-input>
            </template>
        </view-header>
        <add-slider @sliderAdd="handeSliderAdd"></add-slider>

        <div class="slider-list">
            <slider-row
                v-for="item in filteredSliderList"
                :data="item"
                :key="item.ID"
                @sliderDelete="handleSliderDelete"
                @sliderUpdate="handleSliderUpdate"
            >
            </slider-row>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, computed } from 'vue';

import type { Slider } from '@/types/slider';

import ViewHeader from '@/components/ViewHeader.vue';
import SearchInput from '@/components/elements/SearchInput.vue';
import AddSlider from '@/components/slider/AddSlider.vue';
import SliderRow from '@/components/slider/SliderRow.vue';

const searchPhrase = ref<string>('');

const sliderList = ref<Slider[]>([]);

const filteredSliderList = computed(() => {
    if (!searchPhrase.value) return sliderList.value;

    return sliderList.value.filter((sl) => {
        return (
            sl.titleKA
                .toLowerCase()
                .includes(searchPhrase.value.toLowerCase()) ||
            sl.date.includes(searchPhrase.value)
        );
    });
});

function setSliders() {
    sliderList.value = [
        {
            ID: 1,
            titleKA: 'ლიგა 2-ის ფინალი / თბილისი სითი - შტურმი 2022',
            titleEN: '',
            date: '12.12.2023',
            imageUrl: '/src/assets/photos/grasruti.jpeg'
        },
        {
            ID: 2,
            titleKA: 'ლიგა 2-ის ფინალი / თბილისი სითი - შტურმი 2022',
            titleEN: '',
            date: '12.12.2023',
            imageUrl: '/src/assets/photos/grasruti.jpeg'
        },
        {
            ID: 3,
            titleKA: 'ლიგა 2-ის ფინალი / თბილისი სითი - შტურმი 2022',
            titleEN: '',
            date: '12.12.2023',
            imageUrl: '/src/assets/photos/grasruti.jpeg'
        }
    ];
}

function handeSliderAdd(newSlider: Slider) {
    sliderList.value.push(newSlider);
}

function handleSliderDelete(sliderID: number) {
    sliderList.value = sliderList.value.filter((el) => el.ID != sliderID);
}

function handleSliderUpdate(sliderData: Slider) {
    sliderList.value.forEach((el, ind) => {
        if (el.ID == sliderData.ID) {
            sliderList.value.splice(ind, 1, sliderData)
        }
    })
}

void (function setup() {
    setSliders();
})();
</script>
<style scoped lang="scss">
.slider-view {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    min-width: 0;

    .slider-list {
        display: flex;
        flex-direction: column;
        background-color: $bgColorLighter;
        border-radius: $borderRadius;
        padding: 2rem;
        gap: 0.75rem;
    }
}
</style>
