const cron = require('node-cron');
require('dotenv').config();
const upload = require('./components/Upload');
const thumbnail = require('./components/Thumbnail');
const GetVideo = require('./components/GetVideo');
const Compile = require('./components/Compile');
const fs = require('fs');
const getVideo = new GetVideo();
const compile = new Compile();

async function App () {
  try {

    let videoIds = [];

    //let posts = await getVideo.trending(50); // Get tiktok videos 40 for 10min video
    let posts = await getVideo.music(45,'6793334360058628870'); // music
    //let posts = await getVideo.hastag(50,'writethelyrics');
    console.log(`App.js console: ${posts}`);

    posts.collector.forEach(e => videoIds.push(`${e.id}.mp4`))
    fs.writeFileSync(`${process.cwd()}/video/tmp/videoIds.txt`, videoIds)
    console.log(`App.js console: VideoIds ${videoIds}`);

    await compile.start(videoIds);
    console.log(`App.js: Compile function passed`);

    await thumbnail();
    console.log(`App.js: Thumbnail function passed`);

    await upload();
    console.log(`App.js: Video uploaded`);
  }
  catch (err) {
    console.log(`App.js console: ${err}`);
  }

}

App();

/*  Requirements:
    Get Google OAuth2 Token on the fly

*/

// cron.schedule('0 6 * * *', () => { // run every day at 6am
//   console.log('test running');
// }, {
//   scheduled: false // not scheduled right now
// });

//videoIds = fs.readFileSync(`${process.cwd()}/video/tmp/videoIds.txt`, 'utf8');
// videoIds = videoIds.split(',');