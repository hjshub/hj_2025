<template>
    <section class="ui-list">
        <ul>
            <li v-for="(t, i) in items" :key="i">
                <em :data-number="i + 1 < 10 ? `0${i + 1}` : i + 1"></em>
                <slot :n="i + 1"></slot>
            </li> 
        </ul>
    </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import CommonFunction from '../assets/ts/common'

// const props = defineProps<{count: number}>()
// const count = props.count || 0;

const props = withDefaults(defineProps<{ items?: Array<{title: string}> }>(), { items: [] })
const items = props.items

const common = CommonFunction();

onMounted(() => {
})

onUnmounted(() => {
})

</script>

<style scoped lang="scss">
    .ui-list {
        @apply pr-20 pl-20;

        ul {
            @apply flex flex-wrap items-center justify-start;

            li {
                @apply relative flex items-center justify-center p-10;
                width: 100%;
                height:100vw;

                @media screen and (min-width: 821px){
                    width: calc((100vw - 10rem) / 2);
                    height: calc((100vw - 10rem) / 2);
                }

                @media screen and (min-width: 1280px){
                    width: calc((100vw - 10rem) / 3);
                    height: calc((100vw - 10rem) / 3);
                }

                em {
                    @apply flex items-center justify-center absolute top-0 left-0 text-white w-10 h-10 bg-blue-300 rounded-[0.3rem] rotate-45;

                    &:before {
                        @apply -rotate-45 text-[1.4rem];
                        content:attr(data-number);
                    }
                }
            }
        }
    }
</style>