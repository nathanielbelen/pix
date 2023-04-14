const readline = require('readline');
const { error, warning, bold, italic, accent, log } = require('../views/output.js')

function accountList(names) {
  log(warning(bold('which account would you like to log into?')));
  names.forEach((account, idx) => {
    log(`${idx + 1} - ${accent(account)}`, 1)
  })
}

function mainMenuList() {
  log(warning(bold('what would you like to do?')))
  log(`1 - ${accent('switch accounts')}`, 1)
  log(`2 - ${accent('accept next queue')}`, 1)
  log(`3 - ${accent('dodge current champ select')}`, 1)
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

exports.rl = rl;
exports.accountList = accountList;
exports.mainMenuList = mainMenuList;