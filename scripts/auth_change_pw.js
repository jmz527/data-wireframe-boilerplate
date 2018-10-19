const { axios, setAuth } = require('../axios');
const futil = require('../util/file_util');
const config = require('../main_config.json');

futil.logThis(`\x1b[36m%s\x1b[0m`, 'Auth Change PW Initiated');

// TODO: Description of script's doings

const passwords = {
  passwordOld: `${process.argv[2] || config.password}`,
  passwordNew: `${process.argv[3]}`
}

const instance = axios.create();

setAuth(instance).then((axiosInstance) => {
  axiosInstance.post('auth/change-password', passwords).then((res) => {
    futil.logThis(`\x1b[32m%s\x1b[0m`, 'Success!');
    futil.logThis(`\x1b[32m%s\x1b[0m`, res.status);
    futil.logThis(`\x1b[0m`, `\n Your account has been updated with the new password`);
    futil.logThis(`\x1b[0m`, `\n Here is a print out of what we sent to the API:`);
    futil.logThis(`\x1b[0m`, passwords);

    futil.saveJSON('../data/auth_change_pw.json', res.status);

    // To replace the password in the main_config file, uncomment below
    // futil.saveJSON('../main_config.json', { ...config, "password": process.argv[3] });

  }).catch((error) => {
    futil.logError(error, 'post', 'auth/change-password', axiosInstance.defaults);
    throw error;
  });
}).catch((error) => {
  throw error;
});
