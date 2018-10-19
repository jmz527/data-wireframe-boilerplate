## error_logs dir

##### setup
Create a JSON file in this repo named `error_log.json`, and inside that file save this code:

```
{
    "log": []
}
```

##### description
This directory is where the scripts will save errors if and when they do occur.

All errors will be added to the beginning of the `log` within the `error_log.json` file. Each error will include a timestamp, the error message, the method used (get, post, patch, etc.), the endpoint it hit (`/auth/sign-in`), and the config of axios (our http client) at the time.


##### a note on data formats
Most of the data that will be saved here will be JSON files. If they are simple enough, they may only save
the status of the response, like so: `200`. If it's a more complex API call, it may save the response header as well as the data (this is often the case if some kind of authorization token is being exchanged).

There is one script that does not create a JSON file, nor does it call an API. That is the `gen_qr_img.js` script. Instead, this script takes a base64 hash from the `auth_two_factor_get` and uses a converter to turn it into a png image.

