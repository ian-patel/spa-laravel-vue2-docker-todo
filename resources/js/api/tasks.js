import axios from 'axios';

const BASE_URL = '/api/tasks';

/**
 * Fetch the tasks
 * @return {Objects}
 */
export async function list() {
  const response = await axios.get(
    `${BASE_URL}`,
  );
  return response.data;
}

/**
 * Fetch the chart data
 * @return {Objects}
 */
export async function chart() {
  const response = await axios.get(
    `${BASE_URL}/chart`,
  );
  return response.data;
}

/**
 * Complete the task
 * @param {String} id
 * @return {Objects}
 */
export async function complete(id) {
  const response = await axios.post(
    `${BASE_URL}/complete/${id}`,
  );
  return response.data;
}

/**
 * Add the task
 * @param {Object} data
 * @return {Objects}
 */
export async function add(data) {
  const response = await axios.post(
    `${BASE_URL}/create`, data,
  );
  return response.data;
}
