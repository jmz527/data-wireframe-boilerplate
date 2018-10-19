## users api data wireframe
A library of scripts designed to call & retrieve data from our Users API

# setup
First, you will need to add a file to the root directory of this repo, titled "main_config.json". It's contents should look something like this:

```
{
  "baseURL": "http://api-users-blah.com",
  "timeout": 1000,
  "email_before_at": "your.email",
  "email_after_at": "example.com",
  "password": "password123"
}
```

Next, you will need to create a `error_log.json` file within the `/error_logs` directory. Follow the directions in the "error logs" readme, [found here](./error_logs/README.md).


# script execution

### main scripts
Within your terminal, navigate to the `scripts` directory, then you can run the following commands:

- `node auth_sign_up.js :idx:`
- `node auth_confirm_acct.js :accessToken:`
- `node auth_sign_in.js :idx:`
- `node auth_ping.js`
- `node auth_change_pw.js :newPassword:`
- `node auth_req_pw_reset.js`
- `node auth_reset_pw.js :resetToken:`
- `node auth_two_factor_get.js`
- `node auth_two_factor_confirm.js :pin:`
- `node auth_two_factor_post.js :pin:`
- `node auth_sign_out.js`
- `node users_me.js`
- `node users_me_profile.js`
- `node users_me_profile_patch.js :idx:`
- `node gen_qr_img.js`

Each script will create a file within the `/data ` dir, read more about these files [here](./data/README.md).

### interactive script
There is also an interactive script, executed by calling the index.js file, like so:

- `node index.js :idx:`

Executing this index script will run through all the other scripts, in a sequential order.

### legend for explaining the parameters
- `:idx:` - a positive integer between 0 - 9999
- `:accessToken:` - a long hashed string retrieved from email
- `:resetToken:` - a long hashed string retrieved from email
- `:newPassword:` - a string of your choice
- `:pin:` - a six digit pin obtained through authenticator app
