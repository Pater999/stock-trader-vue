import axios from 'axios';
import router from '../../router';

const state = {
  idToken: null,
  userId: null,
  user: null
};

const mutations = {
  authUser(state, userData) {
    state.idToken = userData.token;
    state.userId = userData.userId;
  },
  storeUser(state, user) {
    state.user = user;
  },
  clearAuthData(state) {
    state.idToken = null;
    state.userId = null;
  }
};

const actions = {
  setLogoutTimer({ dispatch }, expirationTime) {
    setTimeout(() => {
      dispatch('logout');
    }, expirationTime * 1000);
  },
  signup({ commit, dispatch }, authData) {
    axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAwcOr6WLRbRJ8A00amqZJGNSCcEhLDEK0', { email: authData.email, password: authData.password, returnSecureToken: true }).then((res) => {
      commit('authUser', { token: res.data.idToken, userId: res.data.localId });
      localStorage.setItem('token', res.data.idToken);
      localStorage.setItem('userId', res.data.localId);
      localStorage.setItem('expirationDate', Date.now() + res.data.expiresIn * 1000);
      dispatch('storeUser', authData);
      dispatch('setLogoutTimer', res.data.expiresIn);
      router.replace('/');
    });
  },
  login({ commit, dispatch }, authData) {
    axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAwcOr6WLRbRJ8A00amqZJGNSCcEhLDEK0', { email: authData.email, password: authData.password, returnSecureToken: true }).then((res) => {
      commit('authUser', { token: res.data.idToken, userId: res.data.localId });
      localStorage.setItem('token', res.data.idToken);
      localStorage.setItem('userId', res.data.localId);
      localStorage.setItem('expirationDate', Date.now() + res.data.expiresIn * 1000);
      dispatch('setLogoutTimer', res.data.expiresIn);
      router.replace('/');
    });
  },
  tryAutoLogin({ commit }) {
    const token = localStorage.getItem('token');
    if (!token) return;
    const expirationDate = localStorage.getItem('expirationDate');
    if (Date.now() >= expirationDate) return;
    const userId = localStorage.getItem('userId');
    commit('authUser', { token: token, userId: userId });
    router.replace('/');
  },
  logout({ commit }) {
    commit('clearAuthData');
    localStorage.clear();
    router.replace('/login');
  },
  storeUser({ state }, userData) {
    userData.isAdmin = false;
    userData.balance = 10000;
    if (!state.idToken) return;
    axios.post('https://vue-js-http-97a40.firebaseio.com/users.json' + '?auth=' + state.idToken, userData);
  }
};

export default {
  state,
  actions,
  mutations
};
