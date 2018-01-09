var conf = require('../config.json');
var minimist = require('minimist');

var knownOptions = {
  string: 'env',
  default: {env: 'local'}
};
var options = minimist(process.argv.slice(2), knownOptions);
var optionsReturn = {};
optionsReturn.env = options.env;
optionsReturn.src = conf.base.compile + '/**/*';
optionsReturn.host = '';
optionsReturn.dest = '';
optionsReturn.apiUrl = '';

module.exports = optionsReturn;
