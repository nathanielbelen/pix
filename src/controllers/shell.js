const { exec } = require('child_process');
const { error, warning, bold, italic, accent, log } = require('../views/output.js')

function spawnRiotPromise() {
  log(warning(italic('starting a riot client...')))
  const command = `"C:\\Riot Games\\Riot Client\\RiotClientServices.exe" --launch-product=league_of_legends --launch-patchline=live`;

  return new Promise((resolve, reject) => {
    exec(command, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}


function killProcess(pid) {
  return new Promise((resolve) => {
    exec(`taskkill /pid ${pid} /T /F`, (err, stdout, stderr) => {
      if (err) {
        console.error(error(`Error occurred while trying to kill process: ${err}`));
        return;
      }
      console.log(`league process terminated`)
      resolve()
    })
  });
}

module.exports.spawnRiotPromise = spawnRiotPromise;
module.exports.killProcess = killProcess;