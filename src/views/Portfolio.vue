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
import { mapGetters } from 'vuex';
import Header from '../components/Header.vue';
import Stock from '../components/PortfolioStock';

export default {
  computed: {
    ...mapGetters({ stocks: 'stockPortfolio' })
  },
  components: {
    appStock: Stock,
    appHeader: Header
  }
};
</script>
