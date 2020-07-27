<template>
  <div class="col-md-12">
    <div class="row"><app-stock v-for="stock in stocks" :key="stock.id" :stock="stock"></app-stock></div>
  </div>
</template>

<script>
import Stock from '../components/Stock.vue';

export default {
  created() {
    this.$store.dispatch('initStocks');
  },
  components: {
    appStock: Stock
  },
  computed: {
    stocks() {
      return this.$store.getters.stocks;
    }
  }
};
</script>
