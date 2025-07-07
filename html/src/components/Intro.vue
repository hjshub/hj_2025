<template>
  <section id="section-01" class="section-01">
    <article>
      <h2 class="hidden-txt">intro</h2>
      <div class="intro-box">
        <div class="flex--wrap column intro-1" lang="en">
          <strong class="step-1 uppercase">
            <i>H</i><i>J</i>
          </strong>
          <span class="step-2 uppercase">
            <i>w</i><i>e</i><i>b</i>&nbsp;<i>p</i><i>u</i><i>b</i><i>l</i><i>i</i><i>s</i><i>h</i><i>e</i><i>r</i>
          </span>
        </div>
        <div class="intro-frame">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div class="intro-box2">
        <div class="flex--wrap column intro-2">
          <span><b class="countY"></b>년 차</span>
          <strong>웹 퍼블리셔</strong>
          <span>김효주 입니다.</span>
        </div>
      </div>
      <div class="intro-box2">
        <div class="flex--wrap column intro-3">
          <dl class="align-l">
            <dt>
              <strong>Markup</strong>
            </dt>
            <dd>
              웹 호환성 및 접근성을 준수하고<br />
              재사용성을 고려한 코드를 작성합니다.
            </dd>
          </dl>
          <dl class="align-l">
            <dt>
              <strong>Co-work</strong>
            </dt>
            <dd>
              원활한 협업을 통해<br />
              완성도 높은 결과물을 만듭니다.
            </dd>
          </dl>
        </div>
      </div>
      <div class="intro-box">
        <div class="flex--wrap column intro-4">
          <dl class="align-r">
            <dt>
              <strong>Skill up</strong>
            </dt>
            <dd>
              작업 생산성을 높이고 협업을 위한 다양한 기술을<br />
              끊임없이 배우고 공유합니다.
            </dd>
          </dl>
          <dl class="align-r">
            <dt>
              <strong>Outputs</strong>
            </dt>
            <dd>
              산출물이 누락되지 않도록 꼼꼼하게 체크하여<br />
              만족도 높은 결과물을 제공합니다.
            </dd>
          </dl>
        </div>
      </div>
      <div class="intro-box">
        <div class="flex--wrap intro-5 horizonScroll-wrapper">
          <div v-for="(item, idx) in range" :key="idx" class="flex--wrap center scrollItem">
              <div class="flex--wrap center">
                <span class="flex--wrap column">
                  <b>
                    <em class="name"><i :class="item.icon"></i><i>{{ item.name }}</i></em>
                    <em class="rating" :class="item.range >= 70 ? 'top' : item.range >= 40 ? 'middle' : 'bottom'">
                      <i class="r-rating" :data-rating="item.rating"></i>
                      <i class="r-range" :data-range="item.range"></i>
                    </em>
                  </b>
                </span>
              </div>
          </div>
        </div>
      </div>
      <div class="intro-box">
        <div class="flex--wrap column intro-6">
          <div class="contact">
            <span>
              <em>이메일</em>
              <a href="mailto:craz1369@gmail.com" @click.prevent="copyEmail" class="copy-to-clip"><i class="fa-regular fa-copy"><em class="hidden-txt">클립보드에 복사하기</em></i></a>
            </span>
            <span>
              <em>연락처</em>
              <a href="tel:01031115188" @click.prevent="copyPhone" class="copy-to-clip"><i class="fa-regular fa-copy"><em class="hidden-txt">클립보드에 복사하기</em></i></a>
            </span>
            <!-- <span>
            <a href="assets/file/profile.pdf" target="_blank">이력서/경력기술서</a>
            <a href="assets/file/profile.pdf" download="김효주(퍼블리셔,중급).pdf"><i class="fa-solid fa-download"><em class="hidden-txt">다운로드</em></i></a></a>
            </span> -->
          </div>
        </div>
      </div>
    </article>
    <nav class="sceneNavi">
      <span v-if="isPlaying"><button type="button" @click="sceneNavigation.pause"><i class="fa-regular fa-circle-pause"></i><em class="hidden-txt">일시정지</em></button></span>
      <span v-else><button type="button" @click="sceneNavigation.play"><i class="fa-regular fa-circle-play"></i><em class="hidden-txt">재생</em></button></span>
      <div class="sceneProgressBar">
        <span v-for="(scene, i) in sceneProgress" :key="i" :class="{ 
          active : currentSceneIndex === scene.idx, 
          complete : currentSceneIndex !== null && currentSceneIndex > scene.idx, 
        }">
          <button type="button" @click="sceneNavigation.gotoScene(scene.idx)"><i>{{ i+1 }}</i><em class="hidden-txt">scene.name</em></button>
        </span>
      </div>
    </nav>
  </section>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, nextTick } from 'vue'
