import { createRouter, createWebHistory } from 'vue-router'
import CommonFunction from '../assets/ts/common'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/portfolio',
      name: 'portfolio',
      component: () => import('../views/PortfolioView.vue')
    },
    {
      path: '/skill',
      name: 'skill',
      component: () => import('../views/SkillView.vue')
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/ContactView.vue')
    },
    {
      path: '/portfolio2',
      name: 'portfolio2',
      component: () => import('../views/Portfolio2View.vue')
    },
    {
      path: '/portfolio3',
      name: 'portfolio3',
      component: () => import('../views/Portfolio3View.vue')
    },
    {
      path: '/guide',
      name: 'guide',
      component: () => import('../views/guideView.vue')
    },
  ]
})

// 라우트 변경 후 뷰포트 및 스크롤 트리거 처리
router.afterEach(() => {
  setTimeout(() => {
    const common = CommonFunction()
    common.setViewportHeight()
    window.scrollTo(0, 0)
    window.scrollBy(0, 1)
    window.scrollBy(0, -1)
  }, 100)
})

export default router 