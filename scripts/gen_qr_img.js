const base64Img = require('base64-img');
const futil = require('../util/file_util');

futil.logThis(`\x1b[36m%s\x1b[0m`, 'Gen QR Img Initiated');

// TODO: Description of script's doings

futil.readJSON('../data/auth_two_factor_get.json', (json) => {

  base64Img.img(json.data.qrcode, '../data/', 'img', (err, filepath) => {
    futil.logThis(`\x1b[32m%s\x1b[0m`, 'Image Saved!');
    futil.logThis(`path: ${filepath}`);
  });

});
