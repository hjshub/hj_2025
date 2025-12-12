<template>
  <div id="layout">
    <Header :key="$route.fullPath" :isDarkMode="isDarkMode" :isMob="isMob" @update:themeStatus="toggleTheme"/>
    <main id="contents">
      <router-view />
      <Footer />
    </main>
  </div>
</template>

<script setup lang="ts">
// 컴포넌트 로직
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import CommonFunction from '@/assets/ts/common'

const router = useRouter();
const route = useRoute();

const isDarkMode = ref(localStorage.getItem('theme') === 'dark');
const isMob = ref(window.innerWidth < 440);
const common = CommonFunction();

let prevIsMob = isMob.value

// debounce 함수
const createDebounce = (fn : () => void, wait : number = 120) => {
  let timer: number | null = null
  return () => {
    if (timer !== null) clearTimeout(timer)
    timer = window.setTimeout(() => {
      fn()
      timer = null
    }, wait)
  }
}

// 리사이즈 발생 시 isMob 업데이트하고, 현재 라우트가 portfolio 계열이면 필요시 리다이렉트
const doResize = () => {
  const now = window.innerWidth < 440
  if (now === prevIsMob) return // 실제 변경이 없으면 빠져나감
  prevIsMob = now
  isMob.value = now

  // 현재 라우트가 정확히 portfolio 또는 portfolio3 인 경우에만 처리
  const path = route.path || ''
  const name = String(route.name || '')
  const isPortfolioRoute = (path === '/portfolio' || path === '/portfolio3' || name === 'portfolio' || name === 'portfolio3')

  if (!isPortfolioRoute) return

  const target = isMob.value ? '/portfolio3' : '/portfolio'

  if (path === target) return

  // 비동기 리다이렉트 처리
  router.replace({ path: target }).then(() => {
    nextTick(() => {
      // 스크롤 리셋(필요시)
      const layoutEl = document.getElementById('layout') || document.documentElement
      if (layoutEl) layoutEl.scrollTop = 0

      // GSAP / ScrollTrigger 정리
      const ST = (window as any).ScrollTrigger
      ST?.getAll()?.forEach((t: any) => t.kill && t.kill())
      ST?.refresh && ST.refresh()

      // 공통 초기화 함수가 있으면 호출
      common?.setViewportHeight && common.setViewportHeight()
      common?.animate && common.animate()
    })
  }).catch((e) => {
    // 네비게이션 취소 등 안전하게 무시
    console.warn('redirect failed/cancelled', e)
  })
}

const handleResize = createDebounce(doResize, 120)

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value
  common.toggleTheme()
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  if (resizeTimer !== null) clearTimeout(resizeTimer)
})

</script>

<style>
#layout {
  min-height:calc(var(--vh, 1vh) * 100);
}
@tailwind base;
@tailwind components;
@tailwind utilities;
</style> 