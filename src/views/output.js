const chalk = require('chalk');

const error = chalk.bold.red;
const warning = chalk.hex('#FFAE42');
const { bold } = chalk;
const { italic } = chalk;
const accent = chalk.blueBright;

function log(string, level = 0) {
  const prefix = '»';
  console.log(prefix.repeat(level) + (level > 0 ? ' ' : '') + string);
}

function question(readLineInterface, query) {
  return new Promise((resolve) => {
    readLineInterface.question(query, (answer) => {
      resolve(answer);
    });
  });
}

module.exports = {
  error, warning, bold, italic, accent, log, question,
};
