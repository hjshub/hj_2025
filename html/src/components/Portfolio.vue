<template>
  <section id="section-04" class="section-04">
    <div class="inner">
      <h2 lang="en" class="heading-tit-wrap align-c r-tit">
        <strong><i>p</i><i>o</i><i>r</i><i>t</i><i>f</i><i>o</i><i>l</i><i>i</i><i>o</i></strong>
      </h2>
      <div v-if="false" class="flex--wrap jf-end">
        <span class="select-wrap">
          <label for="prj-select"></label>
          <select id="prj-select" v-model="selectedCategory" @change="filterProjects">
            <option value="">전체</option>
            <option value="build">구축</option>
            <option value="operation">운영</option>
            <option value="accessibility">웹 접근성</option>
            <option value="prototype">프로토 타입</option>
          </select>
        </span>
      </div>
      <div id="prj-radio-group" class="tab-radio">
          <span>
            <label>
              <input type="radio" value="" v-model="selectedCategory" @change="filterProjects" />
              <em>전체</em>
            </label>
          </span>
          <span>
            <label>
              <input type="radio" value="build" v-model="selectedCategory" @change="filterProjects" />
              <em>구축</em>
            </label>
          </span>
          <span>
            <label>
              <input type="radio" value="operation" v-model="selectedCategory" @change="filterProjects" />
              <em>운영</em>
            </label>
          </span>
          <span>
            <label>
              <input type="radio" value="accessibility" v-model="selectedCategory" @change="filterProjects" />
              <em>웹 접근성</em>
            </label>
          </span>
          <span>
            <label>
              <input type="radio" value="prototype" v-model="selectedCategory" @change="filterProjects" />
              <em>프로토 타입</em>
            </label>
          </span>
      </div>
      <div class="pf-list grid-wrap col-5">
        <div v-for="project in paginatedProjects" :key="project.id" class="grid-item animate fadeInUp">
          <div class="item-wrapper">
            <div class="thumbNail" :name="project.name">
              <span v-if="false" class="symbol" 
              :class = "Array.isArray(project.logo) ? project.logo[0] : project.logo" 
              :style="Array.isArray(project.logo) ? {backgroundImage:`url(./images/symbol/${project.logo[0]}.${project.logo[1]})`} : ''">
              </span>
              <span>
                <img v-if="project.imgSrc" :src="'./images/thumbnail/'+ project.imgSrc" :alt="project.title" />
                <img v-else :src="'./images/thumbnail/no-image.jpg'" :alt="project.title" />
              </span>
            </div>
            <dl>
              <dt>
                <span class="date"><em v-html="project.date"></em></span>
                <span class="skill" v-if="project.skill">
                  <em v-for="value in getArray(project.skill)" :key="value">{{ value }}</em>
                </span>
                <span class="skill" v-else></span>
                <b>{{ project.title }}</b>
              </dt>
              <dd>
                <span>
                  <a v-if="project.url" :href="project.url" target="_blank" rel="noopener noreferrer" class="copy-to-clip" @click="copyProjectUrl($event, project.url)">라이브</a>
                  <a v-if="project.pub" :href="project.pub" target="_blank" rel="noopener noreferrer">작업목록</a>
                </span>
              </dd>
            </dl>
          </div>
        </div>
      </div>
      <Pagination :currentPage="currentPage" :totalPages="totalPages" :isMob="isMob" @update:currentPage="onPageChange" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed, watch, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import gsap from 'gsap'
import CommonFunction from '../assets/ts/common'
import Pagination from './Pagination.vue'

const common = CommonFunction()
const router = useRouter()
const selectedCategory = ref('')
const projects = ref<any[]>([])
const filteredProjects = ref<any[]>([])
const isMob = common.isMob()
let lastScrollTop = window.scrollY
let isScroll = false
let scrollTimeout: number | null = null

let pollingInterval: number | undefined = undefined;
let lastFetchedData: any = null;

const deepEqual = (a: any, b: any) => JSON.stringify(a) === JSON.stringify(b);

// 페이지네이션 관련 변수 및 계산식 추가
const currentPage = ref(1) // 현재 페이지 번호 (초기값은 1)
const itemsPerPage = isMob ? 5 : 10; // 한 페이지당 보여줄 아이템 수
const totalPages = computed(() => Math.ceil(filteredProjects.value.length / itemsPerPage)) // 전체 페이지 수

