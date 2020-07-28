import axios from 'axios';

const state = {
  stocks: [],
  loading: false
};

const mutations = {
  SET_LOADING(state) {
    state.loading = true;
  },
  SET_STOCKS(state, stocks) {
    state.stocks = stocks;
    state.loading = false;
  },
  RND_STOCKS(state) {
    // eslint-disable-next-line no-unused-vars
    Object.entries(state.stocks).forEach(([key, value]) => {
      value.price = Math.round(value.price * (1 + Math.random() - 0.5) * 100) / 100;
    });
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

    commit('SET_LOADING');
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
  randomizeStocks: ({ commit, rootState }) => {
    if (!rootState.users.idToken) return;

    commit('RND_STOCKS');

    const data = {};
    Object.entries(state.stocks).forEach(([key, value]) => {
      data[key] = { name: value.name, price: value.price };
    });
    axios.put('https://vue-js-http-97a40.firebaseio.com/stocks/.json' + '?auth=' + rootState.users.idToken, data);
  }
};

const getters = {
  stocks: (state) => {
    return state.stocks;
  },
  stocksLoading: (state) => {
    return state.loading;
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
