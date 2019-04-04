const axios = require('axios');
const config = require('./main_config.json');
const futil = require('./util/file_util');

axios.defaults.baseURL = `${config.baseURL}`;
axios.defaults.timeout = `${config.timeout}`;
axios.defaults.headers.common['Content-Type'] = 'application/json';

axios.defaults.headers.get['Content-Type'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';

// Interceptors for debugging purposes and further configuration.
axios.interceptors.request.use((requestConfig) => {
  return requestConfig;
}, (error) => {
  // console.log('error:', error);
  return Promise.reject(error);
});

axios.interceptors.response.use((response) => {
  return response;
}, (error) => {
  // console.log('error:', error);
  return Promise.reject(error);
});

// const setToken = (axiosInstance) => {
//   return new Promise((resolve, reject) => {
//     try {
//       futil.readJSON('../data/auth_sign_in.json', (json) => {
//         axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${json.headers["x-auth"]}`;
//         resolve(axiosInstance);

//       });
//     } catch (error) {
//       reject(error);
//     }
//   });
// };

// const setAuth = (axiosInstance) => {
//   return new Promise((resolve, reject) => {
//     try {
//       futil.readJSON('../data/auth_sign_in.json', (json) => {
//         axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${json.headers["x-auth"]}`;

//         if (json.data.twoFactor) {

//           futil.readJSON('../data/auth_two_factor_post.json', (json) => {
//             axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${json.headers["x-auth"]}`;
//             resolve(axiosInstance);

//           });

//         } else {
//           resolve(axiosInstance);
//         }
//       });
//     } catch (error) {
//       reject(error);
//     }
//   });
// };

const normalizeResponse = (res) => {
  return {
    // config: res.config,
    data: res.data,
    headers: res.headers,
    // request: res.request,
    status: res.status,
    statusText: res.statusText
  };
};

module.exports = { axios, /* setAuth, setToken, */ normalizeResponse };