// 현재 페이지에 해당하는 프로젝트만 추출
const paginatedProjects = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return filteredProjects.value.slice(start, start + itemsPerPage)
})

// 페이지네이션 컴포넌트에서 페이지 변경 시 호출되는 함수
const onPageChange = async (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    // common.scrollReset(0)
    await nextTick()
    common.animate()
  }
}

const getArray = (value: any) => {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  if (typeof value === 'string') return value.split(',').map(s => s.trim()).filter(Boolean); // truthy한 값만 필터링 
  return [];
}

const filterProjects = async () => {
  if (!selectedCategory.value) {
    filteredProjects.value = projects.value
  } else {
    filteredProjects.value = projects.value.filter(project => project.category === selectedCategory.value)
  }
  // 필터 변경 시 페이지/애니메이션 리셋
  // common.scrollReset(0)
  await nextTick()
  common.animate()
}

const copyProjectUrl = (e: Event, url: string) => {
  e.preventDefault()
  common.copyToClipboard(url)
  common.toastPopup('프로젝트 URL이 복사되었습니다.')
}

const axiosListUp = async () => {
  try {
    // const response = await axios.get('./data/list.json');
    const response = await axios.get(`${import.meta.env.BASE_URL}data/list.json`);
    return response.data;
  } catch (error) {
    common.getErrorHandler().catch(error instanceof Error ? error : new Error(String(error)));
    return [];
  }
};

const scrollDelta = () => {
  const currentScrollTop = window.scrollY;
  const deltaY = currentScrollTop - lastScrollTop;
  lastScrollTop = currentScrollTop;

  return deltaY;
}

const handleScroll = () => {
  const scrollDeltaY = scrollDelta();
  const root = document.documentElement;

  if (root.scrollHeight > root.scrollTop + root.clientHeight) {
    if (!isScroll) {
      if (scrollDeltaY > 0) {
        isScroll = true;
        gsap.to('#footer', {
          yPercent: 100,
          duration: 0.2,
          onComplete() {
            isScroll = false;
          }
        });
      } else {
        isScroll = true;
        gsap.to('#footer', {
          yPercent: 0,
          duration: 0.2,
          onComplete() {
            isScroll = false;
          }
        });
      }
    }
  } else {
    gsap.to('#footer', {
      yPercent: 0,
      duration: 0.2
    });
  }
};

// throttledScroll을 변수로 선언
const throttledScroll = () => {
  if (scrollTimeout !== null) return;
  scrollTimeout = window.setTimeout(() => {
    handleScroll();
    scrollTimeout = null;
  }, 100); // 100ms마다 한 번만 실행
};

onMounted(async () => {
  try {
    const response = await axiosListUp()
    projects.value = response
    filteredProjects.value = response
    lastFetchedData = response
    
    // DOM 업데이트 후 애니메이션 실행
    await nextTick()
    common.animate()
  } catch (error) {
    console.error('Failed to load projects:', error)
  }

  // 폴링 시작 (5초마다)
  pollingInterval = window.setInterval(async () => {
    try {
      const newData = await axiosListUp();
      if (!deepEqual(newData, lastFetchedData)) {
        projects.value = newData;
        // 현재 카테고리 필터 적용
        if (!selectedCategory.value) {
          filteredProjects.value = newData;
        } else {
          filteredProjects.value = newData.filter(project => project.category === selectedCategory.value);
        }
        lastFetchedData = newData;
        await nextTick();
        common.animate();
      }
    } catch (error) {
      // 무시: 폴링 중 에러는 치명적이지 않음
    }
  }, 5000); // 5초마다

  window.addEventListener('scroll', throttledScroll);
})

onBeforeUnmount(() => {
  if (pollingInterval) clearInterval(pollingInterval);

  window.removeEventListener('scroll', throttledScroll);
  if (scrollTimeout !== null) {
    clearTimeout(scrollTimeout);
    scrollTimeout = null;
  }
});

watch(selectedCategory, () => {
  currentPage.value = 1
})
</script>

<style scoped lang="scss">
</style>