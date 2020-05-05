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
          tags: ["tiktok", "tiktokcompilation"],
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

VIDEO TITLES
Best TikTok Dance Compilation of April 2020 | Popular Tik Tok Dances
Best TikTok Dance Compilation of January 2020 | TikTok Memes

*/