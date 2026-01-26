<template>
    <div>
        <UiItem>
            <template #item1>
                <div class="content">
                    <span></span>
                    <a class="switch" @click.prevent="toggleTyping">switch</a>
                </div>
            </template>
            <template #item2>
                <div class="content-2">
                    <span></span>
                    <a class="switch" @click.prevent="toggleActive">switch</a>
                    <!-- <a href="javascript:void(0);" onclick="this.previousElementSibling.classList.toggle('active');">switch</a> -->
                    <!-- <a href="javascript:document.activeElement.previousElementSibling.classList.toggle('active')">switch</a> -->
                </div>
            </template>
            <template #item3>
                <div class="content-3">
                    <span></span>
                    <a class="switch" @click.prevent="common.countYear('2015/10/26', $event.currentTarget?.previousElementSibling);">switch</a>
                </div>
            </template>
            <template #item4>
                <div class="content-4">
                    <ul>
                        <li v-for="(item, index) in textArray" :key="index">
                            <em>{{ index + 1 }}</em>
                            <span><b>{{ item }}</b></span>
                        </li>
                    </ul>
                    <!-- <a class="switch" @click.prevent="toggleTabAnimation">switch</a> -->
                </div>
            </template>
            <template #item5>
                <div class="content-5">
                    <div class="parallax-slide">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide" v-for="(item, index) in textArray" :key="index">
                                <div class="slide-bg" :style="`background-image: url('https://picsum.photos/800/400?random=${index}')`"><span>{{ item }}</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </UiItem>
        <div class="content-end">
            <div class="x-scrollWrapper">
                <span v-for="(item, index) in textArray" :key="index">
                    <b>{{ item }}</b>
                </span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import UiItem from './Ui_item.vue'
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

    const common = CommonFunction();

    const textArray = [
        "This is typing text example.",
        "This is typing text example2.",
        "This is typing text example3.",
        "This is typing text example4.",
    ];

    let currentIndex = 0;
    const isRunning = ref(false);  // ref로 변경

    // =========================  #item1 =========================
    // ===== 1. 재귀 setTimeout 방식 (콜백 기반, async 없음) =====
    // 타이핑 효과 (앞에서 추가)
    // const typeText = (text: string): Promise<void> => {
    //     return new Promise((resolve) => {
    //         const content = document.querySelector('.content');
    //         const span = content?.querySelector('span');

    //         if (!span) {
    //             resolve();
    //             return;
    //         }

    //         const txt = text.split('');
    //         let index = 0;

    //         const typeNextChar = () => {
    //             if (index < txt.length) {
    //                 span.innerText += txt[index];
    //                 index++;
    //                 setTimeout(typeNextChar, 100); // 재귀 호출
    //             } else {
    //                 resolve(); // 완료
    //             }
    //         };

    //         typeNextChar(); // 시작
    //     });
    // };

    // 지우기 효과 (뒤에서 삭제)
    // const eraseText = (): Promise<void> => {
    //     return new Promise((resolve) => {
    //         const content = document.querySelector('.content');
    //         const span = content?.querySelector('span');

    //         if (!span) {
    //             resolve();
    //             return;
    //         }

    //         const eraseNextChar = () => {
    //             const currentText = span.innerText;
    //             if (currentText.length > 0) {
    //                 span.innerText = currentText.slice(0, -1);
    //                 setTimeout(eraseNextChar, 50); // 재귀 호출
    //             } else {
    //                 resolve(); // 완료
    //             }
    //         };

    //         eraseNextChar(); // 시작
    //     });
    // };

    // ===== 2. setInterval 방식 =====
    // const typeText = (text: string): Promise<void> => {
    //     return new Promise((resolve) => {
    //         const content = document.querySelector('.content');
    //         const span = content?.querySelector('span');

    //         if (span) {
    //             const txt = text.split('');
    //             let index = 0;

    //             const typeInterval = setInterval(() => {
    //                 if (index < txt.length) {
    //                     span.innerText += txt[index];
    //                     index++;
    //                 } else {
    //                     clearInterval(typeInterval);
    //                     resolve();
    //                 }
    //             }, 100);
    //         } else {
    //             resolve();
    //         }
    //     });
    // };

    // const eraseText = (): Promise<void> => {
    //     return new Promise((resolve) => {
    //         const content = document.querySelector('.content');
    //         const span = content?.querySelector('span');

    //         if (span) {
    //             const eraseInterval = setInterval(() => {
    //                 const currentText = span.innerText;
    //                 if (currentText.length > 0) {
    //                     span.innerText = currentText.slice(0, -1);
    //                 } else {
    //                     clearInterval(eraseInterval);
    //                     resolve();
    //                 }
    //             }, 50);
    //         } else {
    //             resolve();
    //         }
    //     });
    // };

    // ===== 3. for...of + async/await =====

    const delay = (ms: number): Promise<void> => {
        return new Promise(resolve => {
            if(!isRunning.value) {  // .value 추가
                resolve();
                return;
            }
            setTimeout(resolve, ms);
        });
    };
    
    const typeText = async (text: string): Promise<void> => {
        const content = document.querySelector('.content');
        const span = content?.querySelector('span');

        if (span) {
            const txt = text.split('');
            
            for (const char of txt) {
                span.innerText += char;
                await delay(100);
            }
        }
    };

    const eraseText = async (): Promise<void> => {
        const content = document.querySelector('.content');
        const span = content?.querySelector('span');

        if (span) {
            const txtArray = span.innerText.split('');
            
            // 역순으로 순회하면서 삭제
            for (let i = txtArray.length - 1; i >= 0; i--) {
                span.innerText = txtArray.slice(0, i).join('');
                await delay(50);
            }
        }
    };

    // 전체 애니메이션 시퀀스
    const runAnimation = async () => {
        while (isRunning.value) {
            const text = textArray[currentIndex];
            if(!isRunning.value) break;
            
            // 타이핑
            await typeText(text);
            if(!isRunning.value) break;
            
            // 완료 후 대기
            await delay(2000);
            if(!isRunning.value) break;
            
            // 지우기
            await eraseText();
            if(!isRunning.value) break;
            
            
            // 다음 텍스트로 이동
            currentIndex = (currentIndex + 1) % textArray.length;
            
            // 지운 후 짧은 대기
            await delay(500);
            if(!isRunning.value) break;
        }
    };

    // =========================  toggle switch =========================
    const toggleActive = (event: Event) => {
        const target = event.currentTarget as HTMLElement;
        const span = target.previousElementSibling as HTMLElement;
        span?.classList.toggle('active');
    };

    const toggleTyping = () => {
        // 타이핑 애니메이션 토글
        isRunning.value = !isRunning.value;

        // 재시작할 때는 runAnimation 다시 실행
        if (isRunning.value) {
            const content = document.querySelector('.content');
            const span = content?.querySelector('span') as HTMLElement;

            span.textContent = ''; // 초기화
            currentIndex = 0; // 인덱스 초기화
            runAnimation();
        }
    };

    const toggleTabAnimation = () => {
        // vertical tab 애니메이션 토글
        if (setTimeoutId) {
            clearTimeout(setTimeoutId);
            setTimeoutId = null;
        } else {
            verticalTabAnimation();
        }
    };

    // =========================  #item2 =========================
    // rounded text 애니메이션
    const roundedTextAnimation = () => {
        const roundedSpan = document.querySelector('.content-2 span');
        const _t = textArray[0].split('');
        
        _t.forEach((el, idx) => {
            const wrapEl = document.createElement('em');
            wrapEl.style.transform = `rotate(${idx * (360 / _t.length)}deg) translate(0, -9rem)`;
            wrapEl.innerHTML = el;
            roundedSpan?.appendChild(wrapEl);
        });
    };

    // =========================  #item4 =========================
    // vertical tab 애니메이션
    let setTimeoutId: number | null = null;

    // ===== 기존 코드 (주석 처리) =====
    // const verticalTabAnimation = () => {
    //     const listItems = document.querySelectorAll('.content-4 ul li') as NodeListOf<Element>;
    //     let idx = 0;

    //     const toggleForward = () => {
    //         const currentEl = listItems[idx % listItems.length];
    //         const prevEl = listItems[(idx - 1 + listItems.length) % listItems.length];

    //         const currentSpan = currentEl?.querySelector('span');
    //         const prevSpan = prevEl?.querySelector('span');

    //         // 이전 탭 닫기
    //         gsap.to(prevSpan, {
    //             duration: 0.6,
    //             height: 0
    //         });

    //         // 현재 탭 열기
    //         gsap.to(currentSpan, {
    //             duration: 0.6,
    //             height: 'auto'
    //         });

    //         setTimeoutId = window.setTimeout(() => {
    //             idx++;
    //             toggleForward();
    //         }, 2000);

    //         if(idx >= listItems.length - 1 && setTimeoutId !== null) {
    //             clearTimeout(setTimeoutId!);
    //             toggleBackward();
    //         }
    //     }

    //     const toggleBackward = () => {
    //         const currentEl = listItems[idx % listItems.length];
    //         const nextEl = listItems[(idx + 1 + listItems.length) % listItems.length];
            
    //         const currentSpan = currentEl?.querySelector('span');
    //         const nextSpan = nextEl?.querySelector('span');

    //         // 현재 탭 열기
    //         gsap.to(currentSpan, {
    //             duration: 0.6,
    //             height: 'auto'
    //         });

    //         // 다음 탭 닫기
    //         gsap.to(nextSpan, {
    //             duration: 0.6,
    //             height: 0
    //         });

    //         setTimeoutId = window.setTimeout(() => {
    //             idx--;
    //             toggleBackward();
    //         }, 2000);

    //         if(idx <= 0 && setTimeoutId !== null) {
    //             clearTimeout(setTimeoutId!);
    //             toggleForward();
    //         }
    //     }
        
    //     toggleForward();

    // };

    // ===== 개선된 코드 =====
    const verticalTabAnimation = () => {
        const listItems = document.querySelectorAll('.content-4 ul li') as NodeListOf<Element>;
        
        if (listItems.length === 0) return;

        let currentIdx = 0; // 현재 활성화된 탭 인덱스
        let direction: 'forward' | 'backward' = 'forward'; // 애니메이션 방향
        const ANIMATION_DURATION = 0.6; // 애니메이션 지속 시간
        const DELAY_BETWEEN_TABS = 2000; // 탭 전환 대기 시간

        // 모든 탭의 실제 높이를 미리 측정해서 캐싱
        const measuredHeights: number[] = [];
        listItems.forEach((item, idx) => {
            const span = item.querySelector('span') as HTMLElement;
            if (span) {
                // 임시로 auto로 설정하고 높이 측정
                const currentHeight = span.style.height;
                span.style.height = 'auto';
                measuredHeights[idx] = span.scrollHeight;
                span.style.height = currentHeight; // 원래대로 복원
            }
        });

        // 탭 전환 함수
        const switchTab = (fromIdx: number, toIdx: number) => {
            const fromItem = listItems[fromIdx];
            const toItem = listItems[toIdx];
            
            const fromSpan = fromItem?.querySelector('span') as HTMLElement;
            const toSpan = toItem?.querySelector('span') as HTMLElement;

            if (!fromSpan || !toSpan) return;

            // 미리 측정된 높이 사용
            const toHeight = measuredHeights[toIdx] || 0;

            // 현재 열린 탭 닫기
            gsap.to(fromSpan, {
                duration: ANIMATION_DURATION,
                height: 0,
                ease: 'power2.inOut'
            });

            // 다음 탭 열기
            gsap.to(toSpan, {
                duration: ANIMATION_DURATION,
                height: toHeight,
                ease: 'power2.inOut'
            });
        };

        // 재귀 애니메이션 실행
        const runAnimation = () => {
            const prevIdx = currentIdx;
            
            // 방향에 따라 다음 인덱스 계산
            if (direction === 'forward') {
                currentIdx++;
                
                // 마지막 탭에 도달하면 방향 전환
                if (currentIdx >= listItems.length) {
                    currentIdx = listItems.length - 1;
                    direction = 'backward';
                }
            } else {
                currentIdx--;
                
                // 첫 번째 탭에 도달하면 방향 전환
                if (currentIdx < 0) {
                    currentIdx = 0;
                    direction = 'forward';
                }
            }

            // 탭 전환
            switchTab(prevIdx, currentIdx);

            // 다음 애니메이션 예약
            setTimeoutId = window.setTimeout(() => {
                runAnimation();
            }, DELAY_BETWEEN_TABS);
        };

        // 초기 탭 열기 (미리 측정된 높이 사용)
        const firstSpan = listItems[0]?.querySelector('span') as HTMLElement;
        if (firstSpan) {
            gsap.set(firstSpan, { height: measuredHeights[0] || 0 });
        }

        // 나머지 탭들은 닫힌 상태로 초기화
        listItems.forEach((item, idx) => {
            if (idx !== 0) {
                const span = item.querySelector('span') as HTMLElement;
                if (span) gsap.set(span, { height: 0 });
            }
        });

        // 첫 번째 전환 시작
        setTimeoutId = window.setTimeout(() => {
            runAnimation();
        }, DELAY_BETWEEN_TABS);
    };

    // =========================  #item5 =========================
    let swiperInstance: Swiper | null = null;

    const parallaxSlide = ():void => {
        swiperInstance = new Swiper('.parallax-slide', {
            modules: [Navigation, Pagination, Autoplay],
            slidesPerView: 'auto',
            spaceBetween: 0,
            loop: true,
            speed: 800,
            // autoplay: {
            //     delay: 2000,
            //     disableOnInteraction: false,
            // },
            on: {
                setTranslate: function() {
                    this.slides.forEach((slideEl, idx) => {
                        const bg = slideEl.querySelector('.slide-bg') as HTMLElement;
                        if(bg) {
                            // this.translate = swiper 전체 이동거리
                            // slideEl 위치 = idx * width + translate
                            // idx * width --> 각 슬라이드 초기 위치(고정)

                            const slideWidth = this.width; // 각 슬라이드의 너비
                            const offset = this.translate + (idx * slideWidth); // 슬라이드의 현재 위치 계산
                            bg.style.transform = `translateX(${-offset}px)`;
                        }
                    });
                },
                setTransition: function(swiper, duration) { // 스냅(스와이프 완료 후 동작) 자연스럽게 
                    this.slides.forEach((slideEl) => {
                        const bg = slideEl.querySelector('.slide-bg') as HTMLElement;
                        if(bg) {
                            bg.style.transition = `transform ${duration}ms`;
                        }
                    });
                },
            }
            // allowTouchMove: false,
        });
    }

    // =========================  최하단 scrollTrigger pin 가로스크롤 (layout scroll event remove (header.vue), overflow unset & window scroll 사용) =========================
    const x_scrollAnimation = () => {
        const wrapper = document.querySelector('.x-scrollWrapper') as HTMLElement;
        const _span = gsap.utils.toArray('.x-scrollWrapper span') as HTMLElement[];
        
        if (!wrapper || _span.length === 0) return;
        
        const _timeline = gsap.timeline();

        // 실제 스크롤 거리 = 전체 너비 - 보이는 너비
        const scrollDistance = wrapper.scrollWidth - _span[0].offsetWidth;

        // console.log(wrapper.scrollWidth, _span[0].offsetWidth, scrollDistance);

        // 각 span의 텍스트 요소 선택
        const textElements = gsap.utils.toArray('.x-scrollWrapper span b') as HTMLElement[];

        ScrollTrigger.create({
            trigger: '.content-end',
            pin: true,
            scrub: 3,
            animation: _timeline,
            start: 'top top',
            end: () => `+=${scrollDistance}`,
            onUpdate: (self) => {
                // 각 span별로 개별 parallax 효과
                textElements.forEach((text, index) => {
                    // 현재 전체 진행도 (몇 번째 span이 화면에 있는지)
                    const currentPosition = self.progress * (_span.length - 1); //  0 ~ (n-1)
                    
                    // 이 span이 화면 중앙에서 얼마나 떨어져 있는지 (-1 ~ 1)
                    const distanceFromCenter = currentPosition - index;
                    
                    // 화면 중앙에 있을 때는 0, 멀어질수록 lag 증가
                    const lag = distanceFromCenter * scrollDistance * 0.15;
                    
                    // gradient 강도: 중앙일수록 약하게, 멀수록 강하게
                    const gradientStrength = Math.abs(distanceFromCenter); // 0 ~ 1
                    
                    // gradient 중심점을 distanceFromCenter에 따라 이동
                    const gradientCenter = 50 - distanceFromCenter * 50; // -1: 100%, 0: 50%, 1: 0%
                    
                    // 중앙일 때는 전체가 밝고(opacity 높음), 멀 때는 gradient가 강함
                    const minOpacity = 0.3 + (1 - gradientStrength) * 0.4; // 중앙: 0.7, 멀리: 0.3
                    const midOpacity = 0.7 + (1 - gradientStrength) * 0.3; // 중앙: 1.0, 멀리: 0.7
                    
                    const gradient = `linear-gradient(90deg, 
                        rgba(255,255,255,${minOpacity}) 0%, 
                        rgba(255,255,255,${midOpacity}) ${Math.max(0, gradientCenter - 25)}%, 
                        rgba(255,255,255,1) ${gradientCenter}%, 
                        rgba(255,255,255,${midOpacity}) ${Math.min(100, gradientCenter + 25)}%, 
                        rgba(255,255,255,${minOpacity}) 100%)`;
                    
                    gsap.to(text, {
                        x: lag,
                        backgroundImage: gradient,
                        duration: 1,
                        ease: 'power2.out'
                    });
                });
            }
        });

        _timeline.to(_span, {
            xPercent: -100 * (_span.length - 1),
            ease: 'none',
            duration: 1
        });
    }


    onMounted(() => {
        // layout overflow unset으로 window 스크롤 활성화
        const layout = document.querySelector('#layout') as HTMLElement;
        if (layout) {
            layout.style.overflow = 'unset';
        }

        roundedTextAnimation();
        // verticalTabAnimation();
        x_scrollAnimation();
        parallaxSlide();
    })

    onUnmounted(() => {
        isRunning.value = false;
        
        // swiper cleanup
        if (swiperInstance) {
            swiperInstance.destroy();
            swiperInstance = null;
        }
        
        // layout overflow 원복
        const layout = document.querySelector('#layout') as HTMLElement;
        if (layout) {
            layout.style.overflow = '';
        }
    })
