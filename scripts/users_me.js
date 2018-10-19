const { axios, setAuth } = require('../axios');
const futil = require('../util/file_util');

futil.logThis(`\x1b[36m%s\x1b[0m`, 'Users Me Initiated');

// TODO: Description of script's doings

const instance = axios.create();

setAuth(instance).then((axiosInstance) => {
  axiosInstance.get('/users/me').then((res) => {
    futil.logThis(`\x1b[32m%s\x1b[0m`, 'Success!');
    futil.logThis(`\x1b[32m%s\x1b[0m`, res.status);
    futil.logThis(`\x1b[0m`, `\n Here's your user entity, fresh from the server: \n`);
    futil.logThis(`\x1b[0m`, res.data);

    futil.saveJSON('../data/users_me.json', res.data);
  }).catch((error) => {
    futil.logError(error, 'get', '/users/me', axiosInstance.defaults);
    throw error;
  });
}).catch((error) => {
  throw error;
});
