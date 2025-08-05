<template>
  <header id="gnb">
    <div class="inner flex--wrap edge">
      <h1 class="sr-only">상단 메뉴</h1>
      <span class="flex--wrap"><b lang="en" class="r1">web portfolio</b><b lang="en" class="r2">hj</b></span>
      <button type="button" class="button-toggle rounded border" @click="$emit('update:themeStatus')">
        <em class="hidden-txt">{{ !isDarkMode ? 'Light' : 'Dark' }}</em>
      </button>
    </div>
    <div class="flex--wrap align-center">
      <div class="menu">
        <ul class="flex--wrap">
          <li v-for="(item, index) in menuItems" :key="index">
            <router-link class="anchor" :class="route.path == item.href ? 'active' : ''" :to="item.href" lang="en">{{ item.text }}</router-link>
          </li>
        </ul>
        <div class="scrollGage" :style="{ width : scrollProgress + '%'}"></div>
        <div class="bg-black text-white ddd"></div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, onUnmounted, defineProps, defineEmits } from 'vue'
import { useRoute } from 'vue-router'
import gsap from 'gsap'
import CommonFunction from '../assets/ts/common'

const common = CommonFunction()
const route = useRoute()
const scrollProgress = ref(0)
const layout = document.querySelector('#layout')

let scrollTimeout: number | null = null

const menuItems = [
  { href: '/', text: 'home' },
  // { href: '/about', text: 'abolut' },
  // { href: '/skill', text: 'skill inventory' },
  { href: '/portfolio', text: 'portfolio' },
  // { href: '/contact', text: 'contact' }
]

// const currentPath : string | null = window.location.pathname;

const props = defineProps({
  isDarkMode : { type: Boolean, default: false },
})

defineEmits(['update:themeStatus'])

// throttledScroll을 변수로 선언
const throttledScroll = () => {
  if (scrollTimeout !== null) return;
  scrollTimeout = window.setTimeout(() => {
    common.setGnb();
    common.animate();
    common.setViewportHeight();
    scrollProgress.value = common.scrollGage();

    scrollTimeout = null;
  }, 16); // 약 60fps에 해당
};

onMounted(() => {
  common.init()
  
  if (!layout) return;

  // iOS 내부 스크롤 컨테이너 bounce/벽돌 현상 우회
  let startY = 0;
  layout.addEventListener('touchstart', function(e) {
    startY = e.touches[0].clientY;
  });

  layout.addEventListener('touchmove', function(e) {
    const scrollTop = layout.scrollTop;
    const scrollHeight = layout.scrollHeight;
    const offsetHeight = layout.offsetHeight;

    // 맨 위에서 아래로 당길 때
    if (scrollTop === 0 && e.touches[0].clientY > startY) {
      e.preventDefault();
    }
    // 맨 아래에서 위로 올릴 때
    if (scrollTop + offsetHeight >= scrollHeight && e.touches[0].clientY < startY) {
      e.preventDefault();
    }
  }, { passive: false });

  layout?.addEventListener('scroll', throttledScroll);
})

onBeforeUnmount(() => {
  layout?.removeEventListener('scroll', throttledScroll);
  if (scrollTimeout !== null) {
    clearTimeout(scrollTimeout);
    scrollTimeout = null;
  }
});

onUnmounted(() => {
})
</script>

<style scoped>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* 나머지 스타일은 main.scss에서 관리 */
</style> 