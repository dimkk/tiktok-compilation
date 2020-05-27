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
    await fse.emptyDir(`${process.cwd()}/img/tmp`);

    //let posts = await getVideo.trending(3); // Max of 36 before it get doubles? Get tiktok videos 40 for 10min video
    //let posts = await getVideo.music(60,'6788784989656926981'); // music
    //let posts = await getVideo.hashtag(50,'writethelyrics');
    //let posts = await getVideo.user(46,'kyscottt'); // https://www.tiktok.com/music/original-sound-6756167107873966854?source=h5_m

    // ------- ASIAN GUYS --------- //
    // const asianBoys = ['choega','bluepongtiwat','charlie_park'];
    // const asianGuys = await fs.readFileSync(`${process.cwd()}/res/asianGuys.txt`,'utf8').split(',\r\n');
    // console.log(asianGuys);
    // let posts = await getVideo.multiUser(1,asianGuys);

    // ------- ASIAN GIRLS --------- //
    //const asianGirls = ['nikaidou_yume','thesongtwins','cindy518c'];
    const asianGirls = await fs.readFileSync(`${process.cwd()}/res/asianGirls.txt`,'utf8').split(',\r\n');
    console.log(asianGirls);
    let posts = await getVideo.multiUser(2,asianGirls);

    // ------- INFLUENCERS --------- //
    // const influencers = await fs.readFileSync(`${process.cwd()}/res/influencers.txt`,'utf8').split(',\r\n');
    // console.log(influencers);
    // let posts = await getVideo.multiUser(1,influencers);

    // ------- JAPAN --------- //
    // const japan = await fs.readFileSync(`${process.cwd()}/res/japan.txt`,'utf8').split(',\r\n');
    // console.log(japan);
    // let posts = await getVideo.multiUser(2,japan);

    // ------- CHINA --------- //
    // const china = await fs.readFileSync(`${process.cwd()}/res/china.txt`,'utf8').split(',\r\n');
    // console.log(china);
    // let posts = await getVideo.multiUser(2,china);

    await compile.start(posts, {
      'color': 'pink',
      'days': 2,
      'likes': 0,
      'isLandscape': true
    });
    console.log(`App.js: Compile function passed`);

    await thumbnail(posts);
    console.log(`App.js: Thumbnail function passed`);

    await upload('asianGirls'); // asianGirls, asianGuys, japan, china, celebs, trending
    console.log(`App.js: Upload function complete`);

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


/*
Loop

for i in {1..240}; do printf "file '%s'\n" 0.mp4 >> list.txt; done
ffmpeg -f concat -i list.txt -c copy loop.mp4

*/