import {ref} from 'vue'

// outside of export to make it global
const isCollapsed = ref(false)
const mobileSidebarHidden = ref(true)

export function useSidebarState() {
    function toggleSidebar (): void {
        isCollapsed.value = !isCollapsed.value
    }
    function expandSidebar (): void {
        isCollapsed.value = false
    }
    function collapseSidebar (): void {
        isCollapsed.value = true
    }

    function toggleMobileSidebar (): void {
        mobileSidebarHidden.value = !mobileSidebarHidden.value
    }

    return {
        isCollapsed,
        mobileSidebarHidden,

        toggleSidebar,
        expandSidebar,
        collapseSidebar,

        toggleMobileSidebar
    }
}