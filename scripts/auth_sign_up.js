const { axios } = require('../axios');
const futil = require('../util/file_util');
const config = require('../main_config.json');

futil.logThis(`\x1b[36m%s\x1b[0m`, 'Auth Sign Up Initiated');

// TODO: Description of script's doings

// call_count is the ascending number added to email
// zero_count calculates the number of "0"s to prepend to the lastName string
const call_count = process.argv[2];
const zero_count = 4 - process.argv[2].length;

const user = {
	firstName: 'James',
	lastName: '0'.repeat(zero_count) + call_count,
	email: `${config.email_before_at}+${call_count}@${config.email_after_at}`,
	password: `${config.password}`
};

axios.post('/auth/sign-up', user).then((res) => {
  futil.logThis(`\x1b[32m%s\x1b[0m`, 'Success!');
  futil.logThis(`\x1b[32m%s\x1b[0m`, res.status);
  futil.logThis(`\x1b[0m`, `\n Here is a print out of the user we just created:`);
  futil.logThis(`\x1b[0m`, user);
  futil.saveJSON('../data/auth_sign_up.json', res.status);
}).catch((error) => {
  futil.logError(error, 'post', '/auth/sign-up', axios.defaults);
  throw error;
});
