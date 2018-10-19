// Custom Imports
const futil = require('./util/file_util');
const config = require('./main_config.json');

// Main Processes
// ========================================== //
async function mainProc() {
  futil.logThis(`\x1b[36m%s\x1b[0m`, '// ================================== //');
  futil.logThis(`\x1b[36m%s\x1b[0m`, '// Run Scripts Initiated');
  futil.logThis(`\x1b[36m%s\x1b[0m`, '// ========================================== //');
  futil.logThis(`\x1b[0m`, `Hello!`);
  futil.logThis(`\x1b[0m`, 'Welcome to the interactive script! \n');
  futil.logThis(`\x1b[0m`, 'This program will help guide you through all the endpoints in our Users API.');
  futil.logThis(`\x1b[0m`, `Now, before we begin, let's make sure we have everything we need.`);
  futil.logThis(`\x1b[0m`, `\n Here is a print out of the config file in the root of this repo:`);
  futil.logThis(`\x1b[0m`, config);
  futil.logThis(`\x1b[0m`, `\n There should be five attributes, and all should have values.\n Also make sure you have a valid email address in there. \n`);

  const go = await futil.prompt('Does it look all right? Y/N (default is Y)');

  if (go==='N') {
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
  // futil.logThis(`\x1b[0m`, `run count: ${call_count}`);
  futil.logThis(`\x1b[0m`, `\n Now, for our first script, let's create a new user...\n`);

  futil.logThis(`\x1b[36m%s\x1b[0m`, 'Auth Sign Up Initiated'); // script call here: auth_sign_up

  futil.logThis(`\x1b[0m`, `\n Looks good. Let's continue...\n`);
  futil.logThis(`\x1b[0m`, `\n Next, let's confirm the account...\n`);
  futil.logThis(`\x1b[0m`, `\n Having succesfully signed up, there should be an email with the title, "Confirmation instructions,"`);
  futil.logThis(`\x1b[0m`, `waiting for you in the inbox you provided (${config.email_before_at}@${config.email_after_at}).\n`);
  futil.logThis(`\x1b[0m`, `In the email, click on the "Confirm my account" link.`);
  futil.logThis(`\x1b[0m`, `This will take you to a "404 not found" page. Don't worry, this is expected.\n`);
  futil.logThis(`\x1b[0m`, `In the URL for this page you should be able to see a parameter called "confirmationToken"`);
  futil.logThis(`\x1b[0m`, `with an equal sign next to it. \n\n Everything to the right of that equals sign is our access token.\n`);

  const accessToken = await futil.prompt('Enter the access token here:');

  futil.logThis(`\x1b[36m%s\x1b[0m`, 'Auth Confirm Acct Initiated'); // script call here: auth_confirm_acct

  futil.logThis(`\x1b[0m`, `\n So far so good!\n`);
  futil.logThis(`\x1b[0m`, `\n Next, let's try siging in....\n`);

  futil.logThis(`\x1b[36m%s\x1b[0m`, 'Auth Sign In Initiated'); // script call here: auth_sign_in

  futil.logThis(`\x1b[0m`, `\n Looks like it worked! \n`);
  futil.logThis(`\x1b[0m`, `\n But, just to be sure - let's ping the server... \n`);

  futil.logThis(`\x1b[36m%s\x1b[0m`, 'Auth Ping Initiated'); // script call here: auth_ping

  futil.logThis(`\x1b[0m`, `\n Yup! Your account is active! \n`);
  futil.logThis(`\x1b[0m`, `\n Now let's see if we can fetch some data... \n`);

 // script call here: users_me
  futil.logThis(`\x1b[0m`, `\n Next let's get your profile data... \n`);

  futil.logThis(`\x1b[36m%s\x1b[0m`, 'Users Me Profile Initiated'); // script call here: users_me_profile

  futil.logThis(`\x1b[0m`, `\n Looks like it's missing some fields, huh?`);
  futil.logThis(`\x1b[0m`, `Let's fill those in... \n`);

  futil.logThis(`\x1b[36m%s\x1b[0m`, 'Users Me Profile Patch Initiated'); // script call here: users_me_profile_patch

  futil.logThis(`\x1b[0m`, `\n Let's switch gears... \n`);
  futil.logThis(`\x1b[0m`, `\n Let's change your password.`);
  futil.logThis(`\x1b[0m`, `(don't worry about saving the new password, we will change it back in a second). \n`);

  const password = await futil.prompt('Enter the new password here:');


  futil.logThis(`\x1b[36m%s\x1b[0m`, 'Auth Change PW Initiated'); // script call here: auth_change_pw

  futil.logThis(`\x1b[0m`, `\n Now, let's see if it worked. Let's sign out... \n`);

  futil.logThis(`\x1b[36m%s\x1b[0m`, 'Auth Sign Out Initiated'); // script call here: auth_sign_out

  futil.logThis(`\x1b[0m`, `\n Now let's pretend we lost our password. We need to request a password reset... \n`);

  futil.logThis(`\x1b[36m%s\x1b[0m`, 'Auth Req Reset PW Initiated'); // script call here: auth_req_pw_reset

  futil.logThis(`\x1b[0m`, `\n Having submitted a reset password request, there now should be an email with the title,`);
  futil.logThis(`\x1b[0m`, `"Reset password instructions," waiting for you in the inbox you provided (${config.email_before_at}@${config.email_after_at}).\n`);

  futil.logThis(`\x1b[0m`, `In the email, click on the "Change my password" link.`);
  futil.logThis(`\x1b[0m`, `This will take you to a "404 not found" page. Don't worry, this is expected.\n`);
  futil.logThis(`\x1b[0m`, `In the URL for this page you should be able to see a parameter called "resetPasswordToken"`);
  futil.logThis(`\x1b[0m`, `with an equal sign next to it. \n\n Everything to the right of that equals sign is our reset token.\n`);

  const resetToken = await futil.prompt('Enter the reset token here:');

  futil.logThis(`\x1b[36m%s\x1b[0m`, 'Auth Reset PW Initiated'); // script call here: auth_reset_pw

  futil.logThis(`\x1b[0m`, `\n Success! Your password has been changed back to ${config.password}! \n`);
  futil.logThis(`\x1b[0m`, `\n Now we will quickly run back through the following endpoints: \n`);
  futil.logThis(`\x1b[0m`, `Sign In \n Ping \n Users Me \n Users Me Profile \n `);

  futil.logThis(`\x1b[36m%s\x1b[0m`, 'Auth Sign In Initiated'); // script call here: auth_sign_in
  futil.logThis(`\x1b[36m%s\x1b[0m`, 'Auth Ping Initiated'); // script call here: auth_ping
  futil.logThis(`\x1b[36m%s\x1b[0m`, 'Users Me Initiated'); // script call here: users_me
  futil.logThis(`\x1b[36m%s\x1b[0m`, 'Users Me Profile Initiated'); // script call here: users_me_profile

  futil.logThis(`\x1b[0m`, `\n Looks like all those routes worked just fine. \n `);
  futil.logThis(`\x1b[0m`, `\n Next, let's do something a bit difficult. Let's setup two factor authentication... \n`);

  futil.logThis(`\x1b[36m%s\x1b[0m`, 'Auth Two Factor Get Initiated'); // script call here: auth_two_factor_get

  futil.logThis(`\x1b[0m`, `\n Having submitted a request for 2FA, you now have a base64 hash which we need to convert to a PNG image.`);
  futil.logThis(`\x1b[0m`, `So let's go ahead and convert it...\n`);

  futil.logThis(`\x1b[36m%s\x1b[0m`, 'Gen QR Img Initiated'); // script call here: gen_qr_img

  futil.logThis(`\x1b[0m`, `\n Now, if you look in your "/data" dir, you should see a file called "gen_qr_img.png"`);
  futil.logThis(`\x1b[0m`, `Open it up and use your phone to scan the QR code contained within.\n`);

  const confirmPin = await futil.prompt('Enter the pin here:');

  futil.logThis(`\x1b[36m%s\x1b[0m`, 'Auth Two Factor Confirm Initiated'); // script call here: auth_two_factor_confirm

  futil.logThis(`\x1b[0m`, `\n Success! Your request for 2FA has been confirmed!`);
  futil.logThis(`\x1b[0m`, `Now during the sign up process, there should be an extra step requiring you to enter your pin.`);
  futil.logThis(`\x1b[0m`, `\n Let's sign out, sign back in, and see if it worked...\n`);

  futil.logThis(`\x1b[36m%s\x1b[0m`, 'Auth Sign Out Initiated'); // script call here: auth_sign_out
  futil.logThis(`\x1b[36m%s\x1b[0m`, 'Auth Sign In Initiated'); // script call here: auth_sign_in

  futil.logThis(`\x1b[0m`, `\n This auth ping should fail? \n`);

  futil.logThis(`\x1b[36m%s\x1b[0m`, 'Auth Ping Initiated'); // script call here: auth_ping

  const authPin = await futil.prompt('Enter the pin here:');

  futil.logThis(`\x1b[36m%s\x1b[0m`, 'Auth Two Factor Post Initiated'); // script call here: auth_two_factor_post

  futil.logThis(`\x1b[0m`, `\n Success! You have signed in using 2FA! \n`);
  futil.logThis(`\x1b[0m`, `\n Again, let's run through the following endpoints and make sure it all works: \n`);
  futil.logThis(`\x1b[0m`, `Ping \n Users Me \n Users Me Profile \n `);

  futil.logThis(`\x1b[36m%s\x1b[0m`, 'Auth Ping Initiated'); // script call here: auth_ping
  futil.logThis(`\x1b[36m%s\x1b[0m`, 'Users Me Initiated'); // script call here: users_me
  futil.logThis(`\x1b[36m%s\x1b[0m`, 'Users Me Profile Initiated'); // script call here: users_me_profile

  futil.logThis(`\x1b[0m`, `\n Looks like those routes worked just fine. \n `);
  futil.logThis(`\x1b[0m`, `\n And now for our final step, we will sign out... \n `);

  futil.logThis(`\x1b[36m%s\x1b[0m`, 'Auth Sign Out Initiated'); // script call here: auth_sign_out

  futil.logThis(`\x1b[0m`, `\n Thanks for dropping by! \n `);
  futil.logThis(`\x1b[36m%s\x1b[0m`, '// ================================== //');
  futil.logThis(`\x1b[36m%s\x1b[0m`, '// Run Scripts Finished');
  futil.logThis(`\x1b[36m%s\x1b[0m`, '// ================================== //');
};

mainProc(); // Main Processes Init
