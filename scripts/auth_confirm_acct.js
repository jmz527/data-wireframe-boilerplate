const { axios } = require('../axios');
const futil = require('../util/file_util');
const config = require('../main_config.json');

futil.logThis(`\x1b[36m%s\x1b[0m`, 'Auth Confirm Acct Initiated');

// TODO: Description of script's doings

let token = process.argv[2];

axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

axios.post('/auth/confirm-email').then((res) => {
  futil.logThis(`\x1b[32m%s\x1b[0m`, 'Success!');
  futil.logThis(`\x1b[32m%s\x1b[0m`, res.status);

  futil.saveJSON('../data/auth_confirm_acct.json', res.status);
}).catch((error) => {
  futil.logError(error, 'post', '/auth/confirm-email', axios.defaults);
  throw error;
});
