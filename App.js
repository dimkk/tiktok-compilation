const cron = require('node-cron');
require('dotenv').config();
const upload = require('./components/Upload');
const thumbnail = require('./components/Thumbnail');
const GetVideo = require('./components/GetVideo');
const Compile = require('./components/Compile');
const fs = require('fs');
const fse = require('fs-extra');
const getVideo = new GetVideo();
const compile = new Compile();

async function App () {
  try {

    await fse.emptyDir(`${process.cwd()}/video/tmp`);

    //let posts = await getVideo.trending(36); // Max of 36 before it get doubles? Get tiktok videos 40 for 10min video
    //let posts = await getVideo.music(3,'6798966683693370117'); // music
    //let posts = await getVideo.hashtag(50,'writethelyrics');
    //let posts = await getVideo.user(55,'zachking');

    //const usersArr = ['xjessicahsu','nanababbbyyy','minseonk1m','about_minjii'];
    //let posts = await getVideo.multiUser(2,usersArr);

    //console.log(`App.js console: ${JSON.stringify(posts)}`);


    let videoIds = [];
    posts.collector.sort((a,b) => parseFloat(b.diggCount) - parseFloat(a.diggCount));
    posts.collector.forEach(e => videoIds.push(`${e.id}.mp4`))
    fs.writeFileSync(`${process.cwd()}/video/tmp/videoIds.txt`, videoIds)
    console.log(`App.js console: VideoIds ${videoIds}`);

    console.log(videoIds);
    await compile.start(videoIds);
    console.log(`App.js: Compile function passed`);

    await thumbnail(posts);
    console.log(`App.js: Thumbnail function passed`);


    //await upload();
  }
  catch (err) {
    console.log(`App.js console: ${err}`);
  }

}

App();


// let jsonFile = require('./video/tmp/music_1586578873363.json');
// jsonFile.sort((a,b) => parseFloat(b.playCount) - parseFloat(a.playCount));
// console.log(JSON.stringify(jsonFile));
// fs.writeFileSync(`${process.cwd()}/video/tmp/output.json`, JSON.stringify(jsonFile));

/*  Requirements:
    Get Google OAuth2 Token on the fly

*/

// cron.schedule('0 6 * * *', () => { // run every day at 6am
//   console.log('test running');
// }, {
//   scheduled: false // not scheduled right now
// });

// let videoIds = fs.readFileSync(`${process.cwd()}/video/tmp/videoIds.txt`, 'utf8');
// videoIds = videoIds.split(',');