import Login from 'app/pages/Login.vue';
import Register from 'app/pages/Register.vue';
import Dashboard from 'app/pages/Dashboard.vue';
import Tasks from 'app/pages/Tasks.vue';
import Chart from 'app/pages/Chart.vue';
import Layout from 'app/components/layout/Layout.vue';

// routes
const routes = [{
  path: '/login',
  name: 'login',
  component: Login,
  meta: {
    auth: false,
  },
},
{
  path: '/register',
  name: 'register',
  component: Register,
  meta: {
    auth: false,
  },
},
{
  path: '/',
  component: Layout,
  meta: {
    auth: true,
  },
  children: [{
    path: '/',
    name: 'dashboard',
    component: Dashboard,
    meta: {
      title: 'Dashboard',
      auth: true,
    },
  },
  {
    path: '/tasks',
    name: 'tasks',
    component: Tasks,
    meta: {
      title: 'Tasks',
      auth: true,
    },
  },
  {
    path: '/chart',
    name: 'chart',
    component: Chart,
    meta: {
      title: 'Chart',
      auth: true,
    },
  },
  ],
},
];

export default routes;
