<template>
    <input
        :value="modelValue"
        @input="updateValue"
        class="input"
        placeholder="ძიება"
        type="text"
    />
</template>
<script lang="ts" setup>
// const model = defineModel() //in vue 3.4+ replaces next 2 lines
const props = defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue'])
function updateValue(e:Event): void {
    emit('update:modelValue', (e.target as HTMLInputElement).value)
}

</script>
<style lang="scss" scoped>
.input {
    background-color: $bgColor;
    border: none;
    padding-left: 3rem;
    background-image: url('@/assets/icons/search.svg');
    background-size: 1.375rem;
    background-repeat: no-repeat;
    background-position: 0.75rem center;
}
</style>
