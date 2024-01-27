<template>
    <form
        @submit.prevent="addOrUpdateSLider"
        class="slider-form-wrapper"
        ref="formEl"
        :class="{ 'inside-popup': isSliderEdit }"
    >
        <input
            v-model="sliderParams.titleKA"
            required
            class="input"
            placeholder="სათაური (ქართ)"
            type="text"
        />
        <input
            v-model="sliderParams.titleEN"
            required
            class="input"
            placeholder="სათაური (ინგლ) "
            type="text"
        />
        <input
            @input="styleFileInput"
            class="input"
            placeholder="ატვირთე სურათი"
            inner-text="ატვირთე სურათი"
            ref="fileInp"
            type="file"
        />
        <input
            v-model="sliderParams.date"
            required
            class="input"
            placeholder="თარიღი"
            type="date"
        />

        <div
            class="close-form-button button cancel-button light"
            @click="emit('closeForm')"
        >
            დახურვა
        </div>
        <button
            type="submit"
            class="add-slide-button button"
            :class="{ loading: loading }"
        >
            <span class="omittable-text">სლაიდერის</span>
            <span>{{ !isSliderEdit ? 'დამატება' : 'განახლება' }}</span>
        </button>
    </form>
</template>
<script lang="ts" setup>
import { ref, reactive, computed } from 'vue';

import type { SliderParams } from '@/types/slider';

const emit = defineEmits(['sliderAdd', 'sliderUpdate', 'closeForm']);

const props = defineProps({
    sliderToEdit: Object
});

const sliderParams = reactive<SliderParams>({
    titleKA: '',
    titleEN: '',
    image: null,
    date: ''
});

const fileInp = ref<HTMLInputElement | null>(null);
const formEl = ref<HTMLFormElement>();

const loading = ref<boolean>(false);

const isSliderEdit = computed(() => {
    return props.sliderToEdit != null;
});

function setSliderParams() {
    if (!props.sliderToEdit) return;

    sliderParams.titleKA = props.sliderToEdit.titleKA;
    sliderParams.titleEN = props.sliderToEdit.titleEN;
    sliderParams.date = getDateStr(props.sliderToEdit.date);
}

async function addOrUpdateSLider() {
    let formData: FormData = new FormData();
    sliderParams.titleKA && formData.append('titleKA', sliderParams.titleKA);
    sliderParams.titleEN && formData.append('titleEN', sliderParams.titleEN);
    sliderParams.date && formData.append('date', sliderParams.date);

    if (fileInp.value?.files && fileInp.value?.files.length) {
        sliderParams.image = fileInp.value?.files[0];
        formData.append('image', sliderParams.image, 'image.jpg');
    }

    loading.value = true;

    var requestUrl: string = 'https://jsonplaceholder.typicode.com/posts';
    if (isSliderEdit.value) {
        formData.append('ID', props.sliderToEdit?.ID.toString());
        requestUrl = 'https://jsonplaceholder.typicode.com/posts';
    }

    let resp = await fetch(requestUrl, {
        /*
            Fake request.
            Can't use formdata, because it will cause cors error, hence passing sliderParams as body
        */
        body: JSON.stringify(sliderParams),
        method: 'post'
    });

    loading.value = false;

    if (resp.status == 201) {
        let data = await resp.json();

        /// imitate resp
        data = {
            ID: props.sliderToEdit?.ID || Math.ceil(Math.random() * 1000000),
            titleKA: sliderParams.titleKA,
            titleEN: sliderParams.titleEN,
            date: getDateStr(sliderParams.date, 'dd.MM.yyyy'),
            imageUrl: '/src/assets/photos/grasruti.jpeg'
        };

        if (!isSliderEdit.value) {
            emit('sliderAdd', data);
        } else {
            emit('sliderUpdate', data);
        }
    } else {
        /// show error
    }
}

function styleFileInput(e: Event) {
    let imgName: string = (e.target as HTMLInputElement).value
        .split('\\')
        .slice(-1)[0];

    (e.target as HTMLInputElement).setAttribute('inner-text', imgName);
}

function getDateStr(
    date: string | Date,
    format: string = 'yyyy-MM-dd'
): string {
    if (!(date instanceof Date)) {
        date = new Date(date);
    }
    if (typeof date == 'string' && date === 'Invalid Date') return '';

    var days = ('0' + date.getDate()).slice(-2),
        month = ('0' + (date.getMonth() + 1)).slice(-2),
        year = date.getFullYear().toString(),
        hours = ('0' + date.getHours()).slice(-2),
        minutes = ('0' + date.getMinutes()).slice(-2),
        seconds = ('0' + date.getSeconds()).slice(-2);

    if (format.includes('hh')) hours = ((Number(hours) + 1) % 12).toString();

    return format
        .replace('yyyy', year)
        .replace('yy', String(year).slice(-2))
        .replace('MM', month)
        .replace('dd', days)
        .replace('HH', hours)
        .replace('hh', hours)
        .replace('mm', minutes)
        .replace('ss', seconds);
}

void (function setup() {
    setSliderParams();
})();
</script>
<style lang="scss" scoped>
.slider-form-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 3rem 3rem 3rem 3rem 3rem;
    row-gap: 0.75rem;
    column-gap: 1.5rem;
    background-color: #fff;
    border-radius: 0.75rem;
    padding: 2rem 1.5rem;

    .input {
        grid-column: 1/2;

        &[type='file']::before {
            content: attr(inner-text);
        }
    }

    .close-form-button,
    .add-slide-button {
        @include pill-shape($height: 3rem);
        width: 100%;
    }

    .close-form-button {
        grid-column: 2/3;
        grid-row: 5/6;
    }
    .add-slide-button {
        grid-column: 3/4;
        grid-row: 5/6;
    }
}
.slider-form-wrapper.inside-popup {
    display: flex;
    flex-direction: column;
    padding: 0;
    width: 100%;
}

@media (max-width: 1280px) {
    .omittable-text {
        display: none;
    }
    .slider-form-wrapper {
        grid-template-columns: 1fr 1fr 1fr !important;

        .close-form-button {
            grid-column: 1/2 !important;
        }
        .add-slide-button {
            grid-column: 2/3 !important;
        }
    }
}

@media (max-width: 1024px) {
    .slider-form-wrapper {
        grid-template-columns: 1fr 1fr !important;

        .close-form-button {
            grid-column: 1/2 !important;
        }
        .add-slide-button {
            grid-column: 2/3 !important;
        }
    }
}
</style>
