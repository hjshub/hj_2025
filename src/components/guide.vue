<template>
    <GuideList :sectionCount="5">
        <template #section1></template>
        <template #section2></template>
        <template #section3></template>
        <template #section4></template>
        <template #section5></template>
    </GuideList>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
import gsap from 'gsap';
import CommonFunction from '../assets/ts/common';
import GuideList from './Guide_list.vue';

const common = CommonFunction();
const layout: HTMLElement | null = document.querySelector('#layout');
const delay = (ms: number) => new Promise((resolve) => { setTimeout(resolve, ms); });
let wheelHandler: ((e: Event) => void) | null = null;
let isScrolling: boolean = false;
let section: NodeListOf<HTMLElement> = [] as any;

const setSection = () => {
    section = document.querySelectorAll('section');
};

const setInitialSection = () => {
    if(section.length > 0) section[0].classList.add('current');
};

const skipSection = () => {
    const lastIdx = section.length - 1;
    let currentIdx: number = 0;

    return async (e: WheelEvent) => {
        e.preventDefault();
        if(isScrolling) return;

        isScrolling = true;

        // debugger;

        if(e.deltaY > 0 && currentIdx < lastIdx) currentIdx++;
        if(e.deltaY < 0 && currentIdx > 0) currentIdx--;

        section.forEach(el => el.classList.remove('current'));
        section[currentIdx].classList.add('current');
        const posTop = currentIdx == 0 ? 0 : layout?.scrollTop + section[currentIdx].getBoundingClientRect().top;

        gsap.to(layout, { scrollTop: posTop, duration: 0.6, ease: "power2.inOut" });

        await delay(1000);
        isScrolling = false;
    };
};

onMounted(() => {
    setSection();
    setInitialSection();
    wheelHandler = skipSection();
    layout?.addEventListener('wheel', wheelHandler);
});

onUnmounted(() => {
    layout?.removeEventListener('wheel', wheelHandler);
    wheelHandler = null;
});

</script>

<style scoped lang="scss">
</style>