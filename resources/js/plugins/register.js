import axios from 'axios';
import Cookies from 'js-cookie';
import ElementUI from 'element-ui';
import store from '../store';
import router from '../router';

// Request interceptor
axios.interceptors.request.use((request) => {
  const token = Cookies.get('token');
  if (token) {
    // eslint-disable-next-line no-param-reassign
    request.headers.common.Authorization = `Bearer ${token}`;
  }
  return request;
});

// Add a axios response interceptor
axios.interceptors.response.use(response => response, (error) => {
  // redirect to login page on api unauthorized
  const {
    status,
  } = error.response;
  let message = 'System error, please try again later';
  if (status === 401) {
    store.dispatch('clear');
    router.push({
      name: 'login',
    });
    message = 'Please Login';
  }

  if (status === 422) {
    message = 'Email or Password incorrect';
  }

  ElementUI.Message({
    message,
    type: 'error',
    showClose: true,
  });

  return Promise.reject(error);
});
