<template>
  <router-view></router-view>
</template>

<script>
export default {
  created() {
    this.$store.dispatch('initStocks');
  }
};
</script>

<style>
body {
  padding-top: 20px;
}
</style>