import gsap from 'gsap';
import CommonFunction from '../assets/ts/common'

const common = CommonFunction();

const sceneProgress = [
  {name:'intro', idx:0},
  {name:'about me', idx:1},
  {name:'co-work', idx:2},
  {name:'skill inventory', idx:3},
  {name:'contact', idx:4},
];

const range = [
  {name: 'HTML5', range: 90, rating: '상', icon: 'fa-brands fa-html5'},
  {name: 'CSS3', range: 90, rating: '상', icon: 'fa-brands fa-css3-alt'},
  {name: 'Sass / SCSS', range: 80, rating: '중', icon: 'fa-brands fa-sass'},
  {name: 'JAVASCRIPT / JQEURY', range: 80, rating: '중', icon: 'fa-brands fa-js'},
  {name: 'TYPESCRIPT', range: 40, rating: '하', icon: 'fa-brands fa-js-square'},
  {name: 'Webpack', range: 60, rating: '중', icon: 'fa-solid fa-box'},
  {name: 'gulp', range: 70, rating: '중', icon: 'fa-solid fa-gear'},
  {name: 'VUE', range: 40, rating: '하', icon: 'fa-brands fa-vuejs'},
  {name: 'Git', range: 70, rating: '중', icon: 'fa-brands fa-git-alt'},
  {name: 'websquare5', range: 60, rating: '중', icon: 'fa-solid fa-code'},
  {name: 'PHOTOSHOP', range: 40, rating: '하', icon: 'fa-brands fa-photoshop'},
  {name: 'Figma', range: 40, rating: '하', icon: 'fa-brands fa-figma'},
  {name: 'Framer', range: 30, rating: '하', icon: 'fa-brands fa-framer'}
]

let timelines: any[] = [];
let isPlaying = ref(true); // 타임라인 재생 여부
let autoPlay = ref(true); // timeline 자동재생 flag
let currentSceneIndex = ref<number | null>(null); // 마지막으로 재생된 timeline의 인덱스 기록

