//
//-----------------------------------------------------------------
// 공통 스크립트
//-----------------------------------------------------------------
//

//import $ from 'jquery';
//import Swiper, { Navigation, Pagination, Autoplay } from 'swiper';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
import axios from 'axios';
import _gb from './global';
import * as cookie from './cookie';

// ui style
// import 'swiper/swiper.min.css';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// 타입 정의
interface DOMElement extends Element {
  clientWidth: number;
  clientHeight: number;
  getBoundingClientRect(): DOMRect;
  children: HTMLCollection;
  firstElementChild: Element | null;
  previousElementSibling: Element | null;
  style: CSSStyleDeclaration;
}

interface EventWithTarget extends Event {
  target: HTMLElement;
}

interface CommonFunctionReturn {
  init: () => void;
  isMob: () => boolean;
  countYear: (date: string) => void;
  scrollReset: () => void;
  setGnb: () => void;
  scrollGage: () => number;
  animate: () => void;
  toggleTheme: () => void;
  copyToClipboard: (val: string) => void;
  toastPopup: (txt: string) => void;
  // horizonScrollMotion : () => void;
  // countRating: () => void;
  getAnimationManager: () => typeof AnimationManager;
  getThemeTransition: () => typeof ThemeTransition;
  getRouter: () => typeof Router;
  getLoadingManager: () => typeof LoadingManager;
  getEventManager: () => typeof EventManager;
  getStateManager: () => typeof StateManager;
  getErrorHandler: () => typeof ErrorHandler;
}

interface ProjectData {
  id: number;
  title: string;
  category: string;
  imgSrc?: string;
  url?: string;
  pub?: string;
  contents: string;
}

// GSAP 타입 정의
interface GSAPTimelineVars extends gsap.TimelineVars {
  stagger?: number;
}

interface GSAPTweenVars extends gsap.TweenVars {
  stagger?: number;
}

interface ScrollTriggerVars {
  trigger?: string | Element;
  pin?: boolean;
  scrub?: boolean | number;
  toggleActions?: string;
  start?: string;
  end?: string;
  preventOverlaps?: boolean;
  animation?: gsap.core.Timeline;
}

// 유틸리티 함수
const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return function(this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// 이벤트 관리 시스템
const EventManager = {
  handlers: new Map<string, Set<Function>>(),

  on(event: string, handler: Function) {
    if (!this.handlers.has(event)) {
      this.handlers.set(event, new Set());
    }
    this.handlers.get(event)?.add(handler);
  },

  off(event: string, handler: Function) {
    this.handlers.get(event)?.delete(handler);
  },

  emit(event: string, data?: any) {
    this.handlers.get(event)?.forEach(handler => handler(data));
  }
};

// 상태 관리 시스템
const StateManager = {
  state: new Map<string, any>(),
  
  get<T>(key: string): T | undefined {
    return this.state.get(key);
  },
  
  set<T>(key: string, value: T): void {
    this.state.set(key, value);
    EventManager.emit(`state:${key}`, value);
  }
};

// 에러 처리 시스템
const ErrorHandler = {
  errors: [] as Error[],
  
  catch(error: Error) {
    this.errors.push(error);
    console.error('[Error]', error);
    EventManager.emit('error', error);
  },
  
  getErrors() {
    return [...this.errors];
  },
  
  clearErrors() {
    this.errors = [];
  }
};

// 캐싱 시스템 개선
const DOMCache = {
  elements: new Map<string, NodeListOf<Element>>(),
  
  get(selector: string): NodeListOf<Element> {
    if (!this.elements.has(selector)) {
      const element = document.querySelectorAll(selector);
      this.elements.set(selector, element);
      return element;
    }
    return this.elements.get(selector) as NodeListOf<Element>;
  },
  
  clear() {
    this.elements.clear();
  }
};

// 성능 모니터링 유틸리티
const Performance = {
  measures: new Map<string, number>(),
  
  start(name: string) {
    this.measures.set(name, performance.now());
  },
  
  end(name: string): number {
    const startTime = this.measures.get(name);
    if (startTime) {
      const duration = performance.now() - startTime;
      this.measures.delete(name);
      console.debug(`[Performance] ${name}: ${duration.toFixed(2)}ms`);
      return duration;
    }
    return 0;
  }
};

// 테마 시스템
const ThemeSystem = {
  STORAGE_KEY: 'theme',
  DARK_CLASS: 'dark',
  
  isDark(): boolean {
    return document.documentElement.classList.contains(this.DARK_CLASS);
  },
  
  setTheme(isDark: boolean) {
    const html = document.documentElement;
    const themeColor = document.querySelector('meta[name=theme-color]');
    
    if (isDark) {
      html.classList.add(this.DARK_CLASS);
      themeColor?.setAttribute('content', '#000');
      localStorage.setItem(this.STORAGE_KEY, 'dark');
    } else {
      html.classList.remove(this.DARK_CLASS);
      themeColor?.setAttribute('content', '#fff');
      localStorage.removeItem(this.STORAGE_KEY);
    }
  },
  
  toggle() {
    this.setTheme(!this.isDark());
  },
  
  init() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    const storedTheme = localStorage.getItem(this.STORAGE_KEY);
    
    if (storedTheme === 'dark' || (!storedTheme && prefersDark.matches)) {
      this.setTheme(true);
    }
    
    prefersDark.addListener((e) => {
      if (!localStorage.getItem(this.STORAGE_KEY)) {
        this.setTheme(e.matches);
      }
    });
  }
};

