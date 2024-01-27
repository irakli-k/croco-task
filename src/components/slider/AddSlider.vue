<template>
    <div class="add-slider" :class="{ expanded: isFormExpanded }">
        <div class="add-slider-header">
            <div @click="expandForm" class="expand-form-button button">
                <div class="preppended-icon-wrapper">
                    <div class="preppended-icon"></div>
                </div>
                <span>სლაიდერის დამატება</span>
                <div class="appended-icon"></div>
            </div>
            <div
                v-if="isFormExpanded"
                @click="collapseForm"
                class="collapse-form-x-button button"
            >
                <img src="@/assets/icons/x.svg" alt="X" />
            </div>
        </div>
        <Transition>
            <slider-form
                v-if="isFormExpanded"
                @closeForm="collapseForm"
                @sliderAdd="handleSliderAdd"
            ></slider-form>
        </Transition>
    </div>
</template>
<script lang="ts" setup>
import SliderForm from './SliderForm.vue';
import { ref } from 'vue';

import type { Slider } from '@/types/slider';

const emit = defineEmits(['sliderAdd']);

const isFormExpanded = ref<boolean>(false);

function expandForm() {
    if (!isFormExpanded.value) {
        isFormExpanded.value = true;
    }
};
function collapseForm() {
    isFormExpanded.value = false;
};

function handleSliderAdd(data:Slider) {
    emit('sliderAdd', data);
    collapseForm();
}
</script>
<style scoped lang="scss">
.add-slider {
    transition: all $transitionDuration;
    display: flex;
    flex-direction: column;
    height: 3rem;

    .add-slider-header {
        display: flex;
        justify-content: space-between;

        .expand-form-button {
            height: 3rem;
            line-height: 3rem;
            padding: 0 1.25rem;
            border-radius: 0.75rem;
            margin-left: 2rem;
            transition: all $transitionDuration;

            .preppended-icon-wrapper {
                padding: 0.25rem;
                border: 1px solid #fff;
                border-radius: 50%;
                .preppended-icon {
                    mask-image: url('@/assets/icons/plus.svg');
                    @include icon-mask($iconHeight: 0.5rem);
                }
            }
            .appended-icon {
                mask-image: url('@/assets/icons/lt.svg');
                transform: rotate(-90deg);
                @include icon-mask($iconHeight: 0.875rem);
            }
        }

        .collapse-form-x-button {
            background-color: unset;
            border-radius: 50%;
            width: 2rem;
            height: 2rem;

            img {
                width: inherit;
                height: inherit;
            }
        }
    }

    &.expanded {
        background-color: $bgColorLighter;
        padding: 2rem;
        border-radius: $borderRadius;
        height: auto;

        .add-slider-header {
            margin-bottom: 2rem;
            .expand-form-button {
                height: 2rem;
                line-height: 2rem;
                margin-left: 0;
                padding: 0;
                background-color: $bgColorLighter;
                color: $textColor;
                pointer-events: none;

                .preppended-icon-wrapper {
                    border: 1px solid $accentColor;

                    .preppended-icon {
                        @include icon-mask(
                            $iconHeight: 0.5rem,
                            $fillColor: $accentColor
                        );
                    }
                }
                .appended-icon {
                    display: none;
                }
            }
        }
    }
}
</style>
