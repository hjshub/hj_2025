<template>
  <section class="section-05" id="section-05">
        <h2 lang="en" class="heading-tit-wrap align-c r-tit">
        <strong><i>c</i><i>o</i><i>n</i><i>t</i><i>a</i><i>c</i><i>t</i></strong>
        </h2>
        <div class="inner2 flex--wrap column center">
        <div class="form-wrap flex--wrap wrap animate fadeInUp">
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
    </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import CommonFunction from '../assets/ts/common'

const common = CommonFunction()

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
})

</script>

<style scoped lang="scss">
i[class ^= fa-] {
    pointer-events:none;
}
</style>