// 라우팅 시스템
const Router = {
  routes: new Map<string, () => void>(),
  currentPath: window.location.pathname,

  add(path: string, handler: () => void) {
    this.routes.set(path, handler);
  },

  navigate(path: string) {
    const handler = this.routes.get(path);
    if (handler) {
      history.pushState(null, '', path);
      this.currentPath = path;
      handler();
      EventManager.emit('route:change', path);
    }
  },

  init() {
    window.addEventListener('popstate', () => {
      const path = window.location.pathname;
      const handler = this.routes.get(path);
      if (handler) {
        this.currentPath = path;
        handler();
        EventManager.emit('route:change', path);
      }
    });
  }
};

// 로딩 관리 시스템
const LoadingManager = {
  activeRequests: 0,
  timeout: null as NodeJS.Timeout | null,
  minLoadingTime: 300, // 최소 로딩 시간 (ms)

  start() {
    this.activeRequests++;
    if (this.activeRequests === 1) {
      EventManager.emit('loading:start');
      StateManager.set('isLoading', true);
      document.body.classList.add('is-loading');
    }
  },

  end() {
    this.activeRequests = Math.max(0, this.activeRequests - 1);
    if (this.activeRequests === 0) {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      this.timeout = setTimeout(() => {
        EventManager.emit('loading:end');
        StateManager.set('isLoading', false);
        document.body.classList.remove('is-loading');
        this.timeout = null;
      }, this.minLoadingTime);
    }
  },

  isLoading() {
    return this.activeRequests > 0;
  }
};

// axios 인터셉터 설정
axios.interceptors.request.use(
  (config) => {
    LoadingManager.start();
    return config;
  },
  (error) => {
    LoadingManager.end();
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    LoadingManager.end();
    return response;
  },
  (error) => {
    LoadingManager.end();
    ErrorHandler.catch(error);
    return Promise.reject(error);
  }
);

// 애니메이션 관리 시스템
const AnimationManager = {
  animations: new Map<string, gsap.core.Timeline>(),
  
  create(name: string, config: gsap.TimelineVars = {}) {
    const timeline = gsap.timeline(config);
    this.animations.set(name, timeline);
    return timeline;
  },
  
  get(name: string) {
    return this.animations.get(name);
  },
  
  play(name: string) {
    const animation = this.animations.get(name);
    if (animation) {
      Performance.start(`animation:${name}`);
      animation.play();
    }
  },
  
  pause(name: string) {
    this.animations.get(name)?.pause();
  },
  
  reverse(name: string) {
    this.animations.get(name)?.reverse();
  },
  
  clear(name: string) {
    const animation = this.animations.get(name);
    if (animation) {
      animation.kill();
      this.animations.delete(name);
    }
  },
  
  clearAll() {
    this.animations.forEach(animation => animation.kill());
    this.animations.clear();
  }
};

