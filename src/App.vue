<template>
  <div class="container-fluid">
    <app-header></app-header>
    <div class="row" style="margin-top: 20px">
      <div class="col-md-12">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Header from './components/Header.vue';

export default {
  components: {
    appHeader: Header
  }
};
</script>

<style>
body {
  padding-top: 20px;
}
</style>
