<template>
    <UiItem>
        <template #item1>
            <div class="content">
                <span></span>
            </div>
        </template>
        <template #item2>
            <div class="content-2">
                <span></span>
                <a href="javascript:void(0);" onclick="this.previousElementSibling.classList.toggle('active');">switch</a>
            </div>
        </template>
        <template #item3>
            <div class="content-3">
                <span></span>
            </div>
        </template>
    </UiItem>
</template>

<script setup lang="ts">
    import UiItem from './Ui_item.vue'
    import { ref, onMounted, onUnmounted, nextTick } from 'vue' 

    const textArray = [
        "This is typing text example.",
        "This is typing text example2.",
        "This is typing text example3.",
        "This is typing text example4.",
    ];

    let currentIndex = 0;

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
    
    const typeText = async (text: string): Promise<void> => {
        const content = document.querySelector('.content');
        const span = content?.querySelector('span');

        if (span) {
            const txt = text.split('');
            
            for (const char of txt) {
                span.innerText += char;
                await new Promise(resolve => setTimeout(resolve, 100));
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
                await new Promise(resolve => setTimeout(resolve, 50));
            }
        }
    };

    // 전체 애니메이션 시퀀스
    const runAnimation = async () => {
        while (true) {
            const text = textArray[currentIndex];
            
            // 타이핑
            await typeText(text);
            
            // 완료 후 대기
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // 지우기
            await eraseText();
            
            // 다음 텍스트로 이동
            currentIndex = (currentIndex + 1) % textArray.length;
            
            // 지운 후 짧은 대기
            await new Promise(resolve => setTimeout(resolve, 500));
        }
    };

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

    onMounted(() => {
        runAnimation();
        roundedTextAnimation();
    })

    onUnmounted(() => {
    })
</script>

<style scoped lang="scss">
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

        a {
            @apply inline-flex text-white bg-black rounded-[1rem] px-4 h-16 items-center absolute bottom-10 right-0;
        }

        @keyframes rotateAni {
            from {
                transform: rotate(0deg);
            } to {
                transform: rotate(360deg);
            }
        }
    }
</style>