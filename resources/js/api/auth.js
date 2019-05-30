import axios from 'axios';

const BASE_URL = '/api/auth';

/**
 * Register
 * @param {Obeject} data
 * @return {Object}
 */
export async function register(data) {
  const response = await axios.post(
    `${BASE_URL}/register`, data,
  );
  return response.data;
}

/**
 * Login
 * @param {Obeject} data
 * @return {Object}
 */
export async function login(data) {
  const response = await axios.post(
    `${BASE_URL}/login`, data,
  );
  return response.data;
}

/**
 * Get the user
 * @return {Object}
 */
export async function get() {
  const response = await axios.get(
    `${BASE_URL}/user`,
  );
  return response.data;
}

/**
 * Logout
 * @return {Object}
 */
export async function logout() {
  const response = await axios.post(
    `${BASE_URL}/logout`,
  );
  return response.data;
}
