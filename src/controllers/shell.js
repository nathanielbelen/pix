const { exec } = require('child_process');
const { error, warning, italic, log } = require('../views/output');

function spawnRiotPromise() {
  log(warning(italic('starting a riot client...')));
  const command = '"C:\\Riot Games\\Riot Client\\RiotClientServices.exe" --launch-product=league_of_legends --launch-patchline=live';

  return new Promise((resolve, reject) => {
    exec(command, (err) => {
      if (err) reject(err);
      resolve();
    });
  });
}

function killProcess(pid) {
  return new Promise((resolve) => {
    exec(`taskkill /pid ${pid} /T /F`, (err) => {
      if (err) {
        console.error(error(`Error occurred while trying to kill process: ${err}`));
        return;
      }
      console.log('league process terminated');
      resolve();
    });
  });
}

module.exports = { spawnRiotPromise, killProcess };
