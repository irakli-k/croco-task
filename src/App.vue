<template>
    <div class="mobile-top-bar">
        <div @click="toggleMobileSidebar" class="hamburger-button"></div>
        
        <router-link class="crocobet-logo" to="/">
            <img src="@/assets/logo.svg" alt="logo" />
        </router-link>
    </div>

    <side-nav></side-nav>
    
    <div id="view-wrapper">
        <router-view />
    </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import SideNav from '@/components/SideNav.vue'
import { useSidebarState } from '@/use/useSidebarState';

const { toggleMobileSidebar } = useSidebarState();
</script>

<style scoped lang="scss">

.mobile-top-bar {
    display: none;
}

#view-wrapper {
    display: flex;
    flex-grow: 1;
    padding: 2rem;
    overflow: auto;
}

@media (max-width: 1024px) {
    $topBarHeight: 4rem;

    .mobile-top-bar {
        display: flex;
        width: 100vw;
        height: $topBarHeight;
        position: fixed;
        background-color: $bgColorLighter;
        justify-content: center;
        align-items: center;
        z-index: 1;

        .hamburger-button {
            position: absolute;
            left: 1rem;
            top: 0;
            width: 2.5rem;
            // padding: 0 1rem;
            height: $topBarHeight;
            background-color: $iconColor;
            cursor: pointer;
            background: linear-gradient(to bottom,
                    transparent 20%,
                    $iconColor 20% 30%,
                    transparent 30% 45%,
                    $iconColor 45% 55%,
                    transparent 55% 70%,
                    $iconColor 70% 80%,
                    transparent 80%);
            ;
        }

        .crocobet-logo {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 5.5rem;
            height: 3rem;
            transition: width $transitionDuration;

            img {
                width: inherit;
            }
        }
    }

    #view-wrapper {
        padding-top: calc($topBarHeight + 2rem);
    }
}
</style>
