# Vue.js 가이드

## 1. v-bind 축약 문법

| 정식 문법 | 축약 문법 | 설명 | 용도 |
|----------|---------|------|------|
| `v-bind:key` | `:key` | 요소 고유 식별 | 리스트 렌더링, 컴포넌트 재생성 제어 |
| `v-bind:name` | `:name` | 속성 바인딩 | 동적 속성 할당 |
| `v-bind:style` | `:style` | 스타일 동적 적용 | 동적 스타일 바인딩 |
| `v-on:click` | `@click` | 이벤트 핸들링 | 이벤트 리스닝 |

## 2. :key 속성 상세

### 정의
- **역할**: Vue가 요소/컴포넌트를 식별하는 고유 키
- **특징**: Vue의 지시어(directive)이며, attribute는 아님
- **동작**: 키가 바뀌면 Vue는 해당 요소/컴포넌트를 완전히 제거하고 새로 생성함 (리셋)

### 사용 예시

| 사용 사례 | 코드 | 설명 |
|---------|------|------|
| 리스트 렌더링 (필수) | `<div v-for="item in items" :key="item.id">` | 각 item을 고유하게 식별, 순서 변경 시 상태 유지 |
| 컴포넌트 리셋 | `<MyComponent :key="userId" />` | 조건이 바뀔 때마다 컴포넌트 새로 생성 |
| 라우트 기반 | `<Header :key="$route.fullPath" />` | 경로 변경 → Header 완전 리셋 |

### key 없을 때 vs 있을 때

| 상황 | 코드 | 결과 |
|-----|------|------|
| key 없음 | `<Header :isDarkMode="isDarkMode" />` | Header 상태 유지 (input 값 등) |
| key 있음 | `<Header :key="$route.fullPath" :isDarkMode="isDarkMode" />` | 라우트 변경할 때마다 Header 초기화 |

## 3. 데이터 바인딩 비교

| 바인딩 방식 | 문법 | 설명 | 방향 |
|-----------|------|------|------|
| Interpolation (보간) | `{{ data }}` | 텍스트/값 표시만 | 단방향 (부모 → 자식) |
| v-bind | `:속성="data"` | 속성/props 바인딩 | 단방향 (부모 → 자식) |
| v-model | `v-model="data"` | 양방향 동기화 | 양방향 (부모 ↔ 자식) |

### 3가지 바인딩 사용 예시

```vue
<!-- 1. {{ }} 보간 — 텍스트 표시만 (읽기) -->
<p>{{ message }}</p>  <!-- "Hello" 출력 -->

<!-- 2. v-bind (:) — 속성/props 바인딩 (부모 → 자식) -->
<img :src="imagePath" :alt="imageAlt" />
<Header :isDarkMode="isDarkMode" />

<!-- 3. v-model — 양방향 (입력 폼에서 자주 사용) -->
<input v-model="searchText" />  <!-- 입력값이 자동으로 searchText 업데이트 -->
<input v-model.number="count" />  <!-- 숫자로 변환 -->
```

### v-model 상세

```vue
<!-- v-model = :value + @input 의 축약 -->
<input v-model="message" />

<!-- 위와 동일 -->
<input :value="message" @input="message = $event.target.value" />
```

## 4. Attribute vs Props

### Attribute
- HTML 표준 속성 (class, id, data-*, style 등)
- **Boolean attribute 특성**: 
  - `true`면 attribute 자체가 HTML에 나타남
  - `false`면 attribute가 아예 없음

### Props
- Vue 컴포넌트에 전달하는 데이터
- 자식 컴포넌트에서 `defineProps`로 선언해야 받을 수 있음

### 바인딩 방식 구분

| 상황 | 코드 | 설명 |
|-----|------|------|
| Attribute 바인딩 | `:disabled="조건"` | HTML 속성을 동적으로 제어 |
| Props 바인딩 | `:prop="값"` | 컴포넌트에 데이터 전달 |

## 5. `<script setup>`에서 Props 접근

### 특징
- 최상위(top-level)에 선언된 모든 것(변수, 함수, import)이 자동으로 템플릿에 노출됨
- `defineProps()`에서 선언한 props도 템플릿에서 직접 접근 가능

### 예시

