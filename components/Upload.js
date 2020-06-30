const Youtube = require("youtube-video-api");
require("dotenv").config({ path:`${__dirname}/../.env`});
const fs = require("fs");
const dedent = require("dedent");
const auth = require('./Auth');

const day = new Date().getDate();
const month = new Date().toLocaleString("default", { month: "long" }); // gets full month name capitalized
const year = new Date().getFullYear();

const videoInfo = {
    "asianGirls": {
        "title": `👩🏻 Asian American Girls Tik Tok - ${month} ${day+1}, ${year}`,
        "description": dedent`
            A compilation of Tiktoks from Asian Girls.
            Thanks for watching!

            Subscribe below & I'll see you again tomorrow Kings & Queens!
            👉https://youtube.com/channel/UCbJhs7xvYA4Js7oobhyP42Q?sub_confirmation=1

            -----
            #tiktok
            `,
        "tags": ['tik tok girl dance', 'tik tok abgs', 'tik tok asian beautiful girl', 'tiktok william'],
    },
    "asianGuys": {
        "title": `🤵🏻‍ Asian American Guys Tik Tok - ${month} ${day+1}, ${year}`,
        "description": dedent`
            A compilation of Tiktok videos from Asian Guys.
            Thanks for watching!

            Subscribe below & I'll see you again tomorrow Kings & Queens!
            👉https://youtube.com/channel/UCbJhs7xvYA4Js7oobhyP42Q?sub_confirmation=1

            -----
            #tiktok #tiktokwilliam #asianguys`,
        "tags": ['asian guys tik tok', 'tik tok asian guys', 'tik tok asian boy', 'tik tok cute guys', 'cute asian guys tik tok', 'tiktok william'],
    },
    "japan": {
        "title": `🇯🇵 TikTok Japan | 日本のティックトック - ${month} ${day+1}, ${year}`,
        "description": dedent`
            A compilation of Tiktoks from Japanese Tiktokers.
            Thanks for watching!

            Subscribe below & I'll see you again tomorrow Kings & Queens!
            👉https://youtube.com/channel/UCbJhs7xvYA4Js7oobhyP42Q?sub_confirmation=1

            -----
            #tiktok日本 #ティックトック #tiktokjapan #tiktokwilliam`,
        "tags": ['tiktok japan', 'ティックトック', 'TikTok 日本', 'tiktok william'],
    },
    "china": {
        "title": `🐉 抖音 (Douyin) - ${month} ${day+1}, ${year}`,
        "description": dedent`
            A mashup of funny tiktoks from Douyin(抖音) / Tiktok China.
            Thanks for watching!

            Subscribe below & I'll see you again tomorrow Kings & Queens!
            👉https://youtube.com/channel/UCbJhs7xvYA4Js7oobhyP42Q?sub_confirmation=1

            -----
            #抖音 #douyin #tiktokwilliam`,
        "tags": ['抖音', 'douyin', 'tiktok china', 'tiktok william', 'william tiktok'],
    },
    "korea": {
        "title": `🇰🇷 TikTok Korea - ${month} ${day+1}, ${year}`,
        "description": dedent`
            A compilation of tiktoks from Korean Tiktokers.
            Thanks for watching!

            Subscribe below & I'll see you again tomorrow Kings & Queens!
            👉https://youtube.com/channel/UCbJhs7xvYA4Js7oobhyP42Q?sub_confirmation=1

            -----
            #tiktokkorea`,
        "tags": ['tik tok korea', 'tik tok korean', 'tik tok korean compilation', 'tik tok korean girls', 'tik tok korean boys', 'tiktok william'],
    },
    "memes": {
        "title": ` Tiktok Memes - ${month} ${day+1}, ${year}`,
        "description": dedent`
            A compilation of the funniest Tiktok memes.
            Thanks for watching!

            Subscribe & I'll see you again tomorrow Kings & Queens!
            👉https://youtube.com/channel/UCbJhs7xvYA4Js7oobhyP42Q?sub_confirmation=1

            -----
            #tiktokmemes`,
        "tags": ['tiktok', 'tik tok', 'tiktokmemes', 'funny tiktok', 'tik tok memes', 'funny tik tok videos', 'wifi plug tiktok', 'Succculent', 'fakememe', 'cringe', 'ironic tik tok trolls', 'visicks', 'galaxy tiktok', 'papa cringe', 'tiktok queen', 'monstro', 'verified tiktok channel'],
    },
    "influencers": {
        "title":`😀 Tik Tok Celebs & Influencers - ${month} ${day+1}, ${year}`,
        "description": dedent`
            A mashup of the latest tiktoks from:
            1) Charli D'Amelio
            2) Ondreaz Lopez
            3) Tony Lopez
            4) The Hype House
            5) Josh Richards and much more!

            Thanks for watching!

            Subscribe & I'll see you again tomorrow Kings & Queens!
            👉https://youtube.com/channel/UCbJhs7xvYA4Js7oobhyP42Q?sub_confirmation=1

            -----
            #tiktok #tiktokwilliam`,
        "tags": ['funny tik tok videos', 'tik tok', 'tiktok memes','tik tok memes','tik toks','tiktok','Tik Tok Compilation','memes','tiktok cringe','funny tik tok memes','tik tok 2020','ironic tik toks','cringey tik toks','meme compilation','funny','fakememe','funny tik tok compilation','tiktoks','tik tok musically','wifi plug tiktok','ironic tik tok','musically','ironic tik tok trolls','Succculent','wifi plug','memes compilation','musical.ly'],
    },
    "trending": {
        "title": `TikToks So Funny I Forgot To Laugh`,
        "description": dedent`
            A mashup of the most recent trending tiktoks.
            Thanks for watching!

            Subscribe & I'll see you again tomorrow Kings & Queens!
            👉https://youtube.com/channel/UCbJhs7xvYA4Js7oobhyP42Q?sub_confirmation=1

            -----
            #tiktok #tiktokmashups #tiktokwilliam`,
        "tags": ['tiktok', 'tik tok', 'tiktok mashup', 'tik tok mashup', 'tiktok mashups', 'tik tok mashups', 'tik tok challenge', 'tiktok william'],
    },
    "music": {
        "title": `👇 Marshmellow Down Tiktok`,
        "description": dedent`
            A compilation of photo collages by Tiktokers to the song Down by Marshmello.

            Song Link (1 hour): https://www.youtube.com/watch?v=85yPfwMzt38

            Thanks for watching!

            Subscribe & I'll see you again tomorrow Kings & Queens!
            👉https://youtube.com/channel/UCbJhs7xvYA4Js7oobhyP42Q?sub_confirmation=1

            -----
            #tiktok #marshmello #down`,
        "tags": [`marshmello down tik tok`, `marshmello down tiktok`, 'tik tok marshmello down', 'tik tok korea', 'tiktok japan', 'tik tok marshmello song', 'tik tok korea marshmello'],
    },
    "user": {
        "title": `😉 Tiktok Brooke Monk`,
        "description": dedent`
            A compilation of Tiktoks by Brooke Monk @brookemonk_ on tiktok.

            Thanks for watching!

            Subscribe & I'll see you again tomorrow Kings & Queens!
            👉 https://youtube.com/channel/UCbJhs7xvYA4Js7oobhyP42Q?sub_confirmation=1
            -----
            #tiktok #brookemonk #tiktokwilliam`,
        "tags": ['tiktok', 'tik tok', 'tiktok william', 'tiktok brooke monk', 'tiktok brooke monk', 'brooke monk tiktok', 'brooke monk tik tok'],
    },
    "custom": {
        "title": `😉 Tiktok Brooke Monk`,
        "description": dedent`
            This video is a compilation of Tiktoks by Brooke Monk @brookemonk_
            Thanks for watching!

            Subscribe & I'll see you again tomorrow Kings & Queens!
            👉 https://youtube.com/channel/UCbJhs7xvYA4Js7oobhyP42Q?sub_confirmation=1
            -----
            #tiktok #brookemonk #tiktokwilliam`,
        "tags": ['tiktok', 'tik tok', 'tiktok william', 'tiktok brooke monk', 'tiktok brooke monk', 'brooke monk tiktok', 'brooke monk tik tok'],
    },
    "comment": dedent`
    Did you enjoy today's video? 👏
    👉 Subscribe and I'll see you again tomorrow kings and queens! 💖😉`,
    "emojis": "🤵‍♂️🎥🕺💃🔥💖👁️👄👁️😉😳🥺😗🤪🤫💥👏😎👲👩🎎🏋️👉🐕"
}

