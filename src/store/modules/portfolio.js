import axios from 'axios';

const state = {
  funds: 10000.0,
  stocks: []
};

const mutations = {
  BUY_STOCK(state, { stockId, quantity, stockPrice }) {
    const record = state.stocks.find((element) => element.id == stockId);
    if (record) {
      record.quantity += quantity;
    } else {
      state.stocks.push({
        id: stockId,
        quantity: quantity
      });
    }
    state.funds -= stockPrice * quantity;
    state.funds = Math.round((state.funds + Number.EPSILON) * 100) / 100;
  },
  SELL_STOCK(state, { stockId, quantity, stockPrice }) {
    const record = state.stocks.find((element) => element.id == stockId);
    if (record.quantity > quantity) {
      record.quantity -= quantity;
    } else {
      state.stocks.splice(state.stocks.indexOf(record), 1);
    }
    state.funds += stockPrice * quantity;
    state.funds = Math.round((state.funds + Number.EPSILON) * 100) / 100;
  },
  SET_PORTFOLIO(state, portfolio) {
    state.funds = portfolio.funds ? portfolio.funds : 1000;
    state.stocks = portfolio.stockPortfolio ? portfolio.stockPortfolio : [];
  }
};

const actions = {
  sellStock({ commit, state, rootState }, order) {
    commit('SELL_STOCK', order);

    const data = {
      funds: state.funds,
      stockPortfolio: state.stocks
    };

    console.log(data);

    axios.put('https://vue-js-http-97a40.firebaseio.com/StocksUsers/' + rootState.users.userId + '.json' + '?auth=' + rootState.users.idToken, data);
  }
};

const getters = {
  stockPortfolio(state, getters) {
    return state.stocks.map((stock) => {
      return {
        id: stock.id,
        quantity: stock.quantity,
        name: getters.stocks[stock.id].name,
        price: getters.stocks[stock.id].price
      };
    });
  },
  funds(state) {
    return state.funds;
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
