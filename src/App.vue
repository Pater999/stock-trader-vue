<template>
  <div class="container-fluid">
    <router-view name="header-top"></router-view>
    <transition name="slide" mode="out-in">><router-view></router-view></transition>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch('tryAutoLogin');
  }
};
</script>

<style>
body {
  padding-top: 20px;
}

.slide-leave-active {
  transition: opacity 0.2s ease;
  opacity: 0;
  animation: slide-out 0.2s ease-out forwards;
}

.slide-leave {
  opacity: 1;
  transform: translateX(0);
}

.slide-enter-active {
  animation: slide-in 0.2s ease-out forwards;
}

@keyframes slide-out {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-3px);
  }
}

@keyframes slide-in {
  0% {
    transform: translateY(-3px);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
