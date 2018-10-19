## data dir

##### description
This directory is where the scripts will save the responses from your API calls.

The names of the files that will be saved here correspond to the scripts that made them.

There is also a bash script in the root directory of this repos, named `./.data_purge.bash`,
that will remove all the saved files from this directory.


##### a note on data formats
Most of the data that will be saved here will be JSON files. If they are simple enough, they may only save
the status of the response, like so: `200`. If it's a more complex API call, it may save the response header as well as the data (this is often the case if some kind of authorization token is being exchanged).
