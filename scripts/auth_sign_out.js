const { axios, setAuth } = require('../axios');
const futil = require('../util/file_util');

futil.logThis(`\x1b[36m%s\x1b[0m`, 'Auth Sign Out Initiated');

// TODO: Description of script's doings

const instance = axios.create();

setAuth(instance).then((axiosInstance) => {
  axiosInstance.get('/auth/sign-out').then((res) => {
    futil.logThis(`\x1b[0m`, `Sign out successful!`);
    futil.logThis(`\x1b[32m%s\x1b[0m`, res.status);

    futil.saveJSON('../data/auth_sign_out.json', res.status);
  }).catch((error) => {
    futil.logError(error, 'get', '/auth/sign-out', axiosInstance.defaults);
    throw error;
  });
}).catch((error) => {
  throw error;
});

