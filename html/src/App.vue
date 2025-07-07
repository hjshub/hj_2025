<template>
  <div id="layout">
    <Header :key="$route.fullPath" :isDarkMode="isDarkMode" @update:themeStatus="toggleTheme"/>
    <main id="contents">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
// 컴포넌트 로직
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

import { ref, onMounted, onUnmounted } from 'vue'
import CommonFunction from '@/assets/ts/common'

const isDarkMode = ref(localStorage.getItem('theme') === 'dark');
const common = CommonFunction();

const toggleTheme = () => {
   isDarkMode.value = !isDarkMode.value

  common.toggleTheme()
}

onMounted(() => {
})

</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style> 