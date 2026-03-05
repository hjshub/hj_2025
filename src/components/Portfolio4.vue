<template>
    <section class="p-0">
        <div class="pin-wrapper" v-for="item in projects" :key="item.id" :name = "item.name">
            <div class="pin--animation">
                <div class="--top animate">
                    <h4>{{ item.name }}</h4>
                </div>
                <div class="--bg"
                :style="{
                    backgroundImage: item.imgSrc
                    ? `url('./images/thumbnail/${item.imgSrc}')`
                    : `url('./images/thumbnail/no-image.jpg')`,
                    backgroundSize: 'auto 100%',
                    backgroundPosition:'center center'
                }"
                >
                    <div class="--top">
                        <h4>{{ item.name }}</h4>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import axios from 'axios'
import { gsap } from 'gsap' 
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CommonFunction from '../assets/ts/common'

const common = CommonFunction()
const projects = ref<any[]>([])

const axiosListUp = async () => {
    try {
        const response = await axios.get(`${import.meta.env.BASE_URL}data/list.json`);
        return response.data;
    } catch (error) {
        common.getErrorHandler().catch(error instanceof Error ? error : new Error(String(error)));
        return [];
    }
};

gsap.registerPlugin(ScrollTrigger);

// resize 디바운스용 (중복 refresh 방지)
let lastResizeWidth: number | null = null;
let resizeTimeoutId: number | null = null;

// pin 애니메이션(ScrollTrigger + tween) 재생성/정리용
let pinScrollTriggers: ScrollTrigger[] = [];
let pinTweens: gsap.core.Tween[] = [];

let layout = document.querySelector('#layout') as HTMLElement;

// sticky + scrollTrigger
const pinAnimation = () => {
    const pinElements = document.querySelectorAll('.pin--animation') as NodeListOf<HTMLElement>;
    const insetDefaultArray: number[] = [0.3, 0.2, 0.4, 0.2];
    const insetZeroArray: number[] = Array.from({ length: insetDefaultArray.length }, () => 0);

    // 리사이즈 시 pin 관련 인스턴스 정리 후 재생성
    pinScrollTriggers.forEach(trigger => trigger.kill());
    pinScrollTriggers = [];
    pinTweens.forEach(tween => tween.kill());
    pinTweens = [];

    pinElements.forEach((el) => {
        const wrapper = el.closest('.pin-wrapper') as HTMLElement | null;
        const bg = el.querySelector('.--bg') as HTMLElement | null;

        if (!wrapper || !bg) return;

        const setInset = (arr: number[]) => {
            const [t, r, b, l] = arr;
            return `inset(${t * 100}% ${r * 100}% ${b * 100}% ${l * 100}% round ${b*10}rem)`;
        };

        const tween = gsap.fromTo(bg, {
            clipPath : setInset(insetDefaultArray)
        },{
            clipPath : setInset(insetZeroArray),
            ease:'none',
            scrollTrigger: {
                scroller: layout,
                trigger: wrapper,
                start: 'top top',
                invalidateOnRefresh: true, // refresh 때 start/end 재계산
                end:() => `+=${layout?.offsetHeight * 0.5}`,
                scrub: 1.2,
                // markers: true,
            }
        });

        pinTweens.push(tween);
        pinScrollTriggers.push(tween?.scrollTrigger);
    });
}

const handleResize = () => {
    // iOS 주소창/툴바 변화로 발생하는 높이 resize는 무시 (가로폭 변할 때만 처리)
    if (lastResizeWidth !== null && window.innerWidth === lastResizeWidth) return;

    lastResizeWidth = window.innerWidth;

    if (resizeTimeoutId !== null) {
        clearTimeout(resizeTimeoutId);
    }

    resizeTimeoutId = window.setTimeout(() => {
        // 리사이즈 후 레이아웃 기준으로 재계산
        // pinAnimation();
        pinAnimation();
        ScrollTrigger.refresh();
    }, 150);
};

onMounted(async () => {
    try {
        const response = await axiosListUp()
        projects.value = response
    
        // DOM 업데이트 후 애니메이션 실행
        await nextTick();
        scrollAnimation();
    } catch (error) {
        console.error('Failed to load projects:', error)
    }

    lastResizeWidth = window.innerWidth;
    pinAnimation();
    common.animate();
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', common.animate);
});

onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
    window.removeEventListener('scroll', common.animate);
    if (resizeTimeoutId !== null) {
        clearTimeout(resizeTimeoutId);
        resizeTimeoutId = null;
    }

    if(pinScrollTriggers){
        pinScrollTriggers.forEach(trigger => trigger.kill());
        pinScrollTriggers = [];
    }
    if(pinTweens){
        pinTweens.forEach(tween => tween.kill());
        pinTweens = [];
    }
});

</script>

<style scoped lang="scss">
    .pin-wrapper {
        @apply w-full h-[250svh];
    }
    .pin--animation {
        @apply w-full h-[100svh] pt-60 sticky top-0;

        .--top {
            @apply w-full flex flex-col items-center justify-center;

            * {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                -webkit-background-clip: text;
                background-clip: text;
                -webkit-text-fill-color: transparent;
            }

            h4 {
                @apply text-[3.5rem] uppercase font-bold;
            }
        }

        .--bg {
            @apply absolute top-0 left-0 w-full h-full pt-60;
            
            &:before {
                @apply w-full h-full absolute top-0 left-0 bg-black opacity-30;
                content:'';
            }
            
            .--top {
                @apply relative z-10;

                * {
                    -webkit-background-clip: none;
                    background-clip: none;
                    -webkit-text-fill-color: white;
                }
            
            }
        }
    }
</style>