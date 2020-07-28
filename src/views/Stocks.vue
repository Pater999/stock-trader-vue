<template>
  <div>
    <div class="row" style="margin-top: 20px">
      <div class="col-md-12">
        <div class="form-row ">
          <div class="form-group col-md-9">
            <input type="search" v-model="searchText" class="form-control" id="search" placeholder="Cerca stock..." />
          </div>
          <div class="form-group col-md-3">
            <button :disabled="loading" @click="updateStocks()" class="btn btn-warning" style="color: white; fill: white; width:100%; heigth:15px">
              <span v-if="!loading">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                  <path
                    d="M3.38 8A9.502 9.502 0 0112 2.5a9.502 9.502 0 019.215 7.182.75.75 0 101.456-.364C21.473 4.539 17.15 1 12 1a10.995 10.995 0 00-9.5 5.452V4.75a.75.75 0 00-1.5 0V8.5a1 1 0 001 1h3.75a.75.75 0 000-1.5H3.38zm-.595 6.318a.75.75 0 00-1.455.364C2.527 19.461 6.85 23 12 23c4.052 0 7.592-2.191 9.5-5.451v1.701a.75.75 0 001.5 0V15.5a1 1 0 00-1-1h-3.75a.75.75 0 000 1.5h2.37A9.502 9.502 0 0112 21.5c-4.446 0-8.181-3.055-9.215-7.182z"
                  ></path>
                </svg>
              </span>
              <span v-if="loading">
                <b-spinner style="width: 1rem; height: 1rem;" label="Loading..."></b-spinner>
              </span>
              Aggiorna
            </button>
          </div>
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
  methods: {
    updateStocks: function() {
      this.$store.dispatch('initStocks');
    }
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
    },
    loading: function() {
      return this.$store.getters.stocksLoading;
    }
  }
};
</script>
