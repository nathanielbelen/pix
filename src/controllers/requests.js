const { createHttp1Request } = require('league-connect');

async function sendLoginRequest(account, credentials) {
  const accountPayload = {
    username: account.username,
    password: account.password,
    persistLogin: false,
  };
  return createHttp1Request({
    body: accountPayload,
    method: 'PUT',
    url: '/rso-auth/v1/session/credentials',
  }, credentials);
}

async function sendStatusRequest(status, credentials) {
  return createHttp1Request({
    body: {
      statusMessage: status,
    },
    method: 'PUT',
    url: '/lol-chat/v1/me/',
  }, credentials);
}

async function sendDodgeRequest(credentials) {
  return createHttp1Request({
    body: '',
    method: 'POST',
    url: '/lol-login/v1/session/invoke?destination=lcdsServiceProxy&method=call&args=[\"\",\"teambuilder-draft\",\"quitV2\",\"\"]',
  }, credentials);
}

module.exports = { sendLoginRequest, sendStatusRequest, sendDodgeRequest };