// 테마 전환 애니메이션
const ThemeTransition = {
  duration: 0.3,
  ease: 'power2.inOut',
  
  animate() {
    const isDark = ThemeSystem.isDark();
    const timeline = AnimationManager.create('theme-transition', {
      onComplete: () => {
        Performance.end('theme-transition');
        EventManager.emit('theme:transition-complete', isDark);
      }
    });
    
    Performance.start('theme-transition');
    
    timeline
      .to('body', {
        backgroundColor: isDark ? '#000' : '#fff',
        color: isDark ? '#fff' : '#000',
        duration: this.duration,
        ease: this.ease
      })
      .to('.animate', {
        opacity: 0,
        scale: 0.98,
        duration: this.duration / 2,
        ease: this.ease
      }, 0)
      .to('.animate', {
        opacity: 1,
        scale: 1,
        duration: this.duration / 2,
        ease: this.ease
      }, this.duration / 2);
  }
};

export default function CommonFunction(): CommonFunctionReturn {
  const isMob = () => window.innerWidth <= 821;
  const setGnb = () => {
    const gnb : HTMLElement | null = document.getElementById('gnb');
    const menu : HTMLElement | null = document.querySelector('.menu');
    if(document.documentElement.scrollTop >= gnb?.clientHeight){
      menu.style.position = 'fixed';
      if(!gb.isScroll){
        gsap.fromTo(menu, {
          y:'-120%'
        }, {
          y:0,
          duration:0.2,
          onComplete: () => {
            gb.isScroll = true;
          }
        })
      }
    }else {
      menu.style.position = 'absolute';
      gb.isScroll = false;
    }
  };
  const allMenuClose = () => {
    gb.html.classList.remove('menu-open');
    gb.body.style.height = 'auto';
    gb.body.style.overflowY = 'visible';
    if (gb.main) {
      gb.main.style.filter = '';
    }
    document.querySelector('.dimmed')?.remove();
  };
  const scrollReset = (d? :number) => {
    gsap.to(window, {
      duration: d ?? 0.2,
      scrollTo: {
        y: 0,
      },
    });
    //ScrollTrigger.refresh(true);
  };
  const headerMotion = () => {
    const timeline = AnimationManager.create('header', {
      onComplete: () => {
        Performance.end('header-animation');
        EventManager.emit('header:complete');
      }
    });

    Performance.start('header-animation');

    timeline.to('.r1', {
      alpha: 0,
      duration: 0.4,
      delay: 0.5,
      x: '-100%',
    }).to('.r2', {
      alpha: 1,
      delay:1,
      duration: 1,
      x: '0',
      rotation: 0,
    }, '-=1.5');

    gb.title = document.querySelectorAll('.r-tit');
    gb.title.forEach((el) => {
      const title_ = el.firstElementChild?.children;
      for (let i in title_) {
        gsap.fromTo(title_[i],{
          //x: 600,
          alpha: 0,
          //rotation: '-540',
          y:'-50%',
        }, {
          //x: 0,
          alpha: 1,
          //rotation: '720',
          y:0,
          duration: 0.2,
          delay: 0.03 * i,
          ease: 'expo.out'
        });
      }
    });
  };
  const scrollMotion = () => {
    // ScrollTrigger 모션 구현 시 고려 할 부분
    // 사용자마다 스크롤 속도,습관이 다름
    // 1. scrub + snap 조합
    // 2. 여러 timeline + onEnter/onLeave 콜백
    // 3. scrub 없이 toggleActions만 사용 (구간 진입 시 1회만 실행 -> pin 속성 적용 시 에는 해당 x

    // ScrollTrigger.defaults({
    //   trigger: '.section-01',
    //   pin: true,
    //   scrub: 1.5,
    //   toggleActions: 'restart pause reverse pause',
    //   markers: true,
    //   // start: 'top 0',
    //   // end: 'bottom 30%'
    //   preventOverlaps: false,
    //   // anticipatePin: 1
    // });

    // ScrollTrigger.create({
    //   start: 'top top',
    //   end : '+=6000',
    //   snap: { snapTo: [0, 0.2, 0.4, 0.6, 0.8, 1], duration: 10, ease: 'power1.inOut' },
    //   onUpdate: (self) => {
    //   const p = self.progress;
    //   // 0~0.2: scene1
    //   if (p < 1/5) {
    //     scene1.progress(p / (1/5)).pause();
    //     scene2.progress(0).pause();
    //     scene3.progress(0).pause();
    //     scene4.progress(0).pause();
    //     scene5.progress(0).pause();
    //   }
    //   // 0.2~0.4: scene2
    //   else if (p < 2/5) {
    //     scene1.progress(1).pause();
    //     scene2.progress((p - 1/5) / (1/5)).pause();
    //     scene3.progress(0).pause();
    //     scene4.progress(0).pause();
    //     scene5.progress(0).pause();
    //   }
    //   // 0.4~0.6: scene3
    //   else if (p < 3/5) {
    //     scene1.progress(1).pause();
    //     scene2.progress(1).pause();
    //     scene3.progress((p - 2/5) / (1/5)).pause();
    //     scene4.progress(0).pause();
    //     scene5.progress(0).pause();
    //   }
    //   // 0.6~0.8: scene4
    //   else if (p < 4/5) {
    //     scene1.progress(1).pause();
    //     scene2.progress(1).pause();
    //     scene3.progress(1).pause();
    //     scene4.progress((p - 3/5) / (1/5)).pause();
    //     scene5.progress(0).pause();
    //   }
    //   // 0.8~1: scene5
    //   else {
    //     scene1.progress(1).pause();
    //     scene2.progress(1).pause();
    //     scene3.progress(1).pause();
    //     scene4.progress(1).pause();
    //     scene5.progress((p - 4/5) / (1/5)).pause();
    //   }
    // },
    // });
  };
  const horizonScrollMotion = () => {
    const horizonScrollWrapper = document.querySelector('.horizonScroll-wrapper');
    const section = document.getElementById('section-03');
    const panels = gsap.utils.toArray<HTMLElement>('.scrollItem');

    if (horizonScrollWrapper && section && panels.length > 0) {
      const panelScene = gsap.timeline();
      panelScene.timeScale(1);

      ScrollTrigger.create({
        trigger: section,
        pin: true,
        animation: panelScene,
        scrub: 1,
        end: () => `+=${horizonScrollWrapper.scrollWidth - window.innerWidth}`,
      });

      panelScene.to(panels, {
        x: () => -1 * panels[0].clientWidth * (panels.length - 1),
        duration: 2,
        ease: 'none',
      } as GSAPTweenVars);
    }
  };
  const scrollGage = () => {
    // 스크롤 게이지 (단위:%)
    gb.scrollTop = document.documentElement.scrollTop;
    gb.client_H = document.documentElement.clientHeight;
    gb.scroll_H = document.documentElement.scrollHeight;
    gb.scrollSize = Math.floor((gb.scrollTop / (gb.scroll_H - gb.client_H)) * 100);

    return gb.scrollSize;
  };
  const setPos = () => {
    function PageAnchor(link: HTMLAnchorElement): string | false {
      if (
        link.protocol !== window.location.protocol ||
        link.host !== window.location.host ||
        link.pathname !== window.location.pathname ||
        link.search !== window.location.search
      ) {
        return false;
      }

      return link.hash;
    }

    function scrollToHash(hash: string | false, e?: Event): void {
      const elem = hash ? document.querySelector(hash) : false;
      if (elem) {
        if (e) e.preventDefault();
        gsap.to(window, { scrollTo: elem, delay: 0.2 });
      }
    }

    const anchors = document.querySelectorAll<HTMLAnchorElement>('.anchor');
    anchors.forEach((a) => {
      a.addEventListener('click', (e: Event) => {
        allMenuClose();
        scrollToHash(PageAnchor(a), e);
      });
    });

    if (window.location.hash) {
      scrollToHash(window.location.hash);
    }
  };
  const animate = () => {
    Performance.start('animate');
    const elements = document.querySelectorAll('.animate');
      elements.forEach((el, idx) => {
         if (el.getBoundingClientRect().top < document.documentElement.clientHeight) {
            el.classList.add('animation--start');
          } else {
            el.classList.remove('animation--start');
          }
      });

    Performance.end('animate');
  };
  const countRating = () => {
    gb.rRange = document.querySelectorAll('.r-range');
    gb.rRange.forEach((r: Element) => {
      const scrollItem = r.closest('.scrollItem');
      if (scrollItem) {
        const rect = scrollItem.getBoundingClientRect();
        const threshold = document.documentElement.clientWidth * 0.8;
        
        if (rect.x < threshold) {
          const range = Number(r.getAttribute('data-range')) || 0;

          gsap.to(r, {
            duration: 0.7,
            delay: 0,
            stagger: 0.5,
            right: `${100 - range}%`,
            opacity: 1,
            ease: 'expo.out'
          });
        } else {
          gsap.to(r, {
            duration: 0,
            delay: 0,
            right: '100%',
            opacity: 0
          });
        }

        const rangeValue = Number(r.getAttribute('data-range')) || 0;
        if (rangeValue >= 70) {
          r.previousElementSibling?.setAttribute('data-rating', '상');
          r.closest('.rating')?.classList.add('top');
        } else if (rangeValue >= 50) {
          r.previousElementSibling?.setAttribute('data-rating', '중');
          r.closest('.rating')?.classList.add('middle');
        } else {
          r.previousElementSibling?.setAttribute('data-rating', '하');
          r.closest('.rating')?.classList.add('bottom');
        }
      }
    });
  };
  const toggleTheme = function () {
    ThemeSystem.toggle();
    ThemeTransition.animate();
  };
  const pointerMotion = () => {
    const motionContainer = document.getElementById('contents');
    if (!motionContainer) return;

    let deg = 0;

    for(let m = 0; m <= 10; m++) {
      const span = document.createElement('span');
      const r = `${(Math.random()*5).toFixed()}rem`;
      span.classList.add('circle');

      span.style.top = `${(Math.random()*200).toFixed()}rem`;
      span.style.left = `${(Math.random()*200).toFixed()}rem`;
      span.style.width = r;
      span.style.height = r;
      span.style.position = 'fixed';
      span.style.clipPath = 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)';
      span.style.zIndex = '11';
      span.style.background = 'linear-gradient(135deg, rgba(229,229,229,0) 0%,rgba(229,229,229,0.01) 1%,rgba(113,36,246,1) 99%,rgba(112,34,246,1) 100%)';
      span.style.opacity = Math.random().toFixed(2);

      motionContainer.appendChild(span);
    }

    const handleMouseMove = throttle((e: MouseEvent) => {
      const circles = motionContainer.querySelectorAll<HTMLElement>('.circle');
      circles.forEach((circle, idx) => {
        gsap.to(circle, {
          rotate: deg++,
          duration: 1,
          delay: 0.02 * idx,
          y: `-${e.clientY * 0.3}`,
          x: `-${e.clientX * 0.3}`,
        } as GSAPTweenVars);
      });
    }, 16); // 약 60fps

    motionContainer.addEventListener('mousemove', handleMouseMove);
  };
  const copyToClipboard = (val: string) => {
    const textarea = document.createElement('textarea');
    textarea.value = val;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  };
  const copyUrl = function () {
    gb.toast = true;
    const anchor_ = document.querySelectorAll('.copy-to-clip');
    anchor_.forEach((el: Element) => {
      el.addEventListener('click', function(e: Event) {
        e.preventDefault();
        if (gb.toast) {
          const href = (e.currentTarget as HTMLAnchorElement).getAttribute('href');
          if (href) {
            toastPopup(href);
            copyToClipboard(href);
          }
        }
        gb.toast = false;
      });
    });
  };
  const toastPopup = (txt: string) => {
    if(!gb.toast){
      gb.toast = true;
      const toast = document.createElement('div');
      toast.className = 'toast-popup';
      toast.textContent = txt;
      document.body.appendChild(toast);
    
      setTimeout(() => {
        toast.remove();
        gb.toast = false;
      }, 2000);
    }
  };
  const countYear = (date: string) => {
    const countYear : Element | null = document.querySelector('.countY');
    const start : Date = new Date(date);
    const today : Date = new Date();
    const def : number = today - start;
    const year : number = Math.floor(def / (1000*60*60*24*365));
    // const month : number = Math.floor((def % (1000*60*60*24*365)) / (1000*60*60*24*30));

    for(let i = 0; i <= year; i++){
      (function(n){
        setTimeout(function(){
          if(countYear) countYear.innerHTML = n.toFixed();
        }, n*70);
      })(i);
    }
  }
  const init = () => {
    try {
      Performance.start('init');
      
      // 라우터 초기화
      Router.init();
      
      // 기본 라우트 설정
      Router.add('/', () => {
      });

      // 기존 초기화 함수들 호출
      // setPos();
      headerMotion();
      scrollReset();
      scrollGage();
      animate();
      
      Performance.end('init');
    } catch (error) {
      ErrorHandler.catch(error instanceof Error ? error : new Error(String(error)));
    }
  };

  return {
    init,
    isMob,
    setGnb,
    countYear,
    scrollReset,
    scrollGage,
    animate,
    toggleTheme,
    copyToClipboard,
    toastPopup,
    // horizonScrollMotion,
    // countRating,
    getAnimationManager: () => AnimationManager,
    getThemeTransition: () => ThemeTransition,
    getRouter: () => Router,
    getLoadingManager: () => LoadingManager,
    getEventManager: () => EventManager,
    getStateManager: () => StateManager,
    getErrorHandler: () => ErrorHandler
  };
}

