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
        <ul class="flex--wrap edge w-[100%]">
          <li v-for="(item, index) in menuItems" :key="index">
            <router-link class="anchor" :class="route.path == item.href ? 'active' : ''" :to="item.href" lang="en">{{ item.text }}</router-link>
          </li>
        </ul>
        <div class="scrollGage" :style="{ width: scrollProgress + '%' }"></div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, defineProps, defineEmits } from 'vue'
import { useRoute } from 'vue-router'
import CommonFunction from '../assets/ts/common'

const common = CommonFunction()
const route = useRoute()

const scrollProgress = ref(0)

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

onMounted(() => {
  common.init()
})

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