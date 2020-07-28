import axios from 'axios';
import router from '../../router';
import Axios from 'axios';

const state = {
  idToken: null,
  userId: null,
  user: null,
  error: null,
  isAdmin: false
};

const mutations = {
  authUser(state, userData) {
    state.idToken = userData.token;
    state.userId = userData.userId;
  },
  setAdmin(state, isAdmin) {
    state.isAdmin = isAdmin;
  },
  storeUser(state, user) {
    state.user = user;
  },
  clearAuthData(state) {
    state.idToken = null;
    state.userId = null;
  },
  storeError(state, data) {
    state.error = data;
  }
};

const actions = {
  setLogoutTimer({ dispatch }, expirationTime) {
    setTimeout(() => {
      dispatch('logout');
    }, expirationTime * 1000);
  },
  signup({ commit, dispatch }, authData) {
    axios
      .post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAwcOr6WLRbRJ8A00amqZJGNSCcEhLDEK0', { email: authData.email, password: authData.password, returnSecureToken: true })
      .then((res) => {
        commit('authUser', { token: res.data.idToken, userId: res.data.localId });
        localStorage.setItem('token', res.data.idToken);
        localStorage.setItem('userId', res.data.localId);
        localStorage.setItem('expirationDate', Date.now() + res.data.expiresIn * 1000);
        authData.userId = res.data.localId;
        dispatch('storeUser', authData);
        dispatch('setLogoutTimer', res.data.expiresIn);
        router.replace('/');
      })
      .catch((error) => {
        commit('storeError', error);
      });
  },
  login({ commit, dispatch }, authData) {
    axios
      .post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAwcOr6WLRbRJ8A00amqZJGNSCcEhLDEK0', { email: authData.email, password: authData.password, returnSecureToken: true })
      .then((res) => {
        commit('authUser', { token: res.data.idToken, userId: res.data.localId });
        localStorage.setItem('token', res.data.idToken);
        localStorage.setItem('userId', res.data.localId);
        localStorage.setItem('expirationDate', Date.now() + res.data.expiresIn * 1000);
        dispatch('setLogoutTimer', res.data.expiresIn);
        dispatch('initStocks');
        dispatch('checkAdmin');
        dispatch('loadUserData');
        router.replace('/');
      })
      .catch((error) => {
        commit('storeError', error);
      });
  },
  tryAutoLogin({ commit, dispatch }) {
    const token = localStorage.getItem('token');
    if (!token) return;
    const expirationDate = localStorage.getItem('expirationDate');
    if (Date.now() >= expirationDate) return;
    const userId = localStorage.getItem('userId');
    commit('authUser', { token: token, userId: userId });
    dispatch('initStocks');
    dispatch('checkAdmin');
    dispatch('loadUserData');
    router.replace('/');
  },
  logout({ commit }) {
    commit('clearAuthData');
    localStorage.clear();
    router.replace('/login');
  },
  storeUser({ state }, userData) {
    userData.isAdmin = false;
    delete userData.password;
    delete userData.confirmPassword;
    if (!state.idToken) return;
    axios.post('https://vue-js-http-97a40.firebaseio.com/users.json' + '?auth=' + state.idToken, userData);
  },
  loadUserData({ commit, rootState }) {
    if (!rootState.users.idToken) return;
    Axios.get('https://vue-js-http-97a40.firebaseio.com/StocksUsers/' + rootState.users.userId + '.json' + '?auth=' + rootState.users.idToken).then((response) => {
      const portfolio = {
        stockPortfolio: response.data.stockPortfolio,
        funds: response.data.funds
      };
      commit('SET_PORTFOLIO', portfolio);
    });
  },
  checkAdmin({ commit, rootState }) {
    if (!rootState.users.idToken) return;
    Axios.get('https://vue-js-http-97a40.firebaseio.com/users.json/' + '?orderBy="userId"&equalTo="' + rootState.users.userId + '"&auth=' + rootState.users.idToken).then((response) => {
      const isAdmin = response.data[Object.keys(response.data)[0]].isAdmin;
      commit('setAdmin', isAdmin);
    });
  }
};

const getters = {
  idToken: (state) => {
    return state.idToken;
  },
  user: (state) => {
    return state.user;
  },
  error: (state) => {
    return state.error;
  },
  isAdmin: (state) => {
    return state.isAdmin;
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
