const Youtube = require("youtube-video-api");
require("dotenv").config();
const fs = require("fs");
const keys = require("../.google-oauth2-credentials.json");

async function Upload() {
  try {
    const youtube = Youtube({
      saveTokens: true,
      video: { part: "status, snippet" },
      // Google login credentials
      email: process.env.GOOGLE_LOGIN_EMAIL,
      password: process.env.GOOGLE_LOGIN_PASSWORD,
      // oauth2 clientid and clientsecret
      clientId: process.env.OAUTH2_CLIENT_ID,
      clientSecret: process.env.OAUTH2_CLIENT_SECRET,
      // oauth2 refresh and access token
      // tokens: {
      //   access_token: keys.access_token,
      //   refresh_token: keys.refresh_token,
      // },
      // Use specific branded account
      useAccount: process.env.GOOGLE_ACCOUNT_EMAIL_WILLIAM,
      file: "../.google-oauth2-credentials.json",
      scope: 'https://www.googleapis.com/auth/youtube'
    });

    let day = new Date().getDate();
    let month = new Date().toLocaleString("default", { month: "long" }); // gets full month name capitalized
    let year = new Date().getFullYear();

    var params = {
      resource: {
        snippet: {
          title: `🔥 Best TikTok Compilation of ${month} ${year} Part ${day}`,
          description: `Who else should we include? Let us know in the comments below!

          Thank you for watching.
          Remember to Subscribe ⇒ https://youtube.com/channel/UCbJhs7xvYA4Js7oobhyP42Q?sub_confirmation=1`,
          tags: ['tiktok', 'tiktokcompilation'],
          defaultLanguage: "en_US"
        },
        status: {
          privacyStatus: "private",
        },
      },
    };

    youtube.authenticate(
      process.env.OAUTH2_CLIENT_ID,
      process.env.OAUTH2_CLIENT_SECRET,
      async function (err, tokens) {
        if (err) return console.error("Cannot authenticate:", err);
        console.log(`Authenticated. Tokens: ${JSON.stringify(tokens)}`);
        let videoId = await uploadVideo();
        await uploadThumbnail(videoId);

        // youtube.on('auth:success', function (err) {
        //   if (!err) {
        //     youtube.upload(`${process.cwd()}/video/output.mp4`, params, (err, video) => {
        //       if (!err) console.log('Video was uploaded:', video.id);
        //     });
        //   } else {
        //     console.error(`myError (Upload.js): ${err}`);
        //   }
        // });
      }
    );

    async function uploadVideo() {
      return new Promise(async (resolve, reject) => {
        await youtube.upload(`${process.cwd()}/video/output.mp4`, params, (err, video) => {
            if (err) return console.error("Cannot upload video:", err);
            console.log("Video was uploaded with ID:", video.id);
            resolve(video.id);
        });
      });
    }

    async function uploadThumbnail(videoId) {
      await youtube.thumbnails(videoId, {
          mimeType: "image/png",
          body: fs.createReadStream(`${process.cwd()}/img/thumbnail.png`),
        },
        (err) => {
          if (err) console.error("Cannot define the thumbnail");
        }
      );
      console.log("Thumbnail uploaded");
    }

  } catch (err) {
    console.log(`Upload.js Error: ${err}`);
  }

}

//Upload();
module.exports = Upload;

/*
BEST UPLOAD TIMES
Mon, Tue, Wed: 2pm EST
Thurs, Fri: 12pm EST
Weekends: 9am EST

>>TITLE
[TikTok] Cute Asian Girls Compilation #2 - May 6, 2020
[TikTok] Cute Asian Boys Compilation #2 - May 7, 2020
🔥 [TikTok] Oi Oi Oi Song Compilation | おいおいおい Samurai Tiktok
【TikTok Japan】 日本のティックトック | 💖 3 2 1 GO!  😳🥺😗🤪😉🤫💥

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



//------------ TIKTOK ASIAN GUYS --------------------//

// TITLE
【TikTok】Cute Asian Boys Compilation #2 - May 7, 2020

// DESCRIPTION
This video is a compilation of tiktok videos from asian guys in America & Asia including tiktok china, tiktok japan, and tiktok korea. Thanks for watching!

Please subscribe to my channel for daily TikTok compilations!
👉https://youtube.com/channel/UCbJhs7xvYA4Js7oobhyP42Q?sub_confirmation=1

-----
#tiktok #tiktokchina #tiktokvietnam #tiktokkorea #tiktokjapan

// TAGS
tiktok, ティックトック,TikTok日本, tiktok japan, tiktok korean, tiktok china, tik tok, douyin, for you, fyp, tiktok challenge, tik tok challenge, tik tok song compilation, tiktok song, tik tok song, best tik toks, best tiktoks, tik tok dances, tiktok dances





//------------ TIKTOK ASIAN GIRLS --------------------//

// TITLE
[TikTok] Cute Asian Girls Compilation #4 - May 8, 2020

// DESCRIPTION
This video is a compilation of tiktok videos from asian girls in America & Asia including tiktok china, tiktok japan, and tiktok korea. Thanks for watching!

Please subscribe to my channel for daily TikTok compilations!
👉https://youtube.com/channel/UCbJhs7xvYA4Js7oobhyP42Q?sub_confirmation=1

-----
#tiktok #tiktokchina #tiktokvietnam #tiktokkorea #tiktokjapan

// TAGS
tiktok, ティックトック,TikTok日本, tiktok japan, tiktok korean, tiktok china, tik tok, douyin, for you, fyp, tiktok challenge, tik tok challenge, tik tok song compilation, tiktok song, tik tok song, best tik toks, best tiktoks, tik tok dances, tiktok dances





//------------ TIKTOK INFLUENCERS --------------------/

// TITLE
FUNNY TIKTOK COMPILATION THAT WILL SATISFY #1 - May 7, 2020

// DESCRIPTION
This is a tiktok video compilation of celebrities and influencers that includes:
1) Charli D'Amelio
2) Ondreaz Lopez
3) Tony Lopez
4) The Hype House
5) Josh Richards and much more!

Thanks for watching!

Please subscribe to my channel for daily TikTok compilations!
👉https://youtube.com/channel/UCbJhs7xvYA4Js7oobhyP42Q?sub_confirmation=1

-----
#tiktok #tiktokmeme #memes musical.ly,funny tik tok videos,tik tok compilation,tik tok 2020,ironic tik tok,tik tok musically,cringey tik toks,tiktok,musically,ironic tik toks,cringey tik tok,compilations,tik tok,tiktok cringe,tiktok memes,wifi plug,ironic tik tok trolls,FakeMeme

// TAGS
musical.ly, funny tik tok videos, tik tok compilation, tik tok 2020, ironic tik tok,	tik tok musically, cringey tik toks, tiktok, musically, ironic tik toks, tik tok,	tiktok cringe, tiktok memes, ironic tik tok trolls, fakememe, william tiktok, tiktok william, william, charlidamelio musical.ly compilation, musical.ly videos, new musical.ly compilation, memes, meme compilation, musical.lys, the best musical.ly, TikTok, Tik Tok, Funny TIK TOK, Clean Tik Toks, Tik Tok 2020, TikToks




// ----------------- COMMENT -------------- //
Hey guys, thanks for watching! Please remember to subscribe for daily TikTok updates!
👉https://youtube.com/channel/UCbJhs7xvYA4Js7oobhyP42Q?sub_confirmation=1


*/