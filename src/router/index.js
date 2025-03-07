import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import JobsView from '@/views/JobsView.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import JobView from '@/views/JobView.vue';
import AddJobView from '@/views/AddJobView.vue';
import EditJobView from '@/views/EditJobView.vue';
import login from "@/views/login.vue";
import PaymentsView from '@/views/PaymentsView.vue';
import Register from "@/views/register.vue";
import BalanceSummaryView from '@/views/Report.vue';
import ExpenseSummary from '@/views/ExpenseSummary.vue';
import HomeView2 from '@/views/HomeView2.vue';
import IncomeSummary from '@/views/IncomeSummary.vue';
import Expenses from '@/views/Expenses.vue';
import Income from '@/views/Income.vue';
import ProfileSettings from '@/views/ProfileSettings.vue';




const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/home2',
      name: 'home2',
      component: HomeView2,
    },
    {
      path: '/jobs',
      name: 'jobs',
      component: JobsView,
    },
    {
      path: '/jobs/:id',
      name: 'job',
      component: JobView,
    },
    {
      path: '/jobs/add',
      name: 'add-job',
      component: AddJobView,
    },
    {
      path: '/jobs/edit/:id',
      name: 'edit-job',
      component: EditJobView,
    },
    {
      path: '/payments',
      name: 'payments',
      component: PaymentsView,
    },

    {
      path: '/expenses',
      name: 'expenses',
      component: Expenses,
    },

    {
      path: '/income',
      name: 'income',
      component: Income,
    },

    {
      path: '/summary',
      name: 'summary',
      component: BalanceSummaryView,
    },
    {
      path: '/ExpenseSummary',
      name: 'ExpenseSummary',
      component: ExpenseSummary ,
    },
    {
      path: '/IncomeSummary',
      name: 'IncomeSummary',
      component: IncomeSummary ,
    },
  //     {
  //   path: '/completePayments',
  //   name: 'completePayments',
  //   component: CompletePaymentsView,
  // },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundView,
    },
    {
      path: '/login',
      name: 'login',
      component: login,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
      path: '/profile-settings',
      name: 'profile-settings',
      component: ProfileSettings,
    },
  ],
});

export default router;
