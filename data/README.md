## data dir

##### description
This directory is where the scripts will save the responses from your API calls.

The names of the files that will be saved here correspond to the scripts that made them.

There is also a bash script in the root directory of this repos, named `./.data_purge.bash`,
that will remove all the saved files from this directory.


##### a note on data formats
Most of the data that will be saved here will be JSON files. If they are simple enough, they may only save
the status of the response, like so: `200`. If it's a more complex API call, it may save the response header as well as the data (this is often the case if some kind of authorization token is being exchanged).

There is one script that does not create a JSON file, nor does it call an API. That is the `gen_qr_img.js` script. Instead, this script takes a base64 hash from the `auth_two_factor_get` and uses a converter to turn it into a png image.

