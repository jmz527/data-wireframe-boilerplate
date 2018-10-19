## data wireframe boilerplate
A library of scripts designed to call & retrieve data from our an API

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

TODO: Add scripts here

Each script will create a file within the `/data ` dir, read more about these files [here](./data/README.md).

### interactive script
There is also an interactive script, executed by calling the index.js file, like so:

- `node index.js :idx:`

Executing this index script will run through all the other scripts, in a sequential order.

### legend for explaining the parameters
- `:idx:` - a positive integer between 0 - 9999
