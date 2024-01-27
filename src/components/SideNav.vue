<template>
    <nav id="nav-bar" :class="{ 'is-collapsed': isCollapsed, 'hidden': mobileSidebarHidden }">
        <div class="nav-top">
            <router-link class="crocobet-logo" to="/">
                <img src="@/assets/logo.svg" alt="logo" />
            </router-link>
            <a class="button" href="https://crocobet.com/" target="_blank">
                <div class="preppended-icon"></div>
                <span class="crocobet-url-name">crocobet.com</span>
            </a>
        </div>
        <template v-for="navObj in navArray" :key="navObj.route">
            <router-link :to="navObj.route" class="nav-url">
                <i
                    class="nav-url-ico"
                    :style="{
                        'mask-image': `url('/src/assets/icons/${navObj.icon_name}.svg')`
                    }"
                ></i>
                <span class="nav-url-name">{{ navObj.name_ka }}</span>
            </router-link>
        </template>
        <Teleport to="body">
            <div @click="toggleMobileSidebar" v-if="!mobileSidebarHidden" class="dark-backdrop"></div>
        </Teleport>
    </nav>
</template>
<script setup lang="ts">
// import { ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import { useSidebarState } from '@/use/useSidebarState';
import navJson from '@/assets/navigation.json';

const { isCollapsed, mobileSidebarHidden, toggleMobileSidebar } = useSidebarState();

interface NavObj {
    route: string;
    name_ka: string;
    icon_name: string;
}
const navArray: NavObj[] = navJson;
</script>
<style scoped lang="scss">
#nav-bar {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    width: 20rem;
    height: 100vh;
    border-radius: 0 $borderRadius $borderRadius 0;
    background-color: $bgColorLighter;
    overflow: auto;
    font-family: 'Croco Medium';
    transition: width $transitionDuration;

    .nav-top {
        display: flex;
        flex-direction: column;
        place-items: center center;
        gap: 1.5rem;
        padding: 3.75rem 0 1.25rem 0;

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

        .button {
            @include pill-shape($height: 2rem);
            // max-width is needed for transtion to work
            width: 8.75rem;
            transition: width $transitionDuration;

            .preppended-icon {
                mask-image: url('@/assets/icons/arrow.svg');
                @include icon-mask;
            }
        }
    }

    .nav-url {
        $height: 4rem;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        height: $height;
        width: 100%;
        padding-left: calc(0.5 * $height);
        padding-right: calc(0.375 * $height);
        gap: calc(3 / 16 * $height);
        border-bottom: 1px solid #d4dbdd;

        i.nav-url-ico {
            @include icon-mask(
                $iconHeight: 0.375 * $height,
                $fillColor: $iconColor
            );
        }

        .nav-url-name {
            opacity: 0.8;
        }

        &.router-link-active {
            background-color: #fff;
            border-right: 0.375rem solid $accentColor;
            pointer-events: none;
        }
    }
}

@media (min-width: 1025px) {
    #nav-bar {
        &.is-collapsed {
            width: 4rem;

            .nav-top {
                .crocobet-logo {
                    width: 80%;
                }

                .button {
                    width: 3rem;

                    .crocobet-url-name {
                        display: none;
                    }
                }
            }

            .nav-url {
                padding: 0;
                justify-content: center;
                .nav-url-name {
                    display: none;
                }
            }
        }
    }

    .dark-backdrop {
        display: none;
    }
}

@media (max-width: 1024px) {
    #nav-bar {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        margin: 0;
        z-index: 3;
        transition: transform $transitionDuration;

        &.hidden {
            transform: translateX(-100%);
        }

        .nav-top {
            padding: 1.5rem 0;
            
            .crocobet-logo {
                display: none;
            }
        }
    }
}
</style>
