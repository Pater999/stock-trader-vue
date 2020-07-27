<template>
  <div class="container-fluid">
    <app-header></app-header>
    <div class="row" style="margin-top: 20px">
      <div class="col-md-12">
        <div class="row"><app-stock v-for="stock in stockPortfolio" :key="stock.id" :stock="stock"></app-stock></div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header.vue';
import Stock from '../components/PortfolioStock';

export default {
  created() {
    this.$store.dispatch('initStocks');
  },
  computed: {
    stock() {
      return this.$store.getters.stocks;
    },
    stockPortfolio() {
      return this.$store.getters.stockPortfolio;
    }
  },
  components: {
    appStock: Stock,
    appHeader: Header
  }
};
</script>
