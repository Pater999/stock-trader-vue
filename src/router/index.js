import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';
import Header from '../components/Header.vue';

const Home = () => import('../views/Home.vue');
const Portfolio = () => import('../views/Portfolio.vue');
const Stocks = () => import('../views/Stocks.vue');
const Admin = () => import('../views/Admin.vue');

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    components: { default: Home, 'header-top': Header },
    beforeEnter(to, from, next) {
      if (store.state.users.idToken) next();
      else next('/login');
    }
  },
  {
    path: '/portfolio',
    name: 'portfolio',
    components: { default: Portfolio, 'header-top': Header },
    beforeEnter(to, from, next) {
      if (store.state.users.idToken) next();
      else next('/login');
    }
  },
  {
    path: '/stocks',
    name: 'stocks',
    components: { default: Stocks, 'header-top': Header },
    beforeEnter(to, from, next) {
      if (store.state.users.idToken) next();
      else next('/login');
    }
  },
  {
    path: '/admin',
    name: 'admin',
    components: { default: Admin, 'header-top': Header },
    beforeEnter(to, from, next) {
      if (store.state.users.idToken) {
        next();
      } else next('/login');
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
