<template>
    <section class="pin-wrapper p-0">
        <div class="pin--animation">
            <div class="--top">
                <h4>title</h4>
                <span>description</span>
            </div>
            <div class="--bg">
                <div class="--top">
                    <h4>title</h4>
                    <span>description</span>
                </div>
                <span class="sr-only">clip-bg</span>
            </div>
        </div>
    </section>
    <section class="pin-wrapper p-0">
        <div class="pin--animation">
            <div class="--top">
                <h4>title</h4>
                <span>description</span>
            </div>
            <div class="--bg">
                <div class="--top">
                    <h4>title</h4>
                    <span>description</span>
                </div>
                <span class="sr-only">clip-bg</span>
            </div>
        </div>
    </section>
    <section class="pin-wrapper p-0">
        <div class="pin--animation">
            <div class="--top">
                <h4>title</h4>
                <span>description</span>
            </div>
            <div class="--bg">
                <div class="--top">
                    <h4>title</h4>
                    <span>description</span>
                </div>
                <span class="sr-only">clip-bg</span>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
    import { ref, onMounted, onUnmounted, nextTick } from 'vue'
    import { gsap } from 'gsap' 
    import { ScrollTrigger } from 'gsap/ScrollTrigger'
    import CommonFunction from '../assets/ts/common'
    import Swiper from 'swiper';
    import { Navigation, Pagination, Autoplay } from 'swiper';
    import 'swiper/css';
    import 'swiper/css/navigation';
    import 'swiper/css/pagination';

    gsap.registerPlugin(ScrollTrigger);

    // resize 디바운스용 (중복 refresh 방지)
    let resizeTimeoutId: number | null = null;
    let lastResizeWidth: number | null = null;

    // pin 애니메이션(ScrollTrigger + tween) 재생성/정리용
    let pinTween: gsap.core.Tween | null = null;
    let pinScrollTrigger: ScrollTrigger | null = null;
    let layout = document.querySelector('#layout') as HTMLElement;
    let doStickyAnimation: (() => void) | null = null;

    const pinAnimation = () => {
        const pinElement = document.querySelector('.pin--animation') as HTMLElement;
        const topElement = document.querySelectorAll('.--top') as NodeListOf<HTMLElement>;
        const text = gsap.utils.toArray(topElement[0].querySelectorAll('*')) as HTMLElement[];

        if (!pinElement) return;

        const bg = pinElement.querySelector('.--bg') as HTMLElement;
        const insetDefaultArray: number[] = [0.3, 0.2, 0.6, 0.2];
        const insetZeroArray: number[] = Array.from({ length: insetDefaultArray.length }, () => 0);
        const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
        const setInset = (arr: number[]) => {
            const [t, r, b, l] = arr;
            bg.style.clipPath = `inset(${t * 100}% ${r * 100}% ${b * 100}% ${l * 100}% round ${t*10}rem)`;
        };

        gsap.fromTo(text, {
            autoAlpha:0,
            yPercent:50,
        },{
            autoAlpha:1,
            yPercent:0,
            duration:0.8,
            stagger:0.2,
            ease: 'power2.In'
        });

        // scrubProxy + scrub 조합
        // target으로 임의 객체 지정 -> 스크롤 진행 시 스크롤 진행률 (0 - 1) 이 해당 객체에 담김
        // onUpdate 콜백을 scrollTrigger가 아닌 tween 자체에서 호출 해야함
        const scrubProxy = {p : 0};

        // 리사이즈 시 pin 관련 인스턴스 정리 후 재생성
        if (pinScrollTrigger) {
            pinScrollTrigger.kill();
            pinScrollTrigger = null;
        }
        if (pinTween) {
            pinTween.kill();
            pinTween = null;
        }

        pinTween = gsap.to(scrubProxy, {
            p: 1,
            ease: 'none',
            scrollTrigger: {
                trigger: pinElement,
                scroller: layout,
                start: 'top top',
                end: 'bottom 80%',
                pin: true,
                scrub: 0.8,
                // refresh 때 start/end 재계산
                invalidateOnRefresh: true,
                onRefreshInit: () => setInset(insetDefaultArray),
                onLeave: () => setInset(insetZeroArray),
            },
            onUpdate: () => {
                const p = scrubProxy.p;
                if (p < 0 || p > 1) return;

                const localP = clamp01(p / 0.8); // 0 ~ 1 (0 ~ 0.8 구간 보간)
                const insetUpdateArray = insetDefaultArray.map(val => val * (1 - localP));
                setInset(insetUpdateArray);
            }
        });

        pinScrollTrigger = pinTween.scrollTrigger || null;

        // self progress + css transition 조합
        // self progress 는 단순 스크롤 진행률, scrub 사용해도 스무드 적용이 안됨
        // gsap.to(pinElement, {
        //     scrollTrigger: {
        //         trigger: pinElement,
        //         start: 'top top',
        //         end: 'bottom 80%',
        //         pin: true,
        //         scrub: false,
        //         onUpdate: (self) => {
        //             const p = self.progress;
        //             if (p < 0 || p > 1) return;

        //             const localP = clamp01(p / 0.8); // 0 ~ 1 (0 ~ 0.8 구간 보간)
        //             const insetUpdateArray = insetDefaultArray.map(val => val * (1 - localP));
        //             setInset(insetUpdateArray);
        //         },
        //         onLeave: () => setInset(insetZeroArray),
        //         // markers: true,
        //     }
        // });
    }

    const stickyAnimation = () => {
        const pinElements = document.querySelectorAll('.pin--animation') as NodeListOf<HTMLElement>;

        if (!pinElements.length || !layout) return null;

        const insetDefaultArray: number[] = [0.3, 0.2, 0.6, 0.2];
        const insetZeroArray: number[] = Array.from({ length: insetDefaultArray.length }, () => 0);
        const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

        const items = Array.from(pinElements).map((pinElement) => {
            const wrapper = pinElement.closest('.pin-wrapper') as HTMLElement | null;
            const bg = pinElement.querySelector('.--bg') as HTMLElement | null;

            if (!wrapper || !bg) return null;

            const setInset = (arr: number[]) => {
                const [t, r, b, l] = arr;
                bg.style.clipPath = `inset(${t * 100}% ${r * 100}% ${b * 100}% ${l * 100}% round ${t*10}rem)`;
            };

            setInset(insetDefaultArray);

            return {
                wrapper,
                setInset,
                originPos: wrapper.getBoundingClientRect().top,
                originHeight: wrapper.offsetHeight,
            };
        }).filter((item): item is NonNullable<typeof item> => item !== null);

        if (!items.length) return null;

        return (() => {
            const scrollTop = layout.scrollTop;
            const offsetHeight = layout.offsetHeight;

            items.forEach(({ originPos, originHeight, setInset }) => {
                const min = originPos - offsetHeight / 2;
                const max = originPos + originHeight / 2;

                if (scrollTop >= min && scrollTop <= max) {
                    const progress = (scrollTop - min) / (max - min);
                    const p = Math.floor(progress * 100) / 100;

                    if (p < 0 || p > 1) return;

                    const localP = clamp01(p / 0.6); // 0 ~ 1 (0 ~ 0.6 구간 보간)
                    const insetUpdateArray = insetDefaultArray.map(val => val * (1 - localP));
                    setInset(insetUpdateArray);
                }

                if(scrollTop <= 0) setInset(insetDefaultArray);

                if (scrollTop > max) setInset(insetZeroArray);
            });
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
            pinAnimation();
            ScrollTrigger.refresh();
        }, 150);
    };

    onMounted(() => {
        lastResizeWidth = window.innerWidth;
        // pinAnimation();
        // window.addEventListener('resize', handleResize);

        doStickyAnimation = stickyAnimation();
        layout?.addEventListener('scroll', doStickyAnimation);

    });

    onUnmounted(() => {
        // window.removeEventListener('resize', handleResize);
        // if (pinScrollTrigger) {
        //     pinScrollTrigger.kill();
        //     pinScrollTrigger = null;
        // }
        // if (pinTween) {
        //     pinTween.kill();
        //     pinTween = null;
        // }

        layout?.removeEventListener('scroll', doStickyAnimation);
        doStickyAnimation = null;
    })
