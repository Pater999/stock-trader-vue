<template>
  <div class="container-fluid">
    <app-header></app-header>
    <div class="row" style="margin-top: 20px">
      <div class="col-md-12"><h1>The home Component</h1></div>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header.vue';

export default {
  components: {
    appHeader: Header
  }
};
</script>
