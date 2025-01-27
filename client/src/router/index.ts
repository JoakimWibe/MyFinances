import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TransactionsView from '@/views/TransactionsView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import BudgetsView from '@/views/BudgetsView.vue';
import BudgetView from '@/views/BudgetView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/transactions',
      name: 'transactions',
      component: TransactionsView,
    },
    {
      path: '/budgets',
      name: 'budgets',
      component: BudgetsView,
    },
    {
      path: '/budgets/:id',
      name: 'budget',
      component: BudgetView,
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundView
  },
  ]
})

export default router