const gb = new _gb();

// window.addEventListener('load', () => {
//   gb.CommonFunction().init();
//   if (gb.CommonFunction().isMob()) {
//     ScrollTrigger.config({ ignoreMobileResize: true });
//     ScrollTrigger.normalizeScroll(true);
//   }
// });

// document.addEventListener('DOMContentLoaded', () => {
//   gb.CommonFunction().toggleTheme();
// });

window.addEventListener('resize', () => {
  // DOMCache.clear(); // 캐시 초기화
  if (gb.CommonFunction().isMob()) {
    ScrollTrigger.config({ ignoreMobileResize: true });
    ScrollTrigger.normalizeScroll(true);
  } else {
    gb.CommonFunction().scrollReset();
  }
});

window.addEventListener('orientationchange', () => {
  //ScrollTrigger.refresh(true);
  location.reload();
});

// 성능 최적화된 스크롤 이벤트 핸들러
const handleScroll = throttle(() => {
  try {
    Performance.start('scroll-handler');
    const commonFunc = gb.CommonFunction();

    commonFunc.setGnb();
    commonFunc.animate();
      
    const scrollGageElement: Element | null = document.querySelector('.scrollGage');
    scrollGageElement.style.width = `${commonFunc.scrollGage()}%`;
    
    Performance.end('scroll-handler');
  } catch (error) {
    ErrorHandler.catch(error instanceof Error ? error : new Error(String(error)));
  }
}, 16);

// 이벤트 리스너 등록
window.addEventListener('scroll', handleScroll);
