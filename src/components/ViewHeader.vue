<template>
    <div class="view-header">
        <div @click="toggleSidebar" class="button sidebar-toggle-button">
            <div
                :class="{ 'inverted-arrow': isSidebarCollapsed }"
                class="sidebar-toggle-icon"
            ></div>
        </div>
        <!-- <slot title="route"></slot> -->
        <div class="current-route-title-and-icon">
            <div
                class="current-route-icon"
                :style="{
                    'mask-image': `url('/src/assets/icons/${currentRouteNavObj.icon_name}.svg')`
                }"
            ></div>
            <h2 class="current-route-title">{{ currentRouteNavObj.name_ka }}</h2>
        </div>
        <div class="appended-content">
            <slot name="append"></slot>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useSidebarState } from '@/use/useSidebarState';
import navJson from '@/assets/navigation.json';

const { isCollapsed: isSidebarCollapsed, toggleSidebar } = useSidebarState();

const route = useRoute();

interface NavObj {
    route: string;
    name_ka: string;
    icon_name: string;
}
const navArray: NavObj[] = navJson;

const currentRouteNavObj = computed<NavObj>(() => {
    return navArray.filter((n) => n.route.substring(1) === route.name)[0];
});
</script>
<style scoped lang="scss">
.view-header {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    width: 100%;
    height: 6.25rem;
    background-color: #fff;
    border-radius: 0.75rem;
    padding: 0 1.5rem;

    .button.sidebar-toggle-button {
        padding: 0.5rem;
        background-color: #fff;
        color: $textColor;

        .sidebar-toggle-icon {
            mask-image: url('@/assets/icons/lt.svg');
            @include icon-mask($iconHeight: 1rem, $fillColor: $iconColor);
            transition: transform $transitionDuration;

            &.inverted-arrow {
                transform: rotate(-180deg);
            }
        }
    }

    .current-route-title-and-icon {
        display: flex;
        align-items: center;
        height: 3rem;
        gap: 0.5rem;
        margin-left: 1.25rem;

        div.current-route-icon {
            mask-image: url('@/assets/icons/calendar.svg');
            @include icon-mask($iconHeight: 1.5rem, $fillColor: $iconColor);
        }

        h2.current-route-title {
            font-size: 1rem;
        }
    }

    .appended-content {
        margin-left: auto;
    }
}

@media (max-width: 1024px) {
    .view-header .sidebar-toggle-button {
        display: none;
    }
}
</style>
