<template>
    <div>
        <section
            v-for="n in sectionCount"
            :key="n"
            class="p-0 scrollSection"
            :data-allow-scroll="n > 1 ? 'Y' : undefined"
        >
            <em>{{ String(n).padStart(2, '0') }}</em>
            <slot :name="`section${n}`"></slot>
        </section>
    </div>
</template>

<script setup lang="ts">
    import { ref, onMounted, onUnmounted } from 'vue'

    // defineProps({
    //     sectionCount: {type: Number, required: true},
    // });

    defineProps<{
        sectionCount: number;
    }>();
    
</script>

<style scoped lang="scss">
    section {
        min-height: calc(var(--vh, 1vh) * 100);
        
        @apply relative;
        &:first-of-type {
            @apply bg-gray-100;
        }

        &:nth-of-type(2) {
            @apply bg-gray-200;
        }

        &:nth-of-type(3) {
            @apply bg-gray-300;
        }
        
        &:nth-of-type(4) {
            @apply bg-gray-400;
        }

        &:nth-of-type(5) {
            @apply bg-gray-500;
        }

        em {
            @apply absolute top-[1rem] left-[1rem] text-white;
        }
    }
</style>