async function Upload(type) {
  try {
    await auth();
    const credentials = require(`${__dirname}/../credentials.json`);
    console.log('Starting upload....');

    const youtube = Youtube({
      saveTokens: false,
      video: { part: "status, snippet" },
      //email: process.env.GOOGLE_LOGIN_EMAIL,
      //password: process.env.GOOGLE_LOGIN_PASSWORD,
      //clientId: process.env.OAUTH2_CLIENT_ID,
      //clientSecret: process.env.OAUTH2_CLIENT_SECRET,
      tokens: {
        access_token: credentials.data.access_token,
        refresh_token: credentials.data.refresh_token,
      },
      useAccount: process.env.GOOGLE_ACCOUNT_EMAIL_WILLIAM,
      file: `${__dirname}/../credentials.json`,
      scope: 'https://www.googleapis.com/auth/youtube.upload'
    });

    var params = {
      resource: {
        snippet: {
          title: videoInfo[type]['title'],
          description: videoInfo[type]['description'],
          tags: videoInfo[type]['tags'],
          keywords: videoInfo[type]['tags'],
          defaultLanguage: "en_US",
          category: '24' // 10-Music, 34-Comedy, 24-Entertainment
        },
        status: {
          privacyStatus: "public", // public, private, unlisted
          selfDeclaredMadeForKids: false, // https://developers.google.com/youtube/v3/docs/videos/insert
        },
      },
    };

    youtube.authenticate(
      process.env.OAUTH2_CLIENT_ID,
      process.env.OAUTH2_CLIENT_SECRET,
      async function (err, tokens) {
        if (err) return console.error("Cannot authenticate:", err);
        console.log(`Authenticated. Tokens: ${JSON.stringify(tokens)}`);
        await uploadVideo();
      }
    );

    async function uploadVideo() {
      await new Promise(async (resolve, reject) => {
        await youtube.upload(`${process.cwd()}/video/output.mp4`, params, async (err, video) => {
            if (err) return console.error("Cannot upload video:", err);
            let videoId = video.id;
            console.log(`Video is uploading with ID: ${video.id}`);
            console.log(`video JSON: ${JSON.stringify(video)}`);
            await uploadThumbnail(video.id);
            console.log(`Thumbnail has been uploaded with videoId: ${videoId}`);
            resolve();
        });
      });
    }

    async function uploadThumbnail(videoId) {
      await youtube.thumbnails(videoId, {
          mimeType: "image/png",
          body: fs.createReadStream(`${process.cwd()}/video/thumbnail.png`),
        },
        (err) => {
            if (err) {
                console.error(`Cannot define the thumbnail. ${err}`);
                console.log(`uploadThumbnail videoId: ${videoId}`);
            }
        });
      console.log("Thumbnail uploaded");
    }

  } catch (err) {
    console.log(`Upload.js Error: ${err}`);
  }

}

