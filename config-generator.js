
const fs = require('fs');
const path = require('path');
const _ = require('lodash');


//Edit me to add configs! I should be run as part of CI.
const configTemplate = {
  mongoUrl: process.env.MONGO_URL || 'localhost:27017',
  mongoNamespace: process.env.MONGO_NAMESPACE || 'wob',
  port: process.env.APP_PORT || 8080,
  salt: process.env.APP_SECRET || '1234567890'
};

let currentConfig = {};
try {
  currentConfig = require('./config');
}
catch(x) {}

if(currentConfig)
  _.forEach(Object.keys(configTemplate), key => currentConfig[key] = currentConfig[key] || configTemplate[key]);

fs.writeFileSync(path.resolve('./config.json'), JSON.stringify(currentConfig, null, 2), { encoding: 'UTF8' });
