<template>
  <div class="col-md-12">
    <div class="row"><app-stock v-for="stock in stockPortfolio" :key="stock.id" :stock="stock"></app-stock></div>
  </div>
</template>

<script>
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
    appStock: Stock
  }
};
</script>
