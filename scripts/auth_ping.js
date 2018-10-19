const { axios, setAuth } = require('../axios');
const futil = require('../util/file_util');

futil.logThis(`\x1b[36m%s\x1b[0m`, 'Auth Ping Initiated');

// TODO: Description of script's doings

const instance = axios.create();

setAuth(instance).then((axiosInstance) => {
  axiosInstance.post('/auth/ping').then((response) => {
    futil.logThis(`\x1b[32m%s\x1b[0m`, 'Success!');
    futil.logThis(`\x1b[32m%s\x1b[0m`, response.status);

    futil.saveJSON('../data/auth_ping.json', response.status);
  }).catch((error) => {
    futil.logError(error, 'post', '/auth/ping', axiosInstance.defaults);
    throw error;
  });
}).catch((error) => {
  throw error;
});

