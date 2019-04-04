const { axios, normalizeResponse } = require('../axios');
const futil = require('../util/file_util');
const config = require('../main_config.json');

futil.logThis(`\x1b[36m%s\x1b[0m`, 'Example Call Initiated');

// TODO: Description of script's doings

const instance = axios.create();

instance.get('/api').then((res) => {
  futil.logThis(`\x1b[32m%s\x1b[0m`, 'Success!');
  futil.logThis(`\x1b[32m%s\x1b[0m`, res.status);
  futil.logThis(`\x1b[0m`, `\n Here's your payload, fresh from the server: \n`);
  futil.logThis(`\x1b[0m`, res.data);

  futil.saveJSON('../data/example.json', normalizeResponse(res));
}).catch((error) => {
  futil.logError(error, 'get', '/api', instance.defaults);
  throw error;
});
