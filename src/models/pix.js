const { authenticate, createHttp1Request } = require('league-connect');
const {
  error, bold, italic, accent, log,
} = require('../views/output');
const { sendDodgeRequest } = require('../controllers/requests');
const { delay } = require('../controllers/helpers');
const { rl } = require('../views/displayMenu');

class Pix {
  constructor() {
    this.leagueCredentials = undefined;
    this.riotCredentials = undefined;
    this.summoner = undefined;
    this.gameStatus = undefined;
    this.lookingForPop = undefined;
  }

  async findLeagueClient(options = {}) {
    try {
      log(italic('attempting to find league client'));
      this.leagueCredentials = await authenticate(options);
      log(bold('league client found!'), 1);
    } catch (err) {
      log(italic('league client not found'), 1);
    }
  }

  async findRiotClient(shouldAwait) {
    try {
      log(italic(`attempting to find riot client ${shouldAwait ? '(awaiting open)' : ''}`));
      this.riotCredentials = await authenticate({
        name: 'RiotClientUx',
        awaitConnection: shouldAwait,
        pollInterval: 2000,
      });
      log(bold('riot client found!'), 1);
    } catch (err) {
      log(italic('riot client not found'), 1);
    }
  }

  async getSummoner() {
    try {
      const res = await createHttp1Request({ method: 'GET', url: '/lol-summoner/v1/current-summoner' }, this.leagueCredentials);
      this.summoner = JSON.parse(res._raw);
      return this.summoner;
    } catch (err) {
      log(error('unable to get summoner'));
      console.log(err);
      throw err;
    }
  }

  async autoAcceptNextQueue() {
    let lookingForPop = true;
    log(italic('waiting for queue to pop...'));
    log(italic('hit enter to cancel'));

    const stopSearch = () => {
      log(italic('stopping search'), 1);
      lookingForPop = false;
    };

    const onLine = () => {
      stopSearch();
      rl.removeListener('line', onLine);
    };

    rl.on('line', onLine);

    while (lookingForPop) {
      const res = await createHttp1Request({
        method: 'GET',
        url: '/lol-lobby/v2/lobby/matchmaking/search-state',
      }, this.leagueCredentials);
      await delay(2500);
      const { searchState } = JSON.parse(res._raw.toString());
      if (searchState === 'Found') {
        lookingForPop = false;
        log(accent('queue popped, accepting!'));
        await delay(1000);
        await createHttp1Request({
          body: '',
          method: 'POST',
          url: '/lol-matchmaking/v1/ready-check/accept',
        }, this.leagueCredentials);
        stopSearch();
        rl.removeListener('line', onLine);
      }
    }
  }

  async dodgeChampSelect() {
    log(italic('trying to dodge champ select...'));
    try {
      await sendDodgeRequest(this.leagueCredentials);
    } catch (err) {
      log(error(err));
    }
  }
}

exports.Pix = Pix;