module.exports = Upload;

// Trends Research https://trends.google.com/trends/explore?date=now%201-d&geo=US&gprop=youtube&q=tiktok

/*
BEST UPLOAD TIMES
Mon, Tue, Wed: 2pm EST
Thurs, Fri: 12pm EST
Weekends: 9am EST


// ----------------- COMMENT -------------- //
Did you enjoy today's video? 👏
👉 Subscribe and I'll see you again tomorrow kings and queens! 💖😉


>>TITLE
[TikTok] Cute Asian Girls Compilation #2 - May 6, 2020
[TikTok] Cute Asian Boys Compilation #2 - May 7, 2020
🔥 [TikTok] Oi Oi Oi Song Compilation | おいおいおい Samurai Tiktok
【TikTok Japan】 日本のティックトック | 💖 3 2 1 GO!  😳🥺😗🤪😉🤫💥

👏🥺😎👲👩🎎

>>DESCRIPTION
<Insert Title>

My channel compiles videos videos of westerners and people from asia representing tiktok china, tiktok japan, and tiktok korea. Thanks for watching!

Please subscribe to my channel for daily TikTok compilations!
👉https://youtube.com/channel/UCbJhs7xvYA4Js7oobhyP42Q?sub_confirmation=1

#tiktok #tiktokchina #tiktokvietnam #tiktokkorea #tiktokjapan

#tiktok, #musical.ly, #tiktokmemes, #funniesttiktoks, #funniesttiktoks, #memecompilation, #memescompilation, #foryou, #fyp, #tiktokchallenge, #tiktokchallenge, #tiktoksongcompilation, #tiktoksong, #tiktoksong, #besttiktoks, #besttiktoks, #tiktokdances, #tiktokdances
-----
tik tok, tiktok, musical.ly, tiktokmemes, funniest tiktoks, funniest tik toks, meme compilation, memes compilation, for you, fyp, tiktok challenge, tik tok challenge, tik tok song compilation, tiktok song, tik tok song, best tik toks, best tiktoks, tik tok dances, tiktok dances

>>TAGS
Asian
tiktok, ティックトック,TikTok日本, tiktok japan, tiktok korean, tiktok china, tik tok, douyin, for you, fyp, tiktok challenge, tik tok challenge, tik tok song compilation, tiktok song, tik tok song, best tik toks, best tiktoks, tik tok dances, tiktok dances

Celebs
tiktok, tik tok, musical.ly, tiktokmemes, funniest tiktoks, funniest tik toks, meme compilation, memes compilation, for you, fyp, tiktok challenge, tik tok challenge, tik tok song compilation, tiktok song, tik tok song, best tik toks, best tiktoks, tik tok dances, tiktok dances



//------------ ASIAN GUYS --------------------//

// TITLE
👲 Asian Guys On Tik Tok - May 14, 2020

// DESCRIPTION
This video is a compilation of tiktok videos from asian guys in America & Asia including tiktok china, tiktok japan, and tiktok korea. Thanks for watching!

Subscribe below & I'll see you again tomorrow Kings & Queens!
👉https://youtube.com/channel/UCbJhs7xvYA4Js7oobhyP42Q?sub_confirmation=1

-----
#tiktok #tiktokwilliam #asianguys

// TAGS
tiktokasianguys, tiktok, cute tik tok guys, cute asian guys, cute guys on tiktok, asian boys, cute asian boys, tik tok korea





//------------ ASIAN GIRLS --------------------//

// TITLE
👩 TikTok Asians - May 24, 2020

// DESCRIPTION
This video is a compilation of tiktok videos from asian gals.
Thanks for watching!

Subscribe below & I'll see you again tomorrow Kings & Queens!
👉https://youtube.com/channel/UCbJhs7xvYA4Js7oobhyP42Q?sub_confirmation=1

-----
#tiktok #tiktokwilliam

// TAGS
tiktokasiangirls, tiktok, japanese girls, tik tok korea, asian girls, cute asian girls, asian girl, cute asian girl,





//------------ TIKTOK INFLUENCERS --------------------/

// TITLE
👏 TikToks That Clap #3 - May 11, 2020

// DESCRIPTION
This is a daily tiktok compilation of updates from your favorite celebrities and influencers that includes:
1) Charli D'Amelio
2) Ondreaz Lopez
3) Tony Lopez
4) The Hype House
5) Josh Richards and much more!

Thanks for watching!

Subscribe below & I'll see you again tomorrow Kings & Queens!
👉https://youtube.com/channel/UCbJhs7xvYA4Js7oobhyP42Q?sub_confirmation=1

-----
#tiktokwilliam #tiktok #tiktokmeme #memes

// TAGS
tiktokinfluencers,musical.ly,funny tik tok videos,tik tok compilation,tik tok 2020,ironic tik tok,tik tok musically,cringey tik toks,tiktok,musically,ironic tik toks,cringey tik tok,compilations,tik tok,tiktok cringe,tiktok memes,wifi plug,ironic tik tok trolls,FakeMeme
tiktokinfluencers, musical.ly, funny tik tok videos, tik tok compilation, tik tok 2020, ironic tik tok,	tik tok musically, cringey tik toks, tiktok, musically, ironic tik toks, tik tok,	tiktok cringe, tiktok memes, ironic tik tok trolls, fakememe, william tiktok, tiktok william, william, charlidamelio, musical.ly videos, new musical.ly compilation, memes, meme compilation, musical.lys, the best musical.ly, TikTok, Tik Tok, Funny TIK TOK, Clean Tik Toks, Tik Tok 2020, TikToks



//------------ TIKTOK JAPAN --------------------//

// TITLE
🎎 TikTok Japan | 日本のティックトック- May 12, 2020

// DESCRIPTION
This video is a compilation of tiktoks from amazing Japanese tiktokers.
Thanks for watching!

Subscribe below & I'll see you again tomorrow Kings & Queens!
👉https://youtube.com/channel/UCbJhs7xvYA4Js7oobhyP42Q?sub_confirmation=1

-----
#tiktok日本 #ティックトック #tiktokwilliam #tiktokjapan

// TAGS
tiktokjapan, ティックトック, TikTok日本, tiktok japan, tiktok william, william tiktok



//------------ TIKTOK CHINA --------------------//

// TITLE
🇨🇳 Amazing Douyin 抖音 TikTok China] #2 - May 11, 2020

// DESCRIPTION
This video is a mashup of funny tiktoks from Douyin(抖音) / Tiktok China.
Thanks for watching!

Subscribe below & I'll see you again tomorrow Kings & Queens!
👉https://youtube.com/channel/UCbJhs7xvYA4Js7oobhyP42Q?sub_confirmation=1

-----
#douyin #抖音 #tiktokwilliam

// TAGS
douyin, tiktok china, tik tok, 抖音, for you, fyp, tiktok challenge, tik tok challenge, tik tok song compilation, tiktok song, tik tok song, best tik toks, best tiktoks, tik tok dances, tiktok dances


//------------ INFLUENCERS --------------------//

// CHARLI D'AMELIO TAGS
tiktok,	charlidamelio ,	charli ,	damelio ,	compilation ,	dance ,	trend ,	challenge ,	foryou ,	fyp ,	hype ,	whatsthehype ,	hypesover ,	dancing ,	understand ,	dixiedamelio,


//------------ CUSTOM --------------------//

// TITLE
🤗 Stay In My Arms Tiktok

// DESCRIPTION
This video is a compilation of the stay in my arms tiktok videos where tiktokers share their honest feelings about love and relationships including their fears and insecurities. Can you relate to them? Thanks for watching!

Subscribe below & I'll see you again tomorrow Kings & Queens!
👉https://youtube.com/channel/UCbJhs7xvYA4Js7oobhyP42Q?sub_confirmation=1

-----
#tiktok #stayinmyarms #tiktokwilliam


*/

