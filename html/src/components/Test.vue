<template>
    <section class="p-0">
        <div class="rollingFan">
            <span v-for="item in projects" :key="item.id" :name = "item.name" 
            :style="{
                backgroundImage: item.imgSrc
                ? `url('./images/thumbnail/${item.imgSrc}')`
                : `url('./images/thumbnail/no-image.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }">
                <!-- <img :src="item.imgSrc ? `./images/thumbnail/${item.imgSrc}` : './images/thumbnail/no-image.jpg'" :alt="item.name"> -->
            </span>
            <em v-for="item in projects" :key="item.id">{{ item.name }}</em>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import axios from 'axios'
import CommonFunction from '../assets/ts/common'

const common = CommonFunction()
const scrollAnimation = common.scrollAnimation;
const rollingFanAnimation = common.rollingFanAnimation;
const projects = ref<any[]>([])

const axiosListUp = async () => {
  try {
    const response = await axios.get(`${import.meta.env.BASE_URL}data/list.json`);
    return response.data;
  } catch (error) {
    common.getErrorHandler().catch(error instanceof Error ? error : new Error(String(error)));
    return [];` `
  }
};

onMounted(async () => {
    try {
        const response = await axiosListUp()
        projects.value = response
    
        // DOM 업데이트 후 애니메이션 실행
        await nextTick();
        // rollingFanAnimation();
        scrollAnimation();
    } catch (error) {
        console.error('Failed to load projects:', error)
    }
})

</script>

<style scoped lang="scss">
    .rollingFan {
        @apply w-[100%] h-[100%] relative;
        
        // span {
        //     @apply w-[54vw] h-[75vw] flex items-center justify-center flex-col absolute top-[30vw] left-[23vw] bg-white text-black font-[3rem];
        //     border:1px solid #ccc;
        //     border-radius:20px;
        //     overflow:hidden;

        //     &:before {
        //         content: attr(name);
        //         @apply flex items-center justify-center w-[100%] h-[100%] absolute top-0 left-0 z-[1] text-[0] dark:bg-[rgba(0,0,0,0.4)] bg-[rgba(255,255,255,0.4)] backdrop-blur-[2px];
        //     }

        //     em {
        //         display:none;
        //     }
            
        //     &.active:before {
        //         @apply bg-[rgba(0,0,0,0.4)] dark:bg-[rgba(255,255,255,0.4)] text-indigo-100 dark:text-white text-[2.4rem] font-montserrat font-bold;
        //     }
        // }

        span {
            width:100vw;
            height:calc(var(--vh, 1vh) * 80);
            @apply relative flex items-center justify-center text-[5rem] text-white;
            // --scrProgress : 0;

            &:before {
                content: '';
                @apply w-[100%] h-[100%] absolute top-0 left-0 pointer-events-none bg-[rgba(0,0,0,0.2)] dark:bg-[rgba(255,255,255,0.4)] backdrop-blur-[2px];
            }
        }
        em {
            width:100%;
            height:calc(var(--vh, 1vh) * 100);
            @apply flex items-center justify-center fixed pointer-events-none top-[0] text-indigo-100 dark:text-white text-[6vw] font-montserrat font-bold;
            
            clip-path: inset(0 0 100% 0);
            transition: clip-path 0.05s linear;
            will-change: clip-path;
        }

        .test {
            @apply fixed top-0 left-0 bg-black text-white text-[1rem] p-1 z-[100000];
        }
    }

</style>