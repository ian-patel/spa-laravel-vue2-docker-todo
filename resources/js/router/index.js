import Vue from 'vue';
import Router from 'vue-router';
import routes from './routes';
import store from '../store';

Vue.use(Router);

/**
 * @param  {Route} to
 * @param  {Route} from
 * @param  {Object|undefined} savedPosition
 * @return {Object}
 */
function scrollBehavior(to, from, savedPosition) {
  return savedPosition || {
    x: 0,
    y: 0,
  };
}

/**
 * Create a new router instance.
 *
 * @param  {Array} routes
 * @return {Router}
 */
const router = new Router({
  routes,
  scrollBehavior,
  mode: 'history',
});

// Change page title by using routes meta
router.beforeEach((to, from, next) => {
  // check auth
  const {
    user,
  } = store.getters;
  if (!user) {
    store.dispatch('getUser');
  }

  if (to.matched.some(route => route.meta.auth)) {
    const {
      isLoggedIn,
    } = store.getters;
    if (!isLoggedIn) {
      return next({
        name: 'login',
        query: {
          r: to.fullPath,
        },
      });
    }
  }
  // Page title
  if (to.meta.title) document.title = to.meta.title;
  next();
});

export default router;
