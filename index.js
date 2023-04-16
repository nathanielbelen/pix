// const { createHttp1Request } = require('league-connect');
// const { delay } = require('./src/controllers/helpers');
const fs = require('fs');
const { rl, accountList, mainMenuList } = require('./src/views/displayMenu');
const { sendLoginRequest } = require('./src/controllers/requests');
const { spawnRiotPromise, killProcess } = require('./src/controllers/shell');
const { error, italic, accent, question } = require('./src/views/output');
const { Pix } = require('./src/models/pix');

const accounts = JSON.parse(fs.readFileSync('./data/accounts.json', { encoding: 'utf8' }));
const accountNames = Object.keys(accounts);
const client = new Pix();

async function MainMenu() {
  mainMenuList();
  const answer = await question(rl, 'choose an option: ');
  switch (answer.trim().toLowerCase()) {
    case '1':
      await killProcess(client.leagueCredentials.pid);
      spawnRiotPromise();
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
      console.log('invalid option, please try again');
      break;
  }
  await MainMenu();
}

async function AccountMenu(isChild) {
  accountList(accountNames);
  const answer = await question(rl, italic('choose an option: '));
  if (answer.trim().toLowerCase() <= accountNames.length) {
    console.log(`Logging into ${accent(accountNames[answer - 1])}!`);
    await sendLoginRequest(accounts[accountNames[answer - 1]], client.riotCredentials);
    await client.findLeagueClient({
      awaitConnection: true,
      pollInterval: 5000,
    });
    if (!isChild) {
      await MainMenu();
    }
    return;
  }
  console.log(error('invalid index, try again'));
  await AccountMenu();
}

async function init() {
  console.clear();
  await client.findLeagueClient();
  if (!client.leagueCredentials) {
    await client.findRiotClient(false);
    if (!client.riotCredentials) {
      spawnRiotPromise();
      await client.findRiotClient(true);
    }
    await AccountMenu();
  }
  await MainMenu();
}

init();
