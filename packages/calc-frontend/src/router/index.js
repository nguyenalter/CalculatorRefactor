import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Account from '../views/Account.vue';
import History from '../views/History.vue';
import SignIn from '../views/SignIn.vue';
import SignUp from '../views/SignUp.vue';
import Dashboard from '../views/Dashboard.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: Home,
    alias: '*',
  },
  {
    path: '/account',
    component: Account,
    children: [
      {
        path: '',
        component: Dashboard,
      },
      {
        path: 'signup',
        component: SignUp,
      },
      {
        path: 'signin',
        component: SignIn,
      },
    ],
  },
  {
    path: '/history',
    component: History,
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
