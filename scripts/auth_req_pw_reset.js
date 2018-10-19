const { axios } = require('../axios');
const futil = require('../util/file_util');
const config = require('../main_config.json');

futil.logThis(`\x1b[36m%s\x1b[0m`, 'Auth Req Reset PW Initiated');

// TODO: Description of script's doings

const resetEmail = {
  email: `${config.email_before_at}+${process.argv[2]}@${config.email_after_at}`
}

axios.post('/auth/request-password-reset', resetEmail).then((res) => {
  futil.logThis(`\x1b[32m%s\x1b[0m`, 'Success!');
  futil.logThis(`\x1b[32m%s\x1b[0m`, res.status);
  futil.logThis(`\x1b[0m`, `\n Here is a print out of what we sent to the API:`);
  futil.logThis(`\x1b[0m`, resetEmail);

  futil.saveJSON('../data/auth_req_pw_reset.json', { data: res.status, headers: res.headers });
}).catch((error) => {
  futil.logError(error, 'post', '/auth/sign-in', axios.defaults);
  throw error;
}).catch((error) => {
  throw error;
});
