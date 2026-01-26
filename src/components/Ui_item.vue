<template>
    <section class="ui-list">
        <ul>
            <li v-for="n in 20" :key="n">
                <em :data-number="n < 10 ? `0${n}` : n"></em>
                <slot :name="`item${n}`"></slot>
            </li> 
        </ul>
    </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import gsap from 'gsap'
import CommonFunction from '../assets/ts/common'

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
            @apply flex flex-wrap items-center justify-center;

            li {
                @apply relative flex min-w-[320px] min-h-[320px]  items-center justify-center p-10;
                width: calc((100vw - 10rem) / 4);
                height: calc((100vw - 10rem) / 4);

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