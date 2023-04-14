const chalk = require('chalk')

const error = chalk.bold.red;
const warning = chalk.hex('#FFAE42');
const bold = chalk.bold;
const italic = chalk.italic;
const accent = chalk.blueBright;

function log(string, level = 0) {
  const prefix = '»';
  console.log(prefix.repeat(level) + (level > 0 ? ' ' : '') + string);
  return
}

module.exports.error = error;
module.exports.warning = warning
module.exports.bold = bold;
module.exports.italic = italic;
module.exports.accent = accent;
module.exports.log = log;