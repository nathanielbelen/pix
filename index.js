const { rl, accountList, mainMenuList } = require('./src/views/displayMenu.js');
const { sendLoginRequest } = require('./src/controllers/requests.js');
const { spawnRiotPromise, killProcess } = require('./src/controllers/shell.js');
const { delay } = require('./src/controllers/helpers.js')
const { createHttp1Request } = require('league-connect');
const { error, warning, bold, italic, accent, log } = require('./src/views/output.js')
const Pix = require('./src/models/pix.js').Pix
const fs = require('fs');
const accounts = JSON.parse(fs.readFileSync('./src/data/accounts.json', { encoding: 'utf8' }));
const accountNames = Object.keys(accounts);

const client = new Pix();

async function init() {
  await client.findLeagueClient()
  if (!client.leagueCredentials) {
    await client.findRiotClient(false)
    if (!client.riotCredentials) {
      spawnRiotPromise('init spawn');
      await client.findRiotClient(true);
    }
    await AccountMenu();
  }
  await MainMenu()
}

function question(query) {
  return new Promise((resolve, reject) => {
    rl.question(query, answer => {
      resolve(answer);
    });
  });
}

async function AccountMenu(isChild) {
  accountList(accountNames);
  const answer = await question(italic('choose an option: '));
  if (answer.trim().toLowerCase() <= accountNames.length) {
    console.log(`Logging into ${accent(accountNames[answer - 1])}!`)
    await sendLoginRequest(accounts[accountNames[answer - 1]], client.riotCredentials)
    await client.findLeagueClient({
      awaitConnection: true,
      pollInterval: 5000,
    })
    if (!isChild) {
      await MainMenu();
    }
    return
  } else {
    console.log(error('invalid index, try again'))
    await AccountMenu();
  }
  return
}

async function MainMenu() {
  mainMenuList();
  const answer = await question('choose an option: ');
  switch (answer.trim().toLowerCase()) {
    case '1':
      await killProcess(client.leagueCredentials.pid)
      spawnRiotPromise()
      await client.findRiotClient(true);
      await AccountMenu(true);
      break;
    case '2':
      await client.autoAcceptNextQueue();
      break;
    case '3':
      await client.dodgeChampSelect();
      break;
    default:
      console.log('invalid option, please try again')
      break;
  }
  await MainMenu();
}

init();