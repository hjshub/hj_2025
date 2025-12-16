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

const scrollDelta = () => {
    const deltaY = layout?.scrollTop - prevDeltaY.value;
    prevDeltaY.value = layout?.scrollTop;

    return deltaY;
}

const setAnimation = () => {
    const scrollSection = document.querySelectorAll('.scrollSection');
    const _detaY = scrollDelta();

    if(isAnimation.value) return;

    scrollSection.forEach((el) => {
        if(el.dataset.allowScroll) {
            const rect = el.getBoundingClientRect();
            
            if(rect.top < window.innerHeight * 0.5 && rect.top > 0) {
                if(_detaY < 0) {
                    isAnimation.value = true;
                    gsap.to(layout, {
                        ease: 'power2.out', 
                        scrollTo: {
                            y: el.previousElementSibling ? (el.previousElementSibling as HTMLElement).offsetTop : 0
                        }, 
                        duration: 0.6,
                        onComplete(){
                            isAnimation.value = false;
                        }
                    });
                }else {
                    isAnimation.value = true;
                    gsap.to(layout, {
                        ease: 'power2.out', 
                        scrollTo: {
                            y: rect.top + layout.scrollTop
                        }, 
                        duration: 0.6,
                        onComplete(){
                            isAnimation.value = false;
                        }
                    });
                }
            } 
        }
    });
}

const throttledScroll = throttle(setAnimation, 100);

onMounted(() => {
    layout?.addEventListener('scroll', throttledScroll);
})

onUnmounted(() => {
    layout?.removeEventListener('scroll', throttledScroll);  // 추가
})

</script>

<style scoped lang="scss">
</style>