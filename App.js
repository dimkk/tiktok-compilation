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
        fse.emptyDirSync(`${process.cwd()}/video/tmp`);
        fse.emptyDirSync(`${process.cwd()}/img/tmp`);
    }

    //let posts = await getVideo.trending(36); // Max of 36 before it get doubles? Get tiktok videos 40 for 10min video
    //let posts = await getVideo.music(60,'6788784989656926981');
    //let posts = await getVideo.hashtag(50,'writethelyrics');
    //let posts = await getVideo.user(46,'kyscottt');

    // ------- ASIAN GIRLS --------- //
    async function asianGirls () {
        try {
            await empty();
            const asianGirls = fs.readFileSync(`${process.cwd()}/res/asianGirls.txt`,'utf8').split(',\r\n');
            console.log(asianGirls);
            let posts = await getVideo.multiUser(1,asianGirls);
            await compile.start(posts, {
                'color': 'pink',
                'days': 2,
                'likes': 0,
                'isLandscape': true,
                'exBlockedSongs': true,
                'exPartlyBlockedSongs': true,
                'exUnmonetizableSongs': true,
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
            const asianGuys = fs.readFileSync(`${process.cwd()}/res/asianGuys.txt`,'utf8').split(',\r\n');
            console.log(asianGuys);
            let posts = await getVideo.multiUser(1,asianGuys);
            await compile.start(posts, {
                'color': 'blue',
                'days': 1,
                'likes': 0,
                'isLandscape': true,
                'exBlockedSongs': true,
                'exPartlyBlockedSongs': true,
                'exUnmonetizableSongs': true,
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
            const japan = fs.readFileSync(`${process.cwd()}/res/japan.txt`,'utf8').split(',\r\n');
            console.log(japan);
            let posts = await getVideo.multiUser(1,japan);
            await compile.start(posts, {
                'color': 'red',
                'days': 2,
                'likes': 0,
                'isLandscape': true,
                'exBlockedSongs': true,
                'exPartlyBlockedSongs': true,
                'exUnmonetizableSongs': true,
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
            const china = fs.readFileSync(`${process.cwd()}/res/china.txt`,'utf8').split(',\r\n');
            console.log(china);
            let posts = await getVideo.multiUser(1,china);
            // await compile.start(posts, {
            //     'color': 'red',
            //     'days': 2,
            //     'likes': 0,
            //     'isLandscape': true,
            //     'exBlockedSongs': true,
            //     'exPartlyBlockedSongs': true,
            //     'exUnmonetizableSongs': true,
            // });
            // await thumbnail(posts);
            // await upload('china');
        }
        catch (err) {
            console.log(err);
        }
    }

    // ------- KOREA --------- //
    async function korea () {
        try {
            await empty();
            const korea = fs.readFileSync(`${process.cwd()}/res/korea.txt`,'utf8').split(',\r\n');
            console.log(korea);
            let posts = await getVideo.multiUser(1,korea);
            await compile.start(posts, {
                'color': 'red',
                'days': 99,
                'likes': 0,
                'isLandscape': true,
                'exBlockedSongs': true,
                'exPartlyBlockedSongs': true,
                'exUnmonetizableSongs': true,
            });
            await thumbnail(posts);
            //await upload('korea');
        }
        catch (err) {
            console.log(err);
        }
    }

    // ------- INFLUENCERS --------- //
    async function influencers () {
        try {
            await empty();
            const influencers = fs.readFileSync(`${process.cwd()}/res/influencers.txt`,'utf8').split(',\r\n');
            console.log(influencers);
            let posts = await getVideo.multiUser(1,influencers);
            await compile.start(posts, {
                'color': 'black',
                'days': 1,
                'likes': 0,
                'isLandscape': true,
                'exBlockedSongs': true,
                'exPartlyBlockedSongs': true,
                'exUnmonetizableSongs': true,
            });
            await thumbnail(posts);
            await upload('influencers');
        }
        catch (err) {
            console.log(err);
        }
    }

    // ------- THAILAND --------- //
    async function thailand () {
        try {
            await empty();
            const thailand = fs.readFileSync(`${process.cwd()}/res/thailand.txt`,'utf8').split(',\r\n');
            console.log(thailand);
            let posts = await getVideo.multiUser(1,thailand);
            await compile.start(posts, {
                'color': 'black',
                'days': 99,
                'likes': 0,
                'isLandscape': true,
                'maxLength': 999,
                'exBlockedSongs': false,
                'exPartlyBlockedSongs': false,
                'exUnmonetizableSongs': false,
            });
            //await thumbnail(posts);
            //await upload('influencers');
        }
        catch (err) {
            console.log(err);
        }
    }

    // ------- TRENDING --------- //
    async function trending () {
        try {
            await empty();
            let posts = await getVideo.trending(60); // ~36 before it get doubles. 40 for 10min video
            await compile.start(posts, {
                'color': 'black',
                'days': 99,
                'likes': 0,
                'isLandscape': true,
                'exBlockedSongs': true,
                'exPartlyBlockedSongs': true,
                'exUnmonetizableSongs': true,
            });
            await thumbnail(posts);
            //await upload('trending');
        }
        catch (err) {
            console.log(err);
        }
    }

    // ------- HASHTAGS --------- //
    async function multiHashtag () {
        try {
            await empty();
            const hashtag = fs.readFileSync(`${process.cwd()}/res/hashtag.txt`,'utf8').split(',\r\n');
            console.log(hashtag);
            let posts = await getVideo.multiHashtag(21,hashtag);
            await compile.start(posts, {
                'color': 'black',
                'days': 3,
                'likes': 0,
                'isLandscape': true,
                'exBlockedSongs': true,
                'exPartlyBlockedSongs': true,
                'exUnmonetizableSongs': true,
            });
            await thumbnail(posts);
            await upload('custom');
        }
        catch (err) {
            console.log(err);
        }
    }

    // ------- MUSIC --------- //
    async function music () {
        try {
            await empty();
            let posts = await getVideo.music(120,'6831722183610419974'); // multiple of 3
            await compile.start(posts, {
                'color': 'black',
                'days': 999,
                'likes': 0,
                'isLandscape': true,
                'hStack': true,
                'exBlockedSongs': true,
                'exPartlyBlockedSongs': false,
                'exUnmonetizableSongs': false,
            });
            await thumbnail(posts);
            await upload('music');
        }
        catch (err) {
            console.log(err);
        }
    }

    // ------- USER --------- //
    async function user () {
        try {
            await empty();
            let posts = await getVideo.user(3,'abg_eboy');
            await compile.start(posts, {
                'color': 'black',
                'days': 99,
                'likes': 0,
                'isLandscape': true,
                'maxLength': 7,
                'exBlockedSongs': false, // to be changed to true
                'exPartlyBlockedSongs': false, // to be changed to true
                'exUnmonetizableSongs': false, // to be changed to true
            });
            //await thumbnail(posts);
            //await upload('custom');
        }
        catch (err) {
            console.log(err);
        }
    }

    // ------- CUSTOM --------- //
    async function custom () {
        try {
            await empty();
            // let posts = await getVideo.music(90,'6791404477405596421');
            // let posts = await getVideo.hashtag(50,'writethelyrics');
            let posts = await getVideo.user(3,'brookemonk_');
            await compile.start(posts, {
                'color': 'black',
                'days': 999,
                'likes': 0,
                'isLandscape': true,
                'exBlockedSongs': true,
                'exPartlyBlockedSongs': false,
                'exUnmonetizableSongs': false,
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
    // await japan();
    // await china();
    // await korea();
     await thailand();
    // await influencers();
    // await trending();
    // await music();
    // await user();
    // await multiHashtag();
    // await custom();

  }
  catch (err) {
    console.log(`App.js console: ${err}`);
  }

}

App();


/*  Future Changes Roadmap:
    Replace youtube-upload-api with googleapis
    Automate on firebase to run daily

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