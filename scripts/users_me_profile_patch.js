const { axios, setAuth } = require('../axios');
const futil = require('../util/file_util');
const config = require('../main_config.json');

futil.logThis(`\x1b[36m%s\x1b[0m`, 'Users Me Profile Patch Initiated');

// TODO: Description of script's doings

// call_count is the ascending number added to email
// zero_count calculates the number of "0"s to prepend to the lastName string
const call_count = process.argv[2];
const zero_count = 4 - process.argv[2].length;

const instance = axios.create();

const newProfile = {
  "firstName": "Dr. Billy",
  "lastName": '-'.repeat(zero_count) + call_count,
  "email": `${config.email_before_at}@${config.email_after_at}`,
  "phone": `555-555-${'0'.repeat(zero_count) + call_count}`,
  "resumeUrl": "https://i.imgur.com/y2sp7l7.gifv",
  "pictureUrl": "https://i.imgur.com/y2sp7l7.gifv",
  "organization": "imbrex"
};

setAuth(instance).then((axiosInstance) => {
  axiosInstance.patch('/users/me/profile', newProfile).then((res) => {
    futil.logThis(`\x1b[32m%s\x1b[0m`, 'Success!');
    futil.logThis(`\x1b[32m%s\x1b[0m`, res.status);
    futil.logThis(`\x1b[0m`, `\n Voila! Your profile has been updated`);
    futil.logThis(`\x1b[0m`, `Here is the new profile: \n`);
    futil.logThis(`\x1b[0m`, newProfile);
    futil.saveJSON('../data/users_me_profile_patch.json', { data: res.data, headers: res.headers });
  }).catch((error) => {
    futil.logError(error, 'patch', '/users/me/profile', axiosInstance.defaults);
    throw error;
  });
}).catch((error) => {
  throw error;
});

