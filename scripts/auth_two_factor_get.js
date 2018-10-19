const { axios, setAuth } = require('../axios');
const futil = require('../util/file_util');

futil.logThis(`\x1b[36m%s\x1b[0m`, 'Auth Two Factor Get Initiated');

// TODO: Description of script's doings

const instance = axios.create();

setAuth(instance).then((axiosInstance) => {
  axiosInstance.get('/auth/two-factor').then((res) => {
    futil.logThis(`\x1b[32m%s\x1b[0m`, 'Success!');
    futil.logThis(`\x1b[32m%s\x1b[0m`, res.status);
    futil.saveJSON('../data/auth_two_factor_get.json', { data: res.data, headers: res.headers });
  }).catch((error) => {
    futil.logError(error, 'get', '/auth/two-factor', axiosInstance.defaults);
    throw error;
  });
}).catch((error) => {
  throw error;
});
