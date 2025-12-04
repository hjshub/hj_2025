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
// <script setup>에서는 최상위(top-level)에 선언된 모든 것(변수, 함수, import)이 자동으로 템플릿에 노출
import { defineProps, defineEmits } from 'vue'
// isMob prop 추가
const props = defineProps({
  currentPage: { type: Number, required: true },
  totalPages: { type: Number, required: true },
  isMob: { type: Boolean, default: false } // <-- 모바일 여부
})

// [참고]
// 중요한 점: defineProps()에서 바로 구조분해하면 반응성(reactivity)을 잃음 — 즉 스냅샷(초기값)만 가져오므로 이후 변경이 템플릿에 반영되지 않음.
// 위험: 반응성 잃음 (스냅샷)
// const props = defineProps({ currentPage: Number });
// const { currentPage } = props; // 이렇게 구조분해 하면 reactive가 사라짐


// 유지 방법 1: toRefs 사용 (추천)
// import { toRefs } from 'vue';
// const props = defineProps({ currentPage: Number });
// const { currentPage } = toRefs(props); // currentPage는 ref가 됨, 템플릿에서 바로 사용 가능

// 유지 방법 2: computed 사용
// import { computed } from 'vue';
// const props = defineProps({ currentPage: Number });
// const currentPage = computed(() => props.currentPage);

defineEmits(['update:currentPage'])
</script>

<style scoped lang="scss">
</style>