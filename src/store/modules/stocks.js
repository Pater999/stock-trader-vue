import axios from 'axios';

const state = {
  stocks: []
};

const mutations = {
  SET_STOCKS(state, stocks) {
    state.stocks = stocks;
  },
  RND_STOCKS(state) {
    console.log(state);
  }
};

const actions = {
  buyStock: ({ commit }, order) => {
    commit('BUY_STOCK', order);
  },
  initStocks: ({ commit }) => {
    axios.get('/stocks.json').then((response) => {
      const data = response.data;
      const stocks = [];
      for (let key in data) {
        const stock = data[key];
        stock.id = key;
        stocks.push(stock);
      }
      commit('SET_STOCKS', response.data);
    });
  },
  randomizeStocks: ({ commit }) => {
    commit('RND_STOCKS');
  }
};

const getters = {
  stocks: (state) => {
    return state.stocks;
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};