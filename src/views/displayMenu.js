const readline = require('readline');
const {
  warning, bold, accent, log,
} = require('./output');

function accountList(names) {
  log(warning(bold('which account would you like to log into?')));
  names.forEach((account, idx) => {
    log(`${idx + 1} - ${accent(account)}`, 1);
  });
}

function mainMenuList() {
  log(warning(bold('what would you like to do?')));
  log(`1 - ${accent('switch accounts')}`, 1);
  log(`2 - ${accent('accept next queue')}`, 1);
  log(`3 - ${accent('dodge current champ select')}`, 1);
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

module.exports = { rl, accountList, mainMenuList };