```javascript
const props = defineProps({
  currentPage: { type: Number, required: true },
  totalPages: { type: Number, required: true },
  isMob: { type: Boolean, default: false }
})
```

### 템플릿에서의 접근

| 접근 방식 | 동작 |
|---------|------|
| `{{ currentPage }}` | props.currentPage와 동일하게 동작 |
| `{{ totalPages }}` | props.totalPages와 동일하게 동작 |
| `{{ isMob }}` | props.isMob과 동일하게 동작 |

### ⚠️ 중요한 점
**`defineProps()`에서 바로 구조분해하면 반응성(reactivity)을 잃습니다**
- 즉 스냅샷(초기값)만 가져오므로 이후 변경이 템플릿에 반영되지 않음
- 반드시 props 객체 자체를 사용할 것

### 반응성 유지하는 방법

| 방법 | 코드 | 설명 |
|-----|------|------|
| 반응성 잃음 (위험) | `const { currentPage } = props;` | 구조분해하면 스냅샷만 가져옴 |
| toRefs 사용 (추천) | `const { currentPage } = toRefs(props);` | currentPage가 ref로 변환되어 반응성 유지 |
| computed 사용 | `const currentPage = computed(() => props.currentPage);` | 계산된 값으로 반응성 유지 |

## 6. `$event` - 이벤트 객체

### 정의
- Vue에서 이벤트 핸들러에 자동으로 전달되는 이벤트 객체
- 함수에서 이벤트를 제어할 때 사용 (preventDefault, stopPropagation 등)

### 예시

```javascript
// 템플릿
<a @click="copyProjectUrl($event, project.url)">라이브</a>

// 스크립트
const copyProjectUrl = (e: Event, url: string) => {
  e.preventDefault()  // $event 사용
  common.copyToClipboard(url)
}
```

### $event vs modifier

| 방식 | 코드 | 설명 |
|-----|------|------|
| $event 전달 | `@click="handler($event)"` | 함수에서 이벤트 제어 필요할 때 |
| .prevent modifier | `@click.prevent="handler()"` | preventDefault() 자동 실행 |
| .stop modifier | `@click.stop="handler()"` | stopPropagation() 자동 실행 |

## 7. `$route` - 라우트 정보

### 정의
- Vue Router에서 제공하는 현재 라우트 정보 객체
- `$route`: 라우트 정보 (읽기 전용)
- `$router`: 라우트 제어 객체 (네비게이션)

### 자주 쓰는 $route 속성들

| 속성 | 설명 | 예시 |
|-----|------|------|
| `$route.path` | 현재 경로 | `/portfolio` |
| `$route.fullPath` | 쿼리 포함 전체 경로 | `/portfolio?page=2` |
| `$route.name` | 라우트 이름 | `'portfolio'` |
| `$route.params` | URL 파라미터 | `{ id: '123' }` |
| `$route.query` | 쿼리 파라미터 | `{ page: '2' }` |

### 사용 예시

```javascript
// 경로 변경 감지
import { watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

watch(() => route.fullPath, (newPath) => {
  console.log('경로 변경:', newPath);
  // 예: scrollAnimation 재초기화
})
```

## 8. ref/computed 언래핑(unwrapping)

### 개념
- **언래핑**: Vue가 템플릿에서 `ref/computed`의 `.value`를 자동으로 꺼내 보여주는 동작

### 장소별 사용법

| 장소 | ref 사용 | computed 사용 |
|-----|---------|--------------|
| **템플릿** | `{{ count }}` (자동 언래핑) | `{{ computedResult }}` (자동 언래핑) |
| **스크립트** | `count.value` (.value 필수) | `computedResult.value` (.value 필수) |

### Reactivity API 정리

| API | 설명 | 스크립트 접근 | 템플릿 접근 |
|-----|------|-------------|-----------|
| `ref` | 반응성 단일 값 | `.value` 필수 | 자동 언래핑 |
| `computed` | 캐시된 계산값 | `.value` 필수 | 자동 언래핑 |
| `reactive` | 반응성 객체 | 직접 접근 | 직접 접근 |

### 구조분해 주의
- 구조분해하면 반응성 잃음
- `toRefs()`, `toRef()`로 변환 후 사용

