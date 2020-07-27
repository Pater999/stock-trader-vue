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
  buyStock: ({ commit, rootState }, order) => {
    if (!rootState.users.idToken) return;
    commit('BUY_STOCK', order);

    const data = {
      funds: rootState.portfolio.funds,
      stockPortfolio: rootState.portfolio.stocks
    };
    axios.put('https://vue-js-http-97a40.firebaseio.com/StocksUsers/' + rootState.users.userId + '.json' + '?auth=' + rootState.users.idToken, data);
  },
  initStocks: ({ commit, rootState }) => {
    if (!rootState.users.idToken) return;

    axios.get('https://vue-js-http-97a40.firebaseio.com/stocks.json' + '?auth=' + rootState.users.idToken).then((response) => {
      const data = response.data;
      const stocks = [];
      for (let key in data) {
        const stock = data[key];
        stock.id = key;
        stocks[stock.id] = stock;
      }
      commit('SET_STOCKS', stocks);
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