const introMotion = () => {
  const scene1 = gsap.timeline({
    onStart: () => { currentSceneIndex.value = 0; },
    onComplete: () => {
      // if(autoPlay.value) scene2.play();
    }
  });
  const scene2 = gsap.timeline({ 
    paused: true,
    onStart: () => { currentSceneIndex.value = 1; },
    onComplete: () => {
      if(autoPlay.value) scene3.play()
    } 
  });
  const scene3 = gsap.timeline({ 
    paused: true,
    onStart: () => { currentSceneIndex.value = 2; },
    onComplete: () => {
      if(autoPlay.value) scene4.play()
    } 
  });
  const scene4 = gsap.timeline({ 
    paused: true,
    onStart: () => { currentSceneIndex.value = 3; },
    onComplete: () => {
      if(autoPlay.value) scene5.play()
    } 
  });
  const scene5 = gsap.timeline({ 
    paused: true,
    onStart: () => { currentSceneIndex.value = 4; },
  });
  

  timelines = [scene1, scene2, scene3, scene4, scene5];

  scene1
  .fromTo('.intro-1 .step-1', {
    alpha:0,
    xPercent: -500,
    duration:0.4,
  }, {
    alpha:1,
    xPercent:0,
    ease: 'expo.in',
  }).fromTo('.intro-1 .step-1', {
    yPercent: 50,
    rotateX:90,
    scale:2,
    duration:1,
  }, {
    rotateX:0,
    scale:1,
  }).fromTo('.intro-frame span:nth-of-type(1)', {
    right:'100%',
    duration:0.4,
  },{
    right:0,
    ease: 'expo.in'
  }, '>').fromTo('.intro-frame span:nth-of-type(2)', {
    bottom:'100%',
    duration:0.4,
  },{
    bottom:0,
    ease: 'expo.in'
  }, '<').fromTo('.intro-frame span:nth-of-type(3)', {
    left:'100%',
    duration:0.4,
  },{
    left:0,
    ease: 'expo.in'
  }, '<').fromTo('.intro-frame span:nth-of-type(4)', {
    top:'100%',
    duration:0.4,
  },{
    top:0,
    ease: 'expo.in',
  }, '<')
  .to('.intro-1 .step-1', {
    yPercent:0,
    delay:0.6,
    duration:1
  }, '>')
  .fromTo('.intro-1 .step-2 > *', {
    alpha: 0,
    yPercent: 50,
  },{
    alpha: 1,
    yPercent: 0,
    ease: 'expo.out',
    duration:0.02,
    stagger: 0.02,
  })
  .to('.intro-1 .step-2', {
    backgroundPositionX:'100VW',
    duration:2,
    repeat:1,
    yoyo:true
  },'+=1.2')
  
  scene2
  .to('.intro-1', {
    alpha: 0,
    duration: 1,
    scale: 0.5,
  }, '+=3')
  .to('.intro-2', {
    alpha: 1,
    duration: 1,
    scale: 1,
  }, '<')
  .to('.intro-frame span:nth-of-type(4)', {
    duration: 1,
    yPercent: 100,
    stagger: 0.2,
  }, '-=1')
  .to('.intro-frame span:nth-of-type(3)', {
    duration: 1,
    xPercent: 100,
    stagger: 0.2,
  }, '<')
  .to('.intro-frame span:nth-of-type(2)', {
    duration: 1,
    yPercent: -100,
    stagger: 0.2,
  }, '<')
  .to('.intro-frame span:first-of-type', {
    duration: 1,
    xPercent: -100,
    stagger: 0.2,
    onComplete(){
      common.countYear('2015/10/26');
    }
  }, '<')
  .to('.intro-2 > *', {
    alpha: 0,
    duration: 0.2,
    stagger: 0.1,
    xPercent: 200,
    rotateX: 90
  }, '+=5')

  scene3
  .fromTo('.intro-3 > *', {
    alpha:0,
    xPercent:200,
    rotateX: 90
  },{
    alpha:1,
    xPercent:0,
    rotateX: 0,
    stagger: 0.1,
    duration: 0.2
  })
  .to('.intro-3 > *', {
    alpha:0,
    xPercent:-200,
    rotateX: 90,
    duration: 0.2,
    stagger: 0.1
  }, '+=5')
  .fromTo('.intro-4 > *', {
    alpha:0,
    xPercent:-200,
    rotateX: 90
  },{
    alpha:1,
    xPercent:0,
    stagger: 0.1,
    duration: 0.2,
    rotateX: 0
  },'<')
  .to('.intro-4 > *', {
    alpha:0,
    xPercent:200,
    rotateX: 90,
    duration: 0.2,
    stagger: 0.1
  }, '+=5')

  const panels = gsap.utils.toArray<HTMLElement>('.scrollItem');
  const rRanges = Array.from(document.querySelectorAll('.r-range'));
  const leftEdgeFlags = new Array(rRanges.length).fill(false);
  
  scene4
  .fromTo(panels, {
      alpha:0,
      xPercent:200,
      rotateX: 90,
    },{
      alpha:1,
      xPercent:0,
      stagger: 0.1,
      rotateX: 0,
      duration: 0.2
    })
  .to(panels, {
      x: () => -1 * panels[0].clientWidth * (panels.length - 1),
      duration: 15,
      stagger: 0.1,
      ease: 'none',
      onUpdate: function() {
        rRanges.forEach((r, idx) => {
          const panel = r.closest('.scrollItem');
          const x = panel ? panel.getBoundingClientRect().x : 0;
          const threshold = document.documentElement.clientWidth * 0.5;

          if (x < threshold) {
            if (!leftEdgeFlags[idx]) {
              leftEdgeFlags[idx] = true;
              gsap.to(r, {
                duration: 0.2,
                right: `${100 - r.getAttribute('data-range')}%`,
                opacity: 1,
                ease: 'power4.out'
              });
            }
          } else {
            if (leftEdgeFlags[idx]) {
              leftEdgeFlags[idx] = false;
              gsap.to(r, {
                duration: 0,
                right: '100%',
                opacity: 0
              });
            }
          }
        });
      }
    }, '>')
  .to(panels, {
    alpha:0,
    xPercent:-200,
    rotateX: 90,
    duration: 0.2,
    stagger: 0.1
  }, '+=1')

  scene5
  .fromTo('.intro-6 .contact > span', {
    alpha:0,
    xPercent:-200,
    rotateX: 90,
  },{
    alpha:1,
    xPercent:0,
    duration: 0.2,
    stagger: 0.1,
    rotateX: 0
  }, '>')

  // play(): 타임라인을 현재 위치에서 재생합니다.
  // pause(): 타임라인을 현재 위치에서 일시정지합니다.
  // resume(): pause 이후 재생을 계속합니다. (play와 유사)
  // reverse(): 타임라인을 역방향으로 재생합니다.
  // restart(): 타임라인을 처음부터 다시 재생합니다.
  // seek(time, suppressEvents): 지정한 시간(초 또는 라벨)로 이동합니다.
  // progress(value): 0~1 사이의 값으로 타임라인의 진행도를 설정하거나 반환합니다.
  // time(value): 타임라인의 현재 시간을 설정하거나 반환합니다.
  // kill(): 타임라인을 완전히 제거(모든 트윈/콜백 해제)합니다.
  // clear(): 타임라인의 모든 트윈/콜백을 제거하지만 인스턴스는 남깁니다.
  // eventCallback(type, callback): onStart, onUpdate, onComplete 등 콜백을 동적으로 설정/변경합니다.
};

