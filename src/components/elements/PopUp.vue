<template>
    <div class="wrapper dark-backdrop">
        <div class="window" @click.stop @keydown.stop>
            <slot></slot>
            <div class="buttons">
                <slot name="actions"></slot>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    const emit = defineEmits(['close'])
</script>

<style lang="scss" scoped>
.wrapper {
    display: flex;
    align-items: center;
    justify-content: center;

    .window {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        gap: 1rem;
        min-width: 30rem;
        max-width: 80vw;
        min-height: 15rem;
        max-height: 90vh;
        background-color: #fff;
        max-width: 40rem;
        z-index: 3;
        border-radius: $borderRadius;
        padding: 2rem;
        overflow: auto;

        .buttons {
            display: flex;
            justify-content: center;
            gap: 1rem;

            .button.cancel-button {
                    background: $bgColorLighter;
                    color: $textColor;
                    @include pill-shape($height: 2rem);
            }
        }
    }
}
</style>
