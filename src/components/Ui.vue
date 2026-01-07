<template>
    <section class="ui-list">
        <ul>
            <li v-for="(el, idx) in 10" :key="idx">
                <em :data-number="el < 10 ? `0${el}` : el"></em>
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
    #gnb .menu ul li a {
        @apply sr-only
    }
    .ui-list {
        @apply pr-20 pl-20;

        ul {
            @apply flex flex-wrap items-center justify-center;

            li {
                @apply relative flex min-w-[300px] min-h-[300px]  items-center justify-center p-10;
                width: calc((100vw - 10rem) / 5);
                height: calc((100vw - 10rem) / 5);

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