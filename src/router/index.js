import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import store from '../store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter(to, from, next) {
      if (store.state.idToken) next();
      else next('/login');
    }
  },
  {
    path: '/portfolio',
    name: 'portfolio',
    component: () => import('../views/Portfolio.vue'),
    beforeEnter(to, from, next) {
      if (store.state.idToken) next();
      else next('/login');
    }
  },
  {
    path: '/stocks',
    name: 'stocks',
    component: () => import('../views/Stocks.vue'),
    beforeEnter(to, from, next) {
      if (store.state.idToken) next();
      else next('/login');
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
