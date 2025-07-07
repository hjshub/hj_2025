<template>
  <nav class="pagination" v-if="totalPages > 1">
    <!-- 모바일: fraction 형태로 노출 (currentPage / totalPages) -->
    <template v-if="isMob">
      <button class="prev" :disabled="currentPage === 1" @click="$emit('update:currentPage', currentPage - 1)">이전</button>
      <span class="fraction"><em>{{ currentPage }}</em> of <em>{{ totalPages }}</em></span>
      <button class="next" :disabled="currentPage === totalPages" @click="$emit('update:currentPage', currentPage + 1)">다음</button>
    </template>
    <!-- PC: 기존 버튼형 페이지네이션 -->
    <template v-else>
      <button class="prev" :disabled="currentPage === 1" @click="$emit('update:currentPage', currentPage - 1)">이전</button>
      <button v-for="page in totalPages" :key="page" :class="{ active: currentPage === page }" @click="$emit('update:currentPage', page)">{{ page }}</button>
      <button class="next" :disabled="currentPage === totalPages" @click="$emit('update:currentPage', currentPage + 1)">다음</button>
    </template>
  </nav>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
// isMob prop 추가
const props = defineProps({
  currentPage: { type: Number, required: true },
  totalPages: { type: Number, required: true },
  isMob: { type: Boolean, default: false } // <-- 모바일 여부
})
defineEmits(['update:currentPage'])
</script>

<style scoped lang="scss">
</style>