const sceneNavigation = {
  pause(){ // 정지
    isPlaying.value = false;
    autoPlay.value = false;
    timelines.forEach(el => {
      el.timeScale(1); // 타임라인 속도 초기화
      el.pause();
    });
    console.log('pause', currentSceneIndex.value, autoPlay.value);
  },

  play(){ // 재생
    isPlaying.value = true;
    autoPlay.value = true;
    if (currentSceneIndex.value !== null) {
      timelines.forEach(el => {
        el.timeScale(1); // 타임라인 속도 초기화
        el.pause();
      });
      timelines[currentSceneIndex.value].play(0);
    }
    console.log('play', currentSceneIndex.value, autoPlay.value);
  },

  toggle(){ // 재생/정지 토글
    if(isPlaying.value){
      this.pause();
      isPlaying.value = false;
    } else {
      this.play();
      isPlaying.value = true;
    }
  },

  gotoScene(idx : number){ // scene 이동
    isPlaying.value = true;
    autoPlay.value = false;
    currentSceneIndex.value = idx;
    
     // 모든 timeline을 초기화(역순으로) + 10배속 처리
    const reverseTimelines = async () => {
      for(let i = timelines.length - 1; i >= 0; i--) {
        await new Promise<void>(resolve => { // 직렬 실행
          setTimeout(() => {
            timelines[i].timeScale(10);
            timelines[i].progress(0).pause();
            resolve();
          }, 10 * (timelines.length - 1 -i));
        });
      }
    };

    reverseTimelines().then(() => {
      nextTick(() => {
        timelines[currentSceneIndex.value].timeScale(1);
        timelines[currentSceneIndex.value].play(0);
        timelines.forEach(el => el.timeScale(1));
        autoPlay.value = true;
        // console.log(currentSceneIndex.value);
      });
    });

    console.log(`gotoScene -> scene${idx+1}`, currentSceneIndex.value, autoPlay.value);
  }
}

const copyEmail = (e: Event) => {
    const target = e.target as HTMLAnchorElement
    common.copyToClipboard(target.href.replace('mailto:', ''))
    common.toastPopup('이메일 주소가 복사되었습니다.')
}

const copyPhone = (e: Event) => {
    const target = e.target as HTMLAnchorElement
    common.copyToClipboard(target.href.replace('tel:', ''))
    common.toastPopup('전화번호가 복사되었습니다.')
}

const copyResume = (e: Event) => {
    const target = e.target as HTMLAnchorElement
    common.copyToClipboard(target.href)
    common.toastPopup('이력서가 복사되었습니다.')
}

onMounted(() => {
  introMotion();
});
</script>

<style scoped lang="scss">
</style> 