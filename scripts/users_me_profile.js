const { axios, setAuth } = require('../axios');
const futil = require('../util/file_util');

futil.logThis(`\x1b[36m%s\x1b[0m`, 'Users Me Profile Initiated');

// TODO: Description of script's doings

const instance = axios.create();

setAuth(instance).then((axiosInstance) => {
  axiosInstance.get('/users/me/profile').then((res) => {
    futil.logThis(`\x1b[32m%s\x1b[0m`, 'Success!');
    futil.logThis(`\x1b[32m%s\x1b[0m`, res.status);
    futil.logThis(`\x1b[0m`, `\n There's your profile: \n`);
    futil.logThis(`\x1b[0m`, res.data);
    futil.saveJSON('../data/users_me_profile.json', res.data);
  }).catch((error) => {
    futil.logError(error, 'get', '/users/me/profile', axiosInstance.defaults);
    throw error;
  });
}).catch((error) => {
  throw error;
});

