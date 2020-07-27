<template>
  <div>
    <div class="row" style="margin-top: 20px">
      <div class="col-md-12">
        <div class="form-group">
          <input type="search" v-model="searchText" class="form-control" id="search" placeholder="Cerca stock..." />
        </div>

        <div class="row" style="min-height: 558px">
          <app-stock v-for="stock in stocks.entries" :key="stock.id" :stock="stock"></app-stock>
        </div>
      </div>
    </div>
    <div class="overflow-auto" v-if="stocks.rows > 9">
      <div class="mt-3">
        <b-pagination v-model="currentPage" :total-rows="stocks.rows" :per-page="perPage" limit="10" align="fill"></b-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import Stock from '../components/Stock.vue';

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
  components: {
    appStock: Stock
  },
  computed: {
    stocks: function() {
      const stocksTmp = this.$store.getters.stocks;
      let entries = Object.entries(stocksTmp);
      if (this.searchText != '') {
        entries = entries.filter((entrie) => entrie[1].name.toUpperCase().includes(this.searchText.toUpperCase()));
      }
      let obj = {};
      obj.rows = entries.length;
      obj.entries = Object.fromEntries(entries.splice((this.currentPage - 1) * 9, 9));
      return obj;
    }
  }
};
</script>