</script>

<style scoped lang="scss">
    // .pin--animation {
    //     @apply w-full h-[200svh] p-20 relative;

    //     .--top {
    //         @apply w-full flex flex-col items-center justify-center text-[5rem];

    //         * {
    //             background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    //             -webkit-background-clip: text;
    //             background-clip: text;
    //             -webkit-text-fill-color: transparent;
    //         }

    //         h4 {
    //             @apply text-[8rem] uppercase font-bold;
    //         }
    //     }

    //     .--bg {
    //         @apply absolute top-0 left-0 w-full h-full p-20;
    //         background: linear-gradient(135deg, #667eea 30%, #764ba2 100%);
    //         will-change: clip-path, transform;
    //         // transition-property: clip-path;
    //         // transition-duration:0.8s;
    //         // transition-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
            
    //         .--top * {
    //             -webkit-background-clip: none;
    //             background-clip: none;
    //             -webkit-text-fill-color: white;
    //         }
    //     }
    // }

    .pin-wrapper {
        @apply w-full h-[250svh];
    }
    .pin--animation {
        @apply w-full h-[150svh] p-20 sticky top-0;

        .--top {
            @apply w-full flex flex-col items-center justify-center text-[5rem];

            * {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                -webkit-background-clip: text;
                background-clip: text;
                -webkit-text-fill-color: transparent;
            }

            h4 {
                @apply text-[8rem] uppercase font-bold;
            }
        }

        .--bg {
            @apply absolute top-0 left-0 w-full h-full p-20;
            background: linear-gradient(135deg, #667eea 30%, #764ba2 100%);
            will-change: clip-path, transform;
            transition-property: clip-path;
            transition-duration:0.8s;
            transition-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
            
            .--top * {
                -webkit-background-clip: none;
                background-clip: none;
                -webkit-text-fill-color: white;
            }
        }
    }
</style>