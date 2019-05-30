/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable no-undef */
import * as api from 'app/api/tasks';
import * as types from '../mutation-types';

// state
export const state = {
  tasks: [],
  chart: null,
};

// mutations
export const mutations = {
  // Save tasks
  [types.SAVE_TASKS](state, {
    tasks,
  }) {
    state.tasks = tasks;
  },

  // Save tasks
  [types.SAVE_CHART_DATA](state, {
    data,
  }) {
    state.chart = data;
  },

  // Add the task
  [types.ADD_TASK](state, {
    task,
  }) {
    state.tasks.unshift(task);
  },
};

// actions
export const actions = {
  /**
   * Get the tasks
   * @param  {Function} options.commit
   * @return {Object}
   */
  async fetchTasks({
    commit,
  }) {
    const {
      tasks,
    } = await api.list();

    commit(types.SAVE_TASKS, {
      tasks,
    });
    return tasks;
  },

  /**
   * Get the Burndown Chart data
   * @return {Object} user
   */
  async getBurndownChart({
    commit,
  }) {
    const {
      data,
    } = await api.chart();
    commit(types.SAVE_CHART_DATA, {
      data,
    });
    return data;
  },

  /**
   * Complete the task
   * @param  {Function} options.commit
   * @param  {Object} payload
   * @return {Object}
   */
  async completeTask({
    commit,
  }, payload) {
    await api.complete(payload.id);
  },

  /**
   * Add the task
   * @param  {Function} options.commit
   * @param  {Object} payload
   * @return {Object}
   */
  async addTask({
    commit,
  }, data) {
    const {
      task,
    } = await api.add(data);

    commit(types.ADD_TASK, {
      task,
    });
    return task;
  },
};

// getters
export const getters = {
  /**
   * Get the tasks
   */
  tasks: state => state.tasks,

  /**
   * Get the chart data
   */
  chart: state => state.chart,

  /**
   * Get the completed tasks
   */
  completedTasks: state => _.filter(state.tasks, ['completed', true]),

  /**
   * Get the pending tasks
   */
  pendingTasks: state => _.filter(state.tasks, ['completed', false]),

  /**
   * Get the task by id
   */
  gettaskById: state => prop => _.find(state.tasks, ['id', prop]),
};
