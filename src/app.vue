<template>
  <transition appear name="slide-fade">
     <quill id="nepa" class="quill-container"></quill>
  </transition>
</template>

<script>
export default {
  name: 'app',
  toolbar: true,
  methods: {}
}
</script>

<style lang="scss">
html {
  height: 100%;
}
body {
  margin: 0;
  height: 100%;
  min-height: 100%;
  overflow-y: auto;
}
/* Tell Quill not to scroll */
.quill-container {
  height: auto;
  min-height: 100%;
  padding: 50px;
  padding: 0;
}
.quill-container .ql-editor {
  font-size: 18px;
  overflow-y: visible;
}
/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all .5s ease;
}
.slide-fade-leave-active {
  transition: none;
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(15px);
  opacity: 0;
}
</style>
