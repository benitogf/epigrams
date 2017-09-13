<template>
  <transition appear name="slide-fade">
     <quill id="wei" class="quill-container"></quill>
  </transition>
</template>

<script>
export default {
  name: 'app',
  toolbar: true
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
  overflow-y: hidden;
}
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
