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
            </span>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import axios from 'axios'
import CommonFunction from '../assets/ts/common'

const common = CommonFunction()
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
        rollingFanAnimation();
    } catch (error) {
        console.error('Failed to load projects:', error)
    }
})

</script>

<style scoped lang="scss">
    .rollingFan {
        @apply w-[100%] h-[100%] relative;
        
        span {
            @apply w-[54vw] h-[75vw] flex items-center justify-center flex-col absolute top-[30vw] left-[23vw] bg-white text-black font-[3rem];
            border:1px solid #ccc;
            border-radius:20px;
            overflow:hidden;

            &:before {
                content: attr(name);
                @apply flex items-center justify-center w-[100%] h-[100%] absolute top-0 left-0 z-[1] text-[0] dark:bg-[rgba(0,0,0,0.4)] bg-[rgba(255,255,255,0.4)] backdrop-blur-[2px];
            }
            
            &.active:before {
                @apply bg-[rgba(0,0,0,0.4)] dark:bg-[rgba(255,255,255,0.4)] text-indigo-100 dark:text-white text-[2.4rem] font-montserrat font-bold;
            }
        }
    }

</style>