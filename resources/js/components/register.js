import Vue from 'vue';
import ElementUI from 'element-ui';
import VueCharts from 'vue-chartjs';
import locale from 'element-ui/lib/locale/lang/en';

import NewTask from './NewTask.vue';
import TasksList from './TasksList.vue';
import BurndownChart from './BurndownChart.vue';
import LeftSidebar from './layout/LeftSidebar.vue';
import PageContainer from './layout/PageContainer.vue';
import SidebarLayout from './layout/SidebarLayout.vue';

Vue.component('new-task', NewTask);
Vue.component('tasks-list', TasksList);
Vue.component('left-sidebar', LeftSidebar);
Vue.component('page-container', PageContainer);
Vue.component('sidebar-layout', SidebarLayout);
Vue.component('burndown-chart', BurndownChart);

Vue.use(VueCharts);
Vue.use(ElementUI, {
  locale,
});
