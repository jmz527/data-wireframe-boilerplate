const { axios } = require('../axios');
const futil = require('../util/file_util');
const config = require('../main_config.json');

futil.logThis(`\x1b[36m%s\x1b[0m`, 'Auth Reset PW Initiated');

// TODO: Description of script's doings

axios.defaults.headers.post['Authorization'] = `Bearer ${process.argv[2]}`;

const newPassword = { password: process.argv[3] || config.password };

axios.post('/auth/reset-password', newPassword).then((res) => {
  futil.logThis(`\x1b[32m%s\x1b[0m`, 'Success!');
  futil.logThis(`\x1b[32m%s\x1b[0m`, res.status);
  futil.logThis(`\x1b[0m`, `\n Here is a print out of what we sent to the API:`);
  futil.logThis(`\x1b[0m`, newPassword);

  futil.saveJSON('../data/auth_reset_pw.json', res.status);
}).catch((error) => {
  futil.logError(error, 'post', '/auth/sign-in', axios.defaults);
  throw error;
}).catch((error) => {
  throw error;
});
