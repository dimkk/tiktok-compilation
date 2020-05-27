const axios = require('axios');
const fs = require('fs');
const credentials = JSON.parse(fs.readFileSync(`${__dirname}/../credentials.json`, "utf8"));
require('dotenv').config({path: `${__dirname}/../.env`});

async function Auth () {
    try {
        let lastUpdated = credentials.last_login.$date.$numberLong;
        let currentTime = new Date().getTime();

        //if ((currentTime-lastUpdated) >= res.data.expires_in) {
            await axios({
                method: 'POST',
                url: 'https://oauth2.googleapis.com/token',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                params: {
                    'client_id': process.env.OAUTH2_CLIENT_ID,
                    'client_secret': process.env.OAUTH2_CLIENT_SECRET,
                    'refresh_token': credentials.refresh_token,
                    'grant_type': 'refresh_token',
                }
            })
            .then( res => {
                console.log(res);
                credentials.data = res.data;
                if (res.data.refresh_token) {
                    credentials.refresh_token = res.refresh_token;
                }
                fs.writeFileSync(`${process.cwd()}/credentials.json`,JSON.stringify(credentials));
            })
            .catch(console.error);
        //}
    }
    catch (error) {
      console.log(`Auth Error: ${error}`);
    }

}
module.exports = Auth;
