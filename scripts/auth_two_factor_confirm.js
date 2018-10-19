const { axios, setToken } = require('../axios');
const futil = require('../util/file_util');

futil.logThis(`\x1b[36m%s\x1b[0m`, 'Auth Two Factor Confirm Initiated');

// TODO: Description of script's doings

const instance = axios.create();

let pin = process.argv[2];

setToken(instance).then((axiosInstance) => {
  axiosInstance.post('/auth/two-factor-confirm', { "token": parseInt(pin) }).then((res) => {
    futil.logThis(`\x1b[32m%s\x1b[0m`, 'Success!');
    futil.logThis(`\x1b[32m%s\x1b[0m`, res.status);
    futil.saveJSON('../data/auth_two_factor_confirm.json', res.data);
  }).catch((error) => {
    futil.logError(error, 'post', '/auth/two-factor-confirm', axiosInstance.defaults);
    throw error;
  });
}).catch((error) => {
  throw error;
});