</script>

<style scoped lang="scss">
    :global(#gnb .menu) {
        @apply h-0;
    }

    :global(#gnb .menu ul) {
        @apply sr-only;
    }

    .content {
        @apply flex w-full justify-center;

        span {
            @apply inline-block border-[1px] border-gray-300 border-solid w-[90%] h-[6rem] pl-3 pr-3 text-blue-300 text-[1.5rem] whitespace-pre-wrap;
            line-height: 6rem;
            
            &:after {
                @apply w-[1px] h-[2rem] bg-blue-500 ml-2 mr-2 opacity-0;
                animation-name: blings;
                animation-duration: 1.2s;
                animation-iteration-count: infinite;

                content:'';
            }
        }
        @keyframes blings {
            from {
                opacity:0;
            }to {
                opacity:1;
            }
        }
    }

    .content-2 {
        @apply flex w-full justify-center;

        span {
            @apply flex w-[20rem] h-[20rem] text-blue-300 text-[1.5rem] rounded-[50%] relative;
            animation: rotateAni 16s infinite linear paused;
            
            &.active {
                animation-play-state: running;    
            }

            :deep(em) {
                @apply absolute left-[50%] top-[50%] origin-[50%_50%];
            }
        }

        @keyframes rotateAni {
            from {
                transform: rotate(0deg);
            } to {
                transform: rotate(360deg);
            }
        }
    }

    .content-3 {
        @apply text-blue-300 text-[3rem] flex w-full items-center justify-center;
    }

    .content-4 {
        @apply flex w-full items-center justify-center;

        ul {
            @apply flex w-[80%] flex-col items-center justify-center gap-5;

            li {
                @apply flex w-full flex-col rounded-[1rem] border-[1px] border-blue-300 border-solid overflow-hidden;
                box-shadow:1px 1px 7px 3px rgba(147, 197, 253, 0.3);

                em {
                    @apply p-2 text-blue-300;
                }

                span {
                    @apply flex h-0;

                    b {
                        @apply bg-blue-300 text-white p-2 pt-4 pb-4 w-full; 
                    }
                }
            }
        }
    }

    .content-5 {
        @apply flex w-full h-[80%] items-center justify-center;
        min-width:calc(100% + 5rem);

        .parallax-slide {
            @apply w-full h-full relative overflow-hidden;

            .swiper-slide {
                @apply w-full h-full relative flex items-center justify-center overflow-hidden;
                
                .slide-bg {
                    @apply absolute top-0 left-0 w-full h-full bg-center bg-cover flex items-center justify-center text-white text-[2.2rem];
                    
                    span {
                        @apply text-center;
                    }
                }
            }
        }
    }

    .content-end {
        @apply flex w-[100vw] items-center overflow-hidden;
        height:100vh;
        will-change: transform;
        transform: translateZ(0);
        backface-visibility: hidden;

        .x-scrollWrapper {
            @apply flex w-full h-full items-center;

            span {
                @apply flex items-center justify-center p-8 text-white text-[2rem] min-w-[100%] h-[50vh];
                overflow: hidden;
                position: relative;
                
                b {
                    background: linear-gradient(90deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,1) 50%, rgba(255,255,255,0.8) 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    font-weight: bold;
                }
                
                &:nth-child(1) {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                }
                &:nth-child(2) {
                    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
                }
                &:nth-child(3) {
                    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
                }
                &:nth-child(4) {
                    background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
                }
            }
        }
    }

    .switch {
        @apply inline-flex text-white text-[1.4rem] bg-black rounded-[1rem] px-4 h-16 items-center absolute bottom-10 right-0;
    }
</style>