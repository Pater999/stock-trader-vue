<template>
  <div class="container-fluid">
    <app-header></app-header>
    <div class="row" style="margin-top: 20px">
      <div class="col-md-12">
        <div class="row"><app-stock v-for="stock in stocks" :key="stock.id" :stock="stock"></app-stock></div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header.vue';
import Stock from '../components/Stock.vue';

export default {
  components: {
    appStock: Stock,
    appHeader: Header
  },
  computed: {
    stocks() {
      return this.$store.getters.stocks;
    }
  }
};
</script>
