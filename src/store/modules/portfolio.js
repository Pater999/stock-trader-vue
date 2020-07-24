const state = {
  funds: 10000,
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
  },
  SELL_STOCK(state, { stockId, quantity, stockPrice }) {
    const record = state.stocks.find((element) => element.id == stockId);
    if (record.quantity > quantity) {
      record.quantity -= quantity;
    } else {
      state.stocks.splice(state.stockId.indexOf(record));
    }
    state.funds += stockPrice * quantity;
  }
};

const actions = {
  sellStock({ commit }, order) {
    commit('SELL_STOCK', order);
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
