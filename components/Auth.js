const {OAuth2Client} = require('google-auth-library');
const http = require('http');
const url = require('url');
const open = require('open');
const destroyer = require('server-destroy');
const keys = require('../.google-oauth2-credentials.json');
require('dotenv').config({path: `${__dirname}/../.env`});

function Auth () {
// Goal: Get new Google access token
// https://www.npmjs.com/package/google-auth-library

  this.main = async () => {
    try {
      const oAuth2Client = await this.getAuthenticatedClient();
      const url = 'https://people.googleapis.com/v1/people/me?personFields=names';
      const res = await oAuth2Client.request({url});
      console.log(res.data);

      const tokenInfo = await oAuth2Client.getTokenInfo(
        oAuth2Client.credentials.access_token
      );
      console.log(tokenInfo);
    }
    catch (error) {
      console.log(`Main Error: ${error}`);
    }

  }


  this.getAuthenticatedClient = async () => {
    return new Promise((resolve, reject) => {
      const oAuth2Client = new OAuth2Client(
        process.env.OAUTH2_CLIENT_ID,
        process.env.OAUTH2_CLIENT_SECRET,
        'http://localhost:8488'
      );

  const authorizeUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: 'https://www.googleapis.com/auth/youtube',
  });

  console.log(authorizeUrl);

  const server = http
    .createServer(async (req, res) => {
      try {
        if (req.url.indexOf('/oauth2callback') > -1) {
          // acquire the code from the querystring, and close the web server.
          const qs = new url.URL(req.url, 'http://localhost:8488').searchParams;
          const code = qs.get('code');
          console.log(`Code is ${code}`);
          res.end('Authentication successful! Please return to the console.');
          server.destroy();

          // Now that we have the code, use that to acquire tokens.
          const r = await oAuth2Client.getToken(code);
          // Make sure to set the credentials on the OAuth2 client.
          oAuth2Client.setCredentials(r.tokens);
          console.info('Tokens acquired.');
          resolve(oAuth2Client);
        }
      } catch (e) {
        reject(e);
      }
    })
    .listen(3000, () => {
      // open the browser to the authorize url to start the workflow
      open(authorizeUrl, {wait: false}).then(cp => cp.unref());
    });
    destroyer(server);
    });
  }

  this.getToken = async () => {
    const client = await auth.getClient();
    client.on('tokens', (tokens) => {
      if (tokens.refresh_token) {
        // store the refresh_token in my database!
        console.log(tokens.refresh_token);
      }
      console.log(tokens.access_token);
    });
  }


}
module.exports = Auth;

const auth = new Auth();
auth.main();