<template>
    <div class="slider-row">
        <div class="slide-description">
            <div class="slide-img" :style="{'background-image': `url(${data.imageUrl})`}"></div>
            <div class="slide-info">
                <p>{{ data.titleKA }}</p>
                <p>{{ data.date }}</p>
            </div>
        </div>
        <div class="slide-actions">
            <div @click="updatePopupVisible = true" class="button edit-button">
                <div class="edit-icon"></div>
                <span>რედაქტირება</span>
            </div>
            <div
                @click="deletePopupVisible = true"
                class="button delete-button"
            >
                <div class="delete-icon"></div>
                <span>წაშლა</span>
            </div>
        </div>
    </div>

    <pop-up v-if="deletePopupVisible" @close="deletePopupVisible = false">
        <p>დარწმუნებული ხართ რომ გსურთ წაშლა?</p>

        <template v-slot:actions>
            <div
                @click="deletePopupVisible = false"
                class="button cancel-button light"
            >
                <span>გაუქმება</span>
            </div>
            <div
                class="button delete-button"
                @click="deleteSlider"
                :class="{ loading: deleteLoading }"
            >
                <div class="delete-icon"></div>
                <span>წაშლა</span>
            </div>
        </template>

        <p v-if="deleteErrorMessage">{{ deleteErrorMessage }}</p>
    </pop-up>

    <pop-up v-if="updatePopupVisible" @close="updatePopupVisible = false">
        <slider-form
            :sliderToEdit="data"
            @sliderUpdate="handleSliderUpdate"
            @closeForm="updatePopupVisible = false"
        >
        </slider-form>
    </pop-up>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import PopUp from '@/components/elements/PopUp.vue';
import SliderForm from '@/components/slider/SliderForm.vue';

import type { Slider } from '@/types/slider';

const emit = defineEmits(['sliderDelete', 'sliderUpdate']);

const props = defineProps({
    data: {
        type: Object,
        required: true
    }
});

const deletePopupVisible = ref<boolean>(false);
const deleteLoading = ref<boolean>(false);
const deleteErrorMessage = ref<string>('');

const updatePopupVisible = ref<boolean>(false);

async function deleteSlider() {
    deleteErrorMessage.value = '';
    deleteLoading.value = true;

    let resp = await fetch('https://jsonplaceholder.typicode.com/posts', {
        /// fake request
        body: JSON.stringify({
            sliderID: props.data.ID
        }),
        method: 'post'
    });

    if (resp.status == 201) {
        deleteLoading.value = false;
        deletePopupVisible.value = false;
        emit('sliderDelete', props.data.ID);
    } else {
        deleteErrorMessage.value = 'An error has occured';
    }
}

function handleSliderUpdate(sliderData: Slider) {
    emit('sliderUpdate', sliderData);
    updatePopupVisible.value = false;
}
</script>
<style lang="scss" scoped>
.slider-row {
    display: flex;
    justify-content: space-between;
    height: 5.5rem;
    border-radius: 0.75rem;
    padding: 0.5rem;
    background-color: #fff;
    min-width: 0;

    .slide-description {
        display: flex;
        justify-content: flex-start;
        gap: 0.75rem;
        height: 4.5rem;
        min-width: 0;

        .slide-img {
            justify-self: flex-start;
            height: inherit;
            width: 7rem;
            border-radius: 0.5rem;
            background-size: cover;
            background-position: center;
        }

        .slide-info {
            display: flex;
            flex-direction: column;
            flex-grow: 0;
            justify-content: center;
            gap: 1rem;
            opacity: 0.6;
            min-width: 0;

            p {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }
    }

    .slide-actions {
        display: flex;
        align-items: center;
        flex-shrink: 0;
        gap: 1rem;
        margin: 0 1rem;
    }
}
</style>
