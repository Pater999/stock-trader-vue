<template>
  <div>
    <div class="row" style="margin-top: 20px">
      <div class="col-md-12">
        <div class="row" style="min-height: 558px"><app-stock v-for="stock in stockPortfolio.entries" :key="stock.id" :stock="stock"></app-stock></div>
      </div>
    </div>
    <div class="overflow-auto" v-if="stockPortfolio.rows > 9">
      <div class="mt-3">
        <b-pagination v-model="currentPage" :total-rows="stockPortfolio.rows" :per-page="perPage" limit="10" align="fill"></b-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import Stock from '../components/PortfolioStock';

export default {
  data() {
    return {
      searchText: '',
      perPage: 9,
      currentPage: 1
    };
  },
  created() {
    this.$store.dispatch('initStocks');
  },
  computed: {
    stockPortfolio() {
      const stocksTmp = this.$store.getters.stockPortfolio;
      let entries = Object.entries(stocksTmp);
      if (this.searchText != '') {
        entries = entries.filter((entrie) => entrie[1].name.toUpperCase().includes(this.searchText.toUpperCase()));
      }
      let obj = {};
      obj.rows = entries.length;
      obj.entries = Object.fromEntries(entries.splice((this.currentPage - 1) * 9, 9));
      return obj;
    }
  },
  components: {
    appStock: Stock
  }
};
</script>
