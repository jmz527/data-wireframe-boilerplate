// Custom Imports
const futil = require('../util/file_util');
const config = require('../main_config.json');

// Helpers
const PositiveIntRegex = /^\d+$/;

// async function checkNewPassword(password) {
//   if (password.length === 0) {
//     futil.logThis(`\x1b[31m%s\x1b[0m`, `New password cannot be empty`);
//     password = await futil.prompt('Try again. Enter the new password here:');
//     return checkNewPassword(password);
//   } else if (password === config.password) {
//     futil.logThis(`\x1b[31m%s\x1b[0m`, `New password cannot be the same as your old password`);
//     password = await futil.prompt('Try again. Enter the new password here:');
//     return checkNewPassword(password);
//   }
//   return password;
// };

// async function checkPin(pin) {
//   if (pin.length !== 6) {
//     futil.logThis(`\x1b[31m%s\x1b[0m`, `Pin must be six digits long`);
//     pin = await futil.prompt('Try again. Enter the pin here:');
//     return checkPin(pin);
//   }
//   return pin;
// };

// Main Processes
// ========================================== //
async function mainProc() {
  futil.logThis(`\x1b[36m%s\x1b[0m`, '// ================================== //');
  futil.logThis(`\x1b[36m%s\x1b[0m`, '// Run Scripts Initiated');
  futil.logThis(`\x1b[36m%s\x1b[0m`, '// ========================================== //');

  futil.logThis(`\x1b[0m`, `Hello!`);
  futil.logThis(`\x1b[0m`, 'Welcome to the interactive script! \n');
  futil.logThis(`\x1b[0m`, 'This program will help guide you through all the endpoints in our API.');

  try {
    futil.logThis(`\x1b[0m`, `Now, before we begin, let's make sure we have everything we need.`);
    futil.logThis(`\x1b[0m`, `\n Here is a print out of the config file in the root of this repo:`);
    futil.logThis(`\x1b[0m`, config);
    futil.logThis(`\x1b[0m`, `\n There should be five attributes, and all should have values.\n Also make sure you have a valid email address in there. \n`);

    const go = await futil.prompt('Does it look all right? Y/N (default is Y)');

    if (go==='N' || go==='n') {
      futil.logThis(`\x1b[0m`, `\n`);
      futil.logThis(`\x1b[0m`, 'Okay, go edit that file. Return when it is ready.');
      return;
    }

    futil.logThis(`\x1b[0m`, `\n Great!`);
    futil.logThis(`\x1b[0m`, `\n One more thing before we start. We need an enumerator.`);
    futil.logThis(`\x1b[0m`, `This is a positive integer between 0 - 9999 which will be used to make a unique account for you.\n`);
    futil.logThis(`\x1b[0m`, `This enumerator will be blended into your email, like so: ${config.email_before_at}+<enumerator>@${config.email_after_at}.`);
    futil.logThis(`\x1b[0m`, `It will be used, again and again, as a parameter in our scripts.\n`);
    futil.logThis(`\x1b[0m`, `If used properly, it will be an ascending count. Which will help us to keep track of how many`);
    futil.logThis(`\x1b[0m`, `times we've gone through this process.\n`);
    futil.logThis(`\x1b[0m`, `(So if this is your first time running this program, enter 0)\n`);

    const call_count = await futil.prompt('Please enter your enumerator:');

    if (!PositiveIntRegex.test(call_count) && call_count !== 0) {
      throw new Error('Enumerator must be a positive integer between 0 - 9999');
    }

    // TODO: Add script calls here


    futil.logThis(`\x1b[0m`, `\n Thanks for dropping by! \n `);
  } catch(error) {
    futil.logThis(`\x1b[0m`, `\n`);
    futil.logThis(`\x1b[31m%s\x1b[0m`, 'Oops! Looks like something went wrong.');
    futil.logThis(`\x1b[31m%s\x1b[0m`, 'Going to print out the error and terminate this program \n');
    futil.logThis(`\x1b[31m\x1b[2m%s\x1b[0m`, error);
    futil.logThis(`\x1b[0m`, "");
  }

  futil.logThis(`\x1b[36m%s\x1b[0m`, '// ================================== //');
  futil.logThis(`\x1b[36m%s\x1b[0m`, '// Run Scripts Finished');
  futil.logThis(`\x1b[36m%s\x1b[0m`, '// ================================== //');
};

mainProc(); // Main Processes Init
