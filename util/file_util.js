// Main Imports
const fs = require('fs')
const path = require('path')
const { spawn } = require('child_process');
const rl = require('readline');
const beautify_html = require('js-beautify').html // https://kangax.github.io/html-minifier/
const minify = require('html-minifier').minify // https://github.com/kangax/html-minifier

var configDefs = {
  beautConfig: require('../config/beautify_config_defaults.json'),
  miniConfig: require('../config/minify_config_defaults.json')
}

class FileUtil {
  constructor(bConfig, mConfig, showLogs = true) {
    this.bConfig = bConfig || configDefs.beautConfig;
    this.mConfig = mConfig || configDefs.miniConfig;
    this.showLogs = showLogs;
  }
  logThis(color = '', text) {;
    if (this.showLogs) {
      console.log(`\x1b[0m${color}`, text);
    }
  }
  logError(err, method, endpoint, axiosDefaults) {
    this.logThis(`\x1b[31m%s\x1b[0m`, `${err.message}`);

    let errorObj = {
      timestamp: new Date(),
      message: err.message,
      method: method,
      endpointHit: endpoint,
      axiosDefaultConfig: axiosDefaults
    };

    this.logThis(`\x1b[31m\x1b[2m%s\x1b[0m`, `This is an error from the server. Saving the request details to the error log`);
    // this.logThis(`\x1b[31m\x1b[2m%s\x1b[0m`, `Here is a print out of those details: \n`);
    // this.logThis(`\x1b[31m\x1b[2m%s\x1b[0m`, errorObj);

    this.readJSON('../error_logs/error_log.json', (json) => {
      json.log.unshift(errorObj);
      this.saveJSON('../error_logs/error_log.json', json);
    });
  }
  beautifyHTML(data) {
    return beautify_html(data, this.bConfig)
  }
  minifyHTML(data) {
    return minify(data, this.mConfig)
  }
  beautifySave(filePath) {
    this.checkExistsRun(filePath, null, (filePath, data) => {
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) throw err
        this.saveFile(filePath, beautifyHTML(data));
        this.logThis(`\x1b[36m%s\x1b[0m`, `HTML file successfully beautified!`);
      })
    })
  }
  minifySave(filePath) {
    this.checkExistsRun(filePath, null, (filePath, data) => {
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) throw err
        this.saveFile(filePath, minifyHTML(data));
        this.logThis(`\x1b[36m%s\x1b[0m`, `HTML file successfully minified!`);
      })
    })
  }
  checkExistsRun(filePath, data, callback) {
    if (fs.existsSync(filePath)) {
      callback(filePath, data)
    } else {
      throw Error('File not found');
    }
  }
  checkNotExistsRun(filePath, data, callback) {
    if (!fs.existsSync(filePath)) {
      this.logThis(`\x1b[2m`, `${filePath} file not found`);
      callback(filePath, data)
    } else {
      throw Error('File already exists');
    }
  }
  saveFile(filePath, data, logColor = `\x1b[36m\x1b[2m%s\x1b[0m`) {
    fs.writeFile(filePath, data, (err) => {
      this.logThis(logColor, `File successfully written! Check your project directory for the ${filePath} file`);
    })
  }
  saveJSON(filePath, json, logColor = `\x1b[35m\x1b[2m%s\x1b[0m`) {
    this.saveFile(filePath, JSON.stringify(json, null, 4), logColor);
  }
  readJSON(filePath, callback) {
    this.checkExistsRun(filePath, null, (filePath, json) => {
      fs.readFile(filePath, 'utf8', (err, new_json) => { callback(JSON.parse(new_json)) })
    });
  }
  prompt(question) {
    return new Promise((resolve) => {
      let r = rl.createInterface({ input: process.stdin, output: process.stdout });

      r.question(`\x1b[32m${question}\x1b[0m\n`, (input) => {
        r.close();
        resolve(input);
      });
    });
  }
  runScript(file_name, args = []) {
    return new Promise((resolve, reject) => {
      let nodeScript = spawn('node', [`./${file_name}.js`, ...args]);
          nodeScript.stdout.on('data', (data) => {
            this.logThis(`\x1b[2m`, `~ ${data}`);
          });
          nodeScript.stderr.on('data', (error) => {
            reject(error);
          });
          nodeScript.on('close', (code) => {
            this.logThis(`\x1b[2m`, `~ child process exited with code ${code} \n`);
            resolve();
          });
    });
  }
}

module.exports = new FileUtil();
