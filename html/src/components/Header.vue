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
        <div class="scrollGage" :style="{ width: scrollProgress + '%' }"></div>
        <div class="bg-black text-white">{{`window:${window_h}, screen:${screen_h}`}}</div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, onUnmounted, defineProps, defineEmits } from 'vue'
import { useRoute } from 'vue-router'
import CommonFunction from '../assets/ts/common'

const common = CommonFunction()
const route = useRoute()

const scrollProgress = ref(0)

const window_h = ref(0)
const screen_h = ref(0)

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

    window_h.value = window.innerHeight;
    screen_h.value = screen.height;

    scrollTimeout = null;
  }, 100); // 100ms마다 한 번만 실행
};

onMounted(() => {
  common.init()
  window_h.value = window.innerHeight;
  screen_h.value = screen.height;
  window.addEventListener('scroll', throttledScroll);
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', throttledScroll);
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