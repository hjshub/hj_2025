<template>
    <section class="p-0 bg-gray-100 scrollSection">
    </section>
    <section class="p-0 bg-purple-200 scrollSection" data-allow-scroll="Y">
    </section>
    <section class="p-0 bg-purple-500 scrollSection" data-allow-scroll="Y">
    </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import gsap from 'gsap'
import CommonFunction from '../assets/ts/common'

const common = CommonFunction();
const layout = document.querySelector('#layout');

const throttle = (fn: () => void, delay: number) => {
    let timer : number | null = null;
    return () => {
        if(timer !== null) return;
        timer = window.setTimeout(() => {
            fn();
            timer = null;
        }, delay);
    }
}

const prevDeltaY = ref(layout?.scrollTop);
const isAnimation = ref(false);

const preventScroll = (e: Event) => {
    e.preventDefault();
}

const scrollDelta = () => {
    const deltaY = layout?.scrollTop - prevDeltaY.value;
    prevDeltaY.value = layout?.scrollTop;

    return deltaY;
}

const setAnimation = () => {
    const scrollSection = document.querySelectorAll('.scrollSection');
    const _detaY = scrollDelta();

    if(isAnimation.value) return;

    let hasAnimation = false;
    let scrollTarget = 0;

    scrollSection.forEach((el) => {
        if(el.dataset.allowScroll) {
            const rect = el.getBoundingClientRect();
            
            if(rect.top < window.innerHeight * 0.5 && rect.top > 0) {
                hasAnimation = true;
                scrollTarget = _detaY < 0 
                    ? (el.previousElementSibling as HTMLElement)?.offsetTop || 0
                    : rect.top + layout.scrollTop;
            } 
        }
    });

    // 루프 밖에서 한 번만 리스너 등록
    if(hasAnimation) {
        isAnimation.value = true;
        layout?.addEventListener('wheel', preventScroll, { passive: false });
        layout?.addEventListener('touchmove', preventScroll, { passive: false });

        gsap.to(layout, {
            ease: 'power2.out', 
            scrollTo: { y: scrollTarget }, 
            duration: 0.6,
            onComplete(){
                isAnimation.value = false;
                layout?.removeEventListener('wheel', preventScroll);
                layout?.removeEventListener('touchmove', preventScroll);
            }
        });
    }
}

const throttledScroll = throttle(setAnimation, 100);

onMounted(() => {
    layout?.addEventListener('scroll', throttledScroll);
})

onUnmounted(() => {
    layout?.removeEventListener('scroll', throttledScroll);
    layout?.removeEventListener('wheel', preventScroll);
    layout?.removeEventListener('touchmove', preventScroll);
})

</script>

<style scoped lang="scss">
</style>