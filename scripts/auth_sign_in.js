const { axios } = require('../axios');
const futil = require('../util/file_util');
const config = require('../main_config.json');

futil.logThis(`\x1b[36m%s\x1b[0m`, 'Auth Sign In Initiated');

// TODO: Description of script's doings

let password = process.argv[3] || config.password;

const user = {
  email: `${config.email_before_at}+${process.argv[2]}@${config.email_after_at}`,
  password: `${password}`
}

axios.post('/auth/sign-in', user).then((res) => {
  futil.logThis(`\x1b[32m%s\x1b[0m`, 'Success!');
  futil.logThis(`\x1b[32m%s\x1b[0m`, res.status);
  futil.logThis(`\x1b[0m`, `\n Here is a print out of the authorization details we just used:`);
  futil.logThis(`\x1b[0m`, user);
  futil.logThis(`\x1b[0m`, "");

  futil.saveJSON('../data/auth_sign_in.json', { data: res.data, headers: res.headers });

  if (res.data.twoFactor) {
    futil.logThis(`\x1b[0m`, `Looks like you have 2FA setup`);
    futil.logThis(`\x1b[0m`, `Which means an extra step is required for signing in,`);
    futil.logThis(`\x1b[0m`, `please run the auth_two_factor_post.js script to continue...\n`);
  }
}).catch((error) => {
  futil.logError(error, 'post', '/auth/sign-in', axios.defaults);
  throw error;
});
