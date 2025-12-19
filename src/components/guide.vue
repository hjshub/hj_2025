<template>
    <section class="p-0 bg-purple-100 scrollSection">
    </section>
    <section class="p-0 bg-purple-200 scrollSection" data-allow-scroll="Y">
    </section>
    <section class="p-0 bg-purple-300 scrollSection" data-allow-scroll="Y">
    </section>
    <section class="p-0 bg-purple-400 scrollSection" data-allow-scroll="Y">
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
// let prevDirection = 0; // 이전 스크롤 방향 저장
let isTouching = false;

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

    // 방향이 바뀌었을 때만 계속 진행
    // const directionChanged = (prevDirection > 0 && _detaY < 0) || (prevDirection < 0 && _detaY > 0);
    // prevDirection = _detaY;
    
    // if(!directionChanged && Math.abs(_detaY) < 1) return; // 미미한 스크롤도 무시

    let hasAnimation = false;
    let scrollTarget = 0;

    scrollSection.forEach((el) => {
        if(el.dataset.allowScroll) {
            const rect = el.getBoundingClientRect();

            if(_detaY > 0 && rect.top < window.innerHeight * 0.3 && rect.top > 0 ){
                hasAnimation = true;
                scrollTarget = rect.top + layout.scrollTop;
            } else if(_detaY < 0 && rect.top < window.innerHeight && rect.top > window.innerHeight * 0.3) {
                hasAnimation = true; 
                scrollTarget = (el.previousElementSibling as HTMLElement)?.offsetTop || 0;
            }
        }
    });

    // 루프 밖에서 한 번만 리스너 등록
    if(hasAnimation) {
        isAnimation.value = true;
        layout?.addEventListener('wheel', preventScroll, { passive: false });

        gsap.to(layout, {
            ease: 'power2.out', 
            scrollTo: { y: scrollTarget }, 
            duration: 0.6,
            onComplete(){
                isAnimation.value = false;
                layout?.removeEventListener('wheel', preventScroll);
            }
        });
    }
}

const throttledScroll = throttle(setAnimation, 100);

const handleTouchStart = () => {
    isTouching = true;
}

const handleTouchEnd = () => {
    isTouching = false;
    setAnimation();
}

const handleScroll = () => {
    if(!isTouching) {
        throttledScroll();
    }
}

onMounted(() => {
    layout?.addEventListener('scroll', handleScroll);
    layout?.addEventListener('touchstart', handleTouchStart);
    layout?.addEventListener('touchend', handleTouchEnd);
})

onUnmounted(() => {
    layout?.removeEventListener('scroll', handleScroll);
    layout?.removeEventListener('touchstart', handleTouchStart);
    layout?.removeEventListener('touchend', handleTouchEnd);
    layout?.removeEventListener('wheel', preventScroll);
})

</script>

<style scoped lang="scss">
</style>