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

    async function empty () {
        await fse.emptyDir(`${process.cwd()}/video/tmp`);
        await fse.emptyDir(`${process.cwd()}/img/tmp`);
    }

    //let posts = await getVideo.trending(36); // Max of 36 before it get doubles? Get tiktok videos 40 for 10min video
    //let posts = await getVideo.music(60,'6788784989656926981');
    //let posts = await getVideo.hashtag(50,'writethelyrics');
    //let posts = await getVideo.user(46,'kyscottt');

    // ------- ASIAN GIRLS --------- //
    async function asianGirls () {
        try {
            await empty();
            const asianGirls = await fs.readFileSync(`${process.cwd()}/res/asianGirls.txt`,'utf8').split(',\r\n');
            console.log(asianGirls);
            let posts = await getVideo.multiUser(1,asianGirls);
            await compile.start(posts, {
                'color': 'pink',
                'days': 1,
                'likes': 0,
                'isLandscape': true
            });
            await thumbnail(posts);
            await upload('asianGirls');
        }
        catch (err) {
            console.log(err);
        }
    }

    // ------- ASIAN GUYS --------- //
    async function asianGuys () {
        try {
            await empty();
            const asianGuys = await fs.readFileSync(`${process.cwd()}/res/asianGuys.txt`,'utf8').split(',\r\n');
            console.log(asianGuys);
            let posts = await getVideo.multiUser(1,asianGuys);
            await compile.start(posts, {
                'color': 'blue',
                'days': 1,
                'likes': 0,
                'isLandscape': true
            });
            await thumbnail(posts);
            await upload('asianGuys');
        }
        catch (err) {
            console.log(err);
        }
    }

    // ------- JAPAN --------- //
    async function japan () {
        try {
            await empty();
            const japan = await fs.readFileSync(`${process.cwd()}/res/japan.txt`,'utf8').split(',\r\n');
            console.log(japan);
            let posts = await getVideo.multiUser(1,japan);
            await compile.start(posts, {
                'color': 'red',
                'days': 1,
                'likes': 0,
                'isLandscape': true
            });
            await thumbnail(posts);
            await upload('japan');
        }
        catch (err) {
            console.log(err);
        }
    }

    // ------- CHINA --------- //
    async function china () {
        try {
            await empty();
            const china = await fs.readFileSync(`${process.cwd()}/res/china.txt`,'utf8').split(',\r\n');
            console.log(china);
            let posts = await getVideo.multiUser(2,china);
            await compile.start(posts, {
                'color': 'red',
                'days': 1,
                'likes': 0,
                'isLandscape': true
            });
            await thumbnail(posts);
            await upload('china');
        }
        catch (err) {
            console.log(err);
        }
    }

    // ------- INFLUENCERS --------- //
    async function influencers () {
        try {
            await empty();
            const influencers = await fs.readFileSync(`${process.cwd()}/res/influencers.txt`,'utf8').split(',\r\n');
            console.log(influencers);
            let posts = await getVideo.multiUser(1,influencers);
            await compile.start(posts, {
                'color': 'black',
                'days': 1,
                'likes': 0,
                'isLandscape': true
            });
            await thumbnail(posts);
            await upload('influencers');
        }
        catch (err) {
            console.log(err);
        }
    }

    // ------- TRENDING --------- //
    async function trending () {
        try {
            await empty();
            let posts = await getVideo.trending(36); // ~36 before it get doubles. 40 for 10min video
            await compile.start(posts, {
                'color': 'black',
                'days': 99,
                'likes': 0,
                'isLandscape': true
            });
            await thumbnail(posts);
            await upload('trending');
        }
        catch (err) {
            console.log(err);
        }
    }

    // ------- CUSTOM --------- //
    async function custom () {
        try {
            await empty();
            // let posts = await getVideo.music(60,'6788784989656926981');
            // let posts = await getVideo.hashtag(50,'writethelyrics');
            // let posts = await getVideo.user(46,'kyscottt');
            await compile.start(posts, {
                'color': 'black',
                'days': 999,
                'likes': 0,
                'isLandscape': true
            });
            await thumbnail(posts);
            await upload('custom');
        }
        catch (err) {
            console.log(err);
        }
    }

    // await asianGirls();
    // await asianGuys();
    await japan();
    await china();
    // await influencers();
    // await trending();
    // await custom();

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

    // await compile.start(posts, {
    //   'color': 'pink',
    //   'days': 1,
    //   'likes': 0,
    //   'isLandscape': true
    // });
    // console.log(`App.js: Compile function passed`);

    // await thumbnail(posts);
    // console.log(`App.js: Thumbnail function passed`);

    // await upload('asianGirls'); // asianGirls, asianGuys, japan, china, influencers, trending
    // console.log(`App.js: Upload function complete`);