## 9. Slot - 컴포넌트 컨텐츠 삽입

### 개념
- 컴포넌트에 **"구멍"**을 뚫어서 외부에서 내용을 주입하는 방식
- 레고 블록처럼 **틀(컴포넌트)**과 **내용(슬롯)**을 분리
- 같은 구조, 다른 내용으로 재사용성 극대화

### 기본 Slot

```vue
<!-- Button.vue (컴포넌트) -->
<template>
  <button class="btn">
    <slot></slot>  <!-- 구멍 -->
  </button>
</template>

<!-- 사용 -->
<Button>클릭하세요</Button>
<Button><strong>강조 버튼</strong></Button>
<Button><img src="icon.svg" /> 아이콘 버튼</Button>
```

### Named Slot (이름 있는 슬롯)

```vue
<!-- Card.vue -->
<template>
  <div class="card">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <div class="body">
      <slot></slot>  <!-- 기본 슬롯 -->
    </div>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<!-- 사용 -->
<Card>
  <template #header>
    <h3>카드 제목</h3>
  </template>
  
  <p>카드 본문 내용입니다.</p>
  
  <template #footer>
    <button>확인</button>
  </template>
</Card>
```

### Named Slot 문법

| 문법 | 코드 | 설명 |
|-----|------|------|
| 정식 문법 | `<template v-slot:item1>내용</template>` | Vue 공식 문법 |
| 축약 문법 | `<template #item1>내용</template>` | 더 많이 사용되는 축약형 |

```vue
<!-- 두 방식 모두 동일하게 동작 -->
<Ui>
  <!-- 정식 문법 -->
  <template v-slot:item1>내용</template>
  
  <!-- 축약 문법 (권장) -->
  <template #item2>내용</template>
</Ui>
```

### Slot vs Props 비교

| 방식 | 사용 | 장점 | 단점 |
|-----|------|------|------|
| **Props** | `:title="제목"` | 간단한 데이터 전달에 적합 | HTML 구조 전달 어려움 |
| **Slot** | `<template #header>...</template>` | 복잡한 HTML/컴포넌트 전달 가능 | 코드량 증가 |

### 실전 예시: 10개 리스트 UI

```vue
<!-- Ui.vue (컴포넌트) -->
<template>
  <section class="ui-list">
    <ul>
      <li v-for="n in 10" :key="n">
        <em :data-number="n < 10 ? `0${n}` : n">
          <slot :name="`item${n}`"></slot>
        </em>
      </li>
    </ul>
  </section>
</template>

<!-- 사용: 작업한 것만 슬롯 작성 -->
<Ui>
  <!-- 1번: 작업 안 함 (비워둠) -->
  
  <!-- 2번: 버튼 작업 -->
  <template #item2>
    <div class="button-work">
      <button @click="handleClick">클릭</button>
      <p>설명 텍스트</p>
    </div>
  </template>
  
  <!-- 3, 4번: 작업 안 함 -->
  
  <!-- 5번: 복잡한 레이아웃 -->
  <template #item5>
    <div class="complex-layout">
      <img src="/image.jpg" alt="" />
      <h3>제목</h3>
      <ul>
        <li>항목1</li>
        <li>항목2</li>
      </ul>
      <button class="btn-primary">버튼</button>
    </div>
  </template>
  
  <!-- 6~10번: 작업 안 함 -->
</Ui>
```

### Slot 장점

| 장점 | 설명 |
|-----|------|
| 재사용성 | 같은 틀로 다양한 내용 표현 |
| 유연성 | HTML, 컴포넌트, 이벤트 모두 전달 가능 |
| 가독성 | 구조(컴포넌트)와 내용(슬롯) 분리 |
| 관리 편의 | 작업한 것만 작성, 나머지는 자동으로 빈 칸 |

### Slot 활용 시나리오

| 시나리오 | 코드 패턴 |
|---------|---------|
| 버튼 컴포넌트 | `<Button><slot></slot></Button>` |
| 모달/다이얼로그 | `<Modal><slot name="title" /><slot /></Modal>` |
| 레이아웃 | `<Layout><slot name="header" /><slot /><slot name="footer" /></Layout>` |
| 리스트 아이템 | `<UiList><slot name="item1" />...` |
