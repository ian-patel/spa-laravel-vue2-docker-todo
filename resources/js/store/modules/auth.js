/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import * as api from 'app/api/auth';
import Cookies from 'js-cookie';
import * as types from '../mutation-types';

// state
export const state = {
  user: null,
};

// mutations
export const mutations = {
  // Login the user
  [types.SAVE_USER](state, {
    user,
  }) {
    state.user = user;
  },

  // Save the token
  [types.SAVE_TOKEN](state, {
    token,
  }) {
    Cookies.set('token', token, {
      expires: 365,
    });
  },

  // logout
  [types.LOGOUT](state) {
    state.user = null;
    Cookies.remove('token');
  },
};

// actions
export const actions = {
  /**
   * Register
   * @param  {Function} options.commit
   * @return {Object} user
   */
  async register({
    commit,
  }, data) {
    const {
      user,
      token,
    } = await api.register(data);
    commit(types.SAVE_USER, {
      user,
    });
    commit(types.SAVE_TOKEN, {
      token,
    });
    return user;
  },

  /**
   * Login
   * @param  {Function} options.commit
   * @return {Object} user
   */
  async login({
    commit,
  }, data) {
    const {
      user,
      token,
    } = await api.login(data);
    commit(types.SAVE_USER, {
      user,
    });
    commit(types.SAVE_TOKEN, {
      token,
    });
    return user;
  },

  /**
   * Get the user
   * @param  {Function} options.commit
   * @return {Object} user
   */
  async getUser({
    commit,
  }) {
    if (Cookies.get('token')) {
      const response = await api.get();
      commit(types.SAVE_USER, {
        user: response.user,
      });
      return response.user;
    }
    return false;
  },

  /**
   * Logout
   * @param  {Function} options.commit
   * @return
   */
  async logout({
    commit,
  }) {
    const response = await api.logout();
    commit(types.LOGOUT);
  },

  /**
   * Clear
   * @param  {Function} options.commit
   * @return
   */
  async clear({
    commit,
  }) {
    commit(types.LOGOUT);
  },
};

// getters
export const getters = {
  /**
   * Determine the use is loggedin
   */
  isLoggedIn: state => state.user !== null,
  /**
   * Get the use
   */
  user: state => state.